import React from 'react';
import "./profile.css";
import Map from '../../components/Map';
import Post from "../../components/post/Post";
import Rightbar from '../../components/rightbar/Rightbar'

const CompanyProfilePage = () => {
  return (
    <>
      <div className="profile">
        <div className="profileInfo">
            <h4 className='profileInfoName'>Company Profile Page</h4>
            <span className='profileInfoDesc'>Hello my Employees</span>
        </div>
        <Map />
        <div className="profileRight">
          <div className="profilerightTop">
          <Rightbar profile/>
          </div>
          <div className="profilerightBottom">
            <div className="postContainer">
              <Post className="layout"/>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default CompanyProfilePage;
