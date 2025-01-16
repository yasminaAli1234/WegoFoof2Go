import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, updateCartItem ,removeFromCart} from '../../../Redux/CartSlice.js';
import axios from 'axios';
import { useAuth } from "../../../Context/Auth";
import Loading from '../../../Components/Loading.jsx';
import { useTranslation } from 'react-i18next';
import { convertNumberToArabic } from '../../../Components/convert_number';

const CartPage = () => {
  const auth = useAuth();
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState({});
  // const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  const {t,i18n} = useTranslation()

  const fetchData = async () => {
    setIsLoading(true);
        try {
        const response = await axios.get(' https://login.wegostores.com/user/v1/welcome_offer', {
            headers: {
                Authorization: `Bearer ${auth.user.token}`,
            },
          });
      if (response.status === 200) {
        console.log(response.data.welcome_offer)
        setData(response.data.welcome_offer);
      } else {
        console.error('Error fetching data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + (item.finalprice || item.price || 0), 0)
      .toFixed(2);
  };

  const handleApplyPromo = async () => {
    if (!promoCode) {
      auth.toastError("Please enter a promo code.");
      return;
    }

    setIsLoading(true);

    const formattedData = {
      code: promoCode,
      plan: cartItems
        .filter((item) => item.id && item.billingPeriod)
        .map((item) => ({
          plan_id: item.id,
          duration: item.billingPeriod,
          price: item.price_per_month || item.price_per_year || 0,
        })),
      extra: cartItems
        .filter((item) => item.name && item.price && !item.billingPeriod)
        .map((item) => ({
          extra_id: item.id,
          price: item.price,
        })),
      domain: [],
    };

    try {
      const response = await axios.post(
        " https://login.wegostores.com/user/v1/promocode",
        formattedData,
        {
          headers: {
            Authorization: `Bearer ${auth.user.token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data)
        const { discount } = response.data; // Extract the discount
        setDiscount(discount); // Update the discount state
        const newTotal = totalPrice - discount; // Calculate the discounted total
        setDiscountedPrice(newTotal); // Update state with the new total
        auth.toastSuccess(`Promo code applied! You saved ${discount} EGP.`);
        setPromoCode("");
      } else {
        auth.toastError("Failed to apply promo code. Please try again.");
      }
    } catch (error) {
      console.error("Error applying promo code:", error);
      auth.toastError("Invalid promo code.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBillingPeriodChange = (itemId, newPeriod, item) => {


    const priceOptions = {
      monthly: item.monthly,
      quarterly: item.quarterly || item.monthly * 3,
      semiAnnually: item["semi_annual"] || item.monthly * 6,
      annually: item.yearly || item.monthly * 12,
    };
    const discountOptions = {
        monthly: item.discount_monthly,
        quarterly: item.discount_quarterly,
        semiAnnually: item.discount_semi_annual,
        annually: item.discount_yearly,
    };

    const updatedItem = {
      ...item,
      billingPeriod: newPeriod,
      // finalprice: priceOptions[newPeriod],
      finalprice: (discountOptions[newPeriod] 
        ? discountOptions[newPeriod]
        : priceOptions[newPeriod]) + item.setup_fees,
    };

    dispatch(updateCartItem({ id: itemId, type: item.type, updatedItem }));
  };

  const handleRemoveItem = (item) => {
    dispatch(removeFromCart(item));
  
    if (item.type === "plan") {
      localStorage.removeItem('selectedPlanId');
    } else if (item.type === "domain") {
      localStorage.removeItem('selectedDomainId');
    } else if (item.type === "extra") {
      // Retrieve the array from localStorage
      const selectedProductIds = JSON.parse(localStorage.getItem('selectedProductIds')) || [];
      
      // Remove the specific id from the array
      const updatedProductIds = selectedProductIds.filter(id => id !== item.id);
  
      // Update the array in localStorage
      if (updatedProductIds.length > 0) {
        localStorage.setItem('selectedProductIds', JSON.stringify(updatedProductIds));
      } else {
        localStorage.removeItem('selectedProductIds'); // Remove key if the array is empty
      }
    }
  };
  
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const totalPrice = calculateTotal();

  if (isLoading) {
    return (
      <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
        <Loading />
      </div>
    );
}    
  
if (!data) {
    return <div className='text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center'>No plans data available</div>;
}


  return (

  <div className='flex flex-col bg-gray-50 w-full p-4 xl:p-6'>
    <div>
    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">{t("Shopping Cart")}</h1>
    </div>
    <div className="xl:container w-full m-0 xl:mx-auto flex flex-wrap gap-6 lg:flex-nowrap">
      {/* Left Section */}
      <div className="w-full lg:w-2/3">
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col border-b border-gray-200 py-4 last:border-none"
              >
                <div className="flex md:flex-row sm:flex-col gap-5 justify-between items-center">
                  <div className='flex flex-col'>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">{t("Product Type :")} {(item.type)}</h3>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">{t("Product Name :")} {item.name}</h3>
                  </div>
                  {/* <p className="text-base sm:text-lg font-semibold text-gray-800">
                    {(item.finalprice || item.price || 0).toFixed(2)} EGP
                  </p> */}
                  <div className='flex flex-col'>
                  <p className="text-base sm:text-lg font-semibold text-gray-800">
                  {t("One time setup fees :")} {(convertNumberToArabic(item.setup_fees ,i18n.language)|| 0)} {t("EGP")}
                  </p>
                  {
                    item.welcome_offer_price?
                    <p className="text-base sm:text-lg font-semibold text-gray-800">
                    {item.billingPeriod } {t("subscription")} : {(convertNumberToArabic(item.welcome_offer_price) || 0)} {t("EGP")}
                    </p>
                    : 
                    <p className="text-base sm:text-lg font-semibold text-gray-800">
                  {item.billingPeriod } {t("subscription")} : {(convertNumberToArabic(item.finalprice - item.setup_fees,i18n.language) || convertNumberToArabic(item.price,i18n.language) || 0)} {t("EGP")}
                  </p> 
                  }

                  {
                    item.welcome_offer_price && item.welcome_offer_plan===true && (
                      <p className="text-base sm:text-lg font-bold text-mainColor">
                      {t("Price In Welcome Offer")} : {(convertNumberToArabic(item.finalprice) || 0)} {t("EGP")}
                      </p> 
                    )
                  }
                  {/* <p className="text-base sm:text-lg font-semibold text-gray-800">
                  {item.billingPeriod } {t("subscription")} : {(convertNumberToArabic(item.finalprice - item.setup_fees,i18n.language) || convertNumberToArabic(item.price,i18n.language) || 0)} {t("EGP")}
                  </p> */}
                  </div>
                </div>
                {item.type === "plan" && (item.welcome_offer_plan !== true)&& (
                  <div className="flex flex-wrap items-center mt-3 sm:mt-4">
                    <label className="text-sm font-semibold text-gray-600 mr-3">
                      {t("Billing Period:")}
                    </label>
                    <select
                      value={item.billingPeriod || "monthly"}
                      onChange={(e) =>
                        handleBillingPeriodChange(item.id, e.target.value, item)
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-700 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">{convertNumberToArabic(3,i18n.language)} Months</option>
                      <option value="semiAnnually">{convertNumberToArabic(6,i18n.language)} Months</option>
                      <option value="annually">Yearly</option>
                    </select>
                  </div>

                  
                )}
                 {item.type === "extra" && item.status === "recurring" &&(
                  <div className="flex flex-wrap items-center mt-3 sm:mt-4">
                    <label className="text-sm font-semibold text-gray-600 mr-3">
                      {t("Billing Period:")}
                    </label>
                    <select
                      value={item.billingPeriod || "monthly"}
                      onChange={(e) =>
                        handleBillingPeriodChange(item.id, e.target.value, item)
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-700 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">{convertNumberToArabic(3,i18n.language)} Months</option>
                      <option value="semiAnnually">{convertNumberToArabic(6,i18n.language)} Months</option>
                      <option value="annually">Yearly</option>
                    </select>
                  </div>
                )}
                <div className="flex justify-between items-center mt-3">
                  <button
                    onClick={() => handleRemoveItem(item)}
                    className="text-red-500 font-semibold hover:underline"
                  >
                    {t("Remove")}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-6">{t("Your cart is empty.")}</p>
          )}
        </div>
    
        {cartItems.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-4">
            <button
              onClick={handleClearCart}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold text-base sm:text-lg transition"
            >
              {t("Clear Cart")}
            </button>
            <Link
              to="../checkout"
              state={{ cartItems, totalPrice }}
              className="flex-1"
            >
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold text-base sm:text-lg transition">
                {t("Proceed to Checkout")}
              </button>
            </Link>
          </div>
        )}
      </div>
    
      {/* Right Section */}
      <div className="w-full lg:w-1/3 space-y-6">
        {/* Order Summary */}
        <div className="bg-white p-2 xl:p-4 shadow-md rounded-lg">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">{t("Order Summary")}</h3>
          <div className="flex justify-between text-base sm:text-lg mb-3">
            <span>{t("price")}:</span>
            <span>{convertNumberToArabic(totalPrice,i18n.language)} {t("EGP")}</span>
          </div>
          <div className="flex justify-between text-base sm:text-lg text-red-500 mb-3">
            <span>{t("Discount")}:</span>
            <span>-{convertNumberToArabic(discount,i18n.language)} {t("EGP")}</span>
          </div>
          <div className="flex justify-between text-base sm:text-lg font-bold text-green-600">
            <span>{t("Total After Discount:")}</span>
            <span>{convertNumberToArabic(discountedPrice,i18n.language) || convertNumberToArabic(totalPrice,i18n.language)} {t("EGP")}</span>
          </div>
        </div>

          {/* Promo Code */}
          <div className="bg-white p-2 xl:p-4 shadow-md rounded-lg">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">{t("")}</h3>
          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder={t("Enter promo code")}
              className="flex-1 text-base sm:text-lg px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleApplyPromo}
              className="px-6 py-2 text-base sm:text-lg bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
            >
             {isLoading ? t("Applying...") : t("Apply")}
            </button>
          </div>
        </div>
    
      </div>
    </div>
  </div>
  
  
  );
};

export default CartPage;
