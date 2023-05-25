import React from 'react';
import './LandingPage.css';
import videoBg from '../../assets/wind.mp4'
// import Footer from '../footer/Footer';

const LandingPage = () => {
  
  return (
   <>
    <div className="landing-page">
      <div className='main'>
        <div className="overlay"></div>
        <video src={videoBg} autoPlay loop muted />  
        <div className="text-overlay">
          <h1 className="landing-page-title">Welcome to PJ TurbinePro GmbH</h1>
          <p className="landing-page-description">
            Explore a wide range of wind turbine models and learn more about their specifications, power outputs, and manufacturers.
          </p>
          
        </div>
    </div>
    </div>
    {/* <Footer /> */}
   </>
  );
};

export default LandingPage;
