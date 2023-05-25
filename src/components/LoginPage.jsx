import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';
import videoBg from '../assets/rain.mp4';
import axios from 'axios';
import Navbar from './Navbar';
import '../index.css';

const LoginPage = () => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState('');

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
      setUserStatus();
      navigate('/profile');
     
    } catch (error) {
      console.log(error);
      setError('Invalid username or password');
    }

  };

  const setUserStatus = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_PRODUCTION_API}/users/me`, { withCredentials: true });
      const { _id, status, isAdmin, isLoggedIn } = response.data;
      
      // Check the status, isAdmin, and isLoggedIn values
      console.log(_id);
      console.log(status); 
      console.log(isAdmin);
      console.log(isLoggedIn);
  
      updateUserStatus(_id);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserStatus = async (userId) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_PRODUCTION_API}/users/update/${userId}`,
        { status: true, isLoggedIn: true },
        { withCredentials: true }
        
      );
  
      console.log('Inside updateUserStatus', response.data.isLoggedIn)
      console.log(setIsLoggedIn(response.data.isLoggedIn));
    } catch (error) {
      console.log(error);
    }
  };

  const refreshPage = () => {
    setTimeout(() => {
      window.location.reload(true);
    }, 1000); // 2000 milliseconds delay (adjust the duration as needed)
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
        <h2 className="login-title">Login</h2>        
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="text"
                id="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                id="username"
                className="form-input"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label  htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                className="form-input"
                value={password}
                color='black'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="login-button">Login</button>
          </form>
        {error && <p className="error-message">{error}</p>}
        <div className="signup-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
    </>
    
  );
};

export default LoginPage;
