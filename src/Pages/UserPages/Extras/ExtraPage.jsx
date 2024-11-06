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

const ExtraPage = () => {

    const auth = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [extraProduct, setExtraProduct] = useState('');
//     const [storeChanged, setStoreChanged] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [openDialog, setOpenDialog] = useState(null);

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

//     const handleOpenDialog = (storeId) => {
//        setOpenDialog(storeId);
//        };

//        const handleCloseDialog = () => {
//               setOpenDialog(null);
//        };

//        const handleDelete = async (storeId) => {
//               setIsDeleting(true);
//               const success = await deleteStore(storeId, auth.user.token);
//               setIsDeleting(false);
//               handleCloseDialog();

//               if (success) {
//                      setStoreChanged(!storeChanged)
//                      auth.toastSuccess('Store deleted successfully!');
//                      setStores((prevStore) =>
//                         prevStore.filter((store) => store.id !== storeId)
//                      );
//               } else {
//                      auth.toastError('Failed to delete store.');
//               }
//        };

//        const deleteStore = async (storeId, authToken) => {
//               try {
//                      const response = await axios.put(`https://login.wegostores.com/user/v1/store/delete/${storeId}`, {
//                             headers: {
//                                    Authorization: `Bearer ${authToken}`,
//                             },
//                      });

//                      if (response.status === 200) {
//                             console.log('Store deleted successfully');
//                             return true;
//                      } else {
//                             console.error('Failed to delete store:', response.status, response.statusText);
//                             return false;
//                      }
//               } catch (error) {
//                      console.error('Error deleting store:', error);
//                      return false;
//               }
//        };


    if (isLoading) {
        return (
          <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
            <Loading />
          </div>
        );
    }    
      
//     if (!paymentHistory <0) {
//         return <div className='text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center'>No payment history data available</div>;
//     }

       return (
              <>
              {extraProduct.length !== 0 ?(
              <>
                     {/* <div className="w-full flex items-center justify-between mt-4 overflow-x-auto">
                <table className="w-full sm:min-w-0">
                    <thead className="w-full">
                        <tr className="w-full border-b-2">
                            <th className="min-w-[80px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">#</th>
                            <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Code</th>
                            <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Discount Amount</th>
                            <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Plan</th>
                            <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Vaild From</th>
                            <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Vaild To</th>
                            <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Usage Limit</th>
                            {(Premission.includes("edit promocode") ||Premission.includes("delete promocode"))  && ( 
                            <th className="min-w-[100px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Action</th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="w-full">
                            {codes.map((code, index) => (
                                <tr className="w-full border-b-2" key={code.id}>
                                        <td
                                                className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                        >
                                                {index + 1}
                                        </td>
                                        <td
                                                className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                        >
                                                {code?.code || '_'}
                                        </td>
                                        <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                {code?.discount_type === 'fixed'
                                                        ? code?.discount_amount
                                                        : `${code?.discount_amount}%`}
                                        </td>
                                        <td
                                                className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                        >
                                                {code?.offer?.offer_name || '_'}
                                        </td>
                                         <td
                                                className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                        >
                                                {code?.valid_from || '_'}
                                        </td>
                                        <td
                                                className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                        >
                                                {code?.valid_to || '_'}
                                        </td>
                                        
                                         <td
                                                className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                        >
                                                 {code?.usage_limit || '_'}
                                        
                                          </td>
                                          {(Premission.includes("edit promocode") ||Premission.includes("delete promocode"))  && ( 
                                         <td
                                                className="min-w-[100px] sm:min-w-[80px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                        >
                                                <div className="flex items-center justify-center gap-x-3">
                                                {Premission?.includes('edit promocode') && (
                                                <Link to={`edit/${code.id}`} state={code.id} type="button">
                                                        <EditIcon />
                                                </Link>
                                                )}
                                                {Premission?.includes('delete promocode') && (
                                                <button type="button" onClick={() => handleOpenDialog(code.id)}>
                                                        <DeleteIcon />
                                                </button>
                                                )}
                                                {openDialog === code.id && (
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
                                                                                                                You will delete promo code {code.code|| "null"}
                                                                                                        </DialogTitle>
                                                                                                </div>
                                                                                        </div>
                                                                                </div>
                                                                                <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                                        <button
                                                                                                type="button"
                                                                                                onClick={() => handleDelete(code.id)}
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
                                        </td>
                                          )}
                                </tr>
                            ))}
                    </tbody>
                </table>
                     </div> */}
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
