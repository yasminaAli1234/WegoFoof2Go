import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "hello": "Hello",
      "dashboard": "Dashboard",
      "search": "Search"
      // Add more translations
    },
  },
  ar: {
    translation: {
      "hello": "مرحباً",
      "dashboard": "لوحة التحكم",
      "search": "بحث"
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
