import React, { useEffect, useRef, useState } from "react";
import logo from "../../../public/Images/logo white.png";
import home from "../../../src/assets/Images/assets/img/home.png";
import pc from "../../../src/assets/Images/assets/img/pc2.png";
import { Button } from "../../Components/Button";
import 'aos/dist/aos.css'; // AOS styles
import { Link, useNavigate } from "react-router-dom";
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
import AOS from 'aos';

import FeaturesPage from "./OurFeatureData";
import { FaLightbulb, FaCheckCircle, FaHeadset } from 'react-icons/fa';
import { CgMenu } from 'react-icons/cg';
import { useTranslation } from "react-i18next";
const PublicPage = () => {
         const dropdownRef = useRef(null)
         const navigate = useNavigate()
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
         const handleNavigate =()=>{
          navigate('/signUp')

         }
         useEffect(() => {
          // Initialize AOS with custom settings (optional)
          AOS.init({
            duration: 1000, // animation duration (milliseconds)
            easing: 'ease-in-out', // easing function
            once: false, // animation will happen only once (not repeat on scroll)
            mirror: true,
          });
        }, []);
  
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
<div className="bg-mainColor text-secoundColor">
  {/* Navigation Bar */}
  <nav
  className={`fixed w-full  flex justify-between z-10 transition-all duration-300 ${
    isScrolled ? 'bg-mainColor' : 'bg-mainColor'
  }`}
>
  <div className="w-2/6 lg:w-1/4 mt-4 flex lg:flex-row text-secoundColor  items-start justify-center py-4 px-4 text-xl font-semibold">
    <img
      src={logo}
      alt="wegoStore"
      className="max-w-full sm:max-w-[150px] md:max-w-[150px] h-auto object-contain"
    />
    <div className="lg:flex w-4/12 items-center py-1 gap-5 justify-center text-xl font-medium mr-3 text-secoundColor hover:cursor-pointer transition-all duration-300">
      <div className="relative" ref={dropdownRef}>
        <button
          className="flex items-center gap-1 justify-between text-2xl"
          onClick={handleClickOpen}
        >
          <CiGlobe className="text-secoundColor text-2xl" />
          <span className="flex items-center text-secoundColor font-medium">
            {t(i18n.language.toUpperCase())}
            <IoIosArrowDown
              className={`${open ? 'rotate-180' : 'rotate-0'} mt-1 ml-1 transition-all text-secoundColor duration-300`}
            />
          </span>
        </button>
        <div
          className={`${open ? 'block' : 'hidden'} absolute w-28 top-14 -left-3.5 bg-secoundColor rounded-xl border-2 overflow-hidden`}
        >
          <div
            className="flex items-center py-1 gap-1 justify-center text-xl font-medium text-mainColor hover:cursor-pointer hover:bg-mainColor hover:text-secoundColor transition-all duration-300"
            onClick={() => handleOptionClick('EN')}
          >
            <CiGlobe /> EN
          </div>
          <div
            className="flex items-center py-1 gap-1 justify-center text-xl font-medium text-mainColor hover:cursor-pointer hover:bg-mainColor hover:text-secoundColor transition-all duration-300"
            onClick={() => handleOptionClick('AR')}
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
      <span className={`absolute bottom-[-10px] left-0 h-[3px] bg-mainColor transition-all duration-300 ${
        activeLink === 'Home' ? 'w-[70%]' : 'w-0'
      }`}></span>
    </li>
    <li className="relative" onClick={() => handleClick('About Us')}>
      <a href="#section2" className="text-2xl transition-colors">{t("About Us")}</a>
      <span className={`absolute bottom-[-10px] left-0 h-[3px] bg-mainColor transition-all duration-300 ${
        activeLink === 'About Us' ? 'w-[70%]' : 'w-0'
      }`}></span>
    </li>
    <li className="relative" onClick={() => handleClick('Our features')}>
      <a href="#features" className="text-2xl transition-colors">{t("Our Features")}</a>
      <span className={`absolute bottom-[-10px] left-0 h-[3px] bg-mainColor transition-all duration-300 ${
        activeLink === 'Our features' ? 'w-[70%]' : 'w-0'
      }`}></span>
    </li>
    <li className="relative" onClick={() => handleClick('Plan')}>
      <a href="#plan" className="text-2xl transition-colors">{t("Plan")}</a>
      <span className={`absolute bottom-[-10px] left-0 h-[3px] bg-mainColor transition-all duration-300 ${
        activeLink === 'Plan' ? 'w-[70%]' : 'w-0'
      }`}></span>
    </li>
    <li className="relative" onClick={() => handleClick('Contact Us')}>
      <a href="#contactUs" className="text-2xl transition-colors">{t("Contact Us")}</a>
      <span className={`absolute bottom-[-10px] left-0 h-[3px] bg-mainColor transition-all duration-300 ${
        activeLink === 'Contact Us' ? 'w-[70%]' : 'w-0'
      }`}></span>
    </li>
  </ul>

  {/* Login/SignUp buttons on Desktop */}
  <div className="hidden lg:flex items-center gap-4 py-4">
    <Link to="/login">
      <button className="text-xl  text-white font-medium w-32 h-12 flex items-center justify-center border rounded-xl hover:bg-secoundColor hover:text-mainColor">
        {t("Login")}
      </button>
    </Link>
    <Link to="/signUp">
      <button className="text-xl font-medium w-32 h-12 flex items-center justify-center bg-secoundColor text-mainColor border rounded-xl hover:bg-mainColor hover:text-white">
        {t("SignUp")}
      </button>
    </Link>
  </div>

  {/* Hamburger Menu for Small Screens */}
  <div className="lg:hidden flex items-center justify-center px-4">
    <button onClick={toggleMenu}>
      <CgMenu className="text-3xl text-secoundColor" />
    </button>
  </div>
</nav>

{/* Mobile Menu */}
{menuOpen && (
  <div className="lg:hidden absolute top-0 left-0 w-full max-w-[90%] mx-auto z-50 bg-mainColor text-secoundColor py-6 rounded-lg shadow-lg">
    <div className="flex justify-end px-4">
      <button
        onClick={toggleMenu}
        className="text-xl flex justify-center items-center flex-col font-bold text-secoundColor bg-red-500 px-3 py-1 rounded-full hover:bg-red-600 transition-all duration-300"
      >
        X
      </button>
    </div>
    <ul className="flex flex-col items-start space-y-6 mx-5 mt-4">
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

    {/* Login / Sign Up Buttons inside Mobile Menu */}
    <div className="flex flex-col items-start mx-5 py-2 gap-5 w-4/6 lg:w-1/4">
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
    </div>
  </div>
)}





<section id="section1" className="h-screen flex flex-col lg:flex-row items-center justify-center bg-secoundColor text-mainColor px-6 sm:px-10 lg:px-16 py-12 w-fit">
  <div className="w-full lg:w-1/2 flex flex-col items-center text-center lg:text-left">
    {/* Heading */}
    <h1 className="font-semibold text-xl sm:text-2xl lg:text-4xl text-mainColor mb-4">
      {t("Design Your Perfect Website in One Click!")}
    </h1>

    {/* Paragraph */}
    <p className="font-normal text-sm sm:text-base lg:text-lg text-mainColor mb-6 lg:mb-8 mt-4 sm:mt-6">
      {t(
        "Enjoy a fast and easy process to create a stunning website that reflects your identity, with our flexible packages ensuring you a unique experience in no time. Choose what suits you and start your digital journey with confidence!"
      )}
    </p>

    <div className="flex items-center gap-4 flex-wrap">
      {/* Button 1 */}
      <button
        onClick={() => handleNavigate()}
        className="text-sm sm:text-lg font-medium py-2 sm:py-3 px-4 sm:px-6 lg:px-8 lg:py-4 border border-mainColor flex items-center rounded-xl bg-mainColor text-secoundColor hover:bg-blue-200 hover:text-mainColor transition-colors duration-300 w-full sm:w-auto"
      >
        {t("Explore Demo")}
        <span className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 ml-3 rounded-full bg-secoundColor text-mainColor transition-transform transform group-hover:translate-x-2">
          <FiArrowRight size={18} />
        </span>
      </button>

      {/* Button 2 */}
      <button
        onClick={() => handleNavigate()}
        className="text-sm sm:text-lg font-medium py-2 sm:py-3 px-4 sm:px-6 lg:px-8 lg:py-4 flex items-center border-2 rounded-xl border-mainColor bg-secoundColor text-mainColor hover:bg-blue-200 hover:text-mainColor transition-colors duration-300 w-full sm:w-auto"
      >
        {t("Start Now")}
        <span className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 ml-3 rounded-full bg-mainColor text-secoundColor transition-transform transform group-hover:translate-x-2">
          <FiArrowRight size={18} />
        </span>
      </button>
    </div>
  </div>

  {/* Image Section */}
  <div className="w-full lg:flex-1 mt-8 lg:mt-0 flex justify-center lg:justify-end">
    <img
      src={home}
      alt="Home"
      className="w-4/5 sm:w-3/4 lg:w-3/4 xl:w-2/3 lg:h-auto rounded-lg shadow-xl transition-transform duration-500 hover:scale-105"
    />
  </div>
</section>





{/* Section 2 */}
<section id="section2"  className="h-auto flex flex-col items-start justify-start w-full text-secoundColor text-3xl px-4">
  <div className="w-full">
    <div className="flex flex-col lg:flex-row justify-around items-center w-full bg-mainColor py-10">
      <div className="flex flex-col gap-3 items-center text-center">
        <h3 className="text-xl font-semibold text-secoundColor">{t("Active Subscriptions")}</h3>
        <span className="text-3xl font-bold text-secoundColor">{t("100+")}</span>
      </div>
      <div className="flex flex-col gap-3 items-center text-center">
        <h3 className="text-xl font-semibold text-secoundColor">{t("New Orders Count")}</h3>
        <span className="text-3xl font-bold text-secoundColor">{t("200+")}</span>
      </div>
      <div className="flex flex-col gap-3 items-center text-center">
        <h3 className="text-xl font-semibold text-secoundColor">{t("Websites Created")}</h3>
        <span className="text-3xl font-bold text-secoundColor">{t("50+")}</span>
      </div>
    </div>

    <div className="flex bg-secoundColor flex-col lg:flex-row justify-between items-start w-full py-10 mt-10 px-10">
      <div className="flex flex-col gap-6 items-start w-full md:w-1/2">
        <h1 className="text-3xl font-bold text-white">
          {t("Let's shape the digital future, together")}
        </h1>
        <ul className="list-none pl-6 text-lg text-mainColor">
          <li className="text-xl">{t("Customer-Centric: We prioritize understanding and meeting our clients' unique needs.")}</li>
          <li className="text-xl">{t("Tailored Solutions: We design custom software solutions to exceed client expectations.")}</li>
          <li className="text-xl">{t("Comprehensive Approach: We offer more than just technology products to help clients grow.")}</li>
          <li className="text-xl">{t("Strong Partnerships: We collaborate closely with clients to build their digital presence and increase efficiency.")}</li>
        </ul>
      </div>

      <div className="w-full md:w-1/2 h-[350px] lg:h-[400px] flex justify-center md:justify-end relative">
        <img src={pc} alt="Digital Future" className="w-full h-full object-cover rounded-lg opacity-80" />
      </div>
    </div>
  </div>
</section>


      {/* Sections 3 */}
      <section  className="bg-mainColor text-secoundColor py-20 border-b">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-semibold">{t("What Makes Us Different?")}</h2>
        <p className="text-xl mt-4">{t("Technology experts, committed to providing you the best.")}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-10">
        {/* Card 1 */}
        <div className="bg-secoundColor text-mainColor flex justify-center items-center flex-col p-6 rounded-lg shadow-lg w-64 md:w-80">
          <FaLightbulb className="text-7xl text-mainColor mb-6" />
          <p className="text-center text-lg font-medium">{t("We bring your digital visions to life.")} </p>
        </div>

        {/* Card 2 */}
        <div className="bg-secoundColor text-mainColor flex justify-center items-center flex-col p-6 rounded-lg shadow-lg w-64 md:w-80">
          <FaCheckCircle className="text-7xl text-mainColor mb-6" />
          <p className="text-center text-lg font-medium">{t("Our software is built to the highest standards.")}</p>
        </div>

        {/* Card 3 */}
        <div className="bg-secoundColor text-mainColor flex justify-center items-center flex-col p-6 rounded-lg shadow-lg w-64 md:w-80">
          <FaHeadset className="text-7xl text-mainColor mb-6" />
          <p className="text-center text-lg font-medium">{t("Our support team is available around the clock.")}</p>
        </div>
      </div>
    </section>


    <section className="py-12 bg-gradient-to-r  text-center">
  <div className="max-w-screen-xl mx-auto px-6">
    {/* Title */}
    <h2 className="text-4xl font-extrabold text-white mb-4">
      {t("Explore Our Demo Site!")}
    </h2>

    {/* Subtitle */}
    <p className="text-lg text-white mb-8 max-w-3xl mx-auto">
      {t(
        "Take a closer look at how our site can transform your business! See how our innovative programming services can help you achieve your goals. Click the button below to start exploring the demo and experience it firsthand."
      )}
    </p>

    {/* Sections as Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-between hover:bg-blue-200 transform hover:scale-105 transition duration-300 ease-in-out">
        <h3 className="text-xl font-semibold text-blue-900 mb-2">{t("Web Development")}</h3>
        <p className="text-gray-600 text-center mb-4">
          {t("Create stunning, user-friendly websites that elevate your brand and engage your audience.")}
        </p>
        <button
        onClick={handleNavigate}
        className="bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
          {t("Learn More")}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-between hover:bg-blue-200 transform hover:scale-105 transition duration-300 ease-in-out">
        <h3 className="text-xl font-semibold text-blue-900 mb-2">{t("Mobile App Development")}</h3>
        <p className="text-gray-600 text-center mb-4">
          {t("Develop mobile apps that deliver seamless experiences on both iOS and Android devices.")}
        </p>
        <button
        onClick={handleNavigate}
        className="bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
          {t("Learn More")}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-between hover:bg-blue-200 transform hover:scale-105 transition duration-300 ease-in-out">
        <h3 className="text-xl font-semibold text-blue-900 mb-2">{t("Consulting Services")}</h3>
        <p className="text-gray-600 text-center mb-4">
          {t("Let our experts guide you through complex business challenges with innovative solutions.")}
        </p>
        <button
        onClick={handleNavigate}
        className="bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
          {t("Learn More")}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-between hover:bg-blue-200 transform hover:scale-105 transition duration-300 ease-in-out">
        <h3 className="text-xl font-semibold text-blue-900 mb-2">{t("SEO Optimization")}</h3>
        <p className="text-gray-600 text-center mb-4">
          {t("Boost your site's visibility with our professional SEO services and drive more traffic.")}
        </p>
        <button
        onClick={handleNavigate}
        className="bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
          {t("Learn More")}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-between hover:bg-blue-200 transform hover:scale-105 transition duration-300 ease-in-out">
        <h3 className="text-xl font-semibold text-blue-900 mb-2">{t("Cloud Solutions")}</h3>
        <p className="text-gray-600 text-center mb-4">
          {t("Get scalable, secure, and flexible cloud solutions that support your business growth.")}
        </p>
        <button
        onClick={handleNavigate}
        className="bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
          {t("Learn More")}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-between hover:bg-blue-200 transform hover:scale-105 transition duration-300 ease-in-out">
        <h3 className="text-xl font-semibold text-blue-900 mb-2">{t("E-commerce Solutions")}</h3>
        <p className="text-gray-600 text-center mb-4">
          {t("Build your e-commerce platform with seamless transactions and enhanced user experience.")}
        </p>
        <button 
        onClick={handleNavigate}
        className="bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
          {t("Learn More")}
        </button>
      </div>
    </div>

    {/* Call to Action Button */}
    <button
    onClick={handleNavigate}
    className="bg-blue-900 text-white py-3 px-8 rounded-lg shadow-xl hover:bg-blue-700 hover:scale-105 inline-flex items-center transition duration-300 ease-in-out">
      {t("Start Exploring")}
      <span className="ml-2 text-lg">🚀</span>
    </button>
  </div>
</section>



    {/*section  */}

    <section className=" bg-secoundColor mx-auto py-16 px-6">
  {/* Main Heading */}
  <h2 className="text-4xl text-mainColor font-bold text-center mb-4">
    {t("Together, We Build the Future")}
  </h2>
  {/* Subheading */}
  <h3 className="text-2xl font-semibold text-center text-blue-900 mb-12">
    {t("of Digital Innovation")}
  </h3>

  {/* Cards Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 text-mainColor lg:grid-cols-3 gap-8">
    {/* Card 1 */}
    <div className="flex flex-col items-center text-center p-6 border border-mainColor bg-gray-50 rounded-lg shadow-md">
      <div className="text-4xl text-blue-500 mb-4">📞</div>
      <h3 className="text-xl font-bold mb-2">{t("Customer-Centric")}</h3>
      <p className="text-gray-600">
        {t("We focus on understanding and exceeding client needs.")}
      </p>
    </div>
    {/* Card 2 */}
    <div className="flex flex-col items-center text-center p-6 border border-mainColor bg-gray-50 rounded-lg shadow-md">
      <div className="text-4xl text-green-500 mb-4">🎯</div>
      <h3 className="text-xl font-bold mb-2">{t("Tailored Solutions")}</h3>
      <p className="text-gray-600">
        {t("Custom software to align perfectly with your goals.")}
      </p>
    </div>
    {/* Card 3 */}
    <div className="flex flex-col items-center text-center p-6 border border-mainColor bg-gray-50 rounded-lg shadow-md">
      <div className="text-4xl text-purple-500 mb-4">💡</div>
      <h3 className="text-xl font-bold mb-2">{t("Innovative Technologies")}</h3>
      <p className="text-gray-600">
        {t(
          "Empowering businesses with cutting-edge solutions to stay ahead in a digital-first world."
        )}
      </p>
    </div>
    {/* Card 4 */}
    <div className="flex flex-col items-center text-center p-6 border border-mainColor bg-gray-50 rounded-lg shadow-md">
      <div className="text-4xl text-red-500 mb-4">🌟</div>
      <h3 className="text-xl font-bold mb-2">{t("Comprehensive Approach")}</h3>
      <p className="text-gray-600">
        {t("Beyond technology, we drive business growth.")}
      </p>
    </div>
    {/* Card 5 */}
    <div className="flex flex-col items-center text-center p-6 border border-mainColor bg-gray-50 rounded-lg shadow-md">
      <div className="text-4xl text-yellow-500 mb-4">🤝</div>
      <h3 className="text-xl font-bold mb-2">{t("Strong Partnerships")}</h3>
      <p className="text-gray-600">
        {t("Working closely to maximize efficiency and impact.")}
      </p>
    </div>
    {/* Card 6 */}
    <div className="flex flex-col items-center text-center p-6 border border-mainColor bg-gray-50 rounded-lg shadow-md">
      <div className="text-4xl text-indigo-500 mb-4">🚀</div>
      <h3 className="text-xl font-bold mb-2">{t("Your Vision, Our Mission")}</h3>
      <p className="text-gray-600">
        {t(
          "Turning your ideas into impactful digital experiences with precision and expertise."
        )}
      </p>
    </div>
  </div>
</section>

{/* section video */}
<section className="max-w-screen-xl mx-auto py-12 px-6 flex flex-col items-center space-y-6">
  {/* Heading */}
  <h2 className="text-3xl font-bold text-center">
    {t("Learn About Our Site in Minutes")}
  </h2>

  {/* Paragraph */}
  <p className="text-lg text-center max-w-2xl">
    {t(
      "A short video explaining how you can benefit from our programming services. Enjoy a quick tour of our site's features."
    )}
  </p>

  {/* Video */}
  <div className="w-full max-w-4xl aspect-video">
    <iframe
      src="https://www.youtube.com/embed/example-video-id" // Replace with your video URL
      title="Site Tour Video"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="w-full h-full rounded-lg shadow-md"
    ></iframe>
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
