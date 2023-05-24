import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import '../styles/LogoutPage.css'; 
import videoBg from '../assets/rain.mp4'
import { FaRegSmile} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function LogoutPage() {
  const [authenticated, setAuthenticated] = useState(true);
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_PRODUCTION_API}/users/me`, { withCredentials: true });
        setUserId(response.data._id);     
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);

  const updateUserStatus = async (userId) => {
    try {
      
      const response = await axios.put(
        `${import.meta.env.VITE_PRODUCTION_API}/users/update/${userId}`,
        { status: 'false' },
        { withCredentials: true }
      );
      console.log('Inside the UpdataUserStatus',response.data.status)
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      console.log('handleLogout:', userId);
      await updateUserStatus(userId);
      
      const response = await axios.post(`${import.meta.env.VITE_PRODUCTION_API}/users/logout`, null, {
        withCredentials: true,
      });
      console.log('Inside the handleLogout',response.data.status)
      setAuthenticated(false);
      Cookies.remove('token');
      navigate('/');
      console.log('logged out');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="logout-page">
      <div className="video-container">
        <video src={videoBg} autoPlay loop muted />
      </div>
      <div className="logout-content text-overlay">
        <h1>Thank you for coming, now get to work <FaRegSmile/></h1>
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
