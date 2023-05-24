import './rightbar.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Rightbar = () => {
  const [users, setUsers] = useState([]);
  // const [images, setImages] = useState([]);
  const [userStatus, setUserStatus] = useState('');

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
    try {
      const response = await axios.put(
        `https://wind-turbine-app-backend.onrender.com/users/update/${userId}`,
        { status: true },
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

  // useEffect(() => {
  //   const fetchImages = async () => {
  //     try {
  //       const response = await axios.get('https:///wind-turbine-app-backend.onrender.com/api/images');
  //       setImages(response.data);
  //     } catch (error) {
  //       console.error('Error fetching images:', error);
  //     }
  //   };

  //   fetchImages();
  // }, []);

  const ProfileRightbar = () => {
    return (
      <>
        <br />
        <center><h4 className="rightbarTitle">User information</h4></center>
        <div className="rightbarWrapper">
          <div className="card-deck row row-cols-1 row-cols-md-3">
            {users.map((user) => (
              <div key={user.id} className="col mb-3" style={{ width: '12rem' }}>
                <div className={`card h-100 ${user.status === userStatus ?  'active-user' : 'inactive-user'}`}>
                  <div className={`indicator ${user.status === userStatus ? 'active-indicator' : 'inactive-indicator'}`}></div>
                  <div>
                    {user.status === userStatus && <span className="online-text"> USER ONLINE</span>}
                    <br />
                    <img src={user.profileImage} className="card-img-top" alt="" />
                    <div className="card-body">
                      <h5 className="card-title">{`${user.firstName} ${user.lastName}`}</h5>
                      {user.isAdmin && <span>Admin: Manager</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className='rightbar'>
      <ProfileRightbar />
    </div>
  );
};

export default Rightbar;
