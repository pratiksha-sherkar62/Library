import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/CSS/FormStyles.css';

function StudentRegistration() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Map frontend fields → backend fields
    const payload = {
      PRN: formData.prn,
      name: formData.fullName,
      email: formData.email,
      phoneno: formData.phone,
      password: formData.password,
      class: formData.studentClass,
    };

    try {
      const response = await fetch("http://localhost:5000/api/student/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        alert("✅ Student Registered!");
        navigate("/members");
      } else {
        alert("❌ " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
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
