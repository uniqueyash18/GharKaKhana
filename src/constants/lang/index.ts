import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en';
import hi from './hi';
export const languageResources = {
  en: {translation: en},
  hi: {translation: hi},
};

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  fallbackLng: 'en', 
  resources: languageResources,
  interpolation: {
    escapeValue: false,
  },

});

export default i18next;