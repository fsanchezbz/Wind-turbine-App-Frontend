import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Navbar.css';
import companyLogo from '../../img/company-logo.png';
import Cookies from 'js-cookie';
import axios from 'axios';
import LanguageSwitcher from '../Language/LanguageSwitcher';

const Navbar = () => {
  const { t } = useTranslation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_PRODUCTION_API}/users/me`, { withCredentials: true });
        const { _id, status, isAdmin } = response.data;

        setIsAdmin(isAdmin);
        setIsLoggedIn(status);
      } catch (error) {
        console.log(error);
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
          <Link to="/">{t('navbar.home')}</Link>
          <Link to="/about">{t('navbar.about')}</Link>
          <Link to="/contact">{t('navbar.contact')}</Link>
          {isLoggedIn ? (
            <>
              {isAdmin ? (
                <>
                  <Link to="/profile">{t('navbar.profile')}</Link>
                  <Link to="/work">{t('navbar.work')}</Link>
                  <Link to="/admin">{t('navbar.admin')}</Link>
                </>
              ) : (
                <Link to="/profile">{t('navbar.profile')}</Link>
              )}
              <Link to="/logout">{t('navbar.logout')}</Link>
            </>
          ) : (
            <Link to="/login">{t('navbar.login')}</Link>
          )}
          <LanguageSwitcher className="language-switcher " />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
