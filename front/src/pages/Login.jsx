import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/CSS/login.css';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [helicopterClass, setHelicopterClass] = useState('helicopter fly-circle');

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === 'admin' && password === 'admin') {
      // Replace fly-circle with fly-away
      setHelicopterClass('helicopter fly-away');

      // Navigate after animation finishes
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000); // match animation duration
    } else {
      const card = document.querySelector('.login-card');
      card.classList.add('shake');
      setTimeout(() => card.classList.remove('shake'), 500);
    }
  };

  return (
    <div className="login-page purple-pink d-flex justify-content-center align-items-center vh-100">
      {/* Helicopter Animation */}
      <div className={helicopterClass}>
        <div className="body"></div>
        <div className="tail"></div>
        <div className="rotor"></div>
        <div className="shadow"></div>
      </div>

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
            <button type="submit" className="btn btn-gradient btn-lg shadow-sm">
              🚁 Login
            </button>
          </div>
        </form>
        <p className="text-center mt-4 text-light small opacity-75">
          Default: <strong>admin / admin</strong>
        </p>
      </div>
    </div>
  );
}

export default Login;
