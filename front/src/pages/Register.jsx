import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/CSS/Style.css';

const Register = () => {
  const [adminData, setAdminData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleRegister = (e) => {
    e.preventDefault();
    // API logic goes here
    console.log('Register Admin:', adminData);
  };

  return (
    <div className="register-container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4 text-success">Admin Registration</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Full Name"
              value={adminData.name}
              onChange={(e) => setAdminData({ ...adminData, name: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={adminData.email}
              onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={adminData.password}
              onChange={(e) => setAdminData({ ...adminData, password: e.target.value })}
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-success">Register</button>
          </div>
        </form>
        <p className="text-center mt-3">
          Already have an account? <Link to="/login">Go to Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
