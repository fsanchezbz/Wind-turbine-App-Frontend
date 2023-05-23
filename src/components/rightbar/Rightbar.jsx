import './rightbar.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Rightbar = (profile) => {
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


  const HomeRightbar = () => {
    return (
        <>
            
            <img className='rignhtbarAd' src="" alt="" />
            <h4 className="rightbarTitle">Online Friends</h4>
            <ul className="rightbarfriendList">
                {Users.map(u => (
                    <Online key={u.id} user={u} />
                ))}

            </ul>
        </>
    )
}

  const ProfileRightbar = () => {
    return (
      <>
      <br />
        <center><h4 className="rightbarTitle">User information</h4></center>
        <div className="rightbarWrapper">
          <div className="card-deck row row-cols-1 row-cols-md-3">
              {users.map((user) => (
                <div key={user.id} className="col mb-3 card h-100"style={{ width: '12rem' }}> 
                  <div>
                    <br />
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
      {profile ? <ProfileRightbar /> : <HomeRightbar/> }
    </div>
  );
}

export default Rightbar;
