import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaTiktok, FaLinkedin } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

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
        <div className="footer-section"></div>
        <div className="footer-vertical-line"></div>
        <div className="footer-horizontal-line"></div>
        <div className="footer-copyright">
          <p>&copy;{t('footer.copyright')}</p>
        </div>
        <div className="footer-vertical-line"></div>
        <div className="footer-cookiepolicy">
          <Link to="/cookiepolicy">{t('footer.cookiePolicy')}</Link>
          <br />
          <Link to="/about">{t('navbar.about')}</Link>
        </div>
       </div>
    </footer>
  );
};

export default Footer;
