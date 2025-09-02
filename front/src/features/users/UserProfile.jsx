import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import "../../assets/CSS/userProfile.css";

function UserProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    profile_pic: null,
    role: "student",
    class_number: "",
    prn_number: ""
  });
  const [preview, setPreview] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const token = localStorage.getItem("token");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    if (!token) return navigate("/userLogin");

    axios
      .get("http://localhost:5000/api/profile/me", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setProfile(res.data))
      .catch(err => console.error(err));
  }, [token, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profile_pic") {
      setProfile({ ...profile, profile_pic: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in profile) {
      formData.append(key, profile[key]);
    }

    try {
      const res = await axios.put(
        "http://localhost:5000/api/profile/update",
        formData,
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
      );

      if (res.data.success) {
        alert("✅ Profile updated successfully!");
        navigate("/userhome");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update profile");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <div style={{ width: isSidebarOpen ? "15%" : "0", transition: "width 0.3s" }}>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }} className="profile-page">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              <img
                src={
                preview || 
                (profile.profile_pic ? `http://localhost:5000/uploads/${profile.profile_pic}` : "/default-avatar.png")
                }
                alt="Profile"
                />
              <input type="file" name="profile_pic" onChange={handleChange} />
            </div>
            <h2 className="profile-name">{profile.name || "Your Name"}</h2>
            <p className="profile-role">
  {(profile?.role || "student").toUpperCase()}
</p>
          </div>

          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Full Name</label>
              <input type="text" name="name" value={profile.name} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Phone Number</label>
              <input type="text" name="phone" value={profile.phone} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Class Number</label>
              <input type="text" name="class_number" value={profile.class_number} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>PRN Number</label>
              <input type="text" name="prn_number" value={profile.prn_number} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Role</label>
              <select name="role" value={profile.role} onChange={handleChange}>
                <option value="student">Student</option>
                <option value="staff">Staff</option>
              </select>
            </div>
            <button type="submit" className="btn-save">💾 Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
