// Frontend (LandingPage.js)
import { useTranslation } from 'react-i18next';
import './LandingPage.css';
import videoBg from '../../assets/wind.mp4';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const LandingPage = () => {
  const { t } = useTranslation();
  
  return (
    <>
      
      <div className="landing-page">
        <div className="main">
          <div className="overlay"></div>
          <video src={videoBg} autoPlay loop muted />
          <div className="text-overlay">
            <h1 className="landing-page-title">{t('landingPage.welcome')}</h1>
            <h2 className="landing-page-slogan">{t('landingPage.slogan')}</h2>
            <p
              className="landing-page-description"
              dangerouslySetInnerHTML={{ __html: t('landingPage.description1') }}
            ></p>
            <p
              className="landing-page-description"
              dangerouslySetInnerHTML={{ __html: t('landingPage.description2') }}
            ></p>
            <p
              className="landing-page-description"
              dangerouslySetInnerHTML={{ __html: t('landingPage.description3') }}
            ></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
