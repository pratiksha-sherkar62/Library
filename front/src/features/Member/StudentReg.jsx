import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/CSS/FormStyles.css';

function StudentRegistration({ onRegister }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    prn: '',
    studentClass: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    onRegister(formData);
    navigate('/members');
  };

  return (
    <div className="page-bg">
      <div className="form-glass w-100" style={{ maxWidth: '500px' }}>
        <h2 className="text-center mb-4 text-gradient">🎓 Student Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3"><input className="form-control" name="fullName" placeholder="Full Name" onChange={handleChange} required /></div>
          <div className="mb-3"><input className="form-control" name="email" type="email" placeholder="Email" onChange={handleChange} required /></div>
          <div className="mb-3"><input className="form-control" name="phone" placeholder="Phone Number" onChange={handleChange} required /></div>
          <div className="mb-3"><input className="form-control" name="password" type="password" placeholder="Password" onChange={handleChange} required /></div>
          <div className="mb-3"><input className="form-control" name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} required /></div>
          <div className="mb-3"><input className="form-control" name="prn" placeholder="PRN Number" onChange={handleChange} required /></div>
          <div className="mb-3"><input className="form-control" name="studentClass" placeholder="Class" onChange={handleChange} required /></div>
          <button type="submit" className="btn btn-gradient w-100">Register</button>
        </form>
      </div>
    </div>
  );
}

export default StudentRegistration;
