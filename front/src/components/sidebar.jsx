import React from 'react';
import  '../assets/CSS/sidebar.css';// Custom styles

const Sidebar = () => {
  return (
    <div className="sidebar d-flex flex-column p-3 bg-light">
      <h4 className="text-primary">📚 Library</h4>
      <ul className="nav nav-pills flex-column mb-auto mt-4">
        <li className="nav-item">
          <a href="/dashboard" className="nav-link active">Dashboard</a>
        </li>
        <li>
          <a href="/books" className="nav-link">Book List</a>
        </li>
        <li>
          <a href="/members" className="nav-link">Member List</a>
        </li>
        <li>
          <a href="/profile" className="nav-link">My Profile</a>
        </li>
        <li>
          <a href="/logout" className="nav-link text-danger">Logout</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
