import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AdminLogin.css';
import adminVideoBg from '../assets/rain.mp4';

const AdminLogin = () => {
  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5005/users/admin/login', {
        userName,
        email,
        password,
      });
  
      // Check if the user is an admin based on the response
      const isAdmin = response.data.isAdmin;
  
      if (isAdmin) {
        // User is an admin, handle the authentication and redirect to the admin dashboard
        // Set the admin authentication state or perform any necessary actions
      } else {
        setError('Access denied. You are not an admin.');
      }
    } catch (error) {
      setError('Invalid username or password');
    }
  };
  

  return (
    <div className="admin-login-container">
      <video className="admin-login-video" src={adminVideoBg} autoPlay loop muted />
      <div className="admin-login-content">
        <h2 className="admin-login-title">Admin Login</h2>
        <form className="admin-login-form" onSubmit={handleSubmit}>
          <div className="admin-login-input-group">
            <label htmlFor="username" className="admin-login-label">
              Username:
            </label>
            <input
              type="text"
              id="username"
              className="admin-login-input"
              value={userName}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="admin-login-input-group">
            <label htmlFor="email" className="admin-login-label">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="admin-login-input"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="admin-login-input-group">
            <label htmlFor="password" className="admin-login-label">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="admin-login-input"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit" className="admin-login-button">
            Login
          </button>
          {error && <div className="admin-login-error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
