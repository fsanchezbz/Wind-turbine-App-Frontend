import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutPage() {
  const [authenticated, setAuthenticated] = useState(true); // Set initial value to true for testing
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove user authentication
    setAuthenticated(false);
    // Redirect to login page
    navigate('/');
  };

  return (
    <div>
      {authenticated && (
        <button onClick={handleLogout}>Logout</button>
      )}
    </div>
  );
}

export default LogoutPage;
