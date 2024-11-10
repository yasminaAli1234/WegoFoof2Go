// import React, { useEffect, useState } from 'react';
// import { useAuth } from '../../../Context/Auth';
// import Loading from '../../../Components/Loading';
// import axios from 'axios';
// import {ButtonAdd} from '../../../Components/Button'
// import { Link } from 'react-router-dom';
// import {Wroning,DeleteIcon,EditIcon} from '../../../Components/Icons/AllIcons';
// import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
// import { MdCheck } from "react-icons/md";
// import CheckBox from '../../../Components/CheckBox';

// import { useDispatch } from 'react-redux';
// import { addToCart } from '../../../Redux/CartSlice.js';

// const UserSubscriptionsPage = () => {

//     const auth = useAuth();
//     const [isLoading, setIsLoading] = useState(false);
//     const [plans, setPlans] = useState('');

//     const dispatch = useDispatch();

//     const handleAddToCart = (plan) => {
//         dispatch(addToCart(plan));
//     };

//     const fetchData = async () => {
//         setIsLoading(true);
//         try {
//                const response = await axios.get('https://login.wegostores.com/user/v1/subscription', {
//                       headers: {
//                              Authorization: `Bearer ${auth.user.token}`,
//                       },
//                });
//                if (response.status === 200) {
//                       console.log(response.data)
//                       setPlans(response.data.plans)
//                }
//         } catch (error) {
//                console.error('Error fetching data:', error);
//         } finally {
//                setIsLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchData(); 
//     }, []);

       
//     if (isLoading) {
//         return (
//           <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
//             <Loading />
//           </div>
//         );
//     }    
      
//     if (!plans) {
//         return <div className='text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center'>No plans data available</div>;
//     }

//        return (
//               <>
//               <div className='w-full flex flex-col gap-10'>
//                 <div className="w-full flex flex-wrap items-center justify-start gap-10">
//                 {plans.map((plan, index) => (
//                     <>
//                         <div key={index} className="lg:w-[80%] xl:w-[30%] sm:w-full border border-mainColor rounded-2xl">
//                             <div className='text-center mb-5 p-4 pb-0 text-mainColor text-2xl md:text-3xl xl:text-3xl font-semibold leading-10'>
//                                 <h1 className='p-2'>{plan.name}</h1>
//                             </div>
//                             <div className='p-4 text-mainColor flex flex-col gap-5'>
//                                    <div className='flex flex-wrap items-center gap-5'>
//                                           <span className='text-maincolor text-xl md:text-3xl xl:text-3xl font-semibold'>Description : </span>
//                                           <p className='text-[#686868] text-2xl'>{plan.description}</p>
//                                    </div>
//                                    <div className="flex items-center gap-x-4 w-full">
//                                           <span className="text-xl md:text-3xl xl:text-3xl text-mainColor font-medium">Application:</span>
//                                           <div>
//                                                  <CheckBox checked={plan.app}/>
//                                           </div>
//                                    </div>
//                                    <div className='flex items-center gap-5'>
//                                           <span className='text-maincolor text-xl md:text-3xl xl:text-3xl font-semibold'>Number of stores : </span>
//                                           <p className='text-[#686868] text-2xl'>{plan.limet_store}</p>
//                                    </div>
//                                    <div className='flex items-center gap-5'>
//                                           <span className='text-maincolor text-xl md:text-3xl xl:text-3xl font-semibold'>SetUp Fees : </span>
//                                           <p className='text-[#686868] text-2xl'>{plan.setup_fees}</p>
//                                    </div>
//                                    <div className='flex items-center gap-5'>
//                                           <span className='text-maincolor text-xl md:text-3xl xl:text-3xl font-semibold'>Price per year  : </span>
//                                           <p className='text-[#686868] text-2xl'>{plan.price_per_year} EGP</p>
//                                    </div>
//                                    <div className='flex items-center gap-5'>
//                                           <span className='text-maincolor text-xl md:text-3xl xl:text-3xl font-semibold'>Price per Month  : </span>
//                                           <p className='text-[#686868] text-2xl'>{plan.price_per_month} EGP</p>
//                                    </div>
//                             </div>
//                             <div className='text-center font-semibold text-2xl border-t-2 border-mainColor'>
//                                  {/* <h1>{plan}</h1> */}
//                                  {plan.my_plan ?
//                                     <h1 className='p-4 text-mainColor'>This My Plan</h1>:
//                                    //  <Link to="/dashboard_user/checkout" className='w-full text-white'>
//                                    //        <h1 className='p-4 rounded-b-xl bg-mainColor w-full'>Upgrade</h1>
//                                    //  </Link>
//                                    <button
//                                           onClick={() => handleAddToCart(plan)}
//                                           className="w-full text-white p-4 rounded-b-xl bg-mainColor"
//                                    >
//                                           Add to Cart
//                                    </button>

//                                  }
//                             </div>
//                         </div>       
//                     </>
//                  ))}
//                 </div>
//               </div>
//               </>
//        )
// }

// export default UserSubscriptionsPage


// import React, { useEffect, useState } from 'react';
// import { useAuth } from '../../../Context/Auth';
// import Loading from '../../../Components/Loading';
// import axios from 'axios';
// import { useDispatch } from 'react-redux';
// import { addToCart } from '../../../Redux/CartSlice.js';
// import CheckBox from '../../../Components/CheckBox';

// const UserSubscriptionsPage = () => {
//     const auth = useAuth();
//     const [isLoading, setIsLoading] = useState(false);
//     const [plans, setPlans] = useState([]);
//     const dispatch = useDispatch();
//     const [billingPeriod, setBillingPeriod] = useState({});
//     const [selectedPlanId, setSelectedPlanId] = useState(null);

//     const handleAddToCart = (plan) => {
//         dispatch(addToCart(plan));
//         setSelectedPlanId(plan.id); // Disable other selections after choosing a plan
//     };

//     const fetchData = async () => {
//         setIsLoading(true);
//         try {
//             const response = await axios.get('https://login.wegostores.com/user/v1/subscription', {
//                 headers: {
//                     Authorization: `Bearer ${auth.user.token}`,
//                 },
//             });
//             if (response.status === 200) {
//                 setPlans(response.data.plans);
//             }
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleBillingPeriodChange = (planId, newPeriod) => {
//         setBillingPeriod((prev) => ({ ...prev, [planId]: newPeriod }));
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);

//     if (isLoading) {
//         return (
//             <div className="flex items-center justify-center h-screen">
//                 <Loading />
//             </div>
//         );
//     }

//     if (!plans.length) {
//         return <div className="text-mainColor text-2xl font-bold flex items-center justify-center h-screen">No plans data available</div>;
//     }

//     return (
//         <div className="w-full p-2 flex flex-col">
//             <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 ">
//                 {plans.map((plan, index) => {
//                     const selectedPeriod = billingPeriod[plan.id] || 'monthly';
//                     const priceOptions = {
//                         monthly: plan.price_per_month,
//                         quarterly: plan.price_per_quarter || plan.price_per_month * 3,
//                         semiAnnually: plan.price_per_semi_annual || plan.price_per_month * 6,
//                         annually: plan.price_per_year,
//                     };
//                     const currentPrice = priceOptions[selectedPeriod];

//                     return (
//                         <div key={index} className={`relativ p-6 bg-white shadow-md text-2xl rounded-lg border border-gray-200 hover:shadow-lg transition-all ${selectedPlanId && selectedPlanId !== plan.id ? 'opacity-50 pointer-events-none' : ''}`}>
//                             <h2 className="text-center text-mainColor font-semibold text-3xl mb-4">{plan.name}</h2>
                            
//                             <div className="space-y-3 mb-6">
//                                 <p className="text-gray-700"><span className="font-semibold">Description:</span> {plan.description}</p>
//                                 {/* <p className="text-gray-700"><span className="font-semibold">Application:</span> <CheckBox checked={plan.app} /></p> */}
//                                 <p className="text-gray-700"><span className="font-semibold">Number of stores:</span> {plan.limet_store}</p>
//                                 <p className="text-gray-700"><span className="font-semibold">SetUp Fees:</span> {plan.setup_fees} EGP</p>
//                             </div>

//                             <div className="flex justify-between items-center mb-4">
//                                 <label htmlFor={`billing-${index}`} className="font-semibold text-gray-800">Billing Period:</label>
//                                 <select
//                                     id={`billing-${index}`}
//                                     value={selectedPeriod}
//                                     onChange={(e) => handleBillingPeriodChange(plan.id, e.target.value)}
//                                     className="bg-gray-100 border border-gray-400 text-gray-700 rounded-lg p-2"
//                                     disabled={!!selectedPlanId && selectedPlanId !== plan.id}
//                                 >
//                                     <option value="monthly">Monthly</option>
//                                     <option value="quarterly">Quarterly</option>
//                                     <option value="semiAnnually">Semi-Annually</option>
//                                     <option value="annually">Annually</option>
//                                 </select>
//                             </div>

//                             <div className="text-center mb-4">
//                                 {selectedPeriod !== 'monthly' && (
//                                     <p className="text-lg text-gray-500 line-through">{priceOptions.monthly} EGP / month</p>
//                                 )}
//                                 <p className="text-3xl font-bold text-mainColor">{currentPrice} EGP</p>
//                                 <span className="text-gray-600">{selectedPeriod === 'monthly' ? 'per month' : `per ${selectedPeriod}`}</span>
//                             </div>

//                             <div className="text-center">
//                                 {selectedPlanId === plan.id ? (
//                                     <button className="w-full py-3 text-white bg-green-500 font-semibold rounded-lg cursor-not-allowed">
//                                         Plan Selected
//                                     </button>
//                                 ) : (
//                                     <button
//                                         onClick={() => handleAddToCart(plan)}
//                                         className="w-full py-3 text-white bg-mainColor font-semibold rounded-lg transition-transform transform hover:scale-105"
//                                         disabled={!!selectedPlanId}
//                                     >
//                                         Add to Cart
//                                     </button>
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
import { addToCart } from '../../../Redux/CartSlice.js';
import { PiStorefront } from "react-icons/pi";
import { CiMoneyCheck1 } from "react-icons/ci";

const UserSubscriptionsPage = () => {
    const auth = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [plans, setPlans] = useState([]);
    const dispatch = useDispatch();
    const [billingPeriod, setBillingPeriod] = useState({});
    const [selectedPlanId, setSelectedPlanId] = useState(null);

    const handleAddToCart = (plan) => {
       // Toggle selection: if the clicked plan is already selected, deselect it
       if (selectedPlanId === plan.id) {
           setSelectedPlanId(null); // Deselect plan
       } else {
           dispatch(addToCart(plan));
           setSelectedPlanId(plan.id); // Mark plan as selected
       }
   };
   
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

    const handleBillingPeriodChange = (planId, newPeriod) => {
        setBillingPeriod((prev) => ({ ...prev, [planId]: newPeriod }));
    };

    useEffect(() => {
        fetchData();
    }, []);

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
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {plans.map((plan, index) => {
                    const selectedPeriod = billingPeriod[plan.id] || 'monthly';
                    const priceOptions = {
                        monthly: plan.price_per_month,
                        quarterly: plan.price_per_quarter || plan.price_per_month * 3,
                        semiAnnually: plan.price_per_semi_annual || plan.price_per_month * 6,
                        annually: plan.price_per_year,
                    };
                    const currentPrice = priceOptions[selectedPeriod];
                    
                    // Calculate savings only if selectedPeriod is not monthly
                    const savings = selectedPeriod === 'monthly' ? 0 :
                        selectedPeriod === 'quarterly' ? (plan.price_per_month * 3 - currentPrice) :
                        selectedPeriod === 'semiAnnually' ? (plan.price_per_month * 6 - currentPrice) :
                        selectedPeriod === 'annually' ? (plan.price_per_month * 12 - currentPrice) : 0;

                    return (
                        <div
                            key={index}
                            className={`relative p-6 bg-white shadow-md text-2xl rounded-lg border border-gray-200 hover:shadow-lg transition-all 
                                ${selectedPlanId === plan.id ? 'border-green-500' : ''}`}
                        >
                            <h2 className="text-center text-mainColor font-semibold text-3xl mb-4">{plan.name}</h2>
                            
                            <div className="space-y-3 mb-6">
                                <p className="text-gray-700"> {plan.description}</p>
                                <p className="text-gray-700 flex items-center gap-2"><PiStorefront size={26} className='text-mainColor'/><span className="font-semibold">Number of stores : </span> {plan.limet_store || '0'}</p>
                                <p className="text-gray-700 flex items-center gap-2"><CiMoneyCheck1 size={30} className='text-mainColor font-semibold'/><span className="font-semibold">SetUp Fees:</span> {plan.setup_fees || '0'} EGP</p>
                            </div>

                            <div className="flex justify-between items-center mb-4">
                                <label htmlFor={`billing-${index}`} className="font-semibold text-gray-800">Billing Period:</label>
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
                                
                                {/* Only display savings if savings are greater than 0 */}
                                {savings > 0 && (
                                    <p className="text-green-500 font-semibold mt-2">Save {savings} EGP per {selectedPeriod}</p>
                                )}
                            </div>

                            <div className="text-center">
                                   <button
                                          onClick={() => handleAddToCart(plan)}
                                          className={`w-full py-3 font-semibold rounded-lg transition-transform transform 
                                          ${selectedPlanId === plan.id ? 'bg-green-500 text-white' : 'bg-mainColor text-white hover:scale-105'}`}
                                   >
                                          {selectedPlanId === plan.id ? 'Selected Plan' : 'Add to Cart'}
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
