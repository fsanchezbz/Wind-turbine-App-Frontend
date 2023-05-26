import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import store from '../src/store/store';
import { createRoot } from 'react-dom/client';
import App from './App';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import enTranslation from './Translation/en.json';
import deTranslation from './Translation/de.json';
import esTranslation from './Translation/es.json';
import frTranslation from './Translation/fr.json';

i18n.init({
  resources: {
    en: { translation: enTranslation },
    de: { translation: deTranslation },
    es: { translation: esTranslation },
    fr: { translation: frTranslation },
  },
  lng: 'en', // Set the default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
