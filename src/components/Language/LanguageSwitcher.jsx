import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiGlobe } from 'react-icons/fi'; // Import the globe icon from react-icons

const languageOptions = [
  {
    id: 'en',
    name: 'English',
    flagimg: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg',
  },
  {
    id: 'de',
    name: 'German',
    flagimg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Flag_of_Germany_%28state%29.svg/175px-Flag_of_Germany_%28state%29.svg.png',
  },
  {
    id: 'es',
    name: 'Spanish',
    flagimg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/2560px-Flag_of_Spain.svg.png',
  },
  {
    id: 'fr',
    name: 'French',
    flagimg: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg',
  },
];

const defaultLangFlag = (
  <img src={languageOptions[0].flagimg} height="30" width="30" alt="nope" />
);

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="language-switcher">
      <button className="language-dropdown-button" onClick={toggleDropdown}>
      Select Language <FiGlobe className="globe-icon" />{/* Use the globe icon */}
      </button>
      {dropdownOpen && (
        <div className="language-dropdown-menu">
          {languageOptions.map((lang) => (
            <button
              key={lang.id}
              className="language-option-button"
              onClick={handleLanguageChange}
              value={lang.id}
            >
              <img
                src={lang.flagimg}
                className="language-flag"
                alt={lang.name}
                height="30px"
                width="30px"
              />
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
