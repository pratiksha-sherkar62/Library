import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from "react-icons/fa";
import '../assets/CSS/sidebar.css';
import {
  FaHome,
  FaUser,
  FaSearch,
  FaHeart,
  FaBook,
  FaUndo,
  FaBell,
  FaSignOutAlt
} from 'react-icons/fa';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/userhome', label: 'Home', icon: <FaHome /> },
    { path: '/Profile', label: 'My Profile', icon: <FaUser /> },
    { path: '/search', label: 'Search Books', icon: <FaSearch /> },
    { path: '/favorites', label: 'Favorites', icon: <FaHeart /> },
    { path: '/book-issue', label: 'Book Issue', icon: <FaBook /> },
    { path: '/book-return', label: 'Book Return', icon: <FaUndo /> },
    { path: '/notifications', label: 'Notification', icon: <FaBell /> },
    { path: '/', label: 'Logout', icon: <FaSignOutAlt />, danger: true },
  ];

  return (
    <div className={`sidebar bg-light p-3 ${isOpen ? 'open' : 'closed'}`}>
      <button className="btn btn-primary mb-3 w-100" onClick={toggleSidebar}>
        {isOpen ? <h4 className="text-primary">📚 Library</h4> : <FaBars size={20} />}
      </button>

      {/* {isOpen && <h4 className="text-primary">📚 Library</h4>} */}

      <ul className="nav nav-pills flex-column mb-auto mt-4">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link
              to={item.path}
              className={`nav-link d-flex align-items-center 
                ${item.danger ? 'text-danger' : ''} 
                ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="me-2">{item.icon}</span>
              {isOpen && item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
