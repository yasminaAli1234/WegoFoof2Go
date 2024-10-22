import React, { createContext, useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
// Create a context
const AuthContext = createContext();

// Provide the context
export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem("sidebarState")
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
  };

const logout = async () => {
  const user = JSON.parse(localStorage.getItem('user')); // Retrieve and parse the user object from localStorage
  const token = user?.token; // Safely access the token property
  console.log(token)
    try {
        // Send a logout request to the API
        const response = await axios.post('https://transitstation.online/api/admin/logout', {}, {
            headers: {
                Authorization: `Bearer ${token}`, // Send the token if required
            },
        });

        // Check if the logout was successful
        if (response.status === 200) {
            // Clear local storage or cookies
                 setUser(null);
                 localStorage.removeItem("sidebarState")
            // Redirect to login page
            // window.location.href = '/login';
        } else {
            console.error('Logout failed:', response.statusText);
        }
    } catch (error) {
        console.error('Error logging out:', error);
    }
};


  const toastSuccess = (text) => {
    toast.success(text);

  };
  const toastError = (text) => {
    toast.error(text);

  };

  return (
    <AuthContext.Provider value={{ user, login, logout, toastSuccess, toastError }}>
      <ToastContainer />
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  return React.useContext(AuthContext);
};
