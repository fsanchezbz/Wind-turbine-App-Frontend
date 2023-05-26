import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/landingPage/LandingPage';
import React, { useEffect, useState } from 'react';
import LoginPage from './components/login/LoginPage';
import About from './components/about/About';
import ContactForm from './components/contact/Contact';
import Navbar from './components/nav/Navbar';
import MapComponent from './components/map/Map';
import SignupPage from './components/signup/SignupPage';
import Profile from './pages/profile/CompanyProfilePage';
import WorkOrder from './components/orders/WorkOrder';
import AdminPanel from './components/admin/AdminPanel';
import LogoutPage from './components/logout/LogoutPage';
import CookiePolicy from './pages/Cookies/CookiePolicy';
import Footer from './components/footer/Footer';
import ChatFront from './pages/profile/Chat/Chat';


function App() {
 

return (
  <>
    
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
        <Route path="/chat" element={<ChatFront />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/CookiePolicy" element={<CookiePolicy />} />
      </Routes>
     <Footer/>
    </Router>
  </>
    
  );
}

export default App;
