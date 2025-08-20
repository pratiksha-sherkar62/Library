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

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

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
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              name="name"
              className="form-control"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              name="email"
              type="email"
              className="form-control"
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              name="phonno"
              className="form-control"
              placeholder="Phone Number"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              name="confirmPassword"
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              name="staffid"
              className="form-control"
              placeholder="Staff ID"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              name="position"
              className="form-control"
              placeholder="Position"
              onChange={handleChange}
              required
            />
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
