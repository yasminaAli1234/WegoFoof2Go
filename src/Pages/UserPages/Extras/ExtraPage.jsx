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
import { addToCart } from '../../../Redux/CartSlice.js';

const ExtraPage = () => {

    const auth = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [extraProduct, setExtraProduct] = useState('');

    const dispatch = useDispatch();

//     const handleAddToCart = (plan) => {
//         dispatch(addToCart(plan));
//     };

       const handleAddToCart = (product) => {
              // const productToCart = {
              // id:product.id,
              // name: product.name,
              // price: product.status === "one_time" 
              //        ? product.price 
              //        : { yearly: product.yearly, monthly: product.monthly } // Include both yearly and monthly prices
              // };
              // dispatch(addToCart(productToCart));
              dispatch(addToCart(product));
       };
   


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
    }, []);    if (isLoading) {
        return (
          <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
            <Loading />
          </div>
        );
    }    
  
       return (
              <>
              {extraProduct.length !== 0 ?(
              <>
              <div className='w-full flex flex-col gap-10'>
              <div className="w-full flex flex-wrap items-center justify-start gap-10">
                {extraProduct.map((product, index) => (
                    <>
                      <div key={index} className="lg:w-[80%] xl:w-[30%] sm:w-full border border-mainColor rounded-2xl">
                            <div className='text-center mb-5 p-4 pb-0 text-mainColor text-2xl md:text-3xl xl:text-3xl font-semibold leading-10'>
                                <h1 className='p-2'>{product.name}</h1>
                            </div>
                            <div className='p-4 text-mainColor flex flex-col gap-5'>
                                   <div className='flex flex-wrap items-center gap-5'>
                                          <span className='text-maincolor text-xl md:text-3xl xl:text-3xl font-semibold'>Description : </span>
                                          <p className='text-[#686868] text-2xl'>{product.description}</p>
                                   </div>
                                   {product.status === "one_time" ?
                                   (
                                   <>
                                          <div className='flex items-center gap-5'>
                                                 <span className='text-maincolor text-xl md:text-3xl xl:text-3xl font-semibold'>Price in one Time : </span>
                                                 <p className='text-[#686868] text-2xl'>{product.price} EGP</p>
                                          </div> 
                                   </>
                                   )
                                   :(
                                   <>
                                          <div className='flex items-center gap-5'>
                                                 <span className='text-maincolor text-xl md:text-3xl xl:text-3xl font-semibold'>SetUp Fees : </span>
                                                 <p className='text-[#686868] text-2xl'>{product.setup_fees} EGP</p>
                                          </div>
                                          <div className='flex items-center gap-5'>
                                                 <span className='text-maincolor text-xl md:text-3xl xl:text-3xl font-semibold'>Price per year  : </span>
                                                 <p className='text-[#686868] text-2xl'>{product.yearly} EGP</p>
                                          </div>
                                          <div className='flex items-center gap-5'>
                                                 <span className='text-maincolor text-xl md:text-3xl xl:text-3xl font-semibold'>Price per Month  : </span>
                                                 <p className='text-[#686868] text-2xl'>{product.monthly} EGP</p>
                                          </div>
                                   </>
                                   )
                            }
                            </div>
                            <div className='text-center font-semibold text-2xl border-t-2 border-mainColor'>
                                   <button
                                          onClick={() => handleAddToCart(product)}
                                          className="w-full text-white p-4 rounded-b-xl bg-mainColor"
                                   >
                                          Add to Cart
                                   </button>
                            </div>
                        </div>    
                    </>
                 ))}
                </div>
              </div>
              </>

              ):(
                     <>
                     <div className='w-full flex flex-col gap-5 justify-center items-center'>
                            <h1 className='text-center text-2xl lg:text-3xl text-mainColor font-semibold'>No extra product data available</h1>
                     </div>
                     </>
              )
              }
              </>
       )
}

export default ExtraPage
