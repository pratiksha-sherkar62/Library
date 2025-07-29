import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/CSS/Style.css';

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Dummy admin check
    if (username === 'admin' && password === 'admin') {
      navigate('/dashboard'); // Redirect to Dashboard
    } else {
      alert('Invalid credentials. Try admin/admin');
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg login-card">
        <h2 className="text-center mb-4 text-primary">Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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
