import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/landingPage/LandingPage';
import React, { useEffect, useState } from 'react';
import LoginPage from './components/LoginPage';
import About from './components/about/About';
import ContactForm from './components/contact/Contact';
import Navbar from './components/Navbar';
import MapComponent from './components/Map';
import SignupPage from './components/SignupPage';
import Profile from './pages/profile/CompanyProfilePage';
import WorkOrder from './components/WorkOrder';
import AdminPanel from './components/admin/AdminPanel';
import LogoutPage from './components/LogoutPage';
import CookiePolicy from './pages/Cookies/CookiePolicy';
import Footer from './components/footer/Footer';

function App() {
return (
  <>
  {/* <iframe src={`${import.meta.env.VITE_PRODUCTION_API}`}   style={{width:"600px" ,  height:"450" ,border: 0 , frameborder: 0, allowfullscreen: '', ariahidden: false,  tabindex: 0}}  ></iframe> */}
  <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/map" element={<MapComponent />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/work" element={<WorkOrder />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/CookiePolicy" element={<CookiePolicy />} />
      </Routes>
     <Footer/>
    </Router>
  </>
    
  );
}

export default App;
