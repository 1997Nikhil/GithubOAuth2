import { useEffect, useState } from "react";
import axios from "axios";

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
      console.error(error);
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
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!user) {
    return (
      <div>
        <h2>Not authenticated</h2>

        <a href="/">
          Go to login
        </a>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome {user.displayName || user.username}</h1>

      <img
        src={user.avatar}
        alt={user.username}
        width="100"
      />

      <p>Username: {user.username}</p>

      <p>Email: {user.email}</p>

      <a
        href={user.githubProfileUrl}
        target="_blank"
        rel="noreferrer"
      >
        GitHub Profile
      </a>

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;