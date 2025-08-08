import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/CSS/userlogin.css';

function UserLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isFlying, setIsFlying] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === 'user' && password === 'password') {
      setIsFlying(true); // Trigger rocket animation

      // Wait for animation before navigating
      setTimeout(() => {
        navigate('/userhome');
      }, 1000); // match with animation time in CSS
    } else {
      alert('❌ Invalid credentials. Try user/password');
    }
  };

  return (
    <div className="login-page green-teal d-flex justify-content-center align-items-center vh-100">
      <div className="login-card shadow-lg animate-fade-up p-4">
        <h2 className="text-center mb-4 text-gradient fw-bold">User Login</h2>
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
              <span className={isFlying ? 'rocket-fly' : ''}>🚀</span> Login
            </button>
          </div>
        </form>
        <p className="text-center mt-4 text-light small opacity-75">
          Default: <strong>user / password</strong>
        </p>
      </div>
    </div>
  );
}

export default UserLogin;
