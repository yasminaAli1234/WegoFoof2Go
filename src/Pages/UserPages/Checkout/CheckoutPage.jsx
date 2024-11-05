import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../../../Context/Auth';
import Loading from '../../../Components/Loading';
import {ButtonAdd} from '../../../Components/Button'
import { Link } from 'react-router-dom';
import CheckBox from '../../../Components/CheckBox';
import InputCustom from '../../../Components/InputCustom';
import { Button } from '../../../Components/Button';

const CheckoutPage = () => {

    const auth = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [selectedMethod, setSelectedMethod] = useState('');
    const [phone, setPhone] = useState('');
    const [thumbnails, setThumbnails] = useState(''); // Store file name
    const [thumbnailFile, setThumbnailFile] = useState(null); // Store file object

    const uploadRef = useRef(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
        const response = await axios.get('https://login.wegostores.com/user/v1/subscription/payment_methods', {
            headers: {
                         Authorization: `Bearer ${auth.user.token}`,
                  },
           });
           if (response.status === 200) {
                  console.log(response.data)
                  setPaymentMethods(response.data.payment_methods)
           }
    } catch (error) {
           console.error('Error fetching data:', error);
    } finally {
           setIsLoading(false);
    }}

    useEffect(() => {
        fetchData(); 
    }, []);

    
    const handleInputClick = () => {
        if (uploadRef.current) {
            uploadRef.current.click(); // Trigger the file input
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setThumbnailFile(file); // Set file object for upload
            setThumbnails(file.name); // Display file name in the text input
        }
        console.log(file)
    };

    if (isLoading) {
        return (
          <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
            <Loading />
          </div>
        );
    }    
      
    if (!paymentMethods) {
        return <div className='text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center'>No payment Methods data available</div>;
    }

  return (
    <div className="flex flex-col gap-5">
    <label className="font-semibold text-3xl text-mainColor">Select Payment Method:</label>
    <div className="flex flex-col gap-5">
      {paymentMethods.map((method) => (
        <div key={method.id} className="shadow p-6 w-full lg:w-1/2">
          <label className="text-2xl flex items-center gap-3 cursor-pointer text-mainColor">
            <input
              type="radio"
              name="paymentMethod" // Add name attribute for single selection
              className="w-6 h-6 border-2 text-mainColor border-mainColor"
              value={method.name} // Use method.name instead of selectedMethod
              onChange={() => setSelectedMethod(method.name)} // Set selected method
            />
            <img src={method.thumbnailUrl} alt={method.name} className='w-16'/>
            {method.name}
          </label>  
          {/* Conditionally render based on selectedMethod */}
          {selectedMethod === method.name && (
            <div className="lg:w-full sm:w-full flex flex-col gap-5 mt-4 p-4">
              {method.name === "Vodafone" ? (
                <>
                  <InputCustom
                    type="text"
                    borderColor="mainColor"
                    placeholder="Upload Receit"
                    value={thumbnails}
                    readOnly={true}
                    onClick={handleInputClick}
                    required={false}
                    upload={true}
                  />
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    ref={uploadRef}
                  />
                  <div className="w-full flex sm:flex-col lg:flex-row items-center justify-start sm:gap-y-5 lg:gap-x-28 sm:my-8 lg:my-0">
                      <div className="flex items-center justify-center w-72">
                          <Button
                              type="submit"
                              Text="Done"
                              BgColor="bg-mainColor"
                              Color="text-white"
                              Width="full"
                              Size="text-2xl"
                              px="px-28"
                              rounded="rounded-2xl"
                              stateLoding={isLoading}
                          />
                      </div>
                      <button className="text-2xl text-mainColor">Cancel</button>
                  </div>
                </>
              ) : method.name === "Paypal" ? (
                <>
                <InputCustom
                  type="text"
                  placeholder="Phone"
                  borderColor="mainColor"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <div className="w-full flex sm:flex-col lg:flex-row items-center justify-start sm:gap-y-5 lg:gap-x-28 sm:my-8 lg:my-0">
                      <div className="flex items-center justify-center w-72">
                          <Button
                              type="submit"
                              Text="Done"
                              BgColor="bg-mainColor"
                              Color="text-white"
                              Width="full"
                              Size="text-2xl"
                              px="px-28"
                              rounded="rounded-2xl"
                              stateLoding={isLoading}
                          />
                      </div>
                      <button className="text-2xl text-mainColor">Cancel</button>
                  </div>
                  </>
              ) : null}
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
  

  );
}

export default CheckoutPage;
