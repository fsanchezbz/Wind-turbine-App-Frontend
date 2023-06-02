import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaTiktok, FaLinkedin } from 'react-icons/fa';
import { BsFillSunFill, BsMoon } from 'react-icons/bs';
import useDarkMode from '../hooks/useDarkMode';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-bottom">
          <div className="social-icons">
            <a href="https://www.facebook.com/"><FaFacebook /></a>
            <a href="https://www.instagram.com/"><FaTwitter /></a>
            <a href="https://twitter.com"><FaInstagram /></a>
            <a href="https://www.youtube.com/"><FaYoutube /></a>
            <a href="https://www.tiktok.com/"><FaTiktok /></a>
            <a href="https://www.linkedin.com/"><FaLinkedin /></a>
          </div>
        <div className="footer-section">
          
        </div>
        <div className="footer-vertical-line"></div>
        <div className="footer-horizontal-line"></div>
        <div className="footer-copyright">
          <p>&copy; 2023 PJ TurbinePro GmbH. All rights reserved.</p>
        </div>
        <div className="footer-vertical-line"></div>
        <div className="footer-cookiepolicy">
          
          <Link to="/cookiepolicy">Cookie policy</Link>

        </div>
          {/* <button
          type='button'
          onClick={toggleMode}
          className='DarkMode'
          >
          {mode === 'dark' ? <BsFillSunFill /> : <BsMoon />}
          </button> */}
      </div>
    </footer>
  );
};

export default Footer;
