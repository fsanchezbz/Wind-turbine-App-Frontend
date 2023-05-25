import React from 'react';
import './ContactForm.css';
import videoBg from '../../assets/rain.mp4';

const ContactForm = () => {
  const [formStatus, setFormStatus] = React.useState('Send');

  const onSubmit = (e) => {
    e.preventDefault();
    setFormStatus('Submitting...');
    const { name, email, message } = e.target.elements;
    let conFom = {
      name: name.value,
      email: email.value,
      message: message.value,
    };
    console.log(conFom);
  };

  return (
    <div className="contact-container">
      <div className="contact-video-bg">
        <video src={videoBg} autoPlay loop muted />
      </div>
      <div className="contact-text-overlay">
        <div className="contact-section">
          <h3 className="contact-title">Contact Us</h3>
          <p className="contact-info">123 Street, City</p>
          <p className="contact-info">Email: example@example.com</p>
          <p className="contact-info">Phone: +1234567890</p>
        </div>
        <h2 className="contact-form-title">Please Reach out to us!</h2>
        <form className="contact-form" onSubmit={onSubmit}>
          <div className="contact-form-group">
            <label className="contact-label" htmlFor="name">
              Name:
            </label>
            &nbsp;
            <input className="contact-input" type="text" id="name" required />
          </div>
          <div className="contact-form-group">
            <label className="contact-label" htmlFor="email">
              Email:
            </label>
            &nbsp;
            <input className="contact-input" type="email" id="email" required />
          </div>
          <div className="contact-form-group">
            <label className="contact-label" htmlFor="message">
              Message:
            </label>
            &nbsp;
            <textarea className="contact-textarea" id="message" required />
          </div>
          <button className="contact-button" type="submit">
            {formStatus}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
