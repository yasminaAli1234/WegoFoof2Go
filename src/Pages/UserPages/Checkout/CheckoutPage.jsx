import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuth } from "../../../Context/Auth";
import Loading from "../../../Components/Loading";
import InputCustom from "../../../Components/InputCustom";
import { Button } from "../../../Components/Button";
import { useLocation ,useNavigate} from "react-router-dom";

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
  const [discount, setDiscount] = useState(0); // State to store the discount amount
  const uploadRef = useRef(null);
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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
    console.log("cartItems", cartItems);
    console.log("totalPrice", totalPrice);
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

  // const handleApplyPromo = async () => {
  //   if (!promoCode) {
  //     alert("Please enter a promo code.");
  //     return;
  //   }

  //   setIsLoading(true);

  //   const formattedData = {
  //     code: promoCode,
  //     plan: cartItems
  //       .filter((item) => item.id && item.billingprice_cycle)
  //       .map((item) => ({
  //         plan_id: item.id,
  //         duration: item.billingprice_cycle,
  //         price: item.price_per_month || item.price_per_year || 0,
  //       })),
  //     extra: cartItems
  //       .filter((item) => item.name && item.price && !item.billingPeriod)
  //       .map((item) => ({
  //         extra_id: item.id,
  //         price: item.price,
  //       })),
  //     domain: [],
  //   };

  //   try {
  //     const response = await axios.post(
  //       "https://login.wegostores.com/user/v1/promocode",
  //       formattedData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${auth.user.token}`,
  //         },
  //       }
  //     );

  //     if (response.status === 200) {
  //       const { discount } = response.data; // Extract the discount
  //       setDiscount(discount); // Update the discount state
  //       const newTotal = totalPrice - discount; // Calculate the discounted total
  //       setDiscountedPrice(newTotal); // Update state with the new total
  //       auth.toastSuccess(`Promo code applied! You saved ${discount} EGP.`);
  //       setPromoCode("");
  //     } else {
  //       auth.toastError("Failed to apply promo code. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error applying promo code:", error);
  //     auth.toastError("Invalid promo code.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleSubmit = async () => {
    if (selectedMethod.name === "VodafoneCash") {
      // Define a duration mapping object
      const durationMap = {
        monthly: 1,
        quarterly: 3,
        "semi-annual": 6, // Updated to match your example
        yearly: "yearly",
      };
  
      // Process Plan Items
      const planItems = cartItems
        .filter((item) => item.type === "plan")
        .map((item) => ({
          id: item.id,
          package: durationMap[item.billingPeriod] || 1, // Default to "monthly" (1) if not provided,
          price_item: item.price || item.finalprice
        }));
  
      // Process Extra Items
      const extraItems = cartItems
        .filter((item) => item.type === "extra")
        .map((item) => ({
          id: item.id,
          package: durationMap[item.billingPeriod] || 1,
          price_item: item.price || item.finalprice
        }));
  
      // Process Domain Items
      const domainItems = cartItems
        .filter((item) => item.type === "domain")
        .map((item) => ({
          id: item.id,
          package: durationMap[item.billingPeriod] || null,
          price_item: item.price || item.finalprice
        }));
  
      // Prepare Request Data
      const requestData = {
        payment_method_id: selectedMethod.id,
        plan: planItems,
        extra: extraItems.length > 0 ? extraItems : null,
        domain: domainItems.length > 0 ? domainItems : null,
        invoice_image: thumbnailFile,
        amount: discountedPrice || totalPrice,
      };
  
      console.log("Request Data:", requestData);
  
      try {
        setIsLoading(true); // Set loading state
  
        const response = await axios.post(
          "https://login.wegostores.com/user/v1/cart",
          requestData,
          {
            headers: {
              Authorization: `Bearer ${auth.user.token}`,
            },
          }
        );
  
        if (response.status === 200) {
          console.log(response.data);
          // auth.toastSuccess('Order Send successfully!');

           // Show success modal
        setShowSuccessModal(true);

        // Remove cart from localStorage
        localStorage.removeItem('cart');
        localStorage.removeItem('selectedPlanId');
        localStorage.removeItem('selectedDomainId');
        localStorage.removeItem('selectedProductIds');
        // Navigate to the cart page
        setTimeout(() => {
          navigate("/dashboard_user/cart");
        }, 3000); // Allow time for modal before navigating
      
        } else {
          alert("Failed to submit the order. Please try again.");
        }
      } catch (error) {
        console.error("Error during order submission:", error);
        alert("An error occurred while submitting the order.");
      } finally {
        setIsLoading(false); // Reset loading state
      }
    } 
    
    else if (selectedMethod.name === "paymob") {
      // const planItem = cartItems.find((item) => item.type === "plan");
      // const planId = planItem ? planItem.id : null;
      //  console.log(planId)

      // Process Plan Items
      const planItems = cartItems
      .filter((item) => item.type === "plan")
      .map((item) => ({
        plan_id: item.id,
        price_cycle: item.billingPeriod || "monthly",
      }));
  
      const extraItems = cartItems
        .filter((item) => item.type === "extra")
        .map((item) => ({
          extra_id: item.id,
          price_cycle: item.billingPeriod || "monthly",
        }));
  
      const domainItems = cartItems
        .filter((item) => item.type === "domain")
        .map((item) => ({
          domain_id: item.id,
          price_cycle: item.billingPeriod || "monthly",
        }));
  
      const requestData = {
        payment_method_id: selectedMethod.id,
        cart: {
          plan: planItems.length > 0 ? planItems : null,
          extra: extraItems.length > 0 ? extraItems : null,
          domain: domainItems.length > 0 ? domainItems : null,
        },
        total_amount: discountedPrice || totalPrice,
      };
  
      console.log("Request Data:", requestData);
  
      try {
        setIsLoading(true);
  
        const response = await axios.post(
          "https://login.wegostores.com/user/v1/payment/credit",
          requestData,
          {
            headers: {
              Authorization: `Bearer ${auth.user.token}`,
            },
          }
        );
  
        if (response.status === 200) {
          console.log(response.data);

               // Show success modal
        // setShowSuccessModal(true);

        // Remove cart from localStorage
        localStorage.removeItem('cart');
        localStorage.removeItem('selectedPlanId');
        localStorage.removeItem('selectedDomainId');
        localStorage.removeItem('selectedProductIds');

        //Navigate to the cart page
        setTimeout(() => {
          navigate("/dashboard_user/cart");
        }, 3000); // Allow time for modal before navigating
    
  
          if (response.data.url) {
            window.location.href = response.data.url;
          } else {
            alert("No redirect URL found in the response.");
          }
        } else {
          alert("Failed to submit the order. Please try again.");
        }
      } catch (error) {
        console.error("Error during order submission:", error);
        alert("An error occurred while submitting the order.");
      } finally {
        setIsLoading(false);
      }
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
    <div className="flex flex-col gap-5 p-6 bg-gray-50 rounded-lg shadow-lg">
      {/* <label className="font-semibold text-3xl text-mainColor">
        Select Payment Method:
      </label> */}

      <div className="w-full flex flex-col xl:flex-row-reverse gap-5">
        <div className="bg-white sm-w-full xl:w-1/2 shadow-md p-4 rounded-lg ">
        
          {/* <div className="flex items-center gap-4 mt-4">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter promo code"
              className="flex-1 text-xl px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainColor transition-all ease-in-out duration-300"
            />
            <button
              onClick={handleApplyPromo}
              className="px-6 py-2 text-xl bg-mainColor text-white font-semibold rounded-lg hover:bg-mainColor-dark transition-all ease-in-out duration-300"
            >
              Apply
            </button>
          </div> */}

      <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
        Order Summary
      </h3>

      {/* Display total price */}
      <div className="flex justify-between text-lg text-gray-700 mb-3">
        <span className="font-medium">Total Price:</span>
        <span className="font-semibold text-mainColor">{totalPrice} EGP</span>
      </div>

      {/* Display discount */}
      <div className="flex justify-between text-lg text-gray-700 mb-3">
        <span className="font-medium">Discount:</span>
        <span className="font-semibold text-red-600">{discount} EGP</span>
      </div>

      {/* Display total after discount */}
      <div className="flex justify-between text-lg font-bold text-gray-900">
        <span>Total Price After Discount:</span>
        <span className="text-green-600">{discountedPrice} EGP</span>
      </div>
        </div>

      <div className="flex flex-col gap-5 sm-w-full xl:w-1/2">
      <label className="font-semibold text-xl xl:text-3xl text-mainColor">
        Select Payment Method:
      </label>

        {/* {paymentMethods.map((method) => (
                  <div key={method.id} className="shadow bg-white p-6 w-full">
                    <label className="text-2xl flex items-center gap-3 cursor-pointer text-mainColor">
                      <input
                        type="radio"
                        name="paymentMethod"
                        className="w-6 h-6 border-2 text-mainColor border-mainColor"
                        value={method.name}
                        onChange={() => setSelectedMethod(method)}
                      />
                      <img src={method.thumbnailUrl} alt={method.name} className="w-16" />
                      {method.name}
                    </label>
            {selectedMethod.name === "VodafoneCash" && (
            <div className="lg:w-full sm:w-full flex flex-col gap-5 mt-4 p-4">
              <InputCustom
                type="text"
                borderColor="mainColor"
                placeholder="Upload Receipt"
                value={thumbnails}
                readOnly={true}
                onClick={handleInputClick}
                upload="true"
              />
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                ref={uploadRef}
              />
            </div>
            )}
                  </div>
                ))} */}

        {paymentMethods.map((method) => (
          <div key={method.id} className="shadow bg-white p-6 w-full">
            <label className="text-2xl flex items-center gap-3 cursor-pointer text-mainColor">
              <input
                type="radio"
                name="paymentMethod"
                className="w-6 h-6 border-2 text-mainColor border-mainColor"
                value={method.name}
                onChange={() => setSelectedMethod(method)}
              />
              <img src={method.thumbnailUrl} alt={method.name} className="w-16" />
              {method.name}
            </label>
            {selectedMethod && selectedMethod.name === "VodafoneCash" && method.name === "VodafoneCash" && (
              <div className="lg:w-full sm:w-full flex flex-col gap-5 mt-4 p-4">
                <InputCustom
                  type="text"
                  borderColor="mainColor"
                  placeholder="Upload Receipt"
                  value={thumbnails}
                  readOnly={true}
                  onClick={handleInputClick}
                  upload="true"
                />
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  ref={uploadRef}
                />
              </div>
            )}
          </div>
        ))}

              
      </div>

      </div>
       {/* Submit Button */}
       <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="px-6 py-3 mt-6 text-xl bg-green-500 text-white font-bold rounded-lg hover:bg-green-700 transition-all ease-in-out duration-300"
          disabled={!selectedMethod}
        >
          Submit Order
        </button>
       </div>

        {/* Success Modal */}
        {showSuccessModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-8 shadow-xl max-w-md mx-auto transition-transform transform scale-95 hover:scale-100">
            <div className="text-center">
              <h2 className="text-4xl font-extrabold text-green-600 mb-4">
                Order Request Successful!
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Thank you for your order! We’ll be in touch with you shortly to confirm the details.
              </p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-8 py-3 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
              >
                Close
              </button>

            </div>
          </div>
        </div>
      )}

       

    </div>
  );
};

export default CheckoutPage;
