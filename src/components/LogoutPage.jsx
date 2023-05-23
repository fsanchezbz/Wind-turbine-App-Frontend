import React, { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import '../styles/LogoutPage.css'; 
import videoBg from '../assets/rain.mp4'
import { FaRegSmile} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function LogoutPage() {
  const [authenticated, setAuthenticated] = useState(true); // Set initial value to true for testing
  const navigate = useNavigate();

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


  
  // const handleFieldChange = async (userId, field, value) => {
  //   try {
  //     console.log(`Updating user ${userId} field ${field} to ${value}`);
  //     const response = await axios.put(`https://wind-turbine-app-backend.onrender.com/users/update/${userId}`, {
  //       [field]: value
  //     });
  //     console.log(`Updated user ${userId}:`, response.data);
  //     fetchUsers(); // Refresh the user list after the update
  //   } catch (error) {
  //     console.error(`Failed to update user ${field}`, error);
  //   }
  // };



  return (
    <div className="logout-page">
      <div className="video-container">
      <video src={videoBg} autoPlay loop muted /> 
      </div>
      <div className="logout-content text-overlay">
        <h1>you for coming, now get to work  <FaRegSmile/></h1>
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
