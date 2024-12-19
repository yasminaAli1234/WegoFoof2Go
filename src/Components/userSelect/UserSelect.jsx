import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Context/Auth';
import Loading from '../Loading';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../Redux/CartSlice.js';
import { PiStorefront } from "react-icons/pi";
import { CiMoneyCheck1 } from "react-icons/ci";
import { useNavigate, Link } from 'react-router-dom';  // Import useNavigate
import { FaCrown } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import {ButtonAdd} from '../Button.jsx'

const UserSelect = () => {
    
  const [select, setSelect] = useState(localStorage.getItem('selectedLanguage')); // Retrieve language from localStorage
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [click, setClick] = useState(localStorage.getItem('popupClosed') === 'true'); // Track popup visibility
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage') || 'en'); // Default to 'en'
  const [userData, setUserData] = useState('');
  const [userPlanId, setUserPlanId] = useState('');
  const {t,i18n} = useTranslation();
  const dispatch = useDispatch();
  const [billingPeriod, setBillingPeriod] = useState({});
  const [selectedPlanId, setSelectedPlanId] = useState(null)
  const navigate = useNavigate(); 
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to toggle expanded state
  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const fetchData = async () => {
    setIsLoading(true);
        try {
        const response = await axios.get(' https://www.wegostores.com/user/v1/welcome_offer', {
            headers: {
                Authorization: `Bearer ${auth.user.token}`,
            },
          });
      if (response.status === 200) {
        console.log(response.data)
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

  useEffect(() => {
    const savedPlanId = localStorage.getItem('selectedPlanId');
    if (savedPlanId) {
        setSelectedPlanId(savedPlanId);
    }
  }, [data]);

  const ProfilefetchData = async () => {
    setIsLoading(true);
    try {
        const response = await axios.get(' https://www.wegostores.com/user/v1/profile', {
            headers: {
                Authorization: `Bearer ${auth.user.token}`,
            },
        });
        if (response.status === 200) {
            console.log(response.data)
            setUserData(response.data.user);
            setUserPlanId(response.data.user.plan_id);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        setIsLoading(false);
    }
    };

    useEffect(()=>{
      ProfilefetchData()
    },[])


  const handleLanguageSelect = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('selectedLanguage', newLanguage);
  };

  const handleImageClick = () => {
    setClick(true);
    localStorage.setItem('popupClosed', 'true'); // Mark popup as closed
  };
  const handleBillingPeriodChange = (planId, newPeriod) => {
    setBillingPeriod((prev) => ({ ...prev, [planId]: newPeriod }));
};

    const handleAddToCart = async (plan, event) => {
      if (event) event.preventDefault();

      setIsLoading(true);

      try {
          const response = await axios.post(
              ' https://www.wegostores.com/user/v1/cart/pending',
              {
                  id: plan.id, // Properly include plan.id as a key-value pair
                  type: "plan",
              },
              {
                  headers: {
                      Authorization: `Bearer ${auth.user.token}`,
                      'Content-Type': 'application/json', // Explicitly specify JSON content type
                  },
              }
          );

          const data = response.data;

          if (response.status === 200 && data.success === "You can buy it") {
              // Calculate price options
              const selectedPeriod = billingPeriod[plan.id] || 'monthly';
              const priceOptions = {
                  monthly: plan.monthly,
                  quarterly: plan.quarterly || plan.monthly * 3,
                  semiAnnually: plan["semi_annual"] || plan.monthly * 6,
                  annually: plan.yearly,
              };

              const discountOptions = {
                  monthly: plan.discount_monthly,
                  quarterly: plan.discount_quarterly,
                  semiAnnually: plan.discount_semi_annual,
                  annually: plan.discount_yearly,
              };

              const currentPrice = discountOptions[selectedPeriod]
                  ? discountOptions[selectedPeriod]
                  : priceOptions[selectedPeriod];

              const planWithPeriodAndPrice = {
                  ...plan,
                  billingPeriod: selectedPeriod,
                  finalprice: currentPrice + plan.setup_fees,
              };

              // Update cart based on the selected plan
              if (selectedPlanId === plan.id) {
                  setSelectedPlanId(null);
                  dispatch(removeFromCart(planWithPeriodAndPrice));
                  localStorage.removeItem('selectedPlanId');
              } else {
                  if (selectedPlanId !== null) {
                      const previousPlan = (plan.id === selectedPlanId);
                      const previousPrice = priceOptions[billingPeriod[previousPlan.id] || 'monthly'];
                      const previousPlanWithPeriodAndPrice = {
                          ...previousPlan,
                          billingPeriod: billingPeriod[previousPlan.id] || 'monthly',
                          finalprice: previousPrice + plan.setup_fees,
                      };
                      dispatch(removeFromCart(previousPlanWithPeriodAndPrice));
                      localStorage.removeItem('selectedPlanId');
                  }
                  dispatch(addToCart(planWithPeriodAndPrice));
                  setSelectedPlanId(plan.id);
                  localStorage.setItem('selectedPlanId', plan.id);
              }
              navigate('cart')
              localStorage.removeItem('popupClosed');

          } else {
              // Toast error if success message is not "you can buy it"
              auth.toastError('Error', data?.message || 'Failed to add to cart.');
          }
      } catch (error) {
          console.error(error);
          // auth.toastError(error.response.data.faild)
      } finally {
          setIsLoading(false);
      }
    };

    if (!data) {
        return   <div
        className={`fixed w-fill inset-0  bg-opacity-70 flex items-center justify-center z-1000 ${click ? 'hidden' : ''}`}
    >
        <div className="bg-white md:w-3/6 lg:w-2/6 w-full rounded-lg shadow-lg p-6 space-y-4">
            <div className="flex justify-between items-center">
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 focus:outline-none"
                    onClick={handleImageClick}
                >
                    Close
                </button>
            </div>

            <div className="flex flex-col items-center space-y-4">
                {isLoading ? (
                  <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
                      <Loading />
                  </div>                                
                  ) : (
                    <div
                    className={`cursor-pointer w-full rounded-lg text-center bg-gray-100 shadow-lg p-6 transform transition-all duration-300 hover:scale-105`}
                >
                    <h2 className="text-2xl font-bold text-mainColor mb-4">
                        You currently do not have any active plans
                    </h2>
                    <p className="text-lg text-gray-600 mb-6">
                        Explore our options and choose a plan that suits your needs today!
                    </p>
                    <div className="w-full flex justify-center">
                        <Link to="subscription">
                            <ButtonAdd
                                Text="Buy Plan"
                                isWidth="true"
                                BgColor="mainColor"
                                Color="white"
                                iconColor="white"
                                className="px-6 py-3 rounded-lg"
                            />
                        </Link>
                    </div>
                </div>
                )}
            </div>
        </div>
    </div>
    }

  return (
    <>
        {userPlanId === null? (
            (() => {
                const selectedPeriod = billingPeriod[data.plan?.id] || 'monthly';
                const priceOptions = {
                    monthly: data.plan?.monthly,
                    quarterly: data.plan?.quarterly || data.plan?.monthly * 3,
                    semiAnnually: data.plan?.semi_annual|| data.plan?.monthly * 6,
                    annually: data.plan?.yearly || data.plan?.monthly * 12,
                };
                const discountOptions = {
                    monthly: data.plan?.discount_monthly,
                    quarterly: data.plan?.discount_quarterly,
                    semiAnnually: data.plan?.discount_semi_annual,
                    annually: data.plan?.discount_yearly,
                };
                const currentPrice = priceOptions[selectedPeriod];
                const discountedPrice = discountOptions[selectedPeriod];
                const savings = discountedPrice ? currentPrice - discountedPrice : 0;

                return (
                    <div
                    className={`fixed inset-x-0 top-30 bottom-0 bg-opacity-70 flex items-center justify-center z-1000 ${click ? 'hidden' : ''}`}
                  >
                    <div className="bg-white md:w-3/6 lg:w-2/6 w-full rounded-lg shadow-lg p-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <h2 className="text-1xl font-bold">Select Language</h2>
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 focus:outline-none"
                          onClick={handleImageClick}
                        >
                          Close
                        </button>
                      </div>
                  
                      <div className="flex flex-col items-center space-y-4">
                        {isLoading ? (
                          <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
                            <Loading />
                          </div>
                        ) : (
                          <div
                            className={`cursor-pointer w-full rounded-lg text-center shadow-lg transform transition-all duration-300 hover:scale-105 ${
                              select === 'English' ? 'bg-blue-500 text-white' : 'bg-gray-100'
                            }`}
                          >
                            <div className="overflow-hidden rounded-lg">
                              <img
                                src={i18n.language ? data.en_image_link : data.ar_image_link}
                                alt="Plan Image"
                                className="w-full h-56 object-fit rounded-lg transition-transform duration-300 hover:scale-110"
                              />
                            </div>
                  
                            <div
                              key={data.id}
                              className={`relative p-6 text-mainColor shadow-md text-xl rounded-lg border border-gray-200 hover:shadow-lg transition-all`}
                            >
                              {selectedPlanId != data.plan?.id && (
                                <button
                                  onClick={() => handleAddToCart(data?.plan, event)}
                                  className={`w-full py-3 font-semibold rounded-lg transition-all duration-300 transform ${
                                    selectedPlanId === data.plan?.id
                                      ? 'bg-red-600 text-white hover:bg-red-700'
                                      : 'bg-mainColor text-white hover:bg-blue-700'
                                  } hover:scale-105 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mainColor`}
                                >
                                  {t('Add to Cart')}
                                </button>
                              )}
                  
                              {selectedPlanId == data.plan?.id && (
                                <div className="flex space-x-3 mt-3">
                                  <button
                                    onClick={() => handleAddToCart(data.plan, event)}
                                    className="w-full text-xl py-3 font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-md"
                                  >
                                    {t('Remove from Cart')}
                                  </button>
                                  <Link
                                    to="cart"
                                    className="w-full text-xl py-3 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md"
                                  >
                                    {t('Go to Cart')}
                                  </Link>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                );
            })()
        ) : null}
    </>
);

          
};

export default UserSelect;
