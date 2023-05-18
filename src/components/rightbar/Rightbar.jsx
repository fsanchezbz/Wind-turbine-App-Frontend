import './rightbar.css';
import Online from '../online/Online';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Rightbar = ({ profile }) => {
  const [users, setUsers] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('https://wind-turbine-app-backend-bgse.onrender.com/api/images');
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
        const response = await axios.get('https://wind-turbine-app-backend.onrender.com/users/all', {
          withCredentials: true
        });
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
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola foster</b> and <b>3 others</b> have a birthday today.
          </span>
        </div>
        <img className="rignhtbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarfriendList">
          {users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarFollowings">
          {users.map((user) => {
            const userImage = images.find((image) => image.public_id === user.profileImage);
            return (
              <div className="rightbarFollowing" key={user.id}>
                <img src={userImage ? userImage.secure_url : ''} alt="" className="rightbarFollowingImg" />
                <span className="rightbarFollowingname">{`${user.firstName} ${user.lastName}`}</span>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
};

export default Rightbar;
