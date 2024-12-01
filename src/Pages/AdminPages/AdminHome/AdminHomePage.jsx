// import React, { useEffect, useState } from 'react';
// import { useAuth } from '../../../Context/Auth';
// import Loading from '../../../Components/Loading';
// import axios from 'axios';
// import {Button} from '../../../Components/Button'
// import {ButtonAdd} from '../../../Components/Button'
// import { Link ,useNavigate} from 'react-router-dom';

// const AdminHomePage =()=>{

    // const auth = useAuth();
    // const navigate = useNavigate();
    // const [isLoading, setIsLoading] = useState(false);
    // const [data, setData] = useState('');

    // const fetchData = async () => {
    //     setIsLoading(true);
    //     try {
    //            const response = await axios.get('https://login.wegostores.com/admin/v1/home', {
    //                   headers: {
    //                          Authorization: `Bearer ${auth.user.token}`,
    //                   },
    //            });
    //            if (response.status === 200) {
    //                   console.log(response.data)
    //                   setData(response.data.order)
    //            }
    //     } catch (error) {
    //            console.error('Error fetching data:', error);
    //     } finally {
    //            setIsLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     fetchData(); 
    // }, []);

//     return(
//         <>
//         <h1>Dashboard Admin</h1>
//         </>
//     )
// }

// export default AdminHomePage;
import React, { useEffect, useState } from "react";
import { FaMoneyBill, FaShoppingCart, FaUsers, FaChartLine } from "react-icons/fa";
import { useAuth } from '../../../Context/Auth';
import Loading from '../../../Components/Loading';
import axios from 'axios';
import { Link ,useNavigate} from 'react-router-dom';

const AdminHomePage = () => {
  const [data, setData] = useState({
    bending_payment: 3,
    revenue: 1000,
    order_pending: 6,
    order_in_progress: 5,
    signups: 100,
    monthly_signups: 10,
    subscriptions: 100,
    monthly_subscriptions: 10,
  });

  const auth = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [data2, setData2] = useState('');

  const fetchData = async () => {
      setIsLoading(true);
      try {
             const response = await axios.get('https://login.wegostores.com/admin/v1/home', {
                    headers: {
                           Authorization: `Bearer ${auth.user.token}`,
                    },
             });
             if (response.status === 200) {
                    console.log(response.data)
                    setData2(response.data.order)
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

  const calculateProgress = (current, total) => {
    return total === 0 ? 0 : Math.round((current / total) * 100);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
        Admin Dashboard
      </h1>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Bending Payment Card */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition transform duration-300">
          <div className="flex justify-between items-center">
            <FaMoneyBill className="text-3xl" />
            <span className="text-sm bg-white text-purple-700 py-1 px-3 rounded-full">
              +10%
            </span>
          </div>
          <h2 className="mt-4 text-lg font-semibold">Bending Payment</h2>
          <p className="text-3xl font-bold mt-2">{data.bending_payment}</p>
        </div>

        {/* Revenue Card */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition transform duration-300">
          <div className="flex justify-between items-center">
            <FaChartLine className="text-3xl" />
            <span className="text-sm bg-white text-blue-700 py-1 px-3 rounded-full">
              +25%
            </span>
          </div>
          <h2 className="mt-4 text-lg font-semibold">Revenue</h2>
          <p className="text-3xl font-bold mt-2">${data.revenue}</p>
        </div>

        {/* Order Pending Card */}
        <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition transform duration-300">
          <div className="flex justify-between items-center">
            <FaShoppingCart className="text-3xl" />
            <span className="text-sm bg-white text-green-700 py-1 px-3 rounded-full">
              +8%
            </span>
          </div>
          <h2 className="mt-4 text-lg font-semibold">Order Pending</h2>
          <p className="text-3xl font-bold mt-2">{data.order_pending}</p>
        </div>

        {/* Order In Progress Card */}
        <div className="bg-gradient-to-r from-red-500 to-red-700 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition transform duration-300">
          <div className="flex justify-between items-center">
            <FaShoppingCart className="text-3xl" />
            <span className="text-sm bg-white text-red-700 py-1 px-3 rounded-full">
              +5%
            </span>
          </div>
          <h2 className="mt-4 text-lg font-semibold">Order In Progress</h2>
          <p className="text-3xl font-bold mt-2">{data.order_in_progress}</p>
        </div>
      </div>

      {/* Signups and Subscriptions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
        {/* Signups Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700">Signups</h2>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Signups</p>
              <p className="text-2xl font-bold text-gray-800">{data.signups}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">This Month</p>
              <p className="text-2xl font-bold text-blue-500">
                {data.monthly_signups}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="relative w-20 h-20 mx-auto">
              <svg
                className="absolute inset-0 transform rotate-[-90deg]"
                viewBox="0 0 36 36"
              >
                <circle
                  className="text-gray-300"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="transparent"
                  r="15.9155"
                  cx="18"
                  cy="18"
                />
                <circle
                  className="text-blue-500"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray={`${calculateProgress(
                    data.monthly_signups,
                    data.signups
                  )}, 100`}
                  fill="transparent"
                  r="15.9155"
                  cx="18"
                  cy="18"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-blue-500 text-lg">
                {calculateProgress(data.monthly_signups, data.signups)}%
              </div>
            </div>
          </div>
        </div>

        {/* Subscriptions Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700">Subscriptions</h2>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-2xl font-bold text-gray-800">
                {data.subscriptions}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">This Month</p>
              <p className="text-2xl font-bold text-green-500">
                {data.monthly_subscriptions}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="relative w-20 h-20 mx-auto">
              <svg
                className="absolute inset-0 transform rotate-[-90deg]"
                viewBox="0 0 36 36"
              >
                <circle
                  className="text-gray-300"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="transparent"
                  r="15.9155"
                  cx="18"
                  cy="18"
                />
                <circle
                  className="text-green-500"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray={`${calculateProgress(
                    data.monthly_subscriptions,
                    data.subscriptions
                  )}, 100`}
                  fill="transparent"
                  r="15.9155"
                  cx="18"
                  cy="18"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-green-500 text-lg">
                {calculateProgress(data.monthly_subscriptions, data.subscriptions)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
