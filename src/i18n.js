import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "hello": "Hello",
      "dashboard": "Dashboard",
      "search": "Search",
      "home":"Home",
      "profile": "Profile",
      "store": "Store",
      "subscriptions": "Subscriptions",
      "domains": "Domains",
      "my_domain": "My Domain",
      "buy_domain": "Buy Domain",
      "extras": "Extras",
      "payment_history": "Payment History",
      "tutorial": "Tutorial",
      "log_out": "Log Out"
      // Add more translations
    },
  },
  ar: {
    translation: {
      "hello": "مرحباً",
      "dashboard": "لوحة التحكم",
      "search": "بحث",
      "home":"الصفحه الرئسيه",
      "profile": "الملف الشخصي",
      "store": "المتجر",
      "subscriptions": "الاشتراكات",
      "domains": "النطاقات",
      "my_domain": "نطاقي",
      "buy_domain": "شراء نطاق",
      "extras": "الإضافات",
      "payment_history": "سجل المدفوعات",
      "tutorial": "الدليل",
      "log_out": "تسجيل الخروج"
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
