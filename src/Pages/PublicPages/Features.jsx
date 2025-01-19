import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import AOS from 'aos';
import 'aos/dist/aos.css'; // AOS styles
import {
  FaRegThumbsUp,
  FaUsers,
  FaShoppingCart,
  FaLanguage,
  FaGift,
  FaRegClock,
  FaRegNewspaper,
  FaTools,
  FaHeart,
  FaCreditCard,
  FaPhoneAlt,
  FaSearch,
  FaStar,
  FaCommentAlt,
  FaArrowCircleDown,
  FaLock,
  FaChartLine,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Features = () => {
  const featuresData = [
    { icon: <FaRegThumbsUp />, title: "Log in via social media" },
    { icon: <FaUsers />, title: "Share on social media" },
    { icon: <FaShoppingCart />, title: "Featured Product" },
    { icon: <FaLanguage />, title: "Support multiple languages" },
    { icon: <FaGift />, title: "Publish videos of the products" },
    { icon: <FaRegClock />, title: "Smart Product Search" },
    { icon: <FaRegNewspaper />, title: "Customer Reviews" },
    { icon: <FaTools />, title: "Today's Offers" },
    { icon: <FaHeart />, title: "Supporting multiple currencies" },
    { icon: <FaCreditCard />, title: "Product Comparison" },
    { icon: <FaPhoneAlt />, title: "Wishlist" },
    { icon: <FaSearch />, title: "Flash Sales" },
    { icon: <FaStar />, title: "Dynamic Home Page" },
    { icon: <FaCommentAlt />, title: "Pay with Visa cards" },
    { icon: <FaArrowCircleDown />, title: "Smart Payment System" },
    { icon: <FaLock />, title: "Responsive website" },
    { icon: <FaChartLine />, title: "Multiple shipping methods" },
    { icon: <FaUsers />, title: "Online payment via credit cards" },
    { icon: <FaCommentAlt />, title: "Multiple shipping methods" },
    { icon: <FaCreditCard />, title: "Online payment with credit cards" },
  ];
const {t} = useTranslation();
  // Function to handle navigation
  useEffect(() => {
    // Initialize AOS with custom settings (optional)
    AOS.init({
      duration: 1000, // animation duration (milliseconds)
      easing: 'ease-in-out', // easing function
      once: false, // animation will happen only once (not repeat on scroll)
      mirror: true,
    });
  }, []);

  return (
    <section className="features px-2 mt-10 ">
   <div className="flex flex-wrap justify-center text-secoundColor gap-10">
  {featuresData.map((feature, index) => (
    <Link
   to='features'
      key={index}
       className="w-64 md:w-48 lg:w-1/5 p-6 bg-secoundColor border border-gray-300 rounded-lg shadow-lg">
    
      <div className="icon flex items-center text-mainColor justify-center text-8xl w-full h-32 mb-4">
        {feature.icon}
      </div>
      <h3 className="text-center text-mainColor text-lg font-semibold">{t(feature.title)}</h3>
    </Link>
  ))}
</div>

    </section>
  );
};

export default Features;
