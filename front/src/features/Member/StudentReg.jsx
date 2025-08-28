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

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // ✅ Validation function
  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!formData.prn) {
      newErrors.prn = "PRN is required";
    } else if (!/^\d{6,10}$/.test(formData.prn)) {
      newErrors.prn = "PRN must be 6–10 digits";
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

    if (!formData.studentClass) newErrors.studentClass = "Class is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

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
        <form onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <div className="mb-3">
            <input
              className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
              name="fullName"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />
            {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
          </div>

          {/* Email */}
          <div className="mb-3">
            <input
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          {/* Phone */}
          <div className="mb-3">
            <input
              className={`form-control ${errors.phone ? "is-invalid" : ""}`}
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              required
            />
            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
          </div>

          {/* Password */}
          <div className="mb-3">
            <input
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <input
              className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && (
              <div className="invalid-feedback">{errors.confirmPassword}</div>
            )}
          </div>

          {/* PRN */}
          <div className="mb-3">
            <input
              className={`form-control ${errors.prn ? "is-invalid" : ""}`}
              name="prn"
              placeholder="PRN Number"
              onChange={handleChange}
              required
            />
            {errors.prn && <div className="invalid-feedback">{errors.prn}</div>}
          </div>

          {/* Class Dropdown */}
          <div className="mb-3">
            <select
              className={`form-control ${errors.studentClass ? "is-invalid" : ""}`}
              name="studentClass"
              onChange={handleChange}
              required
            >
              <option value="">-- Select Class --</option>
              <option value="XI">XI</option>
              <option value="XII">XII</option>
              <option value="FY BA">FY BA</option>
              <option value="SY BA">SY BA</option>
               <option value="TY BA">TY BA</option>
              <option value="FY BSc CS">FY BSc CS</option>
              <option value="FY BSc">FY BSc</option>
              <option value="SY BSc">SY BSc</option>
              <option value="TY BSc">TY BSc</option>
              <option value="FY BA">FY BA</option>
              <option value="SY BA">SY BA</option>
               <option value="TY BA">TY BA</option>
              <option value="FY BSc CS">FY BSc CS</option>
              <option value="SY BSc CS">SY BSc CS</option>
              <option value="TY BSc CS">TY BSc CS</option>
              <option value="MSc Part I">MSc Part I</option>
              <option value="MSc Part II">MSc Part II</option>
              <option value="MSc CS Part I">MSc CS Part I</option>
              <option value="MSc CS Part II">MSc CS Part II</option>
            </select>
            {errors.studentClass && <div className="invalid-feedback">{errors.studentClass}</div>}
          </div>

          <button type="submit" className="btn btn-gradient w-100">Register</button>
        </form>
      </div>
    </div>
  );
}

export default StudentRegistration;
