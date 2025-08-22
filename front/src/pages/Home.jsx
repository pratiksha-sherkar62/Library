import React from "react";
import { Link } from "react-router-dom";
import "../assets/CSS/home.css"; // Custom styling

const Home = () => {
  return (
    <div>
      {/* Top Navbar */}
      <nav
  className="d-flex justify-content-between align-items-center px-4 py-3"
  style={{ backgroundColor: "#f8f9fa" }}
>
  {/* Logo + Title together */}
  <div className="d-flex align-items-center">
    <img
      src="/rocket-book.png"
      alt="Book Logo"
      width="40"
      height="40"
      style={{ objectFit: "contain", marginRight: "10px" }}
    />
    <h3 style={{ color: "#123a71ff", fontWeight: "bold", margin: 0 ,font:"arial"}}>
     TechyLab
    </h3>
  </div>

  {/* Buttons */}
  <div>
    <Link to="/Userlog" className="btn btn-outline-primary me-2">
      Student Login
    </Link>
    <Link to="/login" className="btn btn-outline-dark">
      Admin Login
    </Link>
  </div>
</nav>

      {/* Hero Section */}
      <div className="container my-5">
        <div className="row align-items-center">
          {/* Left Text */}
          <div className="col-md-6 text-start">
            <h1>Welcome to <span style={{ color: "#0056d2" }}>TechyLab</span></h1>
            <p className="mt-3">
             TechyLab brings efficiency to library management. Simplify book tracking, streamline student access, and ensure smooth operations for administrators.
            </p>
            <Link to="/Userlog" className="btn btn-primary btn-lg mt-3">Get Started</Link>
          </div>

          {/* Right Image */}
          <div className="col-md-6 text-center mt-4 mt-md-0">
            <img 
              src="/images/abc.jpg" 
              alt="Library Illustration" 
              className="img-fluid rounded"
              style={{ maxHeight: "300px",width:"500px" }}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-white py-4" style={{ backgroundColor: "#0d1b2a" }}>
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-start">
          
          {/* Brand */}
         
<div className="mb-3">
  <div className="d-flex align-items-center mb-2">
    <img 
      src="/rocket-book.png"
      alt="TechyLab Logo" 
      width="30" 
      height="30" 
      style={{ marginRight: "8px", objectFit: "contain" }}
    />
    <h5 style={{ margin: 0 }}>TechyLab</h5>
  </div>
  <p style={{ margin: 0, fontStyle: "italic", fontSize: "14px" }}>
    Where Books Meet Technology
  </p>
</div>



          {/* Quick Links */}
          <div className="mb-3">
            <h6>Quick Links</h6>
            <ul className="list-unstyled">
              {/* <li><Link to="/" className="footer-link">Home</Link></li> */}
              <li><Link to="/Userlog" className="footer-link">Student Login</Link></li>
              <li><Link to="/login" className="footer-link">Admin Login</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h6>Contact Us</h6>
            <p>Email: support@TechyLab.com</p>
            <p>Phone: +91 8530653832</p>
          </div>
        </div>
        <div className="text-center mt-3">
          <small>© 2025 TechyLab. All rights reserved.</small>
        </div>
      </footer>
    </div>
  );
};

export default Home;