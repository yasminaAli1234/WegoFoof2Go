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
      "log_out": "Log Out",
      "name": "Name",
      "email": "Email",
      "phone": "Phone",
      "password": "Password",
      "Edit Profile" :"Edit Profile",
      "Update Profile": "Update Profile",
      "Add": "Add",
      "Buy Plan": "Buy Plan",
      "Store Link": "Store Link",
      "Delete Store": "Delete Store",
      "Go to Store": "Go to Store",
      "Store Name": "Store Name",
      "Instagram Link": "Instagram Link",
      "Facebook Link": "Facebook Link",
      "Store Logo": "Store Logo",
      "done": "Done",
      "cancel": "Cancel",
      "Select Store Activity": "Select Store Activity",
      "Add Store": "Add Store"
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
      "log_out": "تسجيل الخروج",
      "name": "الاسم",
      "email": "البريد الالكتروني",
      "phone": "رقم الهاتف",
      "password": "الرقم السري",
      "Edit Profile" :"تعديل الملف الشخصي",
      "Update Profile": "تحديث الملف الشخصي",
      "Add": "إضافه",
      "Buy Plan": "شراء باقه",
      "Store Link": "رابط المتجر",
      "Delete Store": "حذف المتجر",
      "Go to Store": "الذهب الي المتجر",
      "Store Name": "اسم المتجر",
      "Instagram Link": "رابط إنستجرام",
      "Facebook Link": "رابط فيسبوك",
      "Store Logo": "شعار المتجر",
      "done": "تم",
      "cancel": "إلغاء",
      "Select Store Activity": "اختر نشاط المتجر",
      "Add Store": "إضافة متجر"

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
