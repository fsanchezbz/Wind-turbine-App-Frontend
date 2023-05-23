import './rightbar.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      <br />
        <center><h4 className="rightbarTitle">User information</h4></center>
        <div className="rightbarWrapper">
           {/* <div className="card-deck row row-cols-1 row-cols-md-3"></div> */}
          <div className="card-deck row row-cols-1 row-cols-md-3">
            {users.map((user) => (
              <div key={user.id} >
                <div className="card" style={{ width: '10rem' }}>
                  <img src={user.profileImage} className="card-img-top" alt="" />
                  <div className="card-body">
                    <h5 className="card-title">{`${user.firstName} ${user.lastName}`}</h5>
                    {user.isAdmin && <span>Admin: Manager</span>}
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
}

export default Rightbar;
