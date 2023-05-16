import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import companyLogo from '../img/company-logo.png';
import axios from 'axios';

const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5005/users/all');
        const users = response.data;
        const currentUser = users.find((user) => user.email === 'YOUR_CURRENT_USER_EMAIL'); // Replace with the current user's email

        if (currentUser) {
          setIsAdmin(currentUser.isAdmin);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Failed to fetch users', error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
   
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
          {isLoggedIn && <Link to="/profile">Profile</Link>}
          {isAdmin && isLoggedIn && <Link to="/work">Work From</Link>}
          {isLoggedIn ? (
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              {isAdmin && <Link to="/admin">Admin Login</Link>}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
