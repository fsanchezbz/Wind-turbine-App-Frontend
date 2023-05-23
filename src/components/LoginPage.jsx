import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';
import videoBg from '../assets/rain.mp4';
import axios from 'axios';

const LoginPage = () => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://wind-turbine-app-backend.onrender.com/users/login",
        {
          userName,
          password,
          email
        },
        { withCredentials: true }
      );

      const { isAdmin, status } = response.data;

      if (isAdmin) {
        setIsLoggedIn(true);
        setIsAdmin(true);
        updateStatus(status); // Update user status on login
        navigate('/profile');
      } else {
        setIsLoggedIn(true);
        setIsAdmin(false);
        updateStatus(status); // Update user status on login
        navigate('/profile');
      }
    } catch (error) {
      console.log(error);
      setError("Invalid username or password");
    }
  };

  const updateStatus = async (status) => {
    try {
      const response = await axios.put(
        `https://wind-turbine-app-backend.onrender.com/users/update/${userId}`, 
        { status },
        { withCredentials: true }
      );
      console.log(response.data); // Optional: Log the response from the server
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin();
  };

  return (
    <div className="login-page">
      <video className="login-video" src={videoBg} autoPlay loop muted />
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        {isLoggedIn ? (
          <p>You are logged in.</p>
        ) : (
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
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="login-button">Login</button>
          </form>
        )}
        {error && <p className="error-message">{error}</p>}
        <div className="signup-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
