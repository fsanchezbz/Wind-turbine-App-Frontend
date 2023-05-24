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
  const [users, setUsers] = useState([]);
  const [userStatus, setUserStatus] = useState('');
  const [userId, setUserId] = useState(null); // Add a new state variable to store the user ID

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("https://wind-turbine-app-backend.onrender.com/users/all", { withCredentials: true });
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);

  const getUserStatus = async () => {
    try {
      const response = await axios.get("https://wind-turbine-app-backend.onrender.com/users/me", { withCredentials: true });
      setUserStatus(response.data.status);
      setUserId(response.data._id); // Store the user ID in the state
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserStatus = async () => {
    try {
      const response = await axios.put(
        `https://wind-turbine-app-backend.onrender.com/users/update/${userId}`,
        { status: false },
        { withCredentials: true }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (users.length > 0) {
      getUserStatus();
    }
  }, [users]);

  const handleLogout = async () => {
    try {
      const response = await axios.post("https://wind-turbine-app-backend.onrender.com/users/logout", null, {
        withCredentials: true,
      });

      await updateUserStatus(); // Call updateUserStatus without the userId parameter
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

