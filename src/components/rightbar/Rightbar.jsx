import './rightbar.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Rightbar = () => {
  const [users, setUsers] = useState([]);
  const [images, setImages] = useState([]);

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
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarWrapper">
          <div className="rightbarFollowings">
            {users.map((user) => (
              <div className="card" style={{ width: '18rem' }} key={user.id}>
                <img src={user.profileImage} className="card-img-top" alt="" />
                <div className="card-body">
                  <h5 className="card-title">{`${user.firstName} ${user.lastName}`}</h5>
                  {user.isAdmin && <span>Admin</span>}
                  
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
}

export default Rightbar;
