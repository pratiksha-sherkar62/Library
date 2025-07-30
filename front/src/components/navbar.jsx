// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../assets/CSS/dashboard.css';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ height: '100px', backgroundColor: '#005ef5ff' }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">
          <img
            src="https://www.creativefabrica.com/wp-content/uploads/2020/09/17/Book-Logo-Graphics-5535886-1.jpg"
            alt="Book Logo"
            width="90px"
            height="80px"
            className="d-inline-block align-text-top"
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ fontSize: '18px' }}>
            <li className="nav-item" style={{ color: "white", fontSize: "40px" }}>
              Dashboard
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/add-book">Add Book</Link>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="registrationDropdown"
                role="button"
                data-bs-toggle="dropdown"
              >
                Registration
              </a>
              <ul className="dropdown-menu" aria-labelledby="registrationDropdown">
                <li><a className="dropdown-item" href="#">Student Registration</a></li>
                <li><a className="dropdown-item" href="#">Staff Registration</a></li>
              </ul>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/books">Book List</Link>
            </li>
          </ul>

          <div className="d-lg-flex align-items-center gap-2 ms-auto text-center w-100 justify-content-lg-end">
            <button>
              Log Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
