const Login = () => {
  const handleGithubLogin = () => {
    window.location.href =
      "http://localhost:5000/api/auth/github";
  };

  return (
    <div>
      <h1>Login</h1>

      <button onClick={handleGithubLogin}>
        Continue with GitHub
      </button>
    </div>
  );
};

export default Login;