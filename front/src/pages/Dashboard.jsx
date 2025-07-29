import React from 'react';
import '../assets/CSS/dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // 💡 REQUIRED for dropdowns, modals, etc.





const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ height: '100px',backgroundColor: '#005ef5ff' }}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
  <img 
    src="https://www.creativefabrica.com/wp-content/uploads/2020/09/17/Book-Logo-Graphics-5535886-1.jpg" 
    alt="Book Logo" 
    width="90px" 
    height="80px" 
    className="d-inline-block align-text-top"
  />
</a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarNav"
        style={{display:'flex',justifyContent:"space-between","alignItems":"center",gap:"50%"}} >
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0" style={{ fontSize: '18px' }}>
  <li className="nav-item">
    <a className="nav-link active" href="#">Home</a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="#">About</a>
  </li>

  {/* Registration Dropdown */}
  <li className="nav-item dropdown">
    <a
      className="nav-link dropdown-toggle"
      href="#"
      id="registrationDropdown"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      Registration
    </a>
    <ul className="dropdown-menu" aria-labelledby="registrationDropdown">
      <li><a className="dropdown-item" href="#">Student Registration</a></li>
      <li><a className="dropdown-item" href="#">Staff Registration</a></li>
      <li><a className="dropdown-item" href="#">Admin Registration</a></li>
    </ul>
  </li>

  <li className="nav-item">
    <a className="nav-link" href="#">Search Book</a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="#">Contact Us</a>
  </li>
</ul>


            
            <div className='button-group m-5'style={{display:"flex",gap:"20px"}}>
             <button 
             style={{margin:"10px",backgroundColor:"red",color:"white",padding:"5px",borderRadius:"5px",width:"90px",height:"40px"}}>Sign In</button>
             <button 
            style={{margin:"10px",backgroundColor:"yellow",color:"black",padding:"5px",borderRadius:"5px",width:"90px",height:"40px"}}>Sign Up</button>
            </div>
          </div>
        </div>
      
    </nav>
  );
}


export default Navbar;
