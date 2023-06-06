import React from 'react';
import { useTranslation } from 'react-i18next';
import './About.css';
import videoBg1 from '../../assets/rain.mp4';
import '../../index.css';


const About = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="landing-page">
        <div className="main">
          <div className="overlay"></div>
          <video src={videoBg1} autoPlay loop muted />
          <div className="text-overlay">
            <h1 className="about-title">{t('about.title')}</h1>
            <p className="about-description" dangerouslySetInnerHTML={{ __html: t('about.description1') }}></p>
            <p className="about-description">{t('about.description2')}</p>
            <p className="about-description">{t('about.description3')}</p>
            <p className="about-description">{t('about.description4')}</p>
            <div className="footer-section">
              <h5 className="footer-section-title">{t('about.openingHours')}</h5>
              <center>
                <table className="table text-center text-white">
                  <tbody className="font-weight-normal">
                    <tr>
                      <td>{t('about.monThu')}</td>
                      <td>8am - 9pm</td>
                    </tr>
                    <tr>
                      <td>{t('about.friSat')}</td>
                      <td>8am - 1am</td>
                    </tr>
                    <tr>
                      <td>{t('about.sunday')}</td>
                      <td>9am - 10pm</td>
                    </tr>
                  </tbody>
                </table>
              </center>
            </div>
          </div>
        </div>
      </div>
  
    </>
  );
};

export default About;
