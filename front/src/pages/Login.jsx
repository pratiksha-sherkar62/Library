// src/pages/Login.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../assets/CSS/Style.css';

function Login() {
  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg login-card">
        <h2 className="text-center mb-4 text-primary">Admin Login</h2>
        <form>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Username" />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" placeholder="Password" />
          </div>
          <div className="d-grid mb-3">
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
          <p className="text-center">
            Don’t have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
