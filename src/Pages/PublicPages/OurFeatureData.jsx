import React from "react";
import { useTranslation } from "react-i18next";

import { FaRegThumbsUp, FaUsers, FaShoppingCart, FaLanguage, FaGift, FaRegClock, FaRegNewspaper, FaTools, FaHeart, FaCreditCard, FaPhoneAlt, FaSearch, FaStar, FaCommentAlt, FaArrowCircleDown, FaLock, FaChartLine } from "react-icons/fa"; // Importing icons from react-icons

const featuresData = [
  {
    icon: <FaRegThumbsUp />,

    title: "Log in via social media",
    description: "Register your customers in your store easily and quickly using their accounts on their favorite social media platforms, saving them time and effort."
  },
  {
    icon: <FaUsers />,
    title: "Share on social media",
    description: "Encourage your customers to share the products they love with their friends and families on social media platforms, increasing your store's reach to a wider audience."
  },
  {
    icon: <FaShoppingCart />,
    title: "Featured Product",
    description: "Highlight your best-selling or newest arrivals in an engaging way, attracting visitors' attention and encouraging them to make a purchase"
  },
  {
    icon: <FaLanguage />,
    title: "Support multiple languages",
    description: "Engage with your customers in their native language by providing support for multiple languages in your store, enhancing the shopping experience and making them feel at home."
  },
  {
    icon: <FaGift />,
    title: "Publish videos of the products",
    description: "Use the power of video to showcase your products in more detail and persuasively, helping customers make purchasing decisions."
  },
  {
    icon: <FaRegClock />,
    title: "Smart Product Search",
    description: "Make it easy for your customers to quickly and easily find the products they are looking for through the smart search feature that suggests related options as they type."
  },
  {
    icon: <FaRegNewspaper />,
    title: "Customer Reviews",
    description: "Encourage customers to share their opinions and comments about the products they purchased, increasing the credibility of your store and gaining the trust of new customers."
  },
  {
    icon: <FaTools />,
    title: "Today's Offers",
    description: "Offer special deals and discounts on specific products every day to attract customers and increase sales."
  },
  {
    icon: <FaHeart />,
    title: "Supporting multiple currencies",
    description: "Expand your business scope and serve customers from around the world by supporting multiple currencies, making the purchasing process easier."
  },
  {
    icon: <FaCreditCard />,
    title: "Product Comparison",
    description: "Allow your customers to compare various products based on price and specifications, helping them make an informed purchasing decision"
  },
  {
    icon: <FaPhoneAlt />,
    title: "Wishlist",
    description: "Allow your customers to add products they like to their wishlist, making it easier for them to come back to it later to complete the purchase."
  },
  {
    icon: <FaSearch />,
    title: "Flash Sales",
    description: "Present limited-time flash sales on specific products to create a sense of urgency with customers and encourage quick purchases."
  },
  {
    icon: <FaStar />,
    title: "Dynamic Home Page",
    description: "Customize your store's home page to display products and offers most relevant to each customer, increasing their interaction with your store."
  },
  {
    icon: <FaCommentAlt />,
    title: "Pay with Visa cards",
    description: "Offer your customers secure and convenient payment options by accepting payments with Visa cards."
  },
  {
    icon: <FaArrowCircleDown />,
    title: "Smart Payment System",
    description: "Use a secure and efficient payment system to protect your customers' data and ensure a smooth shopping experience."
  },
  {
    icon: <FaLock />,
    title: "Responsive website",
    description: "Make sure your store works well on all mobile devices, allowing customers to shop from anywhere, at any time"
  },
  {
    icon: <FaChartLine />,
    title: "Multiple shipping methods",
    description: "Offer your customers a variety of shipping options to meet their diverse needs."
  },
  {
    icon: <FaUsers />,  // Updated icon for online payment via credit cards
    title: "Online payment via credit cards",
    description: "Allow your customers to securely and directly pay online with credit cards."
  },
  {
    icon: <FaCommentAlt />,  // Updated icon for multiple shipping methods
    title: "Multiple shipping methods",
    description: "Offer your customers a variety of shipping options to meet their diverse needs."
  },
  {
    icon: <FaCreditCard />,  // Updated icon for online payment with credit cards
    title: "Online payment with credit cards",
    description: "Allow your customers to securely and directly pay online with credit cards."
  }
];

const FeaturesPage = () => {
  const {t} = useTranslation();
  return (
    <section  className="py-16 px-10 ml-30" >
      {/* Section Title */}
      <h2 className="text-3xl font-bold text-center mb-4 text-white">{t("Our Features")}</h2>
      <p className="text-center text-lg text-white mb-8">
        {t("Technology experts, committed to providing you with the best.")}
      </p>

      {/* Feature Rows */}
      <div className="flex flex-col gap-16">
        {featuresData.map((feature, index) => {
          const isOddRow = index % 2 !== 0;
          return (
            <div
              key={index}
              className={`flex ${isOddRow ? "flex-row" : "flex-row-reverse"} items-center justify-center gap-8`}
            >
              <div className="w-1/2 text-center text-8xl text-white">
                {feature.icon} {/* Display icon here */}
              </div>
              <div className="w-1/2">
                <h3 className="text-2xl font-semibold text-white mb-2">
                  {t(`${feature.title}`)}
                </h3>
                <p className="text-white w-[80%]">{t(`${feature.description}`)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturesPage;
