const axios = require("axios");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateTokens");


const githubLogin = (req, res) => {
  const githubAuthUrl =
    `https://github.com/login/oauth/authorize?` +
    `client_id=${process.env.GITHUB_CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(
      process.env.GITHUB_CALLBACK_URL
    )}` +
    `&scope=user:email`;

  res.redirect(githubAuthUrl);
};


const githubCallback = async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({
        message: "Authorization code missing",
      });
    }

    // Exchange code for GitHub access token
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: process.env.GITHUB_CALLBACK_URL,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const githubAccessToken = tokenResponse.data.access_token;

    if (!githubAccessToken) {
      return res.status(400).json({
        message: "Failed to get GitHub access token",
      });
    }

    // Get GitHub user
    const githubUserResponse = await axios.get(
      "https://api.github.com/user",
      {
        headers: {
          Authorization: `Bearer ${githubAccessToken}`,
          Accept: "application/vnd.github+json",
        },
      }
    );

    const githubUser = githubUserResponse.data;

    // Get email
    let email = githubUser.email;

    if (!email) {
      const emailResponse = await axios.get(
        "https://api.github.com/user/emails",
        {
          headers: {
            Authorization: `Bearer ${githubAccessToken}`,
            Accept: "application/vnd.github+json",
          },
        }
      );

      const primaryEmail = emailResponse.data.find(
        (email) => email.primary && email.verified
      );

      email = primaryEmail?.email || null;
    }

    // Find or create user
    let user = await User.findOne({
      githubId: String(githubUser.id),
    });

    if (!user) {
      user = await User.create({
        githubId: String(githubUser.id),
        username: githubUser.login,
        displayName: githubUser.name,
        email,
        avatar: githubUser.avatar_url,
        githubProfileUrl: githubUser.html_url,
      });
    } else {
      user.username = githubUser.login;
      user.displayName = githubUser.name;
      user.email = email;
      user.avatar = githubUser.avatar_url;
      user.githubProfileUrl = githubUser.html_url;

      await user.save();
    }

    // Generate our application JWTs
    const accessToken = generateAccessToken(user._id);

    const refreshToken = generateRefreshToken(user._id);

    // Store tokens in HTTP-only cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Redirect to frontend
    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
  } catch (error) {
    console.error(
      "GitHub OAuth Error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      message: "GitHub authentication failed",
    });
  }
};


const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-__v");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};


const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh token missing",
      });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    const newAccessToken = generateAccessToken(user._id);

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    });

    res.json({
      message: "Access token refreshed",
    });
  } catch (error) {
    res.status(401).json({
      message: "Invalid or expired refresh token",
    });
  }
};



const logout = (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  res.json({
    message: "Logged out successfully",
  });
};



module.exports = {
  githubLogin,
  githubCallback,
  getMe,
  refreshAccessToken,
  logout,
};