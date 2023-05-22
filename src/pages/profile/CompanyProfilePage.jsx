// CompanyProfilePage.js

import React from 'react';
import "./profile.css";

import Feed from "../../components/feed/Feed.jsx";
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
            <Post/>
            <Feed />
            <Rightbar profile />
          </div>
        </div>

        
      </div>
    </>
  );
}

export default CompanyProfilePage;