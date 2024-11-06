// pages/user/Cart/CartPage.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, updateQuantity, clearCart } from '../../../Redux/CartSlice.js';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Log cart items to console whenever they change
  useEffect(() => {
    console.log(cartItems); // This will show the cart data when it's updated or on page load
  }, [cartItems]);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <ul>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <li key={item.id}>
              <h2>{item.name}</h2>
              {/* <p>Price: {item.price} EGP</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
              <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
              <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button> */}
            </li>
          ))
        ) : (
          <p>No items in the cart.</p>
        )}
      </ul>
      <button onClick={handleClearCart}>Clear Cart</button>
    </div>
  );
};

export default CartPage;
