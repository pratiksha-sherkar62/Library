import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/CSS/FormStyles.css";

function StaffReg() {
  const [formData, setFormData] = useState({
    staffid: "",
    name: "",
    email: "",
    phonno: "",
    password: "",
    confirmPassword: "",
    position: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Validation function
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full Name is required";

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phonno) {
      newErrors.phonno = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phonno)) {
      newErrors.phonno = "Phone number must be 10 digits";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.position.trim()) newErrors.position = "Position is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const res = await axios.post("http://localhost:5000/api/staff", {
        staffid: formData.staffid,
        name: formData.name,
        email: formData.email,
        phonno: formData.phonno,
        password: formData.password,
        position: formData.position,
      });

      alert(res.data.message);
      navigate("/members");
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to register staff!");
    }
  };

  return (
    <div className="page-bg">
      <div className="form-glass w-100" style={{ maxWidth: "500px" }}>
        <h2 className="text-center mb-4 text-gradient">👨‍🏫 Staff Registration</h2>
        <form onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div className="mb-3">
            <input
              name="name"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              placeholder="Full Name"
              onChange={handleChange}
              required
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          {/* Email */}
          <div className="mb-3">
            <input
              name="email"
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="Email"
              onChange={handleChange}
              required
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          {/* Phone Number */}
          <div className="mb-3">
            <input
              name="phonno"
              className={`form-control ${errors.phonno ? "is-invalid" : ""}`}
              placeholder="Phone Number"
              onChange={handleChange}
              required
            />
            {errors.phonno && <div className="invalid-feedback">{errors.phonno}</div>}
          </div>

          {/* Password */}
          <div className="mb-3">
            <input
              name="password"
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              placeholder="Password"
              onChange={handleChange}
              required
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <input
              name="confirmPassword"
              type="password"
              className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
              placeholder="Confirm Password"
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && (
              <div className="invalid-feedback">{errors.confirmPassword}</div>
            )}
          </div>

          {/* Position */}
          {/* Position */}
<div className="mb-3">
  <select
    name="position"
    className={`form-control ${errors.position ? "is-invalid" : ""}`}
    onChange={handleChange}
    value={formData.position}
    required
  >
    <option value="">-- Select Position --</option>
    <option value="Assistant Professor">Assistant Professor</option>
    <option value="HOD">HOD</option>
    <option value="Professor">Professor</option>
    
    <option value="Clerk">Clerk</option>
    <option value="Lab Assistant">Lab Assistant</option>
  </select>
  {errors.position && (
    <div className="invalid-feedback">{errors.position}</div>
  )}
</div>


          <button type="submit" className="btn btn-gradient w-100">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default StaffReg;
