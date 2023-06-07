import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './LoginPage.css';
import videoBg from '../../assets/rain.mp4';
import axios from 'axios';

const LoginPage = () => {
  const { t } = useTranslation();
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_PRODUCTION_API}/users/login`,
        {
          userName,
          password,
          email
        },
        { withCredentials: true }
      );
      await  setUserStatus();
      navigate('/profile');
    } catch (error) {
      console.log(error);
      setError(t('loginPage.invalidCredentials'));
    }
  };

  const setUserStatus = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_PRODUCTION_API}/users/me`, { withCredentials: true, });
      const { _id, status, isAdmin, isLoggedIn } = response.data;

      console.log(_id);
      console.log(status);
      console.log(isAdmin);
      console.log(isLoggedIn);

      await  updateUserStatus(_id);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserStatus = async (userId) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_PRODUCTION_API}/users/update/${userId}`,
        { status: true },
        { withCredentials: true }
      );
      console.log('Inside updateUserStatus', response.data.status);
    } catch (error) {
      console.log(error);
    }
  };

  const refreshPage = () => {
    setTimeout(() => {
      window.location.reload(true);
    }, 1500);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin();
    refreshPage();
  };

  return (
    <>
      <div className="login-page">
        <video className="login-video" src={videoBg} autoPlay loop muted />
        <div className="login-container">
          <h2 className="login-title">{t('loginPage.title')}</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">{t('loginPage.emailLabel')}</label>
              <input
                type="text"
                id="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="username" className="form-label">{t('loginPage.usernameLabel')}</label>
              <input
                type="text"
                id="username"
                className="form-input"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">{t('loginPage.passwordLabel')}</label>
              <input
                type="password"
                id="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="login-button">{t('loginPage.loginButton')}</button>
          </form>
          {error && <p className="error-message">{error}</p>}
          <div className="signup-link">
            {t('loginPage.signupText')} <Link to="/signup">{t('loginPage.signupLink')}</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
