import React from 'react';
import './Cookies.css';
import videoBg1 from '../../assets/rain.mp4';
import '../../index.css';


const CookiePolicy = () => {

  return (
    <>
      <div className="landing-page">
      <div className='main'>
        <div className="overlay"></div>
        <video src={videoBg1} autoPlay loop muted />  
        <div className="text-overlay">
          <h1 className="about-title">Cookie policy</h1>
          <p className="cookiePolicy-description">
            At <span className="highlight">
                PJ TurbinePro GmbH</span>, we are dedicated to making a positive impact on the environment and addressing the climate crisis. Our mission is to contribute to a sustainable future by ensuring the optimal performance and longevity of wind turbines.
          </p>
          <p className="cookiePolicy-description">
          <p>
            1. <span style={{ fontWeight: 'bold' }}>What are cookies?</span>A cookie is a text file which is downloaded onto your device (computer, smart phone or tablet) when you access a website or use an application and allows the website holder to store or recover information regarding your browsing preferences.
            </p>
            <p>
            PJ TurbinePro GmbH (hereinafter the COMPANY) wishes to provide you with all the necessary information on the cookies used on our so that you can make an informed decision on the use thereof and your privacy protection. The current cookies policy complements our Privacy Policy.
            </p>
            <p>
            2. <span style={{ fontWeight: 'bold' }}>What kind of cookies does this Website use?</span>We use cookies to enable, customise and analyse browsing preferences, thus improving the quality of the services offered. The cookies used are classified into different categories, though some may be included in more than one category:
            </p>
            <ul className="text-unorderedList">
              <li><span style={{ fontWeight: 'bold' }}>Session cookies:</span> These are temporary cookies which are not stored on your device and disappear once you close your browsing session.</li>
              <li><span style={{ fontWeight: 'bold' }}>Persistent cookies:</span> These allow information to be stored on your hard drive and be used after you close your browser.</li>
              <li><span style={{ fontWeight: 'bold' }}>Own cookies:</span> These are cookies sent to your hard drive from our own Website, although some are also provided by the Google Analytics tool.</li>
              <li><span style={{ fontWeight: 'bold' }}>Third party cookies:</span> These are cookies which are sent to your device from a domain not managed by the COMPANY, but by a third company which will treat the information obtained through such cookies.</li>
            </ul>
            <p>
            To enable certain functionalities, our website uses cookies from: i) YouTube, Inc. for the playing of videos (<a href="https://www.google.com/intl/es_es/policies/technologies/cookies/">https://www.google.com/intl/es_es/policies/technologies/cookies/</a>);
             ii) SlideShare Inc. for downloading documents (<a href="http://www.linkedin.com/legal/cookie-policy">http://www.linkedin.com/legal/cookie-policy</a>), and iii) technical cookies from Euroland.com AB to provide access to stock exchange information.
            </p>
            <ul className="text-unorderedList">
              <li><span style={{ fontWeight: 'bold' }}>Technical cookies:</span> These cookies make it possible for you to browse our Website and make use of the various options and services available, such as those allowing the tracking of traffic on the site and the provision of data, session identification, access to restricted areas or the use of security elements while browsing.</li>
              <li><span style={{ fontWeight: 'bold' }}>Personalisation cookies:</span> These are cookies which allow you to access our Website with certain predefined specifications depending on criteria such as language, type of browser, or the regional configuration from which you access the service.</li>
              <li><span style={{ fontWeight: 'bold' }}>Analytics cookies:</span>These are cookies used for tracking and analysing user behaviour. This type of cookie allows us to monitor activity on our Website through aggregate or statistical data on browsing habits.We uses analytical cookies, some of which are provided by Google Analytics (https://www.google.com/intl/en-GB/policies/technologies/cookies/) and the Hotjar Ltd. tool for generating heatmaps (a graphic representation of online user behaviour on a particular website) (https://www.hotjar.com/legal/policies/cookie-information).</li>
            </ul>
            <p>
            3. <span style={{ fontWeight: 'bold' }}>Who’s in charge of the cookies? </span>The information collected through cookies downloaded from the domain managed by the COMPANY is used by the COMPANY, as well as by Google Inc. and Hotjar Ltd. as analytics services providers.
            </p>
            <p>              
             Other third parties such as YouTube, Inc., SlideShare and Euroland.com AB can access the information collected by cookies managed from their own domains. For further information, please read the information contained in the abovementioned links, specially regarding the international transfers that might be performed by those suppliers.
            </p>
            <p>
            4. <span style={{ fontWeight: 'bold' }}>How can you manage cookies?</span> On your visit to our Website, you will receive information on the use of cookies and this Cookie Policy, and you’ll be asked to consent the installation of cookies depending oin their type.
            </p>
            <p>
            On future visits to our Website, the user may consult this policy via the link provided. If at any time you wish to withdraw your consent in relation to cookies from our Website, or you wish to change your settings regarding this matter, you can our configuration panel in the lower right corner of the Website.
            </p>
            <p>
            Additionally, you may also erase all those cookies stored on your device. However, you should be aware of the fact that blocking the installation of, or eliminating, cookies could affect some of the functionalities, services or content of our Website.
            </p>
            <p>
            Internet browsers allow you to visualise, deactivate, restrict, block or eliminate cookies. You can check how to modify your settings in relation to cookies on the main browsers via the links below, although we recommend that you consult your browser support or help section for detailed and up-to-date information specific to your browser version and device used.
            </p>
            <p>
            5. <span style={{ fontWeight: 'bold' }}>For how long is my information kept? </span> In case of by using cookies any personal data is processed, such data will be kept as long as it’s needed for the purpose it was collected. Once achieved such a purpose, your data will be kept blocked in case any public administration requires it during those legal terms applicable in each case for any kind of reason regarding the processing activity. After that, your data will be erased.
            </p>
            <p>
            <span style={{ fontWeight: 'bold' }}>Modification and updating of this policy</span>
            </p>
            <p>
            The COMPANY may totally or partially modify the current Cookies Policy, publishing its new versions in the same way as the current one is published or by way of any other kind of communication aimed to the website’s users, depending on what the legal or regulatory obligations are, as well as depending on what the purpose of updating the Policy is. Considering so, we suggest you checking from time to time the current Policy.
            </p>
            <p>
            Last update: October 31th, 2020.
            </p>
            </p>
          {/* <p className="cookiePolicy-description">
            Our company is driven by a passion for sustainability and a deep understanding of the importance of renewable energy sources. We work closely with our clients to provide tailored solutions that meet their specific needs, ensuring minimal downtime and maximizing the performance of their wind turbine systems.
          </p>
          <p className="cookiePolicy-description">
            By prioritizing continuous improvement, innovation, and exceptional customer service, we aim to be leaders in the wind energy industry. We are dedicated to pushing the boundaries, exploring new technologies, and implementing best practices to drive the advancement of clean, green energy.
          </p> */}
          
         
        </div>
        
      </div>
    </div>
   
    </>
  );
};

export default CookiePolicy;
