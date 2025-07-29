// src/pages/Dashboard.jsx
import React from 'react';
import '../assets/CSS/Style.css'; // Adjust if you have separate CSS

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1>Welcome to the Dashboard</h1>
      <div className="dashboard-cards">
        <div className="card">
          <h2>Users</h2>
          <p>120</p>
        </div>
        <div className="card">
          <h2>Bookings</h2>
          <p>85</p>
        </div>
        <div className="card">
          <h2>Revenue</h2>
          <p>₹45,000</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
