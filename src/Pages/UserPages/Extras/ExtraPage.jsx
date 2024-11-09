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

    const handleAddToCart = (plan) => {
        dispatch(addToCart(plan));
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
                                   <div className='flex items-center gap-5'>
                                          <span className='text-maincolor text-xl md:text-3xl xl:text-3xl font-semibold'>Description : </span>
                                          <p className='text-[#686868] text-2xl'>{product.description}</p>
                                   </div>
                                   {/* <div className='flex items-center gap-5'>
                                          <span className='text-maincolor text-xl md:text-3xl xl:text-3xl font-semibold'>Number of stores : </span>
                                          <p className='text-[#686868] text-2xl'>{plan.limet_store}</p>
                                   </div> */}
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



                        {/* <div key={index} className="lg:w-[80%] xl:w-[30%] bg-mainColor text-white sm:w-full border border-mainColor rounded-2xl"> */}
                            {/* <div className='mb-2 p-4 pb-0 text-xl md:text-2xl xl:text-2xl font-semibold'>
                                <h1 className='p-2'><span>Product Name : </span>{product.name || '_'}</h1>
                                <h1 className='p-2'><span>Description : </span>{product.description || '_'}</h1>
                                {product.status === "one_time" ?(
                                        <>
                                         <h1 className='p-2'><span>Price in one Time : </span>{product.price || '-'}</h1>
                                        </>
                                ) :(
                                        <>
                                        <h1 className='p-2'><span>SetUp Fees : </span>{product.setup_fees || '-'}</h1>
                                        <h1 className='p-2'><span>Price Per Month : </span>{product.monthly || '-'}</h1>
                                        <h1 className='p-2'><span>Price Per Year : </span>{product.yearly || '-'}</h1>
                                        </>
                                )
                                }
                            </div> */}
                            {/* <div className='text-center font-semibold p-4 text-2xl border-t-2 border-mainColor'> */}
                                 {/* {product.my_plan ? */}
                                    {/* <h1 className='p-4 text-mainColor'>This My Plan</h1>: */}
                                   {/* <button
                                        //   onClick={() => handleAddToCart(plan)}
                                          className="w-full text-mainColor p-4 rounded-b-xl bg-white"
                                   >
                                          Add to Cart
                                   </button> */}

                                 {/* } */}
                            {/* </div>
                        </div>        */}
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
