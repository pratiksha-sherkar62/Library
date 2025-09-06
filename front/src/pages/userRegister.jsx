import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/CSS/userlogin.css";
import axios from "axios";

function UserRegister() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [userId, setUserId] = useState(""); // ✅ New: User ID field
  const [phone, setPhone] = useState(""); // ✅ New: Phone field
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photo, setPhoto] = useState(null); // ✅ New: Profile photo
  const [role, setRole] = useState("student");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("❌ Passwords do not match!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("userId", userId);
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("role", role);
      formData.append("password", password);
      if (photo) formData.append("photo", photo);

      const response = await axios.post(
        "http://localhost:5000/api/user/register",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        alert("✅ Registration successful!");
        navigate("/Userlog");
      } else {
        alert("❌ " + (response.data.message || "Registration failed."));
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("❌ An error occurred. Try again later.");
    }
  };

  return (
    <div className="login-page green-teal d-flex justify-content-center align-items-center vh-70 hw-50">
      <div className="login-card shadow-lg animate-fade-up p-4">
        <h2 className="text-center mb-4 text-gradient fw-bold">User Registration</h2>

        {/* ✅ Keep button inside form */}
        <form onSubmit={handleRegister}>
          {/* Full Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
            />
          </div>

          {/* User ID */}
          <div className="mb-3">
            <label className="form-label fw-semibold">User ID</label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter your ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Phone */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Phone Number</label>
            <input
              type="tel"
              className="form-control form-control-lg"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              pattern="[0-9]{10}" // ✅ Only 10 digits
              required
            />
          </div>

          {/* Role */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Role</label>
            <select
              className="form-control form-control-lg"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="student">Student</option>
              <option value="staff">Staff</option>
            </select>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Confirm Password</label>
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Profile Photo */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Profile Photo</label>
            <input
              type="file"
              className="form-control form-control-lg"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </div>

          {/* ✅ Submit button now inside form */}
          <div className="d-grid">
            <button type="submit" className="btn btn-gradient btn-lg shadow-sm">
              🚀 Register
            </button>
          </div>
        </form>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <span
            className="text-gradient fw-bold"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/Userlog")}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}

export default UserRegister;
