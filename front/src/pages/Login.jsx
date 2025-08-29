
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/CSS/login.css';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call backend login API
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        username,
        password,
      });

      if (res.data && res.data.token) {
        // Save token in localStorage
        localStorage.setItem("token", res.data.token);

        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        throw new Error("Invalid login response");
      }
    } catch (err) {
      console.error("Login error:", err);

      // Shake animation for error
      const card = document.querySelector(".login-card");
      if (card) {
        card.classList.add("shake");
        setTimeout(() => card.classList.remove("shake"), 500);
      }

      alert(err.response?.data?.message || "Invalid credentials. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page d-flex justify-content-center align-items-center vh-100">
      <div className="login-card shadow-lg animate-fade-up p-4">
        <h2 className="text-center mb-4 text-gradient fw-bold">Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Username</label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="d-grid">
            <button 
              type="submit" 
              className="btn btn-gradient btn-lg shadow-sm"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
