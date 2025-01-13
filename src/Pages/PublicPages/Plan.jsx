import React, { useTransition } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Plan = ({ id }) => {
  const {t} = useTranslation()
  const navigate = useNavigate();
  const handleNavigate =()=>{
    navigate('/login')

   }
  return (
    <section id={id} className="bg-mainColor text-white py-10 px-5">
    <div className="text-start mb-12">
      <h1 className="text-3xl md:text-5xl font-extrabold">
        {t("Find the plan that meets your needs")}
      </h1>
      <p className="text-base md:text-lg mt-4">
        {t(
          "Explore our diverse plans and select the one that best suits your needs. Click"
        )}
        <strong
          onClick={handleNavigate}
          className="ml-2 cursor-pointer text-blue-400"
        >
          {t("Start Now")}
        </strong>{" "}
        {t("to learn more.")}
      </p>
    </div>
  
    <div className="flex flex-col items-center gap-6 lg:grid lg:grid-cols-3 lg:justify-items-center">
      {/* Basic Plan */}
      <div className="text-white border border-white p-4 rounded-lg shadow-lg w-full sm:w-80 lg:w-96 relative hover:scale-105 transition-transform">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-4">
          {t("Basic")}
        </h2>
        <ul className="text-left mb-4 text-gray-300 text-sm md:text-base">
          <li>
            {t(
              "An e-commerce platform offering a wide range of products, secure payment options, fast shipping, and 24/7 customer support."
            )}
          </li>
        </ul>
        <h1 className="text-sm md:text-lg font-semibold">
          {t("Number of stores:")}{" "}
          <strong className="ml-2">{t("1")}</strong>
        </h1>
        <h1 className="text-sm md:text-lg font-semibold mt-2">
          {t("Setup Fees:")}{" "}
          <strong className="ml-2">
            {t("0")} {t("EGP")}
          </strong>
        </h1>
        <button
          onClick={handleNavigate}
          className="absolute py-3 bottom-0 left-0 text-sm md:text-lg font-medium border rounded-b-lg bg-secoundColor text-mainColor hover:bg-blue-200 transition-colors w-full"
        >
          {t("Start Now")}
        </button>
      </div>
  
      {/* Professional Plan */}
      <div className="bg-gradient-to-br from-mainColor to-gray-900 text-white p-6 rounded-lg shadow-2xl w-full sm:w-80 lg:w-96 relative hover:scale-105 transition-transform">
        <span className="absolute top-[-15px] left-1/2 transform -translate-x-1/2 border text-white text-sm md:text-lg font-semibold py-2 px-6 rounded-xl shadow-lg">
          {t("Best Seller")}
        </span>
        <h2 className="text-xl md:text-3xl font-bold text-center mb-4">
          {t("Professional")}
        </h2>
        <ul className="text-left mb-4 text-sm md:text-base">
          <li>
            {t(
              "Enjoy advanced features like personalized recommendations, targeted marketing strategies, and premium support for an exceptional shopping experience."
            )}
          </li>
        </ul>
        <h1 className="text-sm md:text-lg font-semibold">
          {t("Number of stores:")}{" "}
          <strong className="ml-2">{t("1")}</strong>
        </h1>
        <h1 className="text-sm md:text-lg font-semibold mt-2">
          {t("Setup Fees:")}{" "}
          <strong className="ml-2">
            {t("0")} {t("EGP")}
          </strong>
        </h1>
        <button
          onClick={handleNavigate}
          className="absolute py-3 bottom-0 left-0 text-sm md:text-lg font-medium border rounded-b-lg bg-mainColor text-white hover:bg-blue-500 transition-colors w-full"
        >
          {t("Start Now")}
        </button>
      </div>
  
      {/* Premium Plan */}
      <div className="text-white border border-white p-4 rounded-lg shadow-lg w-full sm:w-80 lg:w-96 relative hover:scale-105 transition-transform">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-4">
          {t("Premium")}
        </h2>
        <ul className="text-left mb-4 text-gray-300 text-sm md:text-base">
          <li>
            {t(
              "Access all features, including advanced analytics, seamless integrations, and priority support, for a top-tier experience."
            )}
          </li>
        </ul>
        <h1 className="text-sm md:text-lg font-semibold">
          {t("Number of stores:")}{" "}
          <strong className="ml-2">{t("1")}</strong>
        </h1>
        <h1 className="text-sm md:text-lg font-semibold mt-2">
          {t("Setup Fees:")}{" "}
          <strong className="ml-2">
            {t("0")} {t("EGP")}
          </strong>
        </h1>
        <button
          onClick={handleNavigate}
          className="absolute py-3 bottom-0 left-0 text-sm md:text-lg font-medium border rounded-b-lg bg-secoundColor text-mainColor hover:bg-blue-200 transition-colors w-full"
        >
          {t("Start Now")}
        </button>
      </div>
    </div>
  </section>
  
  );
};

export default Plan;
