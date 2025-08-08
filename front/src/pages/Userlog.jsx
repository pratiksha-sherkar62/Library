import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/CSS/Style.css';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === 'user' && password === 'password') {
      alert('User login successful!');
      navigate('/userhome'); // 👈 Admin redirected to dashboard
    } else {
      alert('Invalid credentials. ');
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg login-card">
        <h2 className="text-center mb-4 text-primary">User Login</h2>
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
        </form>
      </div>
    </div>
  );
}

export default Login;
