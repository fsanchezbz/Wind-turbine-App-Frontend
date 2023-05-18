import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/SignUpPage.css';
import videoBg from '../assets/rain.mp4';
import axios from 'axios';

const SignUpPage = () => {
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('userName', userName);
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('profilePicture', profilePicture);

      const response = await axios.post('https://wind-turbine-app-backend.onrender.com/users/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('User signed up:', response.data);
      // Reset the form fields
      setUserName('');
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setProfilePicture(null);
      // Redirect to the wind turbines page or perform any other desired action
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="signup-page">
      <video className="signup-video" src={videoBg} autoPlay loop muted />
      <div className="signup-container text-overlay">
        <h2 className="signup-title">Sign Up</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          {/* Rest of the form fields */}
          <div className="form-group">
            <label htmlFor="profilePicture" className="form-label">
              Profile Picture
            </label>
            <input
              type="file"
              id="profilePicture"
              className="form-input"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
        <div className="signup-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
