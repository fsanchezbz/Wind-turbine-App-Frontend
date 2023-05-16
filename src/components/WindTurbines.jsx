import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import '../styles/LandingPage.css';
import videoBg3 from '../assets/rain.mp4';
import Profile from '../pages/profile/CompanyProfilePage';

const WindTurbines = () => {
  return (
    <div className="landing-page">
      <div className="">
        <div className=""></div>
        <video src={videoBg3} autoPlay loop muted />
      </div>
      <div className="text-overlay">
          <div className="scrollable-content">
            
          </div>
        </div>
    </div>
  );
};

export default WindTurbines;
