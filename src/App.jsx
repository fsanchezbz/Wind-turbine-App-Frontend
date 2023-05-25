import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import React, { useEffect, useState } from 'react';
import LoginPage from './components/LoginPage';
import About from './components/about/About';
import ContactForm from './components/Contact';
import WindTurbines from './components/WindTurbines';
import './styles/Footer.css'
import Navbar from './components/Navbar';
import MapComponent from './components/Map';
import Footer from './components/Footer';
import SignupPage from './components/SignupPage';
import Profile from './pages/profile/CompanyProfilePage';
import WorkOrder from './components/WorkOrder';
import AdminPanel from './components/admin/AdminPanel';
import LogoutPage from './components/LogoutPage';

function App() {
return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/map" element={<MapComponent />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/wind-turbines" element={<WindTurbines />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/work" element={<WorkOrder />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/logout" element={<LogoutPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
