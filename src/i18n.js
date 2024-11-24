import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "hello": "Hello",
      "dashboard": "Dashboard",
      // Add more translations
    },
  },
  ar: {
    translation: {
      "hello": "مرحباً",
      "dashboard": "لوحة التحكم",
      // Add more translations
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    keySeparator: false,
    interpolation: {
      escapeValue: false, // React already escapes
    },
  });

export default i18n;
