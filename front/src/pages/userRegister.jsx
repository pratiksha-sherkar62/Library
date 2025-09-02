import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/CSS/userlogin.css";
import axios from "axios";

function UserRegister() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("❌ Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/user/register", {
        name,
        email,
        password,
      });

      if (response.data.success) {
        // Save token in localStorage
        localStorage.setItem("token", response.data.token);

        alert("✅ Registration successful!");
        navigate("/Userlog");
      } else {
        alert("❌ " + (response.data.message || "Registration failed."));
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("❌ An error occurred. Try again later.");
    }
  };

  return (
    <div className="login-page green-teal d-flex justify-content-center align-items-center vh-100">
      <div className="login-card shadow-lg animate-fade-up p-4">
        <h2 className="text-center mb-4 text-gradient fw-bold">User Registration</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
          <div className="mb-3">
            <label className="form-label fw-semibold">Confirm Password</label>
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-gradient btn-lg shadow-sm">
              🚀 Register
            </button>
          </div>
        </form>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <span
            className="text-gradient fw-bold"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/Userlog")}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}

export default UserRegister;
