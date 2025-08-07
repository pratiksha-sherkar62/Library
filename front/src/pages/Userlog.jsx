// src/pages/Userlog.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Userlog() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Dummy auth logic
    if (username === 'user' && password === 'password') {
      // Redirect to /userhome after successful login
      navigate('/userhome');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="container mt-5">
      <h2>User Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Username:</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default Userlog;
