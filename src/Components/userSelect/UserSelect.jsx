import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Context/Auth';
import Loading from '../Loading';

const UserSelect = () => {
  const [select, setSelect] = useState(localStorage.getItem('selectedLanguage')); // Retrieve language from localStorage
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [click, setClick] = useState(localStorage.getItem('popupClosed') === 'true'); // Track popup visibility
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage') || 'en'); // Default to 'en'

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://login.wegostores.com/user/v1/welcome_offer', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${auth.user.token}`, // Correct authorization header
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        setData(responseData.welcome_offer);
      } else {
        console.error('Error fetching data:', response.status);
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

  const handleLanguageSelect = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('selectedLanguage', newLanguage);
  };

  const handleImageClick = () => {
    setClick(true);
    localStorage.setItem('popupClosed', 'true'); // Mark popup as closed
  };

  return (
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center z-1000 ${
        click ? 'hidden' : ''
      }`}
    >
      <div className="bg-white w-3/4 max-w-lg rounded-lg shadow-lg p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Select Language</h2>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={handleLanguageSelect}
          >
            Change Language
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 focus:outline-none"
            onClick={handleImageClick}
          >
            Close
          </button>
        </div>

        <div className="flex flex-col items-center space-y-4">
          {isLoading ? (
            <Loading />
          ) : (
            <div
            className={`cursor-pointer w-full md:w-3/4 p-6 rounded-lg text-center shadow-lg transform transition-all duration-300 hover:scale-105 ${
              select === 'English' ? 'bg-blue-500 text-white' : 'bg-gray-100'
            }`}
          >
            <div className="overflow-hidden rounded-lg">
              <img
                // onClick={() => setClick((prev) => !prev)}
                src={language === 'en' ? data.en_image_link : data.ar_image_link}
                alt="Plan Image"
                className="w-full h-56 object-cover rounded-lg transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div className="mt-4">
              <p className="text-lg font-semibold">{`Price: ${data?.price ?? 'N/A'}`}</p>
              <p className="text-lg font-semibold">{`Name: ${data?.plan?.name ?? 'N/A'}`}</p>
            </div>
          </div>
          
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSelect;
