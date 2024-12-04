// import React, { useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { clearCart } from '../../../Redux/CartSlice.js';

// const CartPage = () => {
//   const cartItems = useSelector((state) => state.cart);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     console.log(cartItems); // Log cart items whenever they change
//   }, [cartItems]);

//   const handleClearCart = () => {
//     dispatch(clearCart());
//   };

//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => total + (item.price || item.finalprice || 0), 0).toFixed(2);
//   };

//   const totalPrice = calculateTotal(); // Calculate total price once

//   return (
//     <div className="container mx-auto p-6 max-w-3xl">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h1>

//       <div className="bg-white shadow-lg rounded-lg p-6">
//         {cartItems.length > 0 ? (
//           cartItems.map((item) => (
//             <div
//               key={item.id}
//               className="flex justify-between items-center border-b border-gray-200 py-4 last:border-none"
//             >
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
//                 {/* <p className="text-sm text-gray-500">{item.type}</p> */}
//               </div>
//               <p className="text-lg font-semibold text-gray-800">{(item.price || item.finalprice || 0).toFixed(2)} EGP</p>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-500 py-6">Your cart is empty.</p>
//         )}
//       </div>

//       {cartItems.length > 0 && (
//         <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-lg">
//           <div className="flex justify-between items-center">
//             <h3 className="text-xl font-bold text-gray-800">Total</h3>
//             <p className="text-2xl font-semibold text-green-600">{totalPrice} EGP</p>
//           </div>
//         </div>
//       )}

//       <div className="mt-6 flex justify-between gap-4">
//         <button
//           onClick={handleClearCart}
//           className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold text-lg"
//         >
//           Clear Cart
//         </button>
//         <Link
//           to="../checkout"
//           state={{ cartItems, totalPrice }}
//           className="flex justify-center w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-lg"
//         >
//           <button>
//             Proceed to Checkout
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default CartPage;



// import React, { useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { clearCart, updateCartItem } from '../../../Redux/CartSlice.js'; // Import actions

// const CartPage = () => {
//   const cartItems = useSelector((state) => state.cart);
//   const dispatch = useDispatch();

//   // Log cart items whenever they change
//   useEffect(() => {
//     console.log("Cart Items Updated:", cartItems);
//   }, [cartItems]);

//   // Clear cart action
//   const handleClearCart = () => {
//     dispatch(clearCart());
//   };

//   // Calculate total price
//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => total + (item.finalprice ||item.price|| 0), 0).toFixed(2);
//   };

//   // Handle billing period change
//   const handleBillingPeriodChange = (itemId, newPeriod, item) => {
//     // Calculate the new price based on the selected period
//     const priceOptions = {
//       monthly: item.price_per_month ||item.monthly,
//       quarterly: item.price_per_quarter || item.price_per_month * 3 ||item.quarterly|| item.monthly * 3,
//       semiAnnually: item.price_per_semi_annual || item.price_per_month * 6 ||item["semi-annual"]|| item.monthly * 6,
//       annually: item.price_per_year ||item.yearly,
//     };

//     const newPrice = priceOptions[newPeriod];
//     const updatedItem = {
//       ...item,
//       billingPeriod: newPeriod,
//       finalprice: newPrice,
//     };

//     // Dispatch action to update the cart item
//     dispatch(updateCartItem({ id: itemId, type: item.type, updatedItem }));
//   };

//   const totalPrice = calculateTotal(); // Calculate total price once

//   return (
//     <div className="container mx-auto p-6 max-w-3xl">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h1>

//       <div className="bg-white shadow-lg rounded-lg p-6">
//         {cartItems.length > 0 ? (
//           cartItems.map((item ,index) => (
//             <div key={index} className="flex flex-col border-b border-gray-200 py-4 last:border-none">
//               <div className="flex justify-between items-center">
//                 <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
//                 <p className="text-lg font-semibold text-gray-800">{(item.finalprice ||item.price || 0).toFixed(2)} EGP</p>
//               </div>

//               {/* Conditionally render extra items */}
//               {item.type === 'extra' && item.status !== 'one_time' && (
//                 <div className="flex items-center mt-4">
//                 <label htmlFor={`billing-${index}`} className="text-sm font-semibold text-gray-600 mr-2">
//                   Billing Period:
//                 </label>
//                 <select
//                   id={`billing-${index}`}
//                   value={item.billingPeriod || 'monthly'}
//                   onChange={(e) => handleBillingPeriodChange(item.id, e.target.value, item)}
//                   className="bg-gray-100 border border-gray-400 text-gray-700 rounded-lg p-2"
//                 >
//                   <option value="monthly">Monthly</option>
//                   <option value="quarterly">3 Months</option>
//                   <option value="semiAnnually">6 Months</option>
//                   <option value="annually">Yearly</option>
//                 </select>
//               </div>
//               )}

//               {/* Show billing period dropdown if item type is "plan" */}
//               {item.type === 'plan' && (
//                 <div className="flex items-center mt-4">
//                   <label htmlFor={`billing-${index}`} className="text-sm font-semibold text-gray-600 mr-2">
//                     Billing Period:
//                   </label>
//                   <select
//                     id={`billing-${item.id}`}
//                     value={item.billingPeriod || 'monthly'}
//                     onChange={(e) => handleBillingPeriodChange(item.id, e.target.value, item)}
//                     className="bg-gray-100 border border-gray-400 text-gray-700 rounded-lg p-2"
//                   >
//                     <option value="monthly">Monthly</option>
//                     <option value="quarterly">3 Months</option>
//                     <option value="semiAnnually">6 Months</option>
//                     <option value="annually">Yearly</option>
//                   </select>
//                 </div>
//               )}
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-500 py-6">Your cart is empty.</p>
//         )}
//       </div>

//       {cartItems.length > 0 && (
//         <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-lg">
//           <div className="flex justify-between items-center">
//             <h3 className="text-xl font-bold text-gray-800">Total</h3>
//             <p className="text-2xl font-semibold text-green-600">{totalPrice} EGP</p>
//           </div>
//         </div>
//       )}
//       <div className="mt-6 flex justify-between gap-4">
//         <button
//           onClick={handleClearCart}
//           className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold text-lg"
//         >
//           Clear Cart
//         </button>
//         <Link
//           to="../checkout"
//           state={{ cartItems, totalPrice }}
//           className="flex justify-center w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-lg"
//         >
//           <button>
//             Proceed to Checkout
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default CartPage;



// import React, { useEffect ,useState} from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { clearCart, updateCartItem } from '../../../Redux/CartSlice.js'; // Import actions

// const CartPage = () => {
//   const cartItems = useSelector((state) => state.cart);
//   const dispatch = useDispatch();
//   const [promoCode, setPromoCode] = useState("");
//   const [discount, setDiscount] = useState(0); // State to store the discount amount
//   const [discountedPrice, setDiscountedPrice] = useState('');

//   const handleApplyPromo = async () => {
//     if (!promoCode) {
//       alert("Please enter a promo code.");
//       return;
//     }

//     setIsLoading(true);

//     const formattedData = {
//       code: promoCode,
//       plan: cartItems
//         .filter((item) => item.id && item.billingPeriod)
//         .map((item) => ({
//           plan_id: item.id,
//           duration: item.billingPeriod,
//           price: item.price_per_month || item.price_per_year || 0,
//         })),
//       extra: cartItems
//         .filter((item) => item.name && item.price && !item.billingPeriod)
//         .map((item) => ({
//           extra_id: item.id,
//           price: item.price,
//         })),
//       domain: [],
//     };

//     try {
//       const response = await axios.post(
//         "https://login.wegostores.com/user/v1/promocode",
//         formattedData,
//         {
//           headers: {
//             Authorization: `Bearer ${auth.user.token}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         const { discount } = response.data; // Extract the discount
//         setDiscount(discount); // Update the discount state
//         const newTotal = totalPrice - discount; // Calculate the discounted total
//         setDiscountedPrice(newTotal); // Update state with the new total
//         auth.toastSuccess(`Promo code applied! You saved ${discount} EGP.`);
//         setPromoCode("");
//       } else {
//         auth.toastError("Failed to apply promo code. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error applying promo code:", error);
//       auth.toastError("Invalid promo code.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Log cart items whenever they change
//   useEffect(() => {
//     console.log("Cart Items Updated:", cartItems);
//   }, [cartItems]);

//   // Clear cart action
//   const handleClearCart = () => {
//     dispatch(clearCart());
//   };

//   // Calculate total price
//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => total + (item.finalprice ||item.price|| 0), 0).toFixed(2);
//   };

//   // Handle billing period change
//   const handleBillingPeriodChange = (itemId, newPeriod, item) => {
//     // Calculate the new price based on the selected period
//     const priceOptions = {
//       monthly: item.price_per_month ||item.monthly,
//       quarterly: item.price_per_quarter || item.price_per_month * 3 ||item.quarterly|| item.monthly * 3,
//       semiAnnually: item.price_per_semi_annual || item.price_per_month * 6 ||item["semi-annual"]|| item.monthly * 6,
//       annually: item.price_per_year ||item.yearly,
//     };

//     const newPrice = priceOptions[newPeriod];
//     const updatedItem = {
//       ...item,
//       billingPeriod: newPeriod,
//       finalprice: newPrice,
//     };

//     // Dispatch action to update the cart item
//     dispatch(updateCartItem({ id: itemId, type: item.type, updatedItem }));
//   };

//   const totalPrice = calculateTotal(); // Calculate total price once

//   return (
//     <div className="container mx-auto p-6 max-w-3xl">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h1>

//       <div className="bg-white shadow-lg rounded-lg p-6">
//         {cartItems.length > 0 ? (
//           cartItems.map((item ,index) => (
//             <div key={index} className="flex flex-col border-b border-gray-200 py-4 last:border-none">
//               <div className="flex justify-between items-center">
//                 <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
//                 <p className="text-lg font-semibold text-gray-800">{(item.finalprice ||item.price || 0).toFixed(2)} EGP</p>
//               </div>

//               {/* Conditionally render extra items */}
//               {item.type === 'extra' && item.status !== 'one_time' && (
//                 <div className="flex items-center mt-4">
//                 <label htmlFor={`billing-${index}`} className="text-sm font-semibold text-gray-600 mr-2">
//                   Billing Period:
//                 </label>
//                 <select
//                   id={`billing-${index}`}
//                   value={item.billingPeriod || 'monthly'}
//                   onChange={(e) => handleBillingPeriodChange(item.id, e.target.value, item)}
//                   className="bg-gray-100 border border-gray-400 text-gray-700 rounded-lg p-2"
//                 >
//                   <option value="monthly">Monthly</option>
//                   <option value="quarterly">3 Months</option>
//                   <option value="semiAnnually">6 Months</option>
//                   <option value="annually">Yearly</option>
//                 </select>
//               </div>
//               )}

//               {/* Show billing period dropdown if item type is "plan" */}
//               {item.type === 'plan' && (
//                 <div className="flex items-center mt-4">
//                   <label htmlFor={`billing-${index}`} className="text-sm font-semibold text-gray-600 mr-2">
//                     Billing Period:
//                   </label>
//                   <select
//                     id={`billing-${item.id}`}
//                     value={item.billingPeriod || 'monthly'}
//                     onChange={(e) => handleBillingPeriodChange(item.id, e.target.value, item)}
//                     className="bg-gray-100 border border-gray-400 text-gray-700 rounded-lg p-2"
//                   >
//                     <option value="monthly">Monthly</option>
//                     <option value="quarterly">3 Months</option>
//                     <option value="semiAnnually">6 Months</option>
//                     <option value="annually">Yearly</option>
//                   </select>
//                 </div>
//               )}
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-500 py-6">Your cart is empty.</p>
//         )}
//       </div>

//       {cartItems.length > 0 && (
//         <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-lg">
//           <div className="flex justify-between items-center">
//             <h3 className="text-xl font-bold text-gray-800">Total</h3>
//             <p className="text-2xl font-semibold text-green-600">{totalPrice} EGP</p>
//           </div>
//         </div>
//       )}
//       <div className="mt-6 flex justify-between gap-4">
//         <button
//           onClick={handleClearCart}
//           className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold text-lg"
//         >
//           Clear Cart
//         </button>
//         <Link
//           to="../checkout"
//           state={{ cartItems, totalPrice }}
//           className="flex justify-center w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-lg"
//         >
//           <button>
//             Proceed to Checkout
//           </button>
//         </Link>
//       </div>

//        {/* Promo Code Section */}
//        <div className="promo-code-section mt-6 bg-white p-4 shadow rounded-lg">
//         <h3 className="text-xl font-semibold">Have a Promo Code?</h3>
//         <div className="flex items-center gap-4 mt-4">
//           <input
//             type="text"
//             value={promoCode}
//             onChange={(e) => setPromoCode(e.target.value)}
//             placeholder="Enter promo code"
//             className="flex-1 text-lg px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainColor"
//           />
//           <button
//             onClick={handleApplyPromo}
//             className="px-6 py-2 text-lg bg-mainColor text-white font-semibold rounded-lg hover:bg-mainColor-dark"
//           >
//             Apply
//           </button>
//         </div>
//       </div>

//       {/* Order Summary */}
//       <div className="order-summary mt-6 bg-white p-4 shadow rounded-lg">
//         <h3 className="text-xl font-semibold">Order Summary</h3>
//         <div className="flex justify-between text-lg mt-3">
//           <span>Total Price:</span>
//           <span>{totalPrice} EGP</span>
//         </div>
//         <div className="flex justify-between text-lg text-red-600">
//           <span>Discount:</span>
//           <span>-{discount} EGP</span>
//         </div>
//         <div className="flex justify-between text-lg font-bold text-green-600">
//           <span>Total After Discount:</span>
//           <span>{discountedPrice} EGP</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartPage;


import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, updateCartItem } from '../../../Redux/CartSlice.js';
import axios from 'axios';
import { useAuth } from "../../../Context/Auth";

const CartPage = () => {
  const auth = useAuth();
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
        "https://login.wegostores.com/user/v1/promocode",
        formattedData,
        {
          headers: {
            Authorization: `Bearer ${auth.user.token}`,
          },
        }
      );

      if (response.status === 200) {
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
    // const priceOptions = {
    //   monthly: item.price_per_month,
    //   quarterly: item.price_per_month * 3,
    //   semiAnnually: item.price_per_month * 6,
    //   annually: item.price_per_year,
    // };

    const priceOptions = {
      monthly: item.monthly,
      quarterly: item.quarterly || item.monthly * 3,
      semiAnnually: item["semi-annual"] || item.monthly * 6,
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

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const totalPrice = calculateTotal();

  return (

  <div className='flex flex-col bg-gray-50 w-full p-4 xl:p-6'>
    <div>
    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">Shopping Cart</h1>
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
                <div className="flex justify-between items-center">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-base sm:text-lg font-semibold text-gray-800">
                    {(item.finalprice || item.price || 0).toFixed(2)} EGP
                  </p>
                </div>
                {item.type === "plan" && (
                  <div className="flex flex-wrap items-center mt-3 sm:mt-4">
                    <label className="text-sm font-semibold text-gray-600 mr-3">
                      Billing Period:
                    </label>
                    <select
                      value={item.billingPeriod || "monthly"}
                      onChange={(e) =>
                        handleBillingPeriodChange(item.id, e.target.value, item)
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-700 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">3 Months</option>
                      <option value="semiAnnually">6 Months</option>
                      <option value="annually">Yearly</option>
                    </select>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-6">Your cart is empty.</p>
          )}
        </div>
    
        {cartItems.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-4">
            <button
              onClick={handleClearCart}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold text-base sm:text-lg transition"
            >
              Clear Cart
            </button>
            <Link
              to="../checkout"
              state={{ cartItems, totalPrice }}
              className="flex-1"
            >
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold text-base sm:text-lg transition">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        )}
      </div>
    
      {/* Right Section */}
      <div className="w-full lg:w-1/3 space-y-6">
        {/* Order Summary */}
        <div className="bg-white p-2 xl:p-4 shadow-md rounded-lg">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Order Summary</h3>
          <div className="flex justify-between text-base sm:text-lg mb-3">
            <span>Total Price:</span>
            <span>{totalPrice} EGP</span>
          </div>
          <div className="flex justify-between text-base sm:text-lg text-red-500 mb-3">
            <span>Discount:</span>
            <span>-{discount} EGP</span>
          </div>
          <div className="flex justify-between text-base sm:text-lg font-bold text-green-600">
            <span>Total After Discount:</span>
            <span>{discountedPrice || totalPrice} EGP</span>
          </div>
        </div>

          {/* Promo Code */}
          <div className="bg-white p-2 xl:p-4 shadow-md rounded-lg">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Have a Promo Code?</h3>
          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter promo code"
              className="flex-1 text-base sm:text-lg px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleApplyPromo}
              className="px-6 py-2 text-base sm:text-lg bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
            >
              {isLoading ? "Applying..." : "Apply"}
            </button>
          </div>
        </div>
    
      </div>
    </div>
  </div>
  
  
  );
};

export default CartPage;
