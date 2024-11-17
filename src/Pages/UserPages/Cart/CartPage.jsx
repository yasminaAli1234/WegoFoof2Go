import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../../../Redux/CartSlice.js';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(cartItems); // Log cart items whenever they change
  }, [cartItems]);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price || item.finalprice || 0), 0).toFixed(2);
  };

  const totalPrice = calculateTotal(); // Calculate total price once

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h1>

      <div className="bg-white shadow-lg rounded-lg p-6">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b border-gray-200 py-4 last:border-none"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                {/* <p className="text-sm text-gray-500">{item.type}</p> */}
              </div>
              <p className="text-lg font-semibold text-gray-800">{(item.price || item.finalprice || 0).toFixed(2)} EGP</p>
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
