import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

const API_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/auth/me`,
        {
          withCredentials: true,
        }
      );

      setUser(response.data.user);
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${API_URL}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading your profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="not-authenticated">
        <h2>You're not authenticated</h2>

        <p>
          Please login with your GitHub account to continue.
        </p>

        <button
          onClick={() => (window.location.href = "/")}
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <nav className="navbar">
        <div className="logo">
          GitHub OAuth
        </div>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>

      <main className="dashboard-container">
        <div className="welcome-section">
          <h1>
            Welcome back,{" "}
            {user.displayName || user.username}! 👋
          </h1>

          <p>
            Your GitHub account has been successfully authenticated.
          </p>
        </div>

        <div className="profile-card">
          <div className="profile-header">
            <img
              src={user.avatar}
              alt={user.username}
              className="profile-image"
            />

            <div>
              <h2>
                {user.displayName || user.username}
              </h2>

              <span>
                @{user.username}
              </span>
            </div>
          </div>

          <div className="profile-details">
            <div className="detail">
              <span className="detail-label">
                Username
              </span>

              <span className="detail-value">
                {user.username}
              </span>
            </div>

            <div className="detail">
              <span className="detail-label">
                Email
              </span>

              <span className="detail-value">
                {user.email || "Not publicly available"}
              </span>
            </div>
          </div>

          <a
            href={user.githubProfileUrl}
            target="_blank"
            rel="noreferrer"
            className="github-profile-button"
          >
            View GitHub Profile →
          </a>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;