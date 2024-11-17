import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../Context/Auth';
import Loading from '../../../Components/Loading';
import axios from 'axios';
import {ButtonAdd} from '../../../Components/Button'
import { Link } from 'react-router-dom';
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
    const [extraProduct, setExtraProduct] = useState('');
    const dispatch = useDispatch();
    const [billingPeriod, setBillingPeriod] = useState({});
    const [selectedProductId, setSelectedProductId] = useState(null);

       // const handleAddToCart = (product) => {
       //        // const productToCart = {
       //        // id:product.id,
       //        // name: product.name,
       //        // price: product.status === "one_time" 
       //        //        ? product.price 
       //        //        : { yearly: product.yearly, monthly: product.monthly } // Include both yearly and monthly prices
       //        // };
       //        // dispatch(addToCart(productToCart));
       //        dispatch(addToCart(product));
       // };
   
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
   
       if (selectedProductId == product.id) {
           // Deselect product and remove from cart
           setSelectedProductId(null);
           dispatch(removeFromCart(productWithPeriodAndPrice));
           localStorage.removeItem('selectedProductId');
       } else {
           // Deselect previous product and add new product
           if (selectedProductId !== null) {
               const previousProduct = extraProduct.find((p) => p.id == selectedProductId);
               const previousProductWithPeriodAndPrice = {
                   ...previousProduct,
                   billingPeriod: billingPeriod[previousProduct.id] || 'monthly',
                   finalprice: priceOptions[billingPeriod[previousProduct.id] || 'monthly']
               };
               dispatch(removeFromCart(previousProductWithPeriodAndPrice));
               localStorage.removeItem('selectedProductId');
           }
           dispatch(addToCart(productWithPeriodAndPrice));
           setSelectedProductId(product.id);
           localStorage.setItem('selectedProductId', product.id);  // Save selected product to localStorage
       }
   };
   
   // Handle billing period change
   const handleBillingPeriodChange = (productId, newPeriod) => {
       setBillingPeriod((prev) => ({ ...prev, [productId]: newPeriod }));
   };

    useEffect(() => {
        fetchData(); 
    }, []);

    useEffect(() => {
       const savedProductId = localStorage.getItem('selectedProductId');
       if (savedProductId && extraProduct.length > 0) {
           setSelectedProductId(savedProductId);
       }
       console.log(savedProductId)
   }, [extraProduct]); 

   useEffect(() => {
       // If a product is selected, add it to the cart
       if (selectedProductId) {
           const selectedProduct = extraProduct.find((product) => product.id == selectedProductId);
           console.log(selectedProduct)
           if (selectedProduct) {
               dispatch(addToCart(selectedProduct));
           }
       }
   }, [selectedProductId, extraProduct, dispatch]); // Ensure to run only when selectedProductId or product change
    
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
                                          key={index}
                                          className={`relative p-6 bg-white shadow-md text-2xl rounded-lg border border-gray-200 hover:shadow-lg transition-all 
                                          ${selectedProductId == product.id ? 'border-green-500' : ''}`}
                                   >
                                          <h2 className="text-center text-mainColor font-semibold text-3xl mb-4">{product.name}</h2>
                                          <div className="space-y-3 mb-6">
                                          <p className="text-gray-700"> {product.description}</p>
                                          <p className="text-gray-700 flex items-center gap-2"><CiMoneyCheck1 size={30} className='text-mainColor font-semibold' /><span className="font-semibold">SetUp Fees:</span> {product.setup_fees || '0'} EGP</p>
                                          <p className="text-gray-700 flex items-center gap-2"><MdAttachMoney size={30} className='text-mainColor font-semibold' /><span className="font-semibold">Price:</span> {product.price || '0'} EGP</p>
                                          </div>
                                          <div className="text-center">
                                          {
                                                 product.my_product === true ? (
                                                 <button
                                                        className={`w-full py-3 font-semibold rounded-lg transition-transform transform 
                                                        bg-mainColor text-white hover:scale-105`}
                                                 >
                                                        My Extra Product
                                                 </button>
                                                 ) : (
                                                 <button
                                                        onClick={() => handleAddToCart(product)}
                                                        className={`w-full py-3 font-semibold rounded-lg transition-transform transform 
                                                        ${selectedProductId == product.id ? 'bg-green-500 text-white' : 'bg-mainColor text-white hover:scale-105'}`}
                                                 >
                                                        {selectedProductId == product.id ? 'Selected Extra Product' : 'Add to Cart'}
                                                 </button>
                                                 )
                                          }
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
                                          key={index}
                                          className={`relative p-6 bg-white shadow-md text-2xl rounded-lg border border-gray-200 hover:shadow-lg transition-all 
                                          ${selectedProductId == product.id ? 'border-green-500' : ''}`}
                                   >
                                          <h2 className="text-center text-mainColor font-semibold text-3xl mb-4">{product.name}</h2>
                                          <div className="space-y-3 mb-6">
                                          <p className="text-gray-700"> {product.description}</p>
                                          <p className="text-gray-700 flex items-center gap-2"><CiMoneyCheck1 size={30} className='text-mainColor font-semibold' /><span className="font-semibold">SetUp Fees:</span> {product.setup_fees || '0'} EGP</p>
                                          </div>
                                          <div className="flex justify-between items-center mb-4">
                                          <label htmlFor={`billing-${index}`} className="text-xl md:text-2xl font-semibold text-gray-800">Billing Period:</label>
                                          <select
                                                 id={`billing-${index}`}
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
                                          <div className="text-center">
                                          {
                                                 product.my_product === true ? (
                                                 <button
                                                        className={`w-full py-3 font-semibold rounded-lg transition-transform transform 
                                                        bg-mainColor text-white hover:scale-105`}
                                                 >
                                                        My Extra Product
                                                 </button>
                                                 ) : (
                                                 <button
                                                        onClick={() => handleAddToCart(product)}
                                                        className={`w-full py-3 font-semibold rounded-lg transition-transform transform 
                                                        ${selectedProductId == product.id ? 'bg-green-500 text-white' : 'bg-mainColor text-white hover:scale-105'}`}
                                                 >
                                                        {selectedProductId == product.id ? 'Selected Extra Product' : 'Add to Cart'}
                                                 </button>
                                                 )
                                          }
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
