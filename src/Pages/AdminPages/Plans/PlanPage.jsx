import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../Context/Auth';
import Loading from '../../../Components/Loading';
import axios from 'axios';
import {ButtonAdd} from '../../../Components/Button'
import { Link } from 'react-router-dom';
import {Wroning,DeleteIcon,EditIcon} from '../../../Components/Icons/AllIcons';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { MdCheck } from "react-icons/md";

const PlanPage = () => {

    const auth = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [plans, setPlans] = useState('');
    const [planChanged, setPlanChanged] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [openDialog, setOpenDialog] = useState(null);

    const fetchData = async () => {
        setIsLoading(true);
        try {
               const response = await axios.get('https://login.wegostores.com/admin/v1/plan/show', {
                      headers: {
                             Authorization: `Bearer ${auth.user.token}`,
                      },
               });
               if (response.status === 200) {
                      console.log(response.data)
                     //  setPlans(response.data.plans)
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

    const handleOpenDialog = (planId) => {
       setOpenDialog(planId);
       };

       const handleCloseDialog = () => {
              setOpenDialog(null);
       };

       const handleDelete = async (planId) => {
              setIsDeleting(true);
              const success = await deletePlan(planId, auth.user.token);
              setIsDeleting(false);
              handleCloseDialog();

              if (success) {
                     setPlanChanged(!planChanged)
                     auth.toastSuccess('Plan deleted successfully!');
                     setPlans((prevPlan) =>
                            prevPlan.filter((plan) => plan.id !== planId)
                     );
              } else {
                     auth.toastError('Failed to delete Plan.');
              }
       };

       const deletePlan = async (planId, authToken) => {
              try {
                     const response = await axios.delete(`https://transitstation.online/api/admin/plan/delete/${planId}`, {
                            headers: {
                                   Authorization: `Bearer ${authToken}`,
                            },
                     });

                     if (response.status === 200) {
                            console.log('Plan deleted successfully');
                            return true;
                     } else {
                            console.error('Failed to delete Plan:', response.status, response.statusText);
                            return false;
                     }
              } catch (error) {
                     console.error('Error deleting Plan:', error);
                     return false;
              }
       };


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
                     <div className='w-2/6 lg:w-1/6'>
                     <Link to={'add'}>
                            <ButtonAdd isWidth="true" BgColor ="mainColor" Color="white" iconColor="white"/>
                     </Link>
                     </div>
                <div className="w-full flex flex-wrap items-center justify-start gap-10">
                {plans.map((plan, index) => (
                    <>
                        <div className="lg:w-[30%] sm:w-full border border-mainColor rounded-lg">
                            <div className='text-center mb-5 p-4 pb-0 text-mainColor text-2xl font-semibold leading-10'>
                                <h1 className='p-2 border-b-2 border-mainColor'>{plan.offer_name}</h1>
                            </div>
                            <div className='p-4 text-mainColor flex flex-col gap-10'>
                                <div className='flex justify-center flex-row items-center gap-3'>
                                <MdCheck />
                                <p className='font-semibold text-2xl'>{plan.duration} Days</p>
                                </div>
                                <div className='flex pl-6 flex-col gap-3 font-semibold'>
                                    <h1>{plan.price_discount}$</h1>
                                    <h1><span className='font-semibold line-through text-2xl'>{plan.price}$ </span>/ {plan.duration} Days</h1>
                                </div>
                            </div>
                            <div className='p-4'>
                                <div className='flex gap-x-3 border-t-2 border-mainColor p-4 pb-0'>
                                                        <Link to={`edit/${plan.id}`} state={plan.id} type="button">
                                                                <EditIcon />
                                                        </Link>
                                                        <button type="button" onClick={() => handleOpenDialog(plan.id)}>
                                                                <DeleteIcon />
                                                        </button>
                                                        {openDialog === plan.id && (
                                                                <Dialog open={true} onClose={handleCloseDialog} className="relative z-10">
                                                                        <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                                                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                                                                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                                                                        <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:max-w-lg">
                                                                                        <div className="flex flex-col items-center justify-center bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                                                                                <Wroning Width='28' Height='28' aria-hidden="true" />
                                                                                                <div className="flex items-center">
                                                                                                        <div className="mt-2 text-center">
                                                                                                                <DialogTitle as="h3" className="text-xl font-semibold leading-10 text-gray-900">
                                                                                                                        You will delete plan {plan.offer_name|| "null"}
                                                                                                                </DialogTitle>
                                                                                                        </div>
                                                                                                </div>
                                                                                        </div>
                                                                                        <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                                                <button
                                                                                                        type="button"
                                                                                                        onClick={() => handleDelete(plan.id)}
                                                                                                        disabled={isDeleting}
                                                                                                        className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                                                                                                >
                                                                                                        {isDeleting ? <div className="flex w-10 h-5"><Loading /></div> : 'Delete'}
                                                                                                </button>
                                                                                                <button
                                                                                                        type="button"
                                                                                                        data-autofocus
                                                                                                        onClick={handleCloseDialog}
                                                                                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-6 py-3 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto"
                                                                                                >
                                                                                                        Cancel
                                                                                                </button>
                                                                                        </div>
                                                                                        </DialogPanel>
                                                                                </div>
                                                                        </div>
                                                                </Dialog>
                                                        )}
                                </div>
                            </div>
                        </div>       
                    </>
                 ))}
                </div>
              </div>
              </>
       )
}

export default PlanPage
