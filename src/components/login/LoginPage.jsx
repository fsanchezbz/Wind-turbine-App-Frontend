import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './LoginPage.css';
import videoBg from '../../assets/rain.mp4';

const LoginPage = () => {
  const { t } = useTranslation();
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_PRODUCTION_API}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName,
          password,
          email,
        }),
        credentials: 'include', // Include cookies in the request
      });

      if (response.ok) {
        await setUserStatus();
        navigate('/profile');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.log(error);
      setError(t('loginPage.invalidCredentials'));
    }
  };

  const setUserStatus = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_PRODUCTION_API}/users/me`, {
        method: 'GET',
        credentials: 'include', // Include cookies in the request
      });
      const { _id } = await response.json();

      await updateUserStatus(_id); // Update the user's status to true
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserStatus = async (userId) => {
    try {
      await fetch(`${import.meta.env.VITE_PRODUCTION_API}/users/update/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: true }),
        credentials: 'include', // Include cookies in the request
      });
      console.log('User status updated successfully');
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
