import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../Context/Auth';
import Loading from '../../../Components/Loading';
import axios from 'axios';
import {ButtonAdd} from '../../../Components/Button'
import { Link ,useNavigate} from 'react-router-dom';
import {Wroning,DeleteIcon,EditIcon} from '../../../Components/Icons/AllIcons';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { MdCheck } from "react-icons/md";
import CheckBox from '../../../Components/CheckBox';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../../Redux/CartSlice.js'; // Added removeFromCart
import { CiMoneyCheck1 } from "react-icons/ci";
import { MdAttachMoney } from "react-icons/md";

const ExtraPage = () => {

    const auth = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [extraProduct, setExtraProduct] = useState([]);
    const dispatch = useDispatch();
    const [billingPeriod, setBillingPeriod] = useState({});
//     const [selectedProductId, setSelectedProductId] = useState(null);
    const navigate = useNavigate(); // Replace useHistory with useNavigate

    const [selectedProductIds, setSelectedProductIds] = useState([]); // To track multiple selected product IDs

   
    const fetchData = async () => {
        setIsLoading(true);
        try {
               const response = await axios.get('https://login.wegostores.com/user/v1/extra', {
                      headers: {
                             Authorization: `Bearer ${auth.user.token}`,
                      },
               });
               if (response.status === 200) {
                      console.log(response.data)
                      setExtraProduct(response.data.extras)
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

    const handleAddToCart = (product) => {
       const selectedPeriod = billingPeriod[product.id] || 'monthly';
       const priceOptions = {
           monthly: product.monthly,
           quarterly: product.quarterly || product.monthly * 3,
           semiAnnually: product["semi-annual"] || product.monthly * 6,
           annually: product.yearly,
       };
       const currentPrice = priceOptions[selectedPeriod];
   
       const productWithPeriodAndPrice = { 
           ...product, 
           billingPeriod: selectedPeriod, 
           finalprice: currentPrice 
       };
   
       if (selectedProductIds.includes(product.id)) {
           // If already selected, remove it from cart
           setSelectedProductIds((prev) => prev.filter((id) => id !== product.id));
           dispatch(removeFromCart(productWithPeriodAndPrice));
           localStorage.setItem(
               'selectedProductIds',
               JSON.stringify(selectedProductIds.filter((id) => id !== product.id))
           );
       } else {
           // Add new product to selection and cart
           setSelectedProductIds((prev) => [...prev, product.id]);
           dispatch(addToCart(productWithPeriodAndPrice));
           localStorage.setItem(
               'selectedProductIds',
               JSON.stringify([...selectedProductIds, product.id])
           );
       }
   };

   const handleBillingPeriodChange = (productId, newPeriod) => {
       setBillingPeriod((prev) => ({ ...prev, [productId]: newPeriod }));
   };

   useEffect(() => {
       const savedProductIds = JSON.parse(localStorage.getItem('selectedProductIds')) || [];
       if (Array.isArray(extraProduct) && savedProductIds.length > 0) {
           setSelectedProductIds(savedProductIds);
       } else {
           console.warn("extraProduct is not an array:", extraProduct);
       }
   }, [extraProduct]);
   
   useEffect(() => {
       if (Array.isArray(extraProduct)) {
           const selectedProducts = extraProduct.filter((product) =>
               selectedProductIds.includes(product.id)
           );
   
           selectedProducts.forEach((product) => {
               const selectedPeriod = billingPeriod[product.id] || 'monthly';
               const priceOptions = {
                   monthly: product.monthly,
                   quarterly: product.quarterly || product.monthly * 3,
                   semiAnnually: product["semi-annual"] || product.monthly * 6,
                   annually: product.yearly,
               };
               const currentPrice = priceOptions[selectedPeriod];
   
               const productWithDetails = { 
                   ...product, 
                   billingPeriod: selectedPeriod, 
                   finalprice: currentPrice 
               };
   
               dispatch(addToCart(productWithDetails));
           });
       } else {
           console.warn("extraProduct is not an array:", extraProduct);
       }
   }, [selectedProductIds, extraProduct, billingPeriod, dispatch]);

   const handleRemoveFromCart = (product) => {
       // Remove the product from the selectedProductIds array
       setSelectedProductIds((prev) => prev.filter((id) => id !== product.id));
       // Remove the product from the cart by dispatching the action
       dispatch(removeFromCart(product)); // You might need to adjust this based on your actual implementation of the removeFromCart action.
       localStorage.removeItem('selectedProductIds');

     };
     
   

//     const handleAddToCart = (product) => {
//        const selectedPeriod = billingPeriod[product.id] || 'monthly';
//        const priceOptions = {
//            monthly: product.monthly,
//            quarterly: product.quarterly || product.monthly * 3,
//            semiAnnually: product["semi-annual"] || product.monthly * 6,
//            annually: product.yearly,
//        };
//        const currentPrice = priceOptions[selectedPeriod];
   
//        const productWithPeriodAndPrice = { 
//            ...product, 
//            billingPeriod: selectedPeriod, 
//            finalprice: currentPrice 
//        };
   
//        if (selectedProductId == product.id) {
//            // Deselect product and remove from cart
//            setSelectedProductId(null);
//            dispatch(removeFromCart(productWithPeriodAndPrice));
       //     localStorage.removeItem('selectedProductId');
//        } else {
//            // Deselect previous product and add new product
//            if (selectedProductId !== null) {
//                const previousProduct = extraProduct.find((p) => p.id == selectedProductId);
//                const previousProductWithPeriodAndPrice = {
//                    ...previousProduct,
//                    billingPeriod: billingPeriod[previousProduct.id] || 'monthly',
//                    finalprice: priceOptions[billingPeriod[previousProduct.id] || 'monthly']
//                };
//                dispatch(removeFromCart(previousProductWithPeriodAndPrice));
//                localStorage.removeItem('selectedProductId');
//            }
//            dispatch(addToCart(productWithPeriodAndPrice));
//            setSelectedProductId(product.id);
//            localStorage.setItem('selectedProductId', product.id);  // Save selected product to localStorage
//        }
//    };
   
//    // Handle billing period change
//    const handleBillingPeriodChange = (productId, newPeriod) => {
//        setBillingPeriod((prev) => ({ ...prev, [productId]: newPeriod }));
//    };
//     useEffect(() => {
//         fetchData(); 
//     }, []);

//     useEffect(() => {
//        const savedProductId = localStorage.getItem('selectedProductId');
//        if (savedProductId && extraProduct.length > 0) {
//            setSelectedProductId(savedProductId);
//        }
//        console.log(savedProductId)
//    }, [extraProduct]); 

//    useEffect(() => {
//        // If a product is selected, add it to the cart
//        if (selectedProductId) {
//            const selectedProduct = extraProduct.find((product) => product.id == selectedProductId);
//            console.log(selectedProduct)
//            if (selectedProduct) {
//                dispatch(addToCart(selectedProduct));
//            }
//        }
//    }, [selectedProductId, extraProduct, dispatch]); // Ensure to run only when selectedProductId or product change
    
    if (isLoading) {
        return (
          <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
            <Loading />
          </div>
        );
    }    
  
       return (
              <>
              {extraProduct.length !== 0 ? (
              <>
                     <div className="w-full p-2 flex flex-col">
                     <div className="w-full grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-3">
                            {extraProduct.map((product, index) => {
                            if (product.status === "one_time") {
                                   // Display only the product.price if status is "one_time"
                                   return (
                                   <div
                                   key={product.id}
                                   className={`relative flex flex-col justify-between p-6 shadow-md text-2xl rounded-lg border  hover:shadow-lg transition-all 
                                      ${selectedProductIds.includes(product.id) ? 'border-green-500 bg-green-100' : ''}`}
                                   >
                                   <div>
                                          <h2 className="text-center text-mainColor font-semibold text-3xl mb-4">{product.name}</h2>
                                          <div className="space-y-3 mb-6">
                                          <p className="text-gray-700"> {product.description}</p>
                                          <p className="text-gray-700 flex items-center gap-2"><CiMoneyCheck1 size={30} className='text-mainColor font-semibold' /><span className="font-semibold">SetUp Fees:</span> {product.setup_fees || '0'} EGP</p>
                                          <p className="text-gray-700 flex items-center gap-2"><MdAttachMoney size={30} className='text-mainColor font-semibold' /><span className="font-semibold">Price:</span> {product.price || '0'} EGP</p>
                                          </div>
                                   </div>    
                                          {/* <div>
                                          {product.my_extra === true ? (
                                          <button
                                                 className={`w-full py-3 font-semibold rounded-lg transition-transform transform 
                                                 bg-gray-300 text-gray-800 hover:scale-105`}
                                          >
                                                 My Extra Product
                                          </button>
                                          ) : (
                                          <>
                                                 <div className="w-full">
                                                 {selectedProductId != product.id && (
                                                 <button
                                                 onClick={() => handleAddToCart(product)}
                                                 className={`w-full py-3 font-semibold rounded-lg transition-all duration-300 transform 
                                                 ${selectedProductId === product.id ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-mainColor text-white hover:bg-blue-700'} 
                                                 hover:scale-105 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mainColor`}
                                                 >
                                                 Add to Cart
                                                 </button>
                                                 )}

                                                 {selectedProductId == product.id && (
                                                 <div className="flex space-x-3 mt-3">
                                                 <button
                                                        onClick={() => handleAddToCart(product)}
                                                        className="w-full text-xl py-3 font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-md"
                                                 >
                                                        Remove from Cart
                                                 </button>
                                                 <button
                                                        onClick={() => navigate('../cart')}
                                                        className="w-full text-xl py-3 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md"
                                                 >
                                                        Go to Cart
                                                 </button>
                                                 </div>
                                                 )}
                                                 </div>
                                          </>
                                          )}
                                          {selectedProductId == product.id && (
                                          <div className="absolute top-0 left-0 p-2 bg-green-500 text-white text-sm font-semibold rounded-tr-lg">
                                                 Selected
                                          </div>
                                          )}
                                          </div> */}

                                          <div>
                                          {product.my_extra === true ? (
                                          <button
                                          className="w-full py-3 font-semibold rounded-lg transition-transform transform bg-gray-300 text-gray-800 hover:scale-105"
                                          >
                                          My Extra Product
                                          </button>
                                          ) : (
                                          <>
                                          <div className="w-full">
                                                 {/* Add to Cart Button */}
                                                 {!selectedProductIds.includes(product.id) && (
                                                 <button
                                                 onClick={() => handleAddToCart(product)}
                                                 className={`w-full py-3 font-semibold rounded-lg transition-all duration-300 transform 
                                                        ${selectedProductIds.includes(product.id) ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-mainColor text-white hover:bg-blue-700'} 
                                                        hover:scale-105 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mainColor`}
                                                 >
                                                 Add to Cart
                                                 </button>
                                                 )}

                                                 {/* Remove from Cart and Go to Cart Buttons */}
                                                 {selectedProductIds.includes(product.id) && (
                                                 <div className="flex space-x-3 mt-3">
                                                 <button
                                                        onClick={() => handleRemoveFromCart(product)}
                                                        className="w-full text-xl py-3 font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-md"
                                                 >
                                                        Remove from Cart
                                                 </button>
                                                 <button
                                                        onClick={() => navigate('../cart')}
                                                        className="w-full text-xl py-3 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md"
                                                 >
                                                        Go to Cart
                                                 </button>
                                                 </div>
                                                 )}
                                          </div>
                                          </>
                                          )}

                                          {/* "Selected" Label */}
                                          {selectedProductIds.includes(product.id) && (
                                          <div className="absolute top-0 left-0 p-2 bg-green-500 text-white text-sm font-semibold rounded-tr-lg">
                                          Selected
                                          </div>
                                          )}
                                          </div>

                                   </div>
                                   );
                            }
                            // Continue with the original logic for other products
                            const selectedPeriod = billingPeriod[product.id] || 'monthly';
                            const priceOptions = {
                                   monthly: product.monthly,
                                   quarterly: product.quarterly || product.monthly * 3,
                                   semiAnnually: product["semi-annual"] || product.monthly * 6,
                                   annually: product.yearly,
                            };
                            const currentPrice = priceOptions[selectedPeriod];

                            // Calculate savings
                            const savings = selectedPeriod === 'monthly' ? 0 :
                                   selectedPeriod === 'quarterly' ? (product.monthly * 3 - currentPrice) :
                                   selectedPeriod === 'semiAnnually' ? (product.monthly * 6 - currentPrice) :
                                   selectedPeriod === 'annually' ? (product.monthly * 12 - currentPrice) : 0;

                            return (
                                   <div
                                          key={product.id}
                                          className={`relative p-6 shadow-md text-2xl rounded-lg border hover:shadow-lg transition-all 
                                             ${selectedProductIds.includes(product.id) ? 'border-green-500 bg-green-100' : ''}`}
                                   >
                                          <h2 className="text-center text-mainColor font-semibold text-3xl mb-4">{product.name}</h2>
                                          <div className="space-y-3">
                                          <p className="text-gray-700"> {product.description}</p>
                                          {/* <p className="text-gray-700 flex items-center gap-2"><CiMoneyCheck1 size={30} className='text-mainColor font-semibold' /><span className="font-semibold">SetUp Fees:</span> {product.setup_fees || '0'} EGP</p> */}
                                          </div>
                                          <div className="flex justify-between items-center mb-4">
                                          <label htmlFor={`billing-${product.id}`} className="text-xl md:text-2xl font-semibold text-gray-800">Billing Period:</label>
                                          <select
                                                 id={`billing-${product.id}`}
                                                 value={selectedPeriod}
                                                 onChange={(e) => handleBillingPeriodChange(product.id, e.target.value)}
                                                 className="bg-gray-100 border border-gray-400 text-gray-700 rounded-lg p-2"
                                          >
                                                 <option value="monthly">Monthly</option>
                                                 <option value="quarterly">3 Months</option>
                                                 <option value="semiAnnually">6 Months</option>
                                                 <option value="annually">Yearly</option>
                                          </select>
                                          </div>
                                          <div className="text-center mb-4">
                                          {selectedPeriod !== 'monthly' && (
                                                 <p className="text-lg text-gray-500">{priceOptions.monthly} EGP / month</p>
                                          )}
                                          <p className="text-3xl font-bold text-mainColor">{currentPrice} EGP</p>
                                          <span className="text-gray-600">{selectedPeriod === 'monthly' ? 'per month' : `per ${selectedPeriod}`}</span>
                                          {savings > 0 && (
                                                 <p className="text-green-500 font-semibold mt-2">Save {savings} EGP per {selectedPeriod}</p>
                                          )}
                                          </div>            

                            {/* <div>
                                {product.my_extra === true ? (
                                <button
                                    className={`w-full py-3 font-semibold rounded-lg transition-transform transform 
                                    bg-gray-300 text-gray-800 hover:scale-105`}
                                >
                                    My Extra Product
                                </button>
                                ) : (
                                <>
                                   <div className="w-full">
                                   {selectedProductId != product.id && (
                                   <button
                                   onClick={() => handleAddToCart(product)}
                                   className={`w-full py-3 font-semibold rounded-lg transition-all duration-300 transform 
                                   ${selectedProductId === product.id ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-mainColor text-white hover:bg-blue-700'} 
                                   hover:scale-105 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mainColor`}
                                   >
                                   Add to Cart
                                   </button>
                                   )}
                                   {selectedProductId == product.id && (
                                   <div className="flex space-x-3 mt-3">
                                   <button
                                          onClick={() => handleAddToCart(product)}
                                          className="w-full text-xl py-3 font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-md"
                                   >
                                          Remove from Cart
                                   </button>
                                   <button
                                          onClick={() => navigate('../cart')}
                                          className="w-full text-xl py-3 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md"
                                   >
                                          Go to Cart
                                   </button>
                                   </div>
                                   )}
                                   </div>
                                </>
                                )}
                                {selectedProductId == product.id && (
                                <div className="absolute top-0 left-0 p-2 bg-green-500 text-white text-sm font-semibold rounded-tr-lg">
                                    Selected
                                </div>
                                )}
                            </div> */}
                                   
                            <div>
                            {product.my_extra === true ? (
                            <button
                            className="w-full py-3 font-semibold rounded-lg transition-transform transform bg-gray-300 text-gray-800 hover:scale-105"
                            >
                            My Extra Product
                            </button>
                            ) : (
                            <>
                            <div className="w-full">
                                   {/* Add to Cart Button */}
                                   {!selectedProductIds.includes(product.id) && (
                                   <button
                                   onClick={() => handleAddToCart(product)}
                                   className={`w-full py-3 font-semibold rounded-lg transition-all duration-300 transform 
                                          ${selectedProductIds.includes(product.id) ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-mainColor text-white hover:bg-blue-700'} 
                                          hover:scale-105 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mainColor`}
                                   >
                                   Add to Cart
                                   </button>
                                   )}

                                   {/* Remove from Cart and Go to Cart Buttons */}
                                   {selectedProductIds.includes(product.id) && (
                                   <div className="flex space-x-3 mt-3">
                                   <button
                                          onClick={() => handleRemoveFromCart(product)}
                                          className="w-full text-xl py-3 font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-md"
                                   >
                                          Remove from Cart
                                   </button>
                                   <button
                                          onClick={() => navigate('../cart')}
                                          className="w-full text-xl py-3 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md"
                                   >
                                          Go to Cart
                                   </button>
                                   </div>
                                   )}
                            </div>
                            </>
                            )}

                            {/* "Selected" Label */}
                            {selectedProductIds.includes(product.id) && (
                            <div className="absolute top-0 left-0 p-2 bg-green-500 text-white text-sm font-semibold rounded-tr-lg">
                            Selected
                            </div>
                            )}
                            </div>

                                   </div>
                            );
                            })}
                     </div>
                     </div>
              </>
              ) : (
              <div className='w-full flex flex-col gap-5 justify-center items-center'>
                     <h1 className='text-center text-2xl lg:text-3xl text-mainColor font-semibold'>No extra product data available</h1>
              </div>
              )}
              </>
       )
}

export default ExtraPage
