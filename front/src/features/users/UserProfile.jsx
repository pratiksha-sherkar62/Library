import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import "../../assets/CSS/FormStyles.css";

function UserProfile() {
  // Hooks at the top
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profileFile, setProfileFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phonno: "",
    class: "",
    position: ""
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const userEmail = localStorage.getItem("userEmail");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    if (!userEmail) {
      alert("No user logged in!");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:5000/api/user/profile?email=${userEmail}`)
      .then((res) => {
        const data = res.data;
        setUser(data);
        setFormData({
          name: data.name || "",
          phonno: data.phonno || "",
          class: data.class || "",
          position: data.position || ""
        });
        setProfileImage(
          data.profileImage ? `http://localhost:5000/uploads/${data.profileImage}` : null
        );
      })
      .catch((err) => console.error("Error fetching profile:", err))
      .finally(() => setLoading(false));
  }, [userEmail]);

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileFile(file);
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!userEmail) return alert("User email missing!");
    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("phoneno", formData.phonno);
      payload.append("class", formData.class);
      payload.append("position", formData.position);
      if (profileFile) payload.append("profileImage", profileFile);

      await axios.put(
        `http://localhost:5000/api/user/profile?email=${userEmail}`,
        payload,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Profile updated successfully!");
      setEditMode(false);
      setUser({
        ...user,
        ...formData,
        profileImage: profileFile ? profileFile.name : user.profileImage
      });
      setProfileFile(null);
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile.");
    }
  };

  if (loading) return <p className="text-center mt-5">Loading profile...</p>;
  if (!user) return <p className="text-center mt-5">No user found!</p>;

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <div
        style={{
          marginLeft: isSidebarOpen ? "15%" : "0",
          width: isSidebarOpen ? "85%" : "95%",
          padding: "20px",
          transition: "margin-left 0.3s, width 0.3s"
        }}
      >
        <div className="form-glass w-100" style={{ maxWidth: "600px" }}>
          <h2 className="text-center mb-4 text-gradient">👤 User Profile</h2>
          <div className="p-3 text-center">
            {/* Profile Image */}
            <div className="mb-3">
              <img
                src={profileImage || "https://via.placeholder.com/150"}
                alt="Profile"
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  objectFit: "cover"
                }}
              />
            </div>

            {editMode && (
              <div className="mb-3">
                <input type="file" accept="image/*" onChange={handleImageChange} />
              </div>
            )}

            {/* Editable fields */}
            <p>
              <strong>Full Name:</strong>{" "}
              {editMode ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              ) : (
                user.name
              )}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong>{" "}
              {editMode ? (
                <input
                  type="text"
                  name="phonno"
                  value={formData.phonno}
                  onChange={handleInputChange}
                />
              ) : (
                user.phonno
              )}
            </p>

            {user.PRN && (
              <>
                <p>
                  <strong>PRN:</strong> {user.PRN}
                </p>
                <p>
                  <strong>Class:</strong>{" "}
                  {editMode ? (
                    <input
                      type="text"
                      name="class"
                      value={formData.class}
                      onChange={handleInputChange}
                    />
                  ) : (
                    user.class
                  )}
                </p>
              </>
            )}

            {user.staffid && (
              <>
                <p>
                  <strong>Staff ID:</strong> {user.staffid}
                </p>
                <p>
                  <strong>Position:</strong>{" "}
                  {editMode ? (
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                    />
                  ) : (
                    user.position
                  )}
                </p>
              </>
            )}

            {/* Buttons */}
            <div className="mt-3">
              {editMode ? (
                <>
                  <button className="btn btn-success me-2" onClick={handleSave}>
                    Save
                  </button>
                  <button className="btn btn-secondary" onClick={() => setEditMode(false)}>
                    Cancel
                  </button>
                </>
              ) : (
                <button className="btn btn-primary" onClick={() => setEditMode(true)}>
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
