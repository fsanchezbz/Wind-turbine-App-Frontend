import React, { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import '../styles/LogoutPage.css'; 
import videoBg from '../assets/rain.mp4'
import { FaRegSmileThank } from 'react-icons/fa';

function LogoutPage() {
  const [authenticated, setAuthenticated] = useState(true); // Set initial value to true for testing
  

  const handleLogout = async () => {
    await axios
      .post("https://wind-turbine-app-backend.onrender.com/users/logout", null, {
        withCredentials: true,
      })
      .then((res) => {
        console.log('logged out');
      })
      .catch((error) => {
        console.log(error);
      });
    setAuthenticated(false);
    Cookies.remove('token');
    navigate('/');
  };

  return (
    <div className="logout-page">
      <div className="video-container">
      <video src={videoBg} autoPlay loop muted /> 
      </div>
      <div className="logout-content text-overlay">
        <h1>you for coming, now get to work  <FaRegSmileThank/></h1>
        {authenticated && (
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default LogoutPage;
