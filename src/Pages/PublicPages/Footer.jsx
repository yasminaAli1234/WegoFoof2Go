import { useTranslation } from "react-i18next";
import logo from "../../../public/Images/logo.png";
import payment from '../../assets/Images/assets/img/Payment.png'
import Vodafone from '../../assets/Images/assets/img/Vodafone.png'
import visa from '../../assets/Images/assets/img/visa.png'
import instapay from '../../assets/Images/assets/img/instapay.png'
import mastercard  from '../../assets/Images/assets/img/mastercard.png'
const Footer = () => {
  const {t} = useTranslation()
    return (
      <footer className="bg-white text-mainColor py-12 px-2">
      {/* Footer Container */}
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between space-y-6 md:space-y-0">
        {/* Left Section: Logo */}
        <div className="flex items-center flex-col justify-between gap-6 md:justify-start w-full md:w-1/4">
          <img
            src={logo} // Replace with your logo image
            alt="Logo"
            className="w-3/4 md:w-auto" // Adjust logo size for smaller screens
          />
        </div>
    
        {/* Middle Section: Contact Info */}
        <div className="flex flex-col items-center md:items-center space-y-4 w-full md:w-1/2">
          <h2 className="text-2xl font-bold">{t("Contact Us")}</h2>
          <ul className="space-y-4">
            <li className="flex items-start space-x-2">
              <span className="font-semibold">{t("Phone Number")}</span>
              <span>01111771103</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="font-semibold">{t("WhatsApp")}</span>
              <span>01111771103</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="font-semibold">{t("Email")}</span>
              <span>info@wegostores.com</span>
            </li>
          </ul>
        </div>
    
        {/* Right Section: Company Links */}
        <div className="flex flex-col items-center md:items-end space-y-4 w-full md:w-1/4">
          <h2 className="text-2xl font-bold mb-4">{t("Company")}</h2>
          <ul className="space-y-4">
            <li>
              <a href="#section1" className=" cursor-pointer underline">{t("Home")}</a>
            </li>
            <li>
              <a href="#plan" className=" cursor-pointer underline">{t("Plan")}</a>
            </li>
            <li>
              <a href="#contactUs" className=" cursor-pointer underline">{t("Contact Us")}</a>
            </li>
          </ul>
        </div>
      </div>
    
      {/* Footer Bottom Section */}
      <div className="border-t border-gray-600 mt-8 pt-4">
        <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
          {/* Left: Image Icons */}
          <div className="flex gap-4 items-center">
            {/* Visa */}
            <div
              onClick={() => window.location.href = "https://www.visa.com"}
              className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-white shadow-lg rounded-lg cursor-pointer transition-transform hover:scale-105"
            >
              <img
                src={visa}
                alt="Visa"
                className="w-3/4 h-3/4 object-contain"
              />
            </div>
    
            {/* Instapay */}
            <div
              onClick={() => window.location.href = "https://www.instapay.com"}
              className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-white shadow-lg rounded-lg cursor-pointer transition-transform hover:scale-105"
            >
              <img
                src={instapay}
                alt="Instapay"
                className="w-3/4 h-3/4 object-contain"
              />
            </div>
    
            {/* Mastercard */}
            <div
              onClick={() => window.location.href = "https://www.mastercard.com"}
              className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-white shadow-lg rounded-lg cursor-pointer transition-transform hover:scale-105"
            >
              <img
                src={mastercard}
                alt="Mastercard"
                className="w-3/4 h-3/4 object-contain"
              />
            </div>
    
            {/* Vodafone */}
            <div
              onClick={() => window.location.href = "https://www.vodafone.com"}
              className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-white shadow-lg rounded-lg cursor-pointer transition-transform hover:scale-105"
            >
              <img
                src={Vodafone}
                alt="Vodafone"
                className="w-3/4 h-3/4 object-contain"
              />
            </div>
          </div>
    
          {/* Right: Copyright */}
          <p className="text-mainColor text-sm sm:text-base">
            {t("©2024. All rights reserved.")}
          </p>
        </div>
      </div>
    </footer>
    
    );
  };
  
  export default Footer;
  