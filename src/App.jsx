import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import React, { useEffect, useState } from 'react';
import LoginForm from './components/LoginForm';
import About from './components/About';
import ContactForm from './components/Contact';
import WindTurbines from './components/WindTurbines';
import './styles/Footer.css'
import Navbar from './components/Navbar';
import MapComponent from './components/Map';
import Footer from './components/Footer';
import SignupPage from './components/SignupPage';
import Profile from './pages/profile/CompanyProfilePage';
import WorkOrder from './components/WorkOrder';
import axios from 'axios';
import AdminLogin from './components/AdminLoginPage';
function App() {
  const [turbines, setTurbines] = useState([]);
  
  
  return (
    <body>
      <div className="App">
      
      
      <Router>
      <Navbar/>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signUp" element={<SignupPage />} />
          <Route path="/map" element={<MapComponent />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/wind-turbines" element={<WindTurbines />} />
          <Route path="/work" element={<WorkOrder />} />
          <Route path="/admin" element={<AdminLogin />} />
        </Routes>
        <Footer/>
      </Router>
    </div>
    
    </body>
  );
}

export default App;
