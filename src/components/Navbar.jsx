import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import companyLogo from '../img/company-logo.png';

const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  // Fetch the admin authentication state from the backend
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await fetch('/api/check-admin-status');
        if (response.ok) {
          const data = await response.json();
          setIsAdmin(data.isAdmin);
        } else {
          // Handle error when fetching admin status
          console.error('Failed to fetch admin status');
        }
      } catch (error) {
        // Handle error when fetching admin status
        console.error('Failed to fetch admin status', error);
      }
    };
  
    checkAdminStatus();
  }, []);
  

  const handleLogout = () => {
    // Handle logout logic here
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/">
            <div className="logo-container">
              <img src={companyLogo} alt="Company Logo" className="logo" />
              <span className="company-name">PJ TurbinePro GmbH</span>
            </div>
          </Link>
        </div>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          {isAdmin && (
            <>
              <Link to="/profile">Profile</Link>
              <Link to="/work">Work From</Link>
            </>
          )}
          <Link to="/login">Login</Link>
          <Link to="/admin">Admin Login</Link>
          {/* Add more navigation links as needed */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
