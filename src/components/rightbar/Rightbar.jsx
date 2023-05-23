import './rightbar.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Rightbar = () => {
  const [users, setUsers] = useState([]);
  const [images, setImages] = useState([]);
  const [userOnline, setUserOnline] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://wind-turbine-app-backend.onrender.com/users/me", { withCredentials: true });
        setUserOnline(response.data._id);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('https:///wind-turbine-app-backend.onrender.com/api/images');
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

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

  const ProfileRightbar = () => {
    return (
      <>
        <br />
        <center><h4 className="rightbarTitle">User information</h4></center>
        <div className="rightbarWrapper">
          <div className="card-deck row row-cols-1 row-cols-md-3">
            {users.map((user) => (
              <div key={user.id} className="col mb-3" style={{ width: '12rem' }}>
                <div className={`card h-100 ${user._id === userOnline ? 'active-user' : ''}`}>
                  {user._id === userOnline && <div className="active-indicator">Online</div>}
                  <div>
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
