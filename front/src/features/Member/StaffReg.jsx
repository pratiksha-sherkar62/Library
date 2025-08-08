import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/CSS/FormStyles.css';

function StaffReg({ onRegister }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    staffId: '',
    position: '',
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
    onRegister({ ...formData, type: 'Staff' });
    navigate('/members');
  };

  return (
    <div className="page-bg">
      <div className="form-glass w-100" style={{ maxWidth: '500px' }}>
        <h2 className="text-center mb-4 text-gradient">👨‍🏫 Staff Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3"><input name="fullName" className="form-control" placeholder="Full Name" onChange={handleChange} required /></div>
          <div className="mb-3"><input name="email" type="email" className="form-control" placeholder="Email" onChange={handleChange} required /></div>
          <div className="mb-3"><input name="phone" className="form-control" placeholder="Phone Number" onChange={handleChange} required /></div>
          <div className="mb-3"><input name="password" type="password" className="form-control" placeholder="Password" onChange={handleChange} required /></div>
          <div className="mb-3"><input name="confirmPassword" type="password" className="form-control" placeholder="Confirm Password" onChange={handleChange} required /></div>
          <div className="mb-3"><input name="staffId" className="form-control" placeholder="Staff ID" onChange={handleChange} required /></div>
          <div className="mb-3"><input name="position" className="form-control" placeholder="Position" onChange={handleChange} required /></div>
          <button type="submit" className="btn btn-gradient w-100">Register</button>
        </form>
      </div>
    </div>
  );
}

export default StaffReg;
