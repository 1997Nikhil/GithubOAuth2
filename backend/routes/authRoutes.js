const express = require("express");

const {
  githubLogin,
  githubCallback,
  getMe,
  refreshAccessToken,
  logout,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/github", githubLogin);

router.get("/github/callback", githubCallback);

router.get("/me", authMiddleware, getMe);

router.post("/refresh", refreshAccessToken);

router.post("/logout", logout);

module.exports = router;