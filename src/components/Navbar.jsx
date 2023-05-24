import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import companyLogo from '../img/company-logo.png';
import Cookies from 'js-cookie';
import axios from 'axios';

const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_PRODUCTION_API}/users/me`, { withCredentials: true });
        setIsLoggedIn(true);
        setIsAdmin(response.data.isAdmin);
      } catch (error) {
        console.log(error);
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    };

    fetchUserData();
  }, [isLoggedIn]);

  

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
        {isLoggedIn ? (
          <>
            {isAdmin ? (
              <>
                <Link to="/profile">Profile</Link>
                <Link to="/work">Work</Link>
                <Link to="/admin">Admin</Link>
              </>
            ) : (
              <Link to="/profile">Profile</Link>
            )}
            <Link to="/logout">Logout</Link>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  </nav>
  );
};

export default Navbar;
