import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const StaffReg = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    department: '',
    contact: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Staff Data:', formData);
    alert("Registration Successful!");
  };

  return (
    <div className="container mt-5 p-4 shadow-lg rounded bg-white" style={{ maxWidth: '600px' }}>
      <h2 className="text-center mb-4 text-primary">Staff Registration</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Full Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Gender */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Gender</label>
          <div className="form-check form-check-inline ms-2">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              value="Male"
              onChange={handleChange}
              required
            />
            <label className="form-check-label">Male</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              value="Female"
              onChange={handleChange}
              required
            />
            <label className="form-check-label">Female</label>
          </div>
        </div>

        {/* Department */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Department</label>
          <select
            className="form-select"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Department --</option>
            <option value="Library">Library</option>
            <option value="Administration">Administration</option>
            <option value="IT">IT</option>
            <option value="Accounts">Accounts</option>
          </select>
        </div>

        {/* Contact */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Contact No.</label>
          <input
            type="tel"
            className="form-control"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            pattern="[0-9]{10}"
            required
          />
        </div>

        {/* Address */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Address</label>
          <textarea
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            required
          ></textarea>
        </div>

        {/* Submit */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary px-4 mt-2 rounded-pill">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default StaffReg;
