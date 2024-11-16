// import React, { useState, useEffect,useRef } from 'react';
// import axios from 'axios';
// import { useAuth } from '../../../Context/Auth';
// import Loading from '../../../Components/Loading';
// import {ButtonAdd} from '../../../Components/Button'
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import CheckBox from '../../../Components/CheckBox';
// import InputCustom from '../../../Components/InputCustom';
// import { Button } from '../../../Components/Button';

// const CheckoutPage = () => {

//     const auth = useAuth();
//     const location = useLocation();
//     const { cartItems } = location.state || {};
//     const { totalPrice } = location.state || {};
//     const [isLoading, setIsLoading] = useState(false);
//     const [paymentMethods, setPaymentMethods] = useState([]);
//     const [selectedMethod, setSelectedMethod] = useState('');
//     const [phone, setPhone] = useState('');
//     const [thumbnails, setThumbnails] = useState(''); // Store file name
//     const [thumbnailFile, setThumbnailFile] = useState(null); // Store file object


//     const uploadRef = useRef(null);

//   const fetchData = async () => {
//     setIsLoading(true);
//     try {
//         const response = await axios.get('https://login.wegostores.com/user/v1/subscription/payment_methods', {
//             headers: {
//                          Authorization: `Bearer ${auth.user.token}`,
//                   },
//            });
//            if (response.status === 200) {
//                   console.log(response.data)
//                   setPaymentMethods(response.data.payment_methods)
//            }
//     } catch (error) {
//            console.error('Error fetching data:', error);
//     } finally {
//            setIsLoading(false);
//     }}

//     useEffect(() => {
//         fetchData(); 
        // console.log("cartItems",cartItems)
        // console.log("totalPrice",totalPrice)
//     }, []);

    
//     const handleInputClick = () => {
//         if (uploadRef.current) {
//             uploadRef.current.click(); // Trigger the file input
//         }
//     };

//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setThumbnailFile(file); // Set file object for upload
//             setThumbnails(file.name); // Display file name in the text input
//         }
//         console.log(file)
//     };

//     if (isLoading) {
//         return (
//           <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
//             <Loading />
//           </div>
//         );
//     }    
      
//     if (!paymentMethods) {
//         return <div className='text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center'>No payment Methods data available</div>;
//     }

//   return (
//     <div className="flex flex-col gap-5">
//     <label className="font-semibold text-3xl text-mainColor">Select Payment Method:</label>
//     <div className="flex flex-col gap-5">
//       {paymentMethods.map((method) => (
//         <div key={method.id} className="shadow p-6 w-full lg:w-1/2">
//           <label className="text-2xl flex items-center gap-3 cursor-pointer text-mainColor">
//             <input
//               type="radio"
//               name="paymentMethod" // Add name attribute for single selection
//               className="w-6 h-6 border-2 text-mainColor border-mainColor"
//               value={method.name} // Use method.name instead of selectedMethod
//               onChange={() => setSelectedMethod(method.name)} // Set selected method
//             />
//             <img src={method.thumbnailUrl} alt={method.name} className='w-16'/>
//             {method.name}
//           </label>  
//           {/* Conditionally render based on selectedMethod */}
//           {selectedMethod === method.name && (
//               method.name === "Vodafone" ? (
//               <div className="lg:w-full sm:w-full flex flex-col gap-5 mt-4 p-4">
//                     <InputCustom
//                       type="text"
//                       borderColor="mainColor"
//                       placeholder="Upload Receit"
//                       value={thumbnails}
//                       readOnly={true}
//                       onClick={handleInputClick}
//                       required={false}
//                       upload={true}
//                     />
//                     <input
//                       type="file"
//                       className="hidden"
//                       onChange={handleFileChange}
//                       ref={uploadRef}
//                     />
//                     <div className="w-full flex sm:flex-col lg:flex-row items-center justify-start sm:gap-y-5 lg:gap-x-28 sm:my-8 lg:my-0">
//                         <div className="flex items-center justify-center w-72">
//                             <Button
//                                 type="submit"
//                                 Text="Done"
//                                 BgColor="bg-mainColor"
//                                 Color="text-white"
//                                 Width="full"
//                                 Size="text-2xl"
//                                 px="px-28"
//                                 rounded="rounded-2xl"
//                                 stateLoding={isLoading}
//                             />
//                         </div>
//                         <button className="text-2xl text-mainColor">Cancel</button>
//                     </div>
//               </div>
//               ) : method.name === "Paypal" ? (
//                 <div className="lg:w-full sm:w-full flex flex-col gap-5 mt-4 p-4">
//                 <InputCustom
//                   type="text"
//                   placeholder="Phone"
//                   borderColor="mainColor"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                 />
//                 <div className="w-full flex sm:flex-col lg:flex-row items-center justify-start sm:gap-y-5 lg:gap-x-28 sm:my-8 lg:my-0">
//                       <div className="flex items-center justify-center w-72">
//                           <Button
//                               type="submit"
//                               Text="Done"
//                               BgColor="bg-mainColor"
//                               Color="text-white"
//                               Width="full"
//                               Size="text-2xl"
//                               px="px-28"
//                               rounded="rounded-2xl"
//                               stateLoding={isLoading}
//                           />
//                       </div>
//                       <button className="text-2xl text-mainColor">Cancel</button>
//                   </div>
//                   </div>
//               ) :
//               (null)
//             )}
//         </div>
//          ))}
//   </div>
//   </div>
//   );
// }

// export default CheckoutPage;


import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuth } from "../../../Context/Auth";
import Loading from "../../../Components/Loading";
import InputCustom from "../../../Components/InputCustom";
import { Button } from "../../../Components/Button";
import { useLocation } from "react-router-dom";

const CheckoutPage = () => {
  const auth = useAuth();
  const location = useLocation();
  const { cartItems } = location.state || {};
  const { totalPrice } = location.state || {};
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [phone, setPhone] = useState("");
  const [thumbnails, setThumbnails] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [promoCode, setPromoCode] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState(totalPrice);
  const uploadRef = useRef(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://login.wegostores.com/user/v1/subscription/payment_methods",
        {
          headers: {
            Authorization: `Bearer ${auth.user.token}`,
          },
        }
      );
      if (response.status === 200) {
        setPaymentMethods(response.data.payment_methods);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    console.log("cartItems",cartItems)
    console.log("totalPrice",totalPrice)
  }, []);

  const handleInputClick = () => {
    if (uploadRef.current) {
      uploadRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnails(file.name);
    }
  };

  const handleApplyPromo = async () => {
    if (!promoCode) {
      alert("Please enter a promo code.");
      return;
    }
  
    setIsLoading(true);
  
    // Prepare and send data to the API
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
          duration: 1,
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
        const { discount, newTotal } = response.data; // Assume the API returns discount and new total
        setDiscountedPrice(newTotal || totalPrice);
        alert(`Promo code applied! You saved ${discount || 0} EGP.`);
      } else {
        alert("Failed to apply promo code. Please try again.");
      }
    } catch (error) {
      console.error("Error applying promo code:", error);
      alert("Invalid promo code or an error occurred.");
    } finally {
      setIsLoading(false);
    }
  };
  
  

  if (isLoading) {
    return (
      <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
        <Loading />
      </div>
    );
  }

  if (!paymentMethods) {
    return (
      <div className="text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center">
        No payment methods data available
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 p-6 bg-gray-50 rounded-lg shadow-lg max-w-4xl mx-auto">
      <label className="font-semibold text-3xl text-mainColor">
        Select Payment Method:
      </label>

      <div className="flex flex-col gap-5">
        <div className="bg-white shadow-md p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Order Summary</h3>
            <p className="text-lg font-bold text-green-600">
              {discountedPrice} EGP
            </p>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter promo code"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainColor"
            />
            <button
              onClick={handleApplyPromo}
              className="px-6 py-2 bg-mainColor text-white font-semibold rounded-lg hover:bg-mainColor-dark"
            >
              Apply
            </button>
          </div>
        </div>

        {paymentMethods.map((method) => (
          <div key={method.id} className="shadow p-6 w-full lg:w-1/2">
            <label className="text-2xl flex items-center gap-3 cursor-pointer text-mainColor">
              <input
                type="radio"
                name="paymentMethod"
                className="w-6 h-6 border-2 text-mainColor border-mainColor"
                value={method.name}
                onChange={() => setSelectedMethod(method.name)}
              />
              <img src={method.thumbnailUrl} alt={method.name} className="w-16" />
              {method.name}
            </label>

            {selectedMethod === method.name &&
              (method.name === "Vodafone" ? (
                <div className="lg:w-full sm:w-full flex flex-col gap-5 mt-4 p-4">
                  <InputCustom
                    type="text"
                    borderColor="mainColor"
                    placeholder="Upload Receipt"
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
                </div>
              ) : method.name === "Paypal" ? (
                <div className="lg:w-full sm:w-full flex flex-col gap-5 mt-4 p-4">
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
                </div>
              ) : null)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckoutPage;
