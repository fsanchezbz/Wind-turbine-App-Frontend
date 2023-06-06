import React from 'react';
import { useTranslation } from 'react-i18next';
import videoBg1 from '../../assets/rain.mp4';
import '../Cookies/Cookies.css';
import '../../index.css';
const CookiePolicy = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="landing-page">
        <div className="main">
          <div className="overlay"></div>
          <video src={videoBg1} autoPlay loop muted />
          <div className="text-overlay">
            <h1 className="about-title">{t('cookiePolicy.title')}</h1>
            <p className="cookiePolicy-description">
              <span
                dangerouslySetInnerHTML={{
                  __html: t('cookiePolicy.description1', {
                    span: (children) => `<span class="highlight">${children}</span>`,
                  }),
                }}
              />
            </p>
            <p className="cookiePolicy-description">{t('cookiePolicy.description2')}</p>
            <p>
              1. <span style={{ fontWeight: 'bold' }}>{t('cookiePolicy.whatAreCookies')}</span>
              {t('cookiePolicy.whatAreCookiesDescription')}
            </p>
            <p className="cookiePolicy-description">
              <span
                dangerouslySetInnerHTML={{
                  __html: t('cookiePolicy.complementaryPolicy', {
                    span: (children) => `<span class="highlight">${children}</span>`,
                  }),
                }}
              />
            </p>
            
            <p>
              2. <span style={{ fontWeight: 'bold' }}>{t('cookiePolicy.cookieTypes')}</span>
              {t('cookiePolicy.cookieTypesDescription')}
            </p>
            <ul className="text-unorderedList">
              <li>{t('cookiePolicy.sessionCookies')}</li>
              <li>{t('cookiePolicy.persistentCookies')}</li>
              <li>{t('cookiePolicy.ownCookies')}</li>
              <li>{t('cookiePolicy.thirdPartyCookies')}</li>
            </ul>
            <p>{t('cookiePolicy.enableFunctionalities')}</p>
            <ul className="text-unorderedList">
              <li>{t('cookiePolicy.technicalCookies')}</li>
              <li>{t('cookiePolicy.personalisationCookies')}</li>
              <li>{t('cookiePolicy.analyticsCookies')}</li>
            </ul>
            <p>
              3. <span style={{ fontWeight: 'bold' }}>{t('cookiePolicy.cookieResponsibility')}</span>
              {t('cookiePolicy.cookieResponsibilityDescription')}
            </p>
            <p>{t('cookiePolicy.thirdPartiesAccess')}</p>
            <p>
              4. <span style={{ fontWeight: 'bold' }}>{t('cookiePolicy.manageCookies')}</span>
              {t('cookiePolicy.manageCookiesDescription')}
            </p>
            <p>{t('cookiePolicy.futureVisits')}</p>
            <p>{t('cookiePolicy.eraseCookies')}</p>
            <p>{t('cookiePolicy.blockEliminateCookies')}</p>
            <p>{t('cookiePolicy.browserSettings')}</p>
            <p>
              5. <span style={{ fontWeight: 'bold' }}>{t('cookiePolicy.dataRetention')}</span>
              {t('cookiePolicy.dataRetentionDescription')}
            </p>
            <p>
              <span style={{ fontWeight: 'bold' }}>{t('cookiePolicy.modificationTitle')}</span>
            </p>
            <p>{t('cookiePolicy.modificationDescription')}</p>
            <p><strong>{t('cookiePolicy.lastUpdate')}</strong></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookiePolicy;
