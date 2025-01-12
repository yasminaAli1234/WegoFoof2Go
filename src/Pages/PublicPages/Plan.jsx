import React, { useTransition } from "react";
import { useTranslation } from "react-i18next";

const Plan = ({ id }) => {
  const {t} = useTranslation()
  return (
    <section id={id} className="bg-mainColor text-white py-20 px-10">
      <div className="text-start mb-16">
        <h1 className="text-5xl font-extrabold">{t("Find the plan that meets your needs")}</h1>
        <p className="text-lg mt-4">
          {t("Explore our diverse plans and select the one that best suits your needs. Click")}
          <strong className="ml-2">{t("Start Now")}</strong> {t("to learn more.")}
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-10">
        {/* Left Card (Basic Plan) */}
        <div className="text-white  border border-white p-6 rounded-lg shadow-lg w-72 md:w-96 relative hover:scale-105 transition-transform">
          <h2 className="text-2xl font-bold text-center mb-4">{t("Basic")}</h2>
          <ul className="text-left mb-4 text-gray-300">
            <li>
           {t("An e-commerce platform offering a wide range of products, secure payment options, fast shipping, and 24/7 customer support.")}
            </li>
          </ul>
          <h1 className="text-lg font-semibold">{t("Number of stores:")} <strong className="ml-2">{t("1")}</strong></h1>
          <h1 className="text-lg font-semibold mt-2">{t("Setup Fees:")} <strong className="ml-2">{t("0")} {t("EGP")}</strong></h1>
          <button className="absolute py-4 bottom-0 left-0 text-lg font-medium border rounded-b-lg bg-secoundColor text-mainColor hover:bg-blue-200 transition-colors w-full">
            {t("Start Now")}
          </button>
        </div>

        {/* Middle Card (Professional Plan) */}
        <div className="bg-gradient-to-br bg-mainColor text-white h-[110vh] p-8 rounded-lg shadow-2xl w-80 md:w-96 relative scale-110 transition-transform">
          <span className="absolute top-[-15px] left-1/2 transform -translate-x-1/2  border  text-white text-lg font-semibold py-2 px-6 rounded-xl shadow-lg">
           {t("Best Seller")}
          </span>
          <h2 className="text-3xl font-bold text-center mb-6">{t("Professional")}</h2>
          <ul className="text-left mb-6">
            <li>
            {t("Enjoy advanced features like personalized recommendations, targeted marketing strategies, and premium support for an exceptional shopping experience.")}
            </li>
          </ul>
          <h1 className="text-lg font-semibold">{t("Number of stores:")} <strong className="ml-2">{t("1")}</strong></h1>
          <h1 className="text-lg font-semibold mt-2">{t("Setup Fees:")} <strong className="ml-2">{t("0")} {t('EGP')}</strong></h1>
          <button className="absolute py-4 bottom-0 left-0 text-lg font-medium border rounded-b-lg bg-mainColor text-white hover:bg-black transition-colors w-full">
{            t("Start Now")
}          </button>
        </div>

        {/* Right Card (Premium Plan) */}
        <div className="text-white  border border-white  p-6 rounded-lg shadow-lg w-72 md:w-96 relative hover:scale-105 transition-transform">
          <h2 className="text-2xl font-bold text-center mb-4">{t("Premium")}</h2>
          <ul className="text-left mb-4 text-gray-300">
            <li>
             {t("Access all features, including advanced analytics, seamless integrations, and priority support, for a top-tier experience.")}
            </li>
          </ul>
          <h1 className="text-lg font-semibold">{t("Number of stores:")} <strong className="ml-2">{t("1")}</strong></h1>
          <h1 className="text-lg font-semibold mt-2">{t("Setup Fees:")} <strong className="ml-2">{t("0")} {t("EGP")}</strong></h1>
          <button className="absolute py-4 bottom-0 left-0 text-lg font-medium border rounded-b-lg bg-secoundColor text-mainColor hover:bg-blue-200 transition-colors w-full">
            {t("Start Now")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Plan;
