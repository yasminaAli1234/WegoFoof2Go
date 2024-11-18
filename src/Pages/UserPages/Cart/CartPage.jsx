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

import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, updateCartItem } from '../../../Redux/CartSlice.js'; // Import actions

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Log cart items whenever they change
  useEffect(() => {
    console.log("Cart Items Updated:", cartItems);
  }, [cartItems]);

  // Clear cart action
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.finalprice ||item.price|| 0), 0).toFixed(2);
  };

  // Handle billing period change
  const handleBillingPeriodChange = (itemId, newPeriod, item) => {
    // Calculate the new price based on the selected period
    const priceOptions = {
      monthly: item.price_per_month ||item.monthly,
      quarterly: item.price_per_quarter || item.price_per_month * 3 ||item.quarterly|| item.monthly * 3,
      semiAnnually: item.price_per_semi_annual || item.price_per_month * 6 ||item["semi-annual"]|| item.monthly * 6,
      annually: item.price_per_year ||item.yearly,
    };

    const newPrice = priceOptions[newPeriod];
    const updatedItem = {
      ...item,
      billingPeriod: newPeriod,
      finalprice: newPrice,
    };

    // Dispatch action to update the cart item
    dispatch(updateCartItem({ id: itemId, type: item.type, updatedItem }));
  };

  const totalPrice = calculateTotal(); // Calculate total price once

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h1>

      <div className="bg-white shadow-lg rounded-lg p-6">
        {cartItems.length > 0 ? (
          cartItems.map((item ,index) => (
            <div key={index} className="flex flex-col border-b border-gray-200 py-4 last:border-none">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                <p className="text-lg font-semibold text-gray-800">{(item.finalprice ||item.price || 0).toFixed(2)} EGP</p>
              </div>

              {/* Conditionally render extra items */}
              {item.type === 'extra' && item.status !== 'one_time' && (
                <div className="flex items-center mt-4">
                <label htmlFor={`billing-${index}`} className="text-sm font-semibold text-gray-600 mr-2">
                  Billing Period:
                </label>
                <select
                  id={`billing-${index}`}
                  value={item.billingPeriod || 'monthly'}
                  onChange={(e) => handleBillingPeriodChange(item.id, e.target.value, item)}
                  className="bg-gray-100 border border-gray-400 text-gray-700 rounded-lg p-2"
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">3 Months</option>
                  <option value="semiAnnually">6 Months</option>
                  <option value="annually">Yearly</option>
                </select>
              </div>
              )}

              {/* Show billing period dropdown if item type is "plan" */}
              {item.type === 'plan' && (
                <div className="flex items-center mt-4">
                  <label htmlFor={`billing-${index}`} className="text-sm font-semibold text-gray-600 mr-2">
                    Billing Period:
                  </label>
                  <select
                    id={`billing-${item.id}`}
                    value={item.billingPeriod || 'monthly'}
                    onChange={(e) => handleBillingPeriodChange(item.id, e.target.value, item)}
                    className="bg-gray-100 border border-gray-400 text-gray-700 rounded-lg p-2"
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
        <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-800">Total</h3>
            <p className="text-2xl font-semibold text-green-600">{totalPrice} EGP</p>
          </div>
        </div>
      )}
      <div className="mt-6 flex justify-between gap-4">
        <button
          onClick={handleClearCart}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold text-lg"
        >
          Clear Cart
        </button>
        <Link
          to="../checkout"
          state={{ cartItems, totalPrice }}
          className="flex justify-center w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-lg"
        >
          <button>
            Proceed to Checkout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
