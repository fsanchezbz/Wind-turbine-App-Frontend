import React from 'react';
import "./profile.css";
import Rightbar from "../../components/rightbar/Rightbar.jsx";
import Map from '../../components/Map';
import Post from "../../components/post/Post";


const CompanyProfilePage = () => {
  return (
    <>
      <div className="profile">
        <Map />
        <div className="profileRight">
          <div className="profilerightTop">
            <div className="profileInfo">
              <h4 className='profileInfoName'>Company Profile Page</h4>
              <span className='profileInfoDesc'>Hello my Employees</span>
            </div>
          </div>
          <div className="profilerightBottom">
            <div className="postContainer">
              <Post />
            </div>
            <Rightbar profile />
          </div>
        </div>
      </div>
    </>
  );
}

export default CompanyProfilePage;
