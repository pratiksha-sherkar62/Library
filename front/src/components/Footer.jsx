import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer className="text-white text-center py-3 mt-auto" style={{backgroundColor:'#005ef5ff'}}>
      <div className="container">
        <p className="mb-1">📚 My Library</p>
        <p className="mb-1">&copy; {new Date().getFullYear()} All rights reserved.</p>
        
      </div>
    </footer>
  );
};

export default Footer;
