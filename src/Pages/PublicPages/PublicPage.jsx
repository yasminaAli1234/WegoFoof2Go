import React, { useEffect, useRef, useState } from "react";
import logo from "../../../public/Images/logo white.png";
import { Button } from "../../Components/Button";
import { Link } from "react-router-dom";
import homeImage from "../../../public/Images/homeImage.png";
import imageLanding from '../../assets/Images/assets/img/landing.png'
import { FiArrowRight } from "react-icons/fi";
import feature2 from '../../assets/Images/assets/img/features-icon-2.png'
import feature3 from '../../assets/Images/assets/img/features-icon-3.png'
import feature4 from '../../assets/Images/assets/img/features-icon-4.png'
import CustomerReviewsSlider from "./Rating";
import LearnMoreSection from "./LearnMore";
import ContactSection from "./ContactUs";
import Footer from "./Footer";
import Features from "./Features";
import Plan from "./Plan";
import { CiGlobe } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io"; 
import { IoNotifications } from "react-icons/io5";
import FeaturesPage from "./OurFeatureData";
import { FaLightbulb, FaCheckCircle, FaHeadset } from 'react-icons/fa';
import { CgMenu } from 'react-icons/cg';
import { useTranslation } from "react-i18next";
const PublicPage = () => {
         const dropdownRef = useRef(null)
         
         const {i18n,t } = useTranslation();
         const [activeLink, setActiveLink] = useState('Home'); // Default active link
         const [menuOpen, setMenuOpen] = useState(false);

         const toggleMenu = () => {
           setMenuOpen(prevState => !prevState);
         };
         const [open, setOpen] = useState(false);
  
  
         const handleOptionClick = (value) => {
                i18n.changeLanguage(value.toLowerCase()); // Change language on selection
                setOpen(false);
              };
              const handleClickOpen = () => {
                setOpen(!open);
              };
       
         const handleClickOutside = (event) => {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                       setOpen(false);
                }
         };
  
         useEffect(() => {
                document.addEventListener('mousedown', handleClickOutside);
                return () => {
                       document.removeEventListener('mousedown', handleClickOutside);
                };
         }, []);

         useEffect(() => {
                if (i18n.language === 'ar') {
                  document.documentElement.setAttribute('dir', 'rtl');
                } else {
                  document.documentElement.setAttribute('dir', 'ltr');
                }
              }, [i18n.language]);
  

  const handleClick = (label) => {
    setActiveLink(label); // Set the clicked link as active
  };

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
<div className="bg-mainColor text-secondColor">
  {/* Navigation Bar */}
  <nav
  className={`fixed w-full text-white flex justify-between z-10 transition-all duration-300 ${
    isScrolled ? 'bg-mainColor' : 'bg-transparent'
  }`}
>
  <div className="w-2/6 lg:w-1/4 mt-4 flex text-white items-center justify-center py-4 px-4 text-xl font-semibold">
    <img src={logo} alt="wegoStore" height={90} width={200} />
     <div className="hidden lg:flex w-4/12 items-center py-1 gap-5 justify-center text-xl font-medium mr-3 text-mainColor hover:cursor-pointer transition-all duration-300">
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center gap-1 justify-between text-2xl"
        onClick={handleClickOpen}
      >
        <CiGlobe className="text-white text-2xl" />
        <span className="flex items-center text-white font-medium">
          {t(i18n.language.toUpperCase())}
          <IoIosArrowDown
            className={`${open ? "rotate-180" : "rotate-0"} mt-1 ml-1 transition-all duration-300`}
          />
        </span>
      </button>
      <div
        className={`${open ? "block" : "hidden"} absolute w-28 top-14 -left-3.5 bg-white rounded-xl border-2 overflow-hidden`}
      >
        <div
          className="flex items-center py-1 gap-1 justify-center text-xl font-medium text-mainColor hover:cursor-pointer hover:bg-mainColor hover:text-secoundColor transition-all duration-300"
          onClick={() => handleOptionClick("EN")}
        >
          <CiGlobe /> EN
        </div>
        <div
          className="flex items-center py-1 gap-1 justify-center text-xl font-medium text-mainColor hover:cursor-pointer hover:bg-mainColor hover:text-secoundColor transition-all duration-300"
          onClick={() => handleOptionClick("AR")}
        >
          <CiGlobe /> AR
        </div>
      </div>
    </div>
  </div>
  </div>

  {/* Navbar Links */}
  <ul className="hidden items-center lg:flex w-2/4 justify-center space-x-8 py-4 gap-3 relative">
    <li className="relative" onClick={() => handleClick('Home')}>
      <a href="#section1" className="text-2xl hover:text-red-500 transition-colors">{t("Home")}</a>
      <span className={`absolute bottom-[-10px] left-0 h-[3px] bg-white transition-all duration-300 ${
          activeLink === 'Home' ? 'w-[70%]' : 'w-0'
        }`}></span>
    </li>
    <li className="relative" onClick={() => handleClick('About Us')}>
      <a href="#section2" className="text-2xl transition-colors">{t("About Us")}</a>
      <span className={`absolute bottom-[-10px] left-0 h-[3px] bg-white transition-all duration-300 ${
          activeLink === 'About Us' ? 'w-[70%]' : 'w-0'
        }`}></span>
    </li>
    <li className="relative" onClick={() => handleClick('Our features')}>
      <a href="#features" className="text-2xl transition-colors">{t("Our Features")}</a>
      <span className={`absolute bottom-[-10px] left-0 h-[3px] bg-white transition-all duration-300 ${
          activeLink === 'Our features' ? 'w-[70%]' : 'w-0'
        }`}></span>
    </li>
    <li className="relative" onClick={() => handleClick('Plan')}>
      <a href="#plan" className="text-2xl transition-colors">{t("Plan")}</a>
      <span className={`absolute bottom-[-10px] left-0 h-[3px] bg-white transition-all duration-300 ${
          activeLink === 'Plan' ? 'w-[70%]' : 'w-0'
        }`}></span>
    </li>
    <li className="relative" onClick={() => handleClick('Contact Us')}>
      <a href="#contactUs" className="text-2xl transition-colors">{t("Contact Us")}</a>
      <span className={`absolute bottom-[-10px] left-0 h-[3px] bg-white transition-all duration-300 ${
          activeLink === 'Contact Us' ? 'w-[70%]' : 'w-0'
        }`}></span>
    </li>
    {/* <li className="relative" onClick={() => handleClick('All Feature')}>
      <a href="#features" className="text-2xl hover:text-red-500 transition-colors">{t("Feature")}</a>
      <span className={`absolute bottom-[-10px] left-0 h-[3px] bg-white transition-all duration-300 ${
          activeLink === 'All Feature' ? 'w-[70%]' : 'w-0'
        }`}></span>
    </li> */}
  </ul>

  {/* Login / Sign Up Buttons */}
  <div className="flex items-center py-2 gap-5 w-4/6 lg:w-1/4">
  <Link to="/login">
    <button className="text-xl font-medium w-32 h-12 flex items-center justify-center border rounded-xl hover:bg-secoundColor hover:text-mainColor">
      {t("Login")}
    </button>
  </Link>
  <Link to="/signUp">
    <button className="text-xl font-medium w-32 h-12 flex items-center justify-center bg-secoundColor text-mainColor border rounded-xl hover:bg-mainColor hover:text-white">
      {t("SignUp")}
    </button>
  </Link>
  {/* Language Dropdown */}
 
</div>


  {/* Hamburger Menu for Small Screens */}
  <div className="lg:hidden flex items-center justify-center px-4">
    <button onClick={toggleMenu}>
      <CgMenu className="text-3xl text-white" />
    </button>
  </div>
</nav>

{/* Mobile Menu */}
{menuOpen && (
  <div className="lg:hidden absolute top-0 left-0 w-full max-w-[90%] mx-auto z-50 bg-mainColor text-white py-6 rounded-lg shadow-lg">
    <div className="flex justify-end px-4">
      <button
        onClick={toggleMenu}
        className="text-xl flex justify-center items-center flex-col font-bold text-white bg-red-500 px-3 py-1 rounded-full hover:bg-red-600 transition-all duration-300"
      >
        X
      </button>
    </div>
    <ul className="flex flex-col items-center space-y-6 mt-4">
      <li onClick={() => handleClick('Home')}>
        <a href="#section1" className="text-xl hover:text-red-500 transition-colors duration-300">{t("Home")}</a>
      </li>
      <li onClick={() => handleClick('About Us')}>
        <a href="#section2" className="text-xl hover:text-red-500 transition-colors duration-300">{t("About Us")}</a>
      </li>
      <li onClick={() => handleClick('Our features')}>
        <a href="#features" className="text-xl hover:text-red-500 transition-colors duration-300">{t("Our Features")}</a>
      </li>
      <li onClick={() => handleClick('Plan')}>
        <a href="#plan" className="text-xl hover:text-red-500 transition-colors duration-300">{t("Plan")}</a>
      </li>
      <li onClick={() => handleClick('Contact Us')}>
        <a href="#contactUs" className="text-xl hover:text-red-500 transition-colors duration-300">{t("Contact Us")}</a>
      </li>
    </ul>
  </div>
)}


{/* Section 1 */}
<section id="section1" className="h-screen flex items-center justify-center text-white text-2xl px-4">
  <div className="w-full flex flex-col gap-3 justify-center">
    <div className="w-full flex justify-center mt-10">
      <img src={homeImage} alt="" className="w-full lg:w-1/6 lg:h-1/6" />
    </div>
    <h1 className="font-semibold text-2xl lg:text-3xl text-center">
      {t("Design Your Perfect Website in One Click!")}
    </h1>
    <div className="w-full flex justify-center">
      <p className="font-normal text-1xl text-center w-full lg:w-5/6">
        {t("Enjoy a fast and easy process to create a stunning website that reflects your identity, with our flexible packages ensuring you a unique experience in no time. Choose what suits you and start your digital journey with confidence!")}
      </p>
    </div>
    <button className="text-2xl font-medium w-fit py-2 px-9 lg:py-4 lg:px-6 flex items-center border rounded-xl bg-secoundColor text-mainColor hover:bg-blue-200 transition-colors">
      {t("Start Now")}
      <span className="flex items-center justify-center w-10 h-10 ml-3 rounded-full bg-mainColor text-white">
        <FiArrowRight size={20} />
      </span>
    </button>
  </div>
</section>


{/* Section 2 */}
<section id="section2" className="h-auto flex flex-col items-start justify-start w-full text-white text-3xl px-4">
  <div className="w-full">
    <div className="flex flex-col lg:flex-row justify-around items-center w-full bg-white py-10">
      <div className="flex flex-col gap-3 items-center text-center">
        <h3 className="text-xl font-semibold text-mainColor">{t("Active Subscriptions")}</h3>
        <span className="text-3xl font-bold text-mainColor">{t("100+")}</span>
      </div>
      <div className="flex flex-col gap-3 items-center text-center">
        <h3 className="text-xl font-semibold text-mainColor">{t("New Orders Count")}</h3>
        <span className="text-3xl font-bold text-mainColor">{t("200+")}</span>
      </div>
      <div className="flex flex-col gap-3 items-center text-center">
        <h3 className="text-xl font-semibold text-mainColor">{t("Websites Created")}</h3>
        <span className="text-3xl font-bold text-mainColor">{t("50+")}</span>
      </div>
    </div>

    <div className="flex flex-col lg:flex-row justify-between items-start w-full py-10 mt-10 px-10">
      <div className="flex flex-col gap-6 items-start w-full md:w-1/2">
        <h1 className="text-3xl font-bold text-white">
          {t("Let's shape the digital future, together")}
        </h1>
        <ul className="list-disc pl-6 text-lg text-white">
          <li>{t("Customer-Centric: We prioritize understanding and meeting our clients' unique needs.")}</li>
          <li>{t("Tailored Solutions: We design custom software solutions to exceed client expectations.")}</li>
          <li>{t("Comprehensive Approach: We offer more than just technology products to help clients grow.")}</li>
          <li>{t("Strong Partnerships: We collaborate closely with clients to build their digital presence and increase efficiency.")}</li>
        </ul>
      </div>

      <div className="w-full md:w-1/2 h-[350px] lg:h-[400px] flex justify-center md:justify-end relative">
        <img src={imageLanding} alt="Digital Future" className="w-full h-full object-cover rounded-lg opacity-80" />
      </div>
    </div>
  </div>
</section>


      {/* Sections 3 */}
      <section className="bg-mainColor text-white py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-semibold">{t("What Makes Us Different?")}</h2>
        <p className="text-xl mt-4">{t("Technology experts, committed to providing you the best.")}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-10">
        {/* Card 1 */}
        <div className="bg-white text-mainColor flex justify-center items-center flex-col p-6 rounded-lg shadow-lg w-64 md:w-80">
          <FaLightbulb className="text-7xl text-mainColor mb-6" />
          <p className="text-center text-lg font-medium">{t("We bring your digital visions to life.")} </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white text-mainColor flex justify-center items-center flex-col p-6 rounded-lg shadow-lg w-64 md:w-80">
          <FaCheckCircle className="text-7xl text-mainColor mb-6" />
          <p className="text-center text-lg font-medium">{t("Our software is built to the highest standards.")}</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white text-mainColor flex justify-center items-center flex-col p-6 rounded-lg shadow-lg w-64 md:w-80">
          <FaHeadset className="text-7xl text-mainColor mb-6" />
          <p className="text-center text-lg font-medium">{t("Our support team is available around the clock.")}</p>
        </div>
      </div>
    </section>
 {/* Plan 4 */}
<Plan id='plan'/>
 {/* Features 6 */}

<Features id={'features'}/>
 
{/* section CustomerReviewsSlider  */}
<CustomerReviewsSlider/>
{/* section LearnMoreSection */}
<LearnMoreSection/>
{/* section Contact us  */}
<ContactSection id={'contactUs'}/>
<Footer/>



    </div>
  );
};

export default PublicPage;
