import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import '../styles/LogoutPage.css'; 
import videoBg from '../assets/rain.mp4'
import { FaRegSmile} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function LogoutPage() {
  const [authenticated, setAuthenticated] = useState(true); // Set initial value to true for testing
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  // const [images, setImages] = useState([]);
  const [userStatus, setUserStatus] = useState(true);

  
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
      updateUserStatus(response.data._id); // Update user status on the backend
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserStatus = async (userId) => {
    console.log("userId:", userId); // Check the value of userId
    try {
      const response = await axios.put(
        `https://wind-turbine-app-backend.onrender.com/users/update/${userId}`,
        { status: userStatus  },
        { withCredentials: true }
      );
      console.log(response.data); // Optional: Log the response from the server
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

      const { _id } = response.data;
      updateUserStatus(_id);
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
        <h1>Thank you for coming, now get to work  <FaRegSmile/></h1>
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
