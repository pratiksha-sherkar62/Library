import React from "react";
import Sidebar from "../components/sidebar";

const UserHome = () => {
  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar only once */}
      <Sidebar />

      {/* Main content */}
      <div style={{ flex: 1, padding: "20px" }}>
        <h1>Welcome to User Home</h1>
        <p>This is the main content area.</p>
      </div>
    </div>
  );
};

export default UserHome;
