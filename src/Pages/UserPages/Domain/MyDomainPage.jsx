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

const MyDomainPage = () => {

    const auth = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [myDomains, setMyDomains] = useState('');
    const [domainChanged, setDomainChanged] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [openDialog, setOpenDialog] = useState(null);

    const fetchData = async () => {
        setIsLoading(true);
        try {
               const response = await axios.get('https://login.wegostores.com/user/v1/domains/my_domains', {
                      headers: {
                             Authorization: `Bearer ${auth.user.token}`,
                      },
               });
               if (response.status === 200) {
                      console.log(response.data)
                      setMyDomains(response.data.my_domains)
               }
        } catch (error) {
               console.error('Error fetching data:', error);
        } finally {
               setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData(); 
    }, [domainChanged]);

    // const handleOpenDialog = (domainId) => {
    //    setOpenDialog(domainId);
    //    };

    //    const handleCloseDialog = () => {
    //           setOpenDialog(null);
    //    };

    //    const handleDelete = async (domainId) => {
    //           setIsDeleting(true);
    //           const success = await deleteStore(domainId, auth.user.token);
    //           setIsDeleting(false);
    //           handleCloseDialog();

    //           if (success) {
    //                  setStoreChanged(!storeChanged)
    //                  auth.toastSuccess('Store deleted successfully!');
    //                  setStores((prevStore) =>
    //                     prevStore.filter((domain) => domain.id !== domainId)
    //                  );
    //           } else {
    //                  auth.toastError('Failed to delete store.');
    //           }
    //    };

    //    const deleteStore = async (storeId, authToken) => {
    //           try {
    //                  const response = await axios.put(`https://login.wegostores.com/user/v1/store/delete/${domainId}`, {
    //                         headers: {
    //                                Authorization: `Bearer ${authToken}`,
    //                         },
    //                  });

    //                  if (response.status === 200) {
    //                         console.log('Store deleted successfully');
    //                         return true;
    //                  } else {
    //                         console.error('Failed to delete store:', response.status, response.statusText);
    //                         return false;
    //                  }
    //           } catch (error) {
    //                  console.error('Error deleting store:', error);
    //                  return false;
    //           }
    //    };


    if (isLoading) {
        return (
          <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
            <Loading />
          </div>
        );
    }    

       return (
              <>     
                <div className='w-full flex flex-col gap-10'>
                {myDomains?
                    (
                        <>
                        <div className='w-3/6 lg:w-1/6'>
                            <Link to={'../buy_domain'}>
                                    <ButtonAdd Text="Buy Domain" isWidth="true" BgColor ="mainColor" Color="white" iconColor="white"/>
                            </Link>
                        </div>
                        <div className="w-full flex flex-wrap items-center justify-start gap-10">
                            {myDomains.map((domain, index) => (
                                <>
                                    <div key={index} className="lg:w-[30%] sm:w-full rounded-xl border-2 shadow-inner">
                                        <div className='mb-5 p-4 pb-0 text-mainColor leading-10'>
                                            <h1 className='text-black font-semibold text-3xl mb-2'>{domain.name}</h1>
                                            <div className='text-xl p-2 flex flex-col gap-1'>
                                                <h1><span>Price : </span>{domain.price}</h1>
                                                <h1><span>Store : </span>{domain.store?.store_name}</h1>
                                                <h1><span>Renew Date : </span>{domain.renewdate}</h1>
                                            </div>
                
                                        </div>  
                                    </div>  
                                </>
                            ))}
                        </div>
                        </>
                    )
                    :
                    (
                        <>
                        <div className='w-full flex flex-col gap-5 justify-center items-center'>
                            <h1 className='text-center text-2xl lg:text-3xl text-mainColor font-semibold'>You do not have domains</h1>
                            <div className='lg:w-2/6'>
                                <Link to={'../buy_domain'}>
                                        <ButtonAdd Text="Buy Domain" isWidth="true" BgColor ="mainColor" Color="white" iconColor="white"/>
                                </Link>
                            </div>
                        </div>
                        </>
                    )

                }
                </div>
              </>
       )
}

export default MyDomainPage
