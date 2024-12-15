// import React, { useEffect, useState } from 'react';
// import { useAuth } from '../../../Context/Auth';
// import Loading from '../../../Components/Loading';
// import axios from 'axios';
// import { useDispatch } from 'react-redux';
// import { addToCart, removeFromCart } from '../../../Redux/CartSlice.js';
// import { PiStorefront } from "react-icons/pi";
// import { CiMoneyCheck1 } from "react-icons/ci";
// import { useNavigate } from 'react-router-dom';  // Import useNavigate

// const UserSubscriptionsPage = () => {
//     const auth = useAuth();
//     const [isLoading, setIsLoading] = useState(false);
//     const [plans, setPlans] = useState([]);
//     const dispatch = useDispatch();
//     const [billingPeriod, setBillingPeriod] = useState({});
//     const [selectedPlanId, setSelectedPlanId] = useState(null);
//     const navigate = useNavigate(); // Replace useHistory with useNavigate

//     // Fetch plans from API and set localStorage if a plan is selected
//     const fetchData = async () => {
//         setIsLoading(true);
//         try {
//             const response = await axios.get('https://login.wegostores.com/user/v1/subscription', {
//                 headers: {
//                     Authorization: `Bearer ${auth.user.token}`,
//                 },
//             });
//             if (response.status === 200) {
//                 console.log(response.data)
//                 setPlans(response.data.plans);
//             }
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         } finally {
//             setIsLoading(false);
//         }
//     };


    // const handleAddToCart = (plan) => {
    //     const selectedPeriod = billingPeriod[plan.id] || 'monthly';
    //     const priceOptions = {
    //         monthly: plan.monthly,
    //         quarterly: plan.quarterly || plan.monthly * 3,
    //         semiAnnually: plan["semi-annual"] || plan.monthly * 6,
    //         annually: plan.yearly,
    //     };
    //     const currentPrice = priceOptions[selectedPeriod];
    
    //     const planWithPeriodAndPrice = { 
    //         ...plan, 
    //         billingPeriod: selectedPeriod, 
    //         finalprice: currentPrice + plan.setup_fees
    //     };
    
    //     if (selectedPlanId == plan.id) {
    //         // Deselect plan and remove from cart
    //         setSelectedPlanId(null);
    //         dispatch(removeFromCart(planWithPeriodAndPrice));
    //         localStorage.removeItem('selectedPlanId');
    //     } else {
    //         // Deselect previous plan and add new plan
    //         if (selectedPlanId !== null) {
    //             const previousPlan = plans.find((p) => p.id == selectedPlanId);
    //             const previousPlanWithPeriodAndPrice = {
    //                 ...previousPlan,
    //                 billingPeriod: billingPeriod[previousPlan.id] || 'monthly',
    //                 finalprice: priceOptions[billingPeriod[previousPlan.id] || 'monthly']+ plan.setup_fees
    //             };
    //             dispatch(removeFromCart(previousPlanWithPeriodAndPrice));
    //             localStorage.removeItem('selectedPlanId');
    //         }
    //         dispatch(addToCart(planWithPeriodAndPrice));
    //         setSelectedPlanId(plan.id);
    //         localStorage.setItem('selectedPlanId', plan.id);  // Save selected plan to localStorage
    //     }
    // };
    
    // // Handle billing period change
    // const handleBillingPeriodChange = (planId, newPeriod) => {
    //     setBillingPeriod((prev) => ({ ...prev, [planId]: newPeriod }));
    // };

    // // Set the selected plan from localStorage on initial load
    // useEffect(() => {
    //     // Fetch plans first
    //     fetchData();
    // }, []); // Only fetch plans on initial load

    // useEffect(() => {
    //     const savedPlanId = localStorage.getItem('selectedPlanId');
    //     if (savedPlanId && plans.length > 0) {
    //         setSelectedPlanId(savedPlanId);
    //     }
    // }, [plans]); // Run this effect when plans are set

    // useEffect(() => {
    //     // If a plan is selected, add it to the cart
    //     if (selectedPlanId) {
    //         const selectedPlan = plans.find((plan) => plan.id == selectedPlanId);
    //         if (selectedPlan) {
    //             dispatch(addToCart(selectedPlan));
    //         }
    //     }
    // }, [selectedPlanId, plans, dispatch]); // Ensure to run only when selectedPlanId or plans change

//     if (isLoading) {
//         return (
//             <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
//                 <Loading />
//             </div>
//         );
//     }

//     if (!plans.length) {
//         return <div className="text-mainColor text-2xl font-bold flex items-center justify-center h-screen">No plans data available</div>;
//     }

//     return (
//         <div className="w-full p-2 flex flex-col">
//             <div className="w-full grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-3">
//                 {plans.map((plan, index) => {
//                     const selectedPeriod = billingPeriod[plan.id] || 'monthly';
//                     const priceOptions = {
//                         monthly: plan.monthly,
//                         quarterly: plan.quarterly || plan.monthly * 3,
//                         semiAnnually: plan["semi-annual"] || plan.monthly * 6,
//                         annually: plan.yearly,
//                     };
//                     const currentPrice = priceOptions[selectedPeriod];

                    // // Calculate savings
                    // const savings = selectedPeriod === 'monthly' ? 0 :
                    //     selectedPeriod === 'quarterly' ? (plan.monthly * 3 - currentPrice) :
                    //     selectedPeriod === 'semiAnnually' ? (plan.monthly * 6 - currentPrice) :
                    //     selectedPeriod === 'annually' ? (plan.monthly * 12 - currentPrice) : 0;

//                     return (
//                         <div
//                             key={plan.id}
//                             className={`relative p-6  shadow-md text-2xl rounded-lg border border-gray-200 hover:shadow-lg transition-all 
//                                 ${selectedPlanId == plan.id ? 'border-green-500 bg-green-100' : ''}`}
//                             >
//                             {/* Header */}
//                             <h2 className="text-center text-mainColor font-semibold text-3xl mb-4">{plan.name}</h2>

//                             {/* Plan Details */}
//                             <div className="space-y-3 mb-6">
//                                 <p className="text-gray-700">{plan.description}</p>
//                                 <p className="text-gray-700 flex items-center gap-2"><PiStorefront size={26} className='text-mainColor' /><span className="font-semibold">Number of stores:</span> {plan.limet_store || '0'}</p>
//                                 <p className="text-gray-700 flex items-center gap-2"><CiMoneyCheck1 size={30} className='text-mainColor font-semibold' /><span className="font-semibold">SetUp Fees:</span> {plan.setup_fees || '0'} EGP</p>
//                             </div>

                            // {/* Billing Period */}
                            // <div className="flex justify-between items-center mb-4">
                            //     <label htmlFor={`billing-${plan.id}`} className="text-xl md:text-2xl font-semibold text-gray-800">Billing Period:</label>
                            //     <select
                            //     id={`billing-${plan.id}`}
                            //     value={selectedPeriod}
                            //     onChange={(e) => handleBillingPeriodChange(plan.id, e.target.value)}
                            //     className="bg-gray-100 border border-gray-400 text-gray-700 rounded-lg p-2"
                            //     >
                            //     <option value="monthly">Monthly</option>
                            //     <option value="quarterly">3 Months</option>
                            //     <option value="semiAnnually">6 Months</option>
                            //     <option value="annually">Yearly</option>
                            //     </select>
                            // </div>

                            // {/* Price Info */}
                            // <div className="text-center mb-4">
                            //     {selectedPeriod !== 'monthly' && (
                            //     <p className="text-lg text-gray-500">{priceOptions.monthly} EGP / month</p>
                            //     )}
                            //     <p className="text-3xl font-bold text-mainColor">{currentPrice} EGP</p>
                            //     <span className="text-gray-600">{selectedPeriod === 'monthly' ? 'per month' : `per ${selectedPeriod}`}</span>

                            //     {savings > 0 && (
                            //     <p className="text-green-500 font-semibold mt-2">Save {savings} EGP per {selectedPeriod}</p>
                            //     )}
                            // </div>

//                             {/* Add to Cart and Remove from Cart */}
//                             <div>
//                                 {plan.my_plan === true ? (
//                                 <button
//                                     className={`w-full py-3 font-semibold rounded-lg transition-transform transform 
//                                     bg-gray-300 text-gray-800 hover:scale-105`}
//                                 >
//                                     My Plan
//                                 </button>
//                                 ) : (
//                                 <>
//                                     <div className="w-full">
//                                     {/* Add to Cart Button */}
//                                     {selectedPlanId != plan.id && (
//                                         <button
//                                         onClick={() => handleAddToCart(plan)}
//                                         className={`w-full py-3 font-semibold rounded-lg transition-all duration-300 transform 
//                                         ${selectedPlanId === plan.id ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-mainColor text-white hover:bg-blue-700'} 
//                                         hover:scale-105 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mainColor`}
//                                         >
//                                         Add to Cart
//                                         </button>
//                                     )}

                                //     {/* Remove from Cart and Go to Cart Buttons */}
                                //     {selectedPlanId == plan.id && (
                                //         <div className="flex space-x-3 mt-3">
                                //         <button
                                //             onClick={() => handleAddToCart(plan)}
                                //             className="w-full text-xl py-3 font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-md"
                                //         >
                                //             Remove from Cart
                                //         </button>
                                //         <button
                                //             onClick={() => navigate('../cart')}
                                //             className="w-full text-xl py-3 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md"
                                //         >
                                //             Go to Cart
                                //         </button>
                                //         </div>
                                //     )}
                                //     </div>
                                // </>
                                // )}

//                                 {/* "Selected" Label */}
//                                 {selectedPlanId == plan.id && (
//                                 <div className="absolute top-0 left-0 p-2 bg-green-500 text-white text-sm font-semibold rounded-tr-lg">
//                                     Selected
//                                 </div>
//                                 )}
//                             </div>
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// };

// export default UserSubscriptionsPage;


import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../Context/Auth';
import Loading from '../../../Components/Loading';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../../Redux/CartSlice.js';
import { PiStorefront } from "react-icons/pi";
import { CiMoneyCheck1 } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { FaCrown } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

const UserSubscriptionsPage = () => {
    const auth = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [plans, setPlans] = useState([]);
    const dispatch = useDispatch();
    const [billingPeriod, setBillingPeriod] = useState({});
    const [selectedPlanId, setSelectedPlanId] = useState(null);
    const navigate = useNavigate();
    const {t,i18n} = useTranslation();

    // Fetch plans from API
    const fetchData = async () => {
        setIsLoading(true);
        try {
            let url;
            if (i18n.language === 'ar') {
                url = 'https://login.wegostores.com/user/v1/subscription?locale=ar'; // Arabic URL
            } else {
                url = 'https://login.wegostores.com/user/v1/subscription'; // Non-Arabic URL (assuming English or other)
            }
    
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${auth.user.token}`,
                },
            });
    
            if (response.status === 200) {
                console.log(response.data.plans);
                setPlans(response.data.plans);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };
    

    // Add to cart logic
    // const handleAddToCart =async (plan ,event) => {

    //     event.preventDefault();

    //     setIsLoading(true);
    //     try {
    //         const response = await axios.post(
    //             'https://login.wegostores.com/user/v1/cart/pending',
    //             {
    //                 id: plan.id, // Properly include plan.id as a key-value pair
    //                 type: "plan"
    //             },
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${auth.user.token}`,
    //                     'Content-Type': 'application/json', // Explicitly specify JSON content type
    //                 },
    //             }
    //         );            
    //         console.log(response)
    
    //         if (response.status === 200) {
    //             // console.log(response)
    //             // handleGoBack();
    //         } 
    //         // else {
    //         //     auth.toastError('Failed to add Store.');
    //         // }
    //     } catch (error) {
            // console.log(error.response.data.faild)
    //         const errorMessages = error?.response?.data.errors;
    //         let errorMessageString = 'Error occurred';
    
    //         if (errorMessages) {
    //             errorMessageString = Object.values(errorMessages).flat().join(' ');
    //         }
    //         // auth.toastError('Error', errorMessageString);
    //     } finally {
    //         setIsLoading(false);
    //     }
    //     // const selectedPeriod = billingPeriod[plan.id] || 'monthly';
    //     // const priceOptions = {
    //     //     monthly: plan.monthly,
    //     //     quarterly: plan.quarterly || plan.monthly * 3,
    //     //     semiAnnually: plan["semi_annual"] || plan.monthly * 6,
    //     //     annually: plan.yearly,
    //     // };
    //     // const discountOptions = {
    //     //     monthly: plan.discount_monthly,
    //     //     quarterly: plan.discount_quarterly,
    //     //     semiAnnually: plan.discount_semi_annual,
    //     //     annually: plan.discount_yearly,
    //     // };

    //     // const currentPrice = discountOptions[selectedPeriod] 
    //     // ? discountOptions[selectedPeriod] 
    //     // : priceOptions[selectedPeriod];

    //     // const planWithPeriodAndPrice = { 
    //     //     ...plan, 
    //     //     billingPeriod: selectedPeriod, 
    //     //     finalprice: currentPrice + plan.setup_fees
    //     // };

    //     // if (selectedPlanId == plan.id) {
    //     //     setSelectedPlanId(null);
    //     //     dispatch(removeFromCart(planWithPeriodAndPrice));
    //     //     localStorage.removeItem('selectedPlanId');
    //     // } else {
    //     //     if (selectedPlanId !== null) {
    //     //         const previousPlan = plans.find((p) => p.id == selectedPlanId);
    //     //         const previousPrice = priceOptions[billingPeriod[previousPlan.id] || 'monthly'];
    //     //         const previousPlanWithPeriodAndPrice = {
    //     //             ...previousPlan,
    //     //             billingPeriod: billingPeriod[previousPlan.id] || 'monthly',
    //     //             finalprice: previousPrice + plan.setup_fees,
    //     //         };
    //     //         dispatch(removeFromCart(previousPlanWithPeriodAndPrice));
    //     //         localStorage.removeItem('selectedPlanId');
    //     //     }
    //     //     dispatch(addToCart(planWithPeriodAndPrice));
    //     //     setSelectedPlanId(plan.id);
    //     //     localStorage.setItem('selectedPlanId', plan.id);
    //     // }
    // };

    const handleAddToCart = async (plan, event) => {
        if (event) event.preventDefault();
    
        setIsLoading(true);
    
        try {
            const response = await axios.post(
                'https://login.wegostores.com/user/v1/cart/pending',
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
                        const previousPlan = plans.find((p) => p.id === selectedPlanId);
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
            } else {
                // Toast error if success message is not "you can buy it"
                auth.toastError('Error', data?.message || 'Failed to add to cart.');
            }
        } catch (error) {
            console.error(error);
            auth.toastError(error.response.data.faild)
        } finally {
            setIsLoading(false);
        }
    };
    

    // Handle billing period change
   
    const handleBillingPeriodChange = (planId, newPeriod) => {
        setBillingPeriod((prev) => ({ ...prev, [planId]: newPeriod }));
    };

    // Set selected plan from localStorage
    useEffect(() => {
        fetchData();
        console.log(auth.user.package)
    }, [i18n.language]);

    useEffect(() => {
        const savedPlanId = localStorage.getItem('selectedPlanId');
        if (savedPlanId && plans.length > 0) {
            setSelectedPlanId(savedPlanId);
        }
    }, [plans]);

    useEffect(() => {
        // If a plan is selected, add it to the cart
        if (selectedPlanId) {
            const selectedPlan = plans.find((plan) => plan.id == selectedPlanId);
            if (selectedPlan) {
                dispatch(addToCart(selectedPlan));
            }
        }
    }, [selectedPlanId, plans, dispatch]); // Ensure to run only when selectedPlanId or plans change


    if (isLoading) {
        return (
            <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
                <Loading />
            </div>
        );
    }

    if (!plans.length) {
        return <div className="text-mainColor text-2xl font-bold flex items-center justify-center h-screen">{t("No plans data available")}</div>;
    }

    return (
        <div className="w-full p-6 flex flex-col">
        <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => {
                const selectedPeriod = billingPeriod[plan.id] || 'monthly';
                const priceOptions = {
                    monthly: plan.monthly,
                    quarterly: plan.quarterly || plan.monthly * 3,
                    semiAnnually: plan["semi_annual"] || plan.monthly * 6,
                    annually: plan.yearly || plan.monthly * 12,
                };
                const discountOptions = {
                    monthly: plan.discount_monthly,
                    quarterly: plan.discount_quarterly,
                    semiAnnually: plan.discount_semi_annual,
                    annually: plan.discount_yearly,
                };
                const currentPrice = priceOptions[selectedPeriod];
                const discountedPrice = discountOptions[selectedPeriod];
                const savings = discountedPrice ? currentPrice - discountedPrice : 0;
    
                return (
                    <div
                        key={plan.id}
                        className={`relative p-6 transition-all duration-300 ease-in-out transform rounded-lg shadow-lg hover:shadow-xl border border-gray-200 hover:scale-105 
                            ${selectedPlanId == plan.id ? 'border-green-500 bg-green-100' : 'bg-white text-mainColor'}`}
                    >
                        {/* Header */}
                        <h2 className="text-center font-bold text-2xl mb-4">{plan.name}</h2>
    
                        {/* Plan Details */}
                        <div className="space-y-4 mb-6">
                            <p className="text-sm text-gray-600">{plan.description}</p>
                            <p className="flex items-center gap-2"><PiStorefront size={26} /><span className="font-semibold">{t("Number of stores:")}</span> {plan.limet_store || '0'}</p>
    
                            {plan.my_plan !== true && (
                                <p className="flex items-center gap-2"><CiMoneyCheck1 size={30} className='text-mainColor' /><span className="font-semibold text-mainColor">{t("SetUp Fees:")}</span> {plan.setup_fees || '0'} {t("EGP")}</p>
                            )}
                        </div>
    
                        {/* Billing Period */}
                        <div className="flex justify-between items-center mb-4">
                            <label htmlFor={`billing-${plan.id}`} className="text-lg font-medium">{t("Billing Period:")}</label>
                            <select
                                id={`billing-${plan.id}`}
                                value={selectedPeriod}
                                onChange={(e) => handleBillingPeriodChange(plan.id, e.target.value)}
                                className="bg-gray-100 border border-gray-300 text-gray-700 rounded-lg p-2 focus:ring-2 focus:ring-mainColor"
                            >
                                <option value="monthly">{t("Monthly")}</option>
                                <option value="quarterly">3 {t("Months")}</option>
                                <option value="semiAnnually">6 {t("Months")}</option>
                                <option value="annually">{t("Yearly")}</option>
                            </select>
                        </div>
    
                        {/* Pricing and Savings */}
                        <div className="text-center mb-4">
                            {discountedPrice ? (
                                <>
                                    <p className="text-lg line-through">{currentPrice} {t("EGP")}</p>
                                    <p className="text-3xl font-semibold text-mainColor">{discountedPrice} {t("EGP")}</p>
                                    <p className="text-green-500 font-semibold mt-2">{t("Save")} {savings} {t("EGP")} {t("per")} {selectedPeriod}</p>
                                </>
                            ) : (
                                <>
                                    <p className="text-lg text-gray-500 line-through">{priceOptions['monthly'] * (selectedPeriod === 'monthly' ? 1 : selectedPeriod === 'quarterly' ? 3 : selectedPeriod === 'semiAnnually' ? 6 : 12)} {t("EGP")} / {t("month")}</p>
                                    <p className="text-3xl font-semibold text-mainColor">{currentPrice} {t("EGP")}</p>
                                    {selectedPeriod !== 'monthly' && (
                                        <p className="text-green-500 font-semibold mt-2">
                                            {t("Save")} {priceOptions['monthly'] * (selectedPeriod === 'quarterly' ? 3 : selectedPeriod === 'semiAnnually' ? 6 : 12) - currentPrice} {t("EGP")}
                                        </p>
                                    )}
                                </>
                            )}
                        </div>
    
                        {/* Plan Buttons */}
                        <div>
                            {plan.my_plan === true ? (
                                <div className="w-full relative border rounded-lg p-4 bg-gray-50 shadow-lg">
                                    {/* "My Plan" Badge */}
                                    <div className="absolute flex items-center top-0 left-0 transform -translate-y-2 -translate-x-2 bg-mainColor text-white text-sm font-bold py-2 px-4 rounded-full shadow-lg">
                                        <FaCrown className="text-yellow-400 mr-1" /> {t("My Plan")}
                                    </div>
    
                                    {/* Upgrade Button */}
                                    {selectedPlanId != plan.id && (
                                        <button
                                            onClick={() => handleAddToCart(plan, event)}
                                            className="w-full py-3 mt-4 font-semibold rounded-lg transition-all duration-300 transform bg-blue-800 text-white hover:bg-blue-700 hover:scale-105 shadow-md hover:shadow-lg"
                                        >
                                            {t("Upgrade Now")}
                                        </button>
                                    )}
    
                                    {/* Remove from Cart and Go to Cart Buttons */}
                                    {selectedPlanId == plan.id && (
                                        <div className="flex space-x-3 mt-4">
                                            <button
                                                onClick={() => handleAddToCart(plan, event)}
                                                className="w-full py-3 font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-md"
                                            >
                                                {t("Remove from Cart")}
                                            </button>
                                            <button
                                                onClick={() => navigate('../cart')}
                                                className="w-full py-3 font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-md"
                                            >
                                                {t("Go to Cart")}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="w-full">
                                    {/* Add to Cart Button */}
                                    {selectedPlanId != plan.id && (
                                        <button
                                            onClick={() => handleAddToCart(plan, event)}
                                            className={`w-full py-3 font-semibold rounded-lg transition-all duration-300 transform 
                                            ${selectedPlanId === plan.id ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-mainColor text-white hover:bg-blue-700'} 
                                            hover:scale-105 shadow-md hover:shadow-lg`}
                                        >
                                            {t("Add to Cart")}
                                        </button>
                                    )}
    
                                    {/* Remove from Cart and Go to Cart Buttons */}
                                    {selectedPlanId == plan.id && (
                                        <div className="flex space-x-3 mt-3">
                                            <button
                                                onClick={() => handleAddToCart(plan, event)}
                                                className="w-full py-3 font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-md"
                                            >
                                                {t("Remove from Cart")}
                                            </button>
                                            <button
                                                onClick={() => navigate('../cart')}
                                                className="w-full py-3 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md"
                                            >
                                                {t("Go to Cart")}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
    
                            {/* "Selected" Label */}
                            {selectedPlanId == plan.id && (
                                <div className="absolute top-0 left-0 p-2 bg-green-500 text-white text-sm font-semibold rounded-tr-lg">
                                    {t("Selected")}
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
    
    );
};

export default UserSubscriptionsPage;
