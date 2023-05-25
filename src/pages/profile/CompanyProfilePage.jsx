import React from 'react';
import "./profile.css";
import Map from '../../components/Map';
import '../../index.css';


const CompanyProfilePage = () => {


  return (
    <>
      <div className="profile">
        <div className="profileInfo">
          <h4 className='profileInfoName'>Company Profile Page</h4>
          <span className='profileInfoDesc'>Hello my Employees</span>
        </div>
       
        <Map />
      </div>
      
    </>
  );
}

export default CompanyProfilePage;
