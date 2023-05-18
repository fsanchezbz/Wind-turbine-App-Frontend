import './rightbar.css';
import Online from '../online/Online';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
const cloudinary = require('cloudinary').v2;

export default function Rightbar({ profile }) {
  const [users, setUsers] = useState([]);
  const [images, setImages] = useState([]);

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

  useEffect(() => {
    cloudinary.config({
      cloud_name: 'windturbineprofile',
      api_key: '984657238132575',
      api_secret: 'eTqJxyGsO4-6ZGXTYwF7Wc8KcW8'
    });

    cloudinary.api.resources({ type: 'upload' })
      .then((result) => {
        const images = result.resources;
        setImages(images);
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
      });
  }, []);

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className='birthdayImg' src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola foster</b> and <b>3 others</b> have a birthday today.
          </span>
        </div>
        <img className='rignhtbarAd' src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarfriendList">
          {users.map(u => (
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
          {users.map((user) => (
            <div className="rightbarFollowing" key={user.id}>
              <img src={user.profileImage} alt="" className="rightbarFollowingImg" />
              <span className="rightbarFollowingname">{`${user.firstName} ${user.lastName}`}</span>
            </div>
          ))}
        </div>
        <h4 className="rightbarTitle">Uploaded Images</h4>
        <div className="rightbarImages">
          {images.map((image) => (
            <img key={image.public_id} src={image.secure_url} alt="" className="rightbarImage" />
          ))}
        </div>
      </>
    );
  };

  return (
    <div className='rightbar'>
      <div className="rightbarWrapper">
        {profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
