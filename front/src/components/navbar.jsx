// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBookOpen } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../assets/CSS/dashboard.css';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ height: '100px', backgroundColor: '#2e405bff',padding: '20px' }}>
      
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ fontSize: '18px',alignItems: 'center'}}>


            
            <li className="nav-item">
  <Link
    className="nav-link text-white shiny-text d-flex align-items-center"
    to="/library"
    style={{
      whiteSpace: 'nowrap',
      fontSize: '20px',
      gap: '10px',
    }}
  >
    <div className="d-flex align-items-center">
    <img
      src="/rocket-book.png"
      alt="Book Logo"
      width="40"
      height="40"
      style={{ objectFit: "contain", marginRight: "10px" }}
    />
    <h3 style={{ color: "white", fontWeight: "bold", margin: 0 ,font:"arial"}}>
     TechyLab
    </h3>
  </div>

  </Link>
</li>


              <li className="nav-item ms-5"> <Link className="nav-link" to="/Dashboard" style={{ whiteSpace: 'nowrap', fontSize: '18px' }}> DashBoard </Link></li>
            <li className="nav-item ms-5"> <Link className="nav-link" to="/add-book" style={{ whiteSpace: 'nowrap', fontSize: '18px' }}> Add Book </Link></li>

            {/* <li className="nav-item dropdown">
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
                <li><a className="dropdown-item" href="/staffreg">Staff Registration</a></li>
                 <li><a className="dropdown-item" href="/studentreg">Student Registration</a></li>
              </ul>
            </li> */}

            <li className="nav-item">
  <Link
    className="nav-link"
    to="/books"
    style={{ whiteSpace: 'nowrap', fontSize: '18px' }}
  >
    Book List
  </Link>
</li>
            <li className="nav-item">
            <Link
              className="nav-link"
              to="/Members"
              style={{ whiteSpace: 'nowrap', fontSize: '18px' }}
            >
             Member List
            </Link>
            </li>

      </ul>    

          <button
  className="btn btn-outline-light mr-2"
  onClick={() => {
    // Add logout logic here
    navigate('/');
  }}
>
  Log Out
</button>

          
        </div>
    
    </nav>
  );
};

export default Navbar;
