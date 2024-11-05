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

const UserSubscriptionsPage = () => {

    const auth = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [plans, setPlans] = useState('');
    const [planChanged, setPlanChanged] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [openDialog, setOpenDialog] = useState(null);

    const fetchData = async () => {
        setIsLoading(true);
        try {
               const response = await axios.get('https://login.wegostores.com/user/v1/subscription', {
                      headers: {
                             Authorization: `Bearer ${auth.user.token}`,
                      },
               });
               if (response.status === 200) {
                      console.log(response.data)
                      setPlans(response.data.plans)
               }
        } catch (error) {
               console.error('Error fetching data:', error);
        } finally {
               setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData(); 
    }, [planChanged]);

       
    if (isLoading) {
        return (
          <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
            <Loading />
          </div>
        );
    }    
      
    if (!plans) {
        return <div className='text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center'>No plans data available</div>;
    }

       return (
              <>
              <div className='w-full flex flex-col gap-10'>
              <div className="w-full flex flex-wrap items-center justify-start gap-10">
                {plans.map((plan, index) => (
                    <>
                        <div className="lg:w-[80%] xl:w-[30%] sm:w-full border border-mainColor rounded-2xl">
                            <div className='text-center mb-5 p-4 pb-0 text-mainColor text-2xl md:text-3xl xl:text-3xl font-semibold leading-10'>
                                <h1 className='p-2'>{plan.name}</h1>
                            </div>
                            <div className='p-4 text-mainColor flex flex-col gap-5'>
                                   <div className='flex items-center gap-5'>
                                          <span className='text-maincolortext-2xl md:text-3xl xl:text-3xl font-semibold'>Description : </span>
                                          <p className='text-[#686868] text-2xl'>{plan.description}</p>
                                   </div>
                                   <div className="flex items-center gap-x-4 w-full">
                                          <span className="text-2xl md:text-3xl xl:text-3xl text-mainColor font-medium">Application:</span>
                                          <div>
                                                 <CheckBox checked={plan.app}/>
                                          </div>
                                   </div>
                                   <div className='flex items-center gap-5'>
                                          <span className='text-maincolor text-2xl md:text-3xl xl:text-3xl font-semibold'>Number of stores : </span>
                                          <p className='text-[#686868] text-2xl'>{plan.limet_store}</p>
                                   </div>
                                   <div className='flex items-center gap-5'>
                                          <span className='text-maincolor text-2xl md:text-3xl xl:text-3xl font-semibold'>SetUp Fees : </span>
                                          <p className='text-[#686868] text-2xl'>{plan.setup_fees}</p>
                                   </div>
                                   <div className='flex items-center gap-5'>
                                          <span className='text-maincolor text-2xl md:text-3xl xl:text-3xl font-semibold'>Price per year  : </span>
                                          <p className='text-[#686868] text-2xl'>{plan.price_per_year} EGP</p>
                                   </div>
                                   <div className='flex items-center gap-5'>
                                          <span className='text-maincolor text-2xl md:text-3xl xl:text-3xl font-semibold'>Price per Month  : </span>
                                          <p className='text-[#686868] text-2xl'>{plan.price_per_month} EGP</p>
                                   </div>
                            </div>
                            <div className='text-center font-semibold text-2xl border-t-2 border-mainColor'>
                                 {/* <h1>{plan}</h1> */}
                                 {plan.my_plan ?
                                    <h1 className='p-4 text-mainColor'>This My Plan</h1>:
                                    <Link to="/dashboard_user/checkout" className='w-full text-white'>
                                          <h1 className='p-4 rounded-b-xl bg-mainColor w-full'>Upgrade</h1>
                                    </Link>
                                 }
                            </div>
                        </div>       
                    </>
                 ))}
                </div>
              </div>
              </>
       )
}

export default UserSubscriptionsPage
