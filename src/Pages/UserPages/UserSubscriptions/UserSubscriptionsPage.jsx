import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../Context/Auth';
import Loading from '../../../Components/Loading';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../../Redux/CartSlice.js'; // Added removeFromCart
import { PiStorefront } from "react-icons/pi";
import { CiMoneyCheck1 } from "react-icons/ci";

const UserSubscriptionsPage = () => {
    const auth = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [plans, setPlans] = useState([]);
    const dispatch = useDispatch();
    const [billingPeriod, setBillingPeriod] = useState({});
    const [selectedPlanId, setSelectedPlanId] = useState(null);

    // Fetch plans from API and set localStorage if a plan is selected
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('https://login.wegostores.com/user/v1/subscription', {
                headers: {
                    Authorization: `Bearer ${auth.user.token}`,
                },
            });
            if (response.status === 200) {
                console.log(response.data)
                setPlans(response.data.plans);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle adding/removing plans from the cart
    // const handleAddToCart = (plan) => {
    //     if (selectedPlanId == plan.id) {
    //         // Deselect plan and remove from cart
    //         setSelectedPlanId(null);
    //         dispatch(removeFromCart(plan));
    //         localStorage.removeItem('selectedPlanId');
    //     } else {
    //         // Deselect previous plan and add new plan
    //         if (selectedPlanId !== null) {
    //             const previousPlan = plans.find((p) => p.id == selectedPlanId);
    //             dispatch(removeFromCart(previousPlan));
    //             localStorage.removeItem('selectedPlanId');
    //         }
    //         dispatch(addToCart(plan));
    //         setSelectedPlanId(plan.id);
    //         localStorage.setItem('selectedPlanId', plan.id);  // Save selected plan to localStorage
    //     }
    // };

    const handleAddToCart = (plan) => {
        const selectedPeriod = billingPeriod[plan.id] || 'monthly';
        const priceOptions = {
            monthly: plan.price_per_month,
            quarterly: plan.price_per_quarter || plan.price_per_month * 3,
            semiAnnually: plan.price_per_semi_annual || plan.price_per_month * 6,
            annually: plan.price_per_year,
        };
        const currentPrice = priceOptions[selectedPeriod];
    
        const planWithPeriodAndPrice = { 
            ...plan, 
            billingPeriod: selectedPeriod, 
            finalprice: currentPrice 
        };
    
        if (selectedPlanId == plan.id) {
            // Deselect plan and remove from cart
            setSelectedPlanId(null);
            dispatch(removeFromCart(planWithPeriodAndPrice));
            localStorage.removeItem('selectedPlanId');
        } else {
            // Deselect previous plan and add new plan
            if (selectedPlanId !== null) {
                const previousPlan = plans.find((p) => p.id == selectedPlanId);
                const previousPlanWithPeriodAndPrice = {
                    ...previousPlan,
                    billingPeriod: billingPeriod[previousPlan.id] || 'monthly',
                    finalprice: priceOptions[billingPeriod[previousPlan.id] || 'monthly']
                };
                dispatch(removeFromCart(previousPlanWithPeriodAndPrice));
                localStorage.removeItem('selectedPlanId');
            }
            dispatch(addToCart(planWithPeriodAndPrice));
            setSelectedPlanId(plan.id);
            localStorage.setItem('selectedPlanId', plan.id);  // Save selected plan to localStorage
        }
    };
    

    // Handle billing period change
    const handleBillingPeriodChange = (planId, newPeriod) => {
        setBillingPeriod((prev) => ({ ...prev, [planId]: newPeriod }));
    };

    // Set the selected plan from localStorage on initial load
    useEffect(() => {
        // Fetch plans first
        fetchData();
    }, []); // Only fetch plans on initial load

    useEffect(() => {
        const savedPlanId = localStorage.getItem('selectedPlanId');
        if (savedPlanId && plans.length > 0) {
            setSelectedPlanId(savedPlanId);
        }
        console.log(savedPlanId)
    }, [plans]); // Run this effect when plans are set

    useEffect(() => {
        // If a plan is selected, add it to the cart
        if (selectedPlanId) {
            const selectedPlan = plans.find((plan) => plan.id == selectedPlanId);
            console.log(selectedPlan)
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
        return <div className="text-mainColor text-2xl font-bold flex items-center justify-center h-screen">No plans data available</div>;
    }

    return (
        <div className="w-full p-2 flex flex-col">
            <div className="w-full grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-3">
                {plans.map((plan, index) => {
                    const selectedPeriod = billingPeriod[plan.id] || 'monthly';
                    const priceOptions = {
                        monthly: plan.price_per_month,
                        quarterly: plan.price_per_quarter || plan.price_per_month * 3,
                        semiAnnually: plan.price_per_semi_annual || plan.price_per_month * 6,
                        annually: plan.price_per_year,
                    };
                    const currentPrice = priceOptions[selectedPeriod];

                    // Calculate savings
                    const savings = selectedPeriod === 'monthly' ? 0 :
                        selectedPeriod === 'quarterly' ? (plan.price_per_month * 3 - currentPrice) :
                        selectedPeriod === 'semiAnnually' ? (plan.price_per_month * 6 - currentPrice) :
                        selectedPeriod === 'annually' ? (plan.price_per_month * 12 - currentPrice) : 0;

                    return (
                        <div
                            key={index}
                            className={`relative p-6 bg-white shadow-md text-2xl rounded-lg border border-gray-200 hover:shadow-lg transition-all 
                                ${selectedPlanId == plan.id ? 'border-green-500' : ''}`}
                        >
                            <h2 className="text-center text-mainColor font-semibold text-3xl mb-4">{plan.name}</h2>

                            <div className="space-y-3 mb-6">
                                <p className="text-gray-700"> {plan.description}</p>
                                <p className="text-gray-700 flex items-center gap-2"><PiStorefront size={26} className='text-mainColor' /><span className="font-semibold">Number of stores : </span> {plan.limet_store || '0'}</p>
                                <p className="text-gray-700 flex items-center gap-2"><CiMoneyCheck1 size={30} className='text-mainColor font-semibold' /><span className="font-semibold">SetUp Fees:</span> {plan.setup_fees || '0'} EGP</p>
                            </div>

                            <div className="flex justify-between items-center mb-4">
                                <label htmlFor={`billing-${index}`} className="text-xl md:text-2xl font-semibold text-gray-800">Billing Period:</label>
                                <select
                                    id={`billing-${index}`}
                                    value={selectedPeriod}
                                    onChange={(e) => handleBillingPeriodChange(plan.id, e.target.value)}
                                    className="bg-gray-100 border border-gray-400 text-gray-700 rounded-lg p-2"
                                >
                                    <option value="monthly">Monthly</option>
                                    <option value="quarterly">3 Months</option>
                                    <option value="semiAnnually">6 Months</option>
                                    <option value="annually">Yearly</option>
                                </select>
                            </div>

                            <div className="text-center mb-4">
                                {selectedPeriod !== 'monthly' && (
                                    <p className="text-lg text-gray-500">{priceOptions.monthly} EGP / month</p>
                                )}
                                <p className="text-3xl font-bold text-mainColor">{currentPrice} EGP</p>
                                <span className="text-gray-600">{selectedPeriod === 'monthly' ? 'per month' : `per ${selectedPeriod}`}</span>

                                {savings > 0 && (
                                    <p className="text-green-500 font-semibold mt-2">Save {savings} EGP per {selectedPeriod}</p>
                                )}
                            </div>

                            <div className="text-center">
                                <button
                                    onClick={() => handleAddToCart(plan)}
                                    className={`w-full py-3 font-semibold rounded-lg transition-transform transform 
                                    ${selectedPlanId == plan.id ? 'bg-green-500 text-white' : 'bg-mainColor text-white hover:scale-105'}`}
                                >
                                    {selectedPlanId == plan.id ? 'Selected Plan' : 'Add to Cart'}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default UserSubscriptionsPage;
