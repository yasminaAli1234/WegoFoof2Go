import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../Context/Auth';
import Loading from '../../../Components/Loading';
import axios from 'axios';
import {ButtonAdd} from '../../../Components/Button'
import { Link } from 'react-router-dom';
import {Wroning,DeleteIcon,EditIcon} from '../../../Components/Icons/AllIcons';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { MdCheck } from "react-icons/md";

const ExtraProductPage = () => {

    const auth = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState('');
    const [productChanged, setProductChanged] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [openDialog, setOpenDialog] = useState(null);

    const fetchData = async () => {
        setIsLoading(true);
        try {
               const response = await axios.get('https://login.wegostores.com/admin/v1/extra/show', {
                      headers: {
                             Authorization: `Bearer ${auth.user.token}`,
                      },
               });
               if (response.status === 200) {
                      console.log(response.data)
                      setProducts(response.data.extra)
               }
        } catch (error) {
               console.error('Error fetching data:', error);
        } finally {
               setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData(); 
    }, [productChanged]);

    const handleOpenDialog = (productId) => {
       setOpenDialog(productId);
       };

    const handleCloseDialog = () => {
            setOpenDialog(null);
    };

       const handleDelete = async (productId) => {
              setIsDeleting(true);
              const success = await deleteProduct(productId, auth.user.token);
              setIsDeleting(false);
              handleCloseDialog();

              if (success) {
                     setProductChanged(!productChanged)
                     auth.toastSuccess('Extra product deleted successfully!');
                     setProducts((prevProduct) =>
                        prevProduct.filter((product) => product.id !== productId)
                     );
              } else {
                     auth.toastError('Failed to delete extra product.');
              }
       };

       const deleteProduct = async (paymentId, authToken) => {
              try {
                     const response = await axios.delete(`https://transitstation.online/api/admin/product/delete/${productId}`, {
                            headers: {
                                   Authorization: `Bearer ${authToken}`,
                            },
                     });

                     if (response.status === 200) {
                            console.log('Extra product deleted successfully');
                            return true;
                     } else {
                            console.error('Failed to delete extra product:', response.status, response.statusText);
                            return false;
                     }
              } catch (error) {
                     console.error('Error deleting extra product:', error);
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
      
    if (!products) {
        return <div className='text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center'>No extra product data available</div>;
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
          {products.map((product, index) => (
              <>
                  <div className="lg:w-[30%] sm:w-full border border-mainColor rounded-2xl">
                      <div className='text-center mb-5 p-4 pb-0 text-mainColor text-4xl font-semibold leading-10'>
                          <h1 className='p-2'>{product.name}</h1>
                      </div>
                      <div className='p-4 text-mainColor flex flex-col gap-5'>
                             <div className='flex flex-wrap items-center gap-2'>
                                    <span className='text-maincolor text-xl xl:text-3xl font-semibold'>Description : </span>
                                    <p className='text-[#686868] text-lg xl:text-2xl'>{product.description}</p>
                             </div>
                             {/* <div className="flex flex-wrap items-center gap-x-4 w-full">
                                    <span className="text-xl xl:text-3xl text-mainColor font-medium">Application:</span>
                                    <div>
                                           <CheckBox checked={product.app}/>
                                    </div>
                             </div> */}
                             <div className='flex flex-wrap items-center gap-5'>
                                    <span className='text-maincolor text-xl xl:text-3xl font-semibold'>SetUp Fees : </span>
                                    <p className='text-[#686868] text-lg xl:text-2xl'>{product.setup_fees}</p>
                             </div>
                             <div className='flex flex-wrap items-center gap-5'>
                                    <span className='text-maincolor text-xl xl:text-3xl font-semibold'>Price per year  : </span>
                                    <p className='text-[#686868] text-lg xl:text-2xl'>{product.price_per_year} EGP</p>
                             </div>
                             <div className='flex flex-wrap items-center gap-5'>
                                    <span className='text-maincolor text-xl xl:text-3xl font-semibold'>Price per Month  : </span>
                                    <p className='text-[#686868] text-lg xl:text-2xl'>{product.price_per_month} EGP</p>
                             </div>
                      </div>
                      <div className='p-4'>
                          <div className='flex gap-x-5 p-4 pb-0'>
                                                  <Link to={`edit/${product.id}`} state={product.id} type="button">
                                                          <span className='flex text-[#686868] items-center text-2xl underline gap-1'><EditIcon /> Edit</span>
                                                  </Link>
                                                  <button type="button" onClick={() => handleOpenDialog(product.id)}>
                                                         <span className='flex text-[#686868] items-center text-2xl underline gap-1'><DeleteIcon /> Delete</span>
                                                  </button>
                                                  {openDialog === product.id && (
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
                                                                                                                  You will delete product {product.name|| "null"}
                                                                                                          </DialogTitle>
                                                                                                  </div>
                                                                                          </div>
                                                                                  </div>
                                                                                  <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                                          <button
                                                                                                  type="button"
                                                                                                  onClick={() => handleDelete(product.id)}
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

export default ExtraProductPage
