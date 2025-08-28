import React from "react";
import { Link } from "react-router-dom";
import "../assets/CSS/home.css"; // Custom styling
import '@fortawesome/fontawesome-free/css/all.min.css';


const Home = () => {
  return (
    <div>
      {/* Top Navbar */}
      <nav
  className="d-flex justify-content-between align-items-center px-4 py-3"
  style={{ backgroundColor: "rgba(221, 224, 227, 1)" }}
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
    <h3 style={{ color: "#06306bff", fontWeight: "bold", margin: 0 ,font:"arial"}}>
     TechyLab
    </h3>
  </div>

  {/* Buttons */}
  <div>
    <Link to="/Userlog" className="btn btn-outline-primary me-2">
      User Login
    </Link>
    <Link to="/login" className="btn btn-outline-dark">
      Admin Login
    </Link>
  </div>
</nav>

      {/* Hero Section */}
      <div className="container my-5" style={{backgroundColor:'#eaeefef2', padding:'30px'}}>
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

     <div class="container my-5">
 <h2 class="text-center mb-4 fw-bold services-heading">
  Services
</h2>
  <div class="row g-4">

    <div class="col-md-3">
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front text-center">
            <i className="fa-solid fa-book-open" style={{ fontSize: "50px", color: "#0056d2" }}></i>
        <br></br>
           <h4 className="mt-7">Book Search</h4>
          </div>
          <div class="flip-card-back text-center">
            <p>Easily search and explore books by title, author, or category.</p>
          </div>
        </div>
      </div>
    </div>

  
    <div class="col-md-3">
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front text-center fa-3x mb-3">
            🔖 <h4 className="mt-7">Issue & Return</h4>
          </div>
          <div class="flip-card-back text-center">
            <p>Borrow and return books seamlessly with due date tracking.</p>
          </div>
        </div>
      </div>
    </div>


    <div class="col-md-3">
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front text-center fa-3x mb-3">
            👩‍🎓 <h4 className="mt-7">Students</h4>
          </div>
          <div class="flip-card-back text-center">
            <p>Manage student accounts, profiles, and borrowing history.</p>
          </div>
        </div>
      </div>
    </div>

   
    <div class="col-md-3">
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front text-center fa-3x mb-3">
            💻 <h4 className="mt-7">Book Request</h4>
          </div>
          <div class="flip-card-back text-center">
            <p>Request books online and get notified when available.</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>

{/* About Us Section */}
<div className="container my-5" style={{backgroundColor:'rgba(255, 255, 255, 0.98)', padding:'30px'}}>
  <h2 className="text-center mb-4 fw-bold" style={{ color: "#0056d2" }}>
    About Us
  </h2>
  <div className="row align-items-center">
    
    {/* Left Side Image */}
    <div className="col-md-6 text-center">
      <img 
        src="/images/books.jpg" 
        alt="About Library" 
        className="img-fluid rounded shadow"
        style={{ maxHeight: "300px", objectFit: "cover" }}
      />
    </div>

    {/* Right Side Text */}
    <div className="col-md-6 mt-4 mt-md-0">
      <p style={{ fontSize: "17px", lineHeight: "1.6" }}>
        Welcome to <b>TechyLab Library Management System</b> – a platform built 
        to make libraries smarter and more efficient. Our system simplifies book 
        tracking, enhances student engagement, and empowers administrators with 
        tools for smooth operations.
      </p>
      <p style={{ fontSize: "16px", lineHeight: "1.6" }}>
        From <b>book search</b> to <b>issue & return</b>, 
        <b>student management</b> to <b>online book requests</b>, 
        TechyLab ensures a seamless digital library experience.
      </p>
      <Link to="/Userlog" className="btn btn-primary btn-lg mt-3">
        Explore Library
      </Link>
    </div>
  </div>
</div>


      
      {/* Footer */}
      <footer className="text-white py-4" style={{ backgroundColor: "#0d1b2a",height:"auto" }}>
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-start">


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
            <i className="fa-solid fa-envelope"></i>Email: support@TechyLab.com<br></br>
            <i className="fa-solid fa-phone"></i>Phone: +91 8530653832
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