import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../Context/Auth';
import Loading from '../../../Components/Loading';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../../Redux/CartSlice.js';
import { PiStorefront } from "react-icons/pi";
import { CiMoneyCheck1 } from "react-icons/ci";
import { useNavigate ,Link } from 'react-router-dom';  // Import useNavigate
import { useTranslation } from 'react-i18next';

const UserHomePage = () => {

  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Replace useHistory with useNavigate
  const { t } = useTranslation();

  const fetchData = async () => {
    setIsLoading(true);
    try {
        const response = await axios.get('https://login.wegostores.com/user/v1/my_service', {
            headers: {
                Authorization: `Bearer ${auth.user.token}`,
            },
        });
        if (response.status === 200) {
            console.log(response.data)
            setData(response.data);
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

    if (isLoading) {
      return (
        <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
          <Loading />
        </div>
      );
  }    
    
  // if (!data) {
  //     return <div className='text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center'>No Orders data available</div>;
  // }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 shadow-md rounded-lg mb-6">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl font-semibold">Welcome back</h1>
          <p className="text-gray-200">Here’s an overview of your dashboard</p>
        </div>
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
        <Link to="store">
        <button className="bg-white text-blue-600 px-5 py-2 rounded shadow hover:bg-gray-200 transition">
            Create Store
          </button>
        </Link>
          <button className="bg-mainColor text-white px-5 py-2 rounded shadow hover:bg-blue-600 transition">
            Request Demo
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Subscription Plan Section */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Your Plan</h2>
          <p className="text-gray-500 mb-4">Plan: <strong>{data.plan?.name}</strong> (Expires in 10 days)</p>
          <Link to="subscription">
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
            Upgrade Plan
          </button>
          </Link>
        </div>

        {/* Store Overview */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Your Stores</h2>
          <ul className="space-y-2 mb-4">
            <li className="flex justify-between text-gray-600">
              <span>Store Name 1</span>
              <button className="text-blue-500 hover:underline">Manage</button>
            </li>
            <li className="flex justify-between text-gray-600">
              <span>Store Name 2</span>
              <button className="text-blue-500 hover:underline">Manage</button>
            </li>
          </ul>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            Create New Store
          </button>
        </div>

        {/* Domain Requests */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Domain Requests</h2>
          <p className="text-gray-500 mb-4">You have <strong>1</strong> pending request</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            Request New Domain
          </button>
        </div>

        {/* Extra Products */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Extra Products</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center">
              <img
                src="https://via.placeholder.com/150"
                alt="Product"
                className="w-20 h-20 mb-2"
              />
              <button className="text-blue-500 hover:underline">Buy Now</button>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="https://via.placeholder.com/150"
                alt="Product"
                className="w-20 h-20 mb-2"
              />
              <button className="text-blue-500 hover:underline">Buy Now</button>
            </div>
          </div>
        </div>

        {/* Tutorials */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Learn and Grow</h2>
          <ul className="space-y-2">
            <li className="text-blue-500 hover:underline">How to set up your store</li>
            <li className="text-blue-500 hover:underline">Best practices for marketing</li>
            <li className="text-blue-500 hover:underline">Managing domains effectively</li>
          </ul>
          <button className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition">
            Explore Tutorials
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserHomePage;
