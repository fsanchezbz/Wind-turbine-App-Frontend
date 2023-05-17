import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';


function LogoutPage() {
  const [authenticated, setAuthenticated] = useState(true); // Set initial value to true for testing
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   // Remove user authentication
  //   setAuthenticated(false);
  //   // Remove the cookie
  //   Cookies.remove('loggedIn');
  //   // Redirect to login page
  //   navigate('/');
  // };

  const handleLogout = async () => {
    await axios.post("https://wind-turbine-app-backend.onrender.com/users/logout", null, {
      withCredentials: true,
    }).then((res)=> {
        console.log('logged out')
        
      }).catch ((error) => {
        console.log(error);
      }) 
      setAuthenticated(false);
      Cookies.remove('token');
      navigate('/');
    }

  return (
    <div>
      {authenticated && (
        <button onClick={handleLogout}>Logout</button>
      )}
    </div>
  );
}

export default LogoutPage;
