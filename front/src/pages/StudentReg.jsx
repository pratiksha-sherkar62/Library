// src/pages/StudentReg.jsx
import '../assets/CSS/StudentReg.css';
import React, { useState } from 'react';

const StudentReg = () => {
  const [formData, setFormData] = useState({
    prn: '',
    name: '',
    email: '',
    contact: '',
    course: '',
    gender: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration Data:', formData);
    alert('User registered successfully!');
  };

  return (
    <div className="container mt-5" style={{ backgroundColor: '#3d6894ff' }}>
      <div className="card shadow-lg p-3" style={{ backgroundColor: '#69cdf4ff' }}>
        <h3 className="mb-4 text-center text-primary">Student Registration</h3>
        <form onSubmit={handleSubmit}>
          
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">PRN Number</label>
              <input
                type="number"
                name="prn"
                className="form-control"
                value={formData.prn}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Contact Number</label>
              <input
                type="number"
                name="contact"
                className="form-control"
                value={formData.contact}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Course</label>
              <input
                type="text"
                name="course"
                className="form-control"
                value={formData.course}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label d-block">Gender</label>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input custom-radio"
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === 'Male'}
                  onChange={handleChange}
                />
                <label className="form-check-label">Male</label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input custom-radio"
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === 'Female'}
                  onChange={handleChange}
                />
                <label className="form-check-label">Female</label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input custom-radio"
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={formData.gender === 'Other'}
                  onChange={handleChange}
                />
                <label className="form-check-label">Other</label>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary px-4">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentReg;
