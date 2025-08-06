import React from "react";
import ReactDom from "react-dom";
import { Link, useNavigate } from 'react-router-dom';

export default class  Home extends React.Component{

    render() {
        return (
        <>
        <div className="home-container d-flex justify-content-center align-items-center vh-20" style={{backgroundColor: '#005ef5ff', padding: '20px'}}>
            
            
             <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ fontSize: '18px',alignItems: 'center'}}>
            
            
                        
                        <li className="nav-item">
              <Link
                className="nav-link text-white"
                to="/library"
                style={{
                  whiteSpace: 'nowrap',
                  fontSize: '20px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <img
                  src="/book.png"
                  alt="Book Logo"
                  width="40"
                  height="40"
                  style={{ objectFit: 'contain' }}
                />
                My Library
              </Link>
            </li>
            
            </ul>
             
            </div>
        </>
        );
    }
 
}