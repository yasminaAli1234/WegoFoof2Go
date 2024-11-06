// // redux/slices/cartSlice.jsx
// import { createSlice } from '@reduxjs/toolkit';

// const cartSlice = createSlice({
//     name: 'cart',
//     initialState: [],
//     reducers: {
//       addToCart: (state, action) => {
//         const existingItem = state.find(item => item.id === action.payload.id);
//         if (!existingItem) {
//             state.push({ ...action.payload, quantity: 1 });
//         } else {
//             existingItem.quantity += 1;
//         }
//         // Log the existing item as a plain object to view properties clearly
//         console.log("Existing Item:", existingItem ? JSON.parse(JSON.stringify(existingItem)) : "Item not found");
//     }
     
//           ,          
//         removeFromCart: (state, action) => {
//             return state.filter(item => item.id !== action.payload.id);
//         },
//         updateQuantity: (state, action) => {
//             const item = state.find(item => item.id === action.payload.id);
//             if (item) {
//                 item.quantity = action.payload.quantity;
//             }
//         },
//         clearCart: () => []
//     }
// });

// export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;


// redux/slices/cartSlice.jsx
import { createSlice } from '@reduxjs/toolkit';

// Helper function to load cart from localStorage
const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : [];  // Default to empty array if no cart found
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartFromLocalStorage(), // Initialize from localStorage
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.find(item => item.id === action.payload.id);
      if (!existingItem) {
        state.push({ ...action.payload, quantity: 1 });
      } else {
        existingItem.quantity += 1;
      }
      // Save the updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
      console.log("Updated Cart:", state);  // Log cart to console for debugging
    },
    removeFromCart: (state, action) => {
      const updatedCart = state.filter(item => item.id !== action.payload.id);
      // Save the updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    },
    updateQuantity: (state, action) => {
      const item = state.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      // Save the updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    clearCart: () => {
      // Clear cart from Redux state and localStorage
      localStorage.removeItem('cart');
      return [];
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
