import React from 'react';
import "./profile.css";
import Rightbar from "../../components/rightbar/Rightbar.jsx";
import Map from '../../components/Map';
import Post from "../../components/post/Post";


const CompanyProfilePage = () => {
  return (
    <>
      <div className="profile">
        <div className="profileInfo">
            <h4 className='profileInfoName'>Company Profile Page</h4>
            <span className='profileInfoDesc'>Hello my Employees</span>
        </div>
        <center><Map /></center>
        <div className="profileRight">
          <div className="profilerightTop">
           
          </div>
          <div className="profilerightBottom">
            <div className="postContainer">
              <Post className="layout"/>
            </div>
            <Rightbar profile />
          </div>
        </div>
      </div>
    </>
  );
}

export default CompanyProfilePage;
