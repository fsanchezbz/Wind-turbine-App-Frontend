import React from 'react';
import { useTranslation } from 'react-i18next';
import './ContactForm.css';
import videoBg from '../../assets/rain.mp4';
import axios from 'axios'; // Import Axios library

const ContactForm = () => {
  const { t } = useTranslation();
  const [formStatus, setFormStatus] = React.useState(t('contactPage.formButton'));

  const onSubmit = (e) => {
    e.preventDefault();
    setFormStatus(t('contactPage.submitting'));
    const { name, email, message } = e.target.elements;
  
    const formData = {
      name: name.value,
      email: email.value,
      message: message.value,
    };
  
    axios
      .post(`${import.meta.env.VITE_PRODUCTION_API}/send-notification`, formData)
      .then((response) => {
        console.log('Notification sent successfully');
        setFormStatus(t('contactPage.formButton'));
        name.value = '';
        email.value = '';
        message.value = '';
      })
      .catch((error) => {
        console.error('Error sending notification:', error);
        setFormStatus('Error');
      });
  };
  

  return (
    <div className="contact-container">
      <div className="contact-video-bg">
        <video src={videoBg} autoPlay loop muted />
      </div>
      <div className="contact-text-overlay">
        <div className="contact-section">
          <h3 className="contact-title">{t('contactPage.title')}</h3>
          <p className="contact-info">{t('contactPage.address')}</p>
          <p className="contact-info">{t('contactPage.email')}</p>
          <p className="contact-info">{t('contactPage.phone')}</p>
        </div>
        <h5 className="contact-form-title">{t('contactPage.formTitle')}</h5>
        <form className="contact-form" onSubmit={onSubmit}>
          <div className="contact-form-group">
            <label className="contact-label" htmlFor="name">
              {t('contactPage.formNameLabel')}
            </label>
            &nbsp;
            <input style={{color: 'black'}} className="contact-input" type="text" id="name" required />
          </div>
          <div className="contact-form-group">
            <label className="contact-label" htmlFor="email">
              {t('contactPage.formEmailLabel')}
            </label>
            &nbsp;
            <input style={{color: 'black'}} className="contact-input" type="email" id="email" required />
          </div>
          <div className="contact-form-group">
            <label  className="contact-label" htmlFor="message">
              {t('contactPage.formMessageLabel')}
            </label>
            &nbsp;
            <textarea style={{color: 'black'}} className="contact-textarea" id="message" required />
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
