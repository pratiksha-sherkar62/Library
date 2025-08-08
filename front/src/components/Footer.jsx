import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/CSS/Footer.css'; // Add the new CSS

const Footer = () => {
  return (
    <footer className="footer-glow text-white text-center py-3 mt-auto">
      <div className="container">
        <p className="mb-1 fs-5">📚 My Library</p>
        <p className="mb-0">&copy; {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
