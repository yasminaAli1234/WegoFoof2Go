import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../Context/Auth';
import Loading from '../../../Components/Loading';
import axios from 'axios';
import {Button} from '../../../Components/Button'
import {ButtonAdd} from '../../../Components/Button'
import { Link ,useNavigate} from 'react-router-dom';
import {Wroning,DeleteIcon,EditIcon} from '../../../Components/Icons/AllIcons';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';

const OrderPage = () => {

    const auth = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("pending");
    const [requests, setRequests] = useState('');
    const [requestChanged, setRequestChanged] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [openDialog, setOpenDialog] = useState(null);

    const [isDropdownVisible, setDropdownVisible] = useState(false);

    // Toggle the dropdown visibility
    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
               const response = await axios.get('https://transitstation.online/api/admin/request', {
                      headers: {
                             Authorization: `Bearer ${auth.user.token}`,
                      },
               });
               if (response.status === 200) {
                      console.log(response.data)
                      setRequests(response.data)
               }
        } catch (error) {
               console.error('Error fetching data:', error);
        } finally {
               setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData(); 
    }, [requestChanged]);

    const handleOpenDialog = (requestId) => {
        setOpenDialog(requestId);
        };
 
        const handleCloseDialog = () => {
               setOpenDialog(null);
        };
 
        const handleDelete = async (requestId) => {
               setIsDeleting(true);
               const success = await deleteRequest(requestId, auth.user.token);
               setIsDeleting(false);
               handleCloseDialog();
 
               if (success) {
                      setRequestChanged(!requestChanged)
                      auth.toastSuccess('Request deleted successfully!');
                      setRequests((prevRequest) =>
                        prevRequest.filter((request) => request.id !== requestId)
                      );
               } else {
                      auth.toastError('Failed to delete request.');
               }
        };
 
        const deleteRequest = async (requestId, authToken) => {
               try {
                      const response = await axios.delete(`https://transitstation.online/api/admin/request/delete/${requestId}`, {
                             headers: {
                                    Authorization: `Bearer ${authToken}`,
                             },
                      });
 
                      if (response.status === 200) {
                             console.log('Request deleted successfully');
                             return true;
                      } else {
                             console.error('Failed to delete Request:', response.status, response.statusText);
                             return false;
                      }
               } catch (error) {
                      console.error('Error deleting Request:', error);
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
      
    // if (!requests) {
    //     return <div className='text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center'>No Request Demo data available</div>;
    // }
       return (
              <>
                <div className='w-full'>
                    <div className="flex w-full gap-5 mb-5">
                        {/* Tab buttons */}
                        <div className='sm:w-1/4'> 
                        <Button
                        rounded='rounded-2xl'
                        Text="Pending"
                        Width="full"
                        px="px-1"
                        Size='text-xl'
                        BgColor={activeTab === "pending" ? "bg-mainColor" : "bg-white"}
                        Color={activeTab === "pending" ? "text-white" : "text-mainColor"}
                        handleClick={() => setActiveTab("pending")}
                        />
                        </div>      
                        <div className='sm:w-1/4'> 
                        <Button
                         rounded='rounded-2xl'
                        Text="History"
                        Width="full"
                        px="px-1"
                        Size='text-xl'
                        BgColor={activeTab === "history" ? "bg-mainColor" : "bg-white"}
                        Color={activeTab === "history" ? "text-white" : "text-mainColor"}
                        handleClick={() => setActiveTab("history")}
                        />
                        </div>            
                    </div>

                        {activeTab === "pending" && (
                        <div className="w-full flex items-center justify-between mt-4 overflow-x-auto">
                        <table className="w-full sm:min-w-0">
                                <thead className="w-full">
                                <tr className="w-full border-b-2">
                                <th className="min-w-[80px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">#</th>
                                <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Name</th>
                                <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Email</th>
                                <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Phone</th>
                                <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Date</th>
                                <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Activities</th>
                                <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Store Name</th>
                                <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Package Name</th>
                                <th className="min-w-[100px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Action</th>
                                </tr>
                                </thead>
                                {/* <tbody className="w-full">
                                {requests
                                .filter(request => request.status === "pending")
                                .sort((a, b) => {
                                const pickUpDateComparison = new Date(a.pick_up_date) - new Date(b.pick_up_date);
                                if (pickUpDateComparison !== 0) {
                                        return pickUpDateComparison;
                                }
                                const timeA = a.request_time.split(':').map(Number); // Split "HH:MM:SS" and convert to numbers
                                const timeB = b.request_time.split(':').map(Number);

                                const totalMinutesA = timeA[0] * 60 + timeA[1];
                                const totalMinutesB = timeB[0] * 60 + timeB[1];

                                return totalMinutesA - totalMinutesB;
                                })
                                .map((request, index) => (
                                <tr className="w-full border-b-2" key={request.id}>
                                        <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                        {index + 1}
                                        </td>
                                        <td className="min-w-[100px] sm:min-w-[100px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                        {request.user_name || 'Null'}
                                        </td>
                                        <td className="min-w-[100px] sm:min-w-[100px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                        {request.user_phone || 'Null'}
                                        </td>
                                        <td className="min-w-[100px] sm:min-w-[100px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                        {request.offer_name || 'Null'}
                                        </td>
                                        <td className="min-w-[100px] sm:min-w-[100px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                        {request.pick_up_date || 'Null'}
                                        </td>
                                        <td className="min-w-[100px] sm:min-w-[100px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                        {request.request_time || 'Null'}
                                        </td>
                                        <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                        {request.pick_up_address || 'Null'}
                                        </td>
                                        <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                        <Link to={"all_drivers"} state={{ requestId: request.id }}>
                                        <button className='bg-mainColor text-white p-2 rounded-md text-center'>
                                        Assign
                                        </button>
                                        </Link>
                                        </td>
                                        <td className="min-w-[100px] sm:min-w-[80px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                <div className="flex items-center justify-center gap-x-3">
                                                <Link to={`edit/${request.id}`} state={request.id} type="button">
                                                        <EditIcon />
                                                </Link>
                                                <button type="button" onClick={() => handleOpenDialog(request.id)}>
                                                        <DeleteIcon />
                                                </button>
                                                {openDialog === request.id && (
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
                                                                                                                You will delete request {request.user_name|| "null"}
                                                                                                        </DialogTitle>
                                                                                                </div>
                                                                                        </div>
                                                                                </div>
                                                                                <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                                        <button
                                                                                                type="button"
                                                                                                onClick={() => handleDelete(request.id)}
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
                                </tr>
                                ))}
                                </tbody> */}
                        </table>
                        </div>
                        )}

                        {activeTab === "history" && (
                        <div className="w-full flex items-center justify-between mt-4 overflow-x-auto">
                                <table className="w-full sm:min-w-0">
                                <thead className="w-full">
                                <tr className="w-full border-b-2">
                                <th className="min-w-[80px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">#</th>
                                <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Name</th>
                                <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Email</th>
                                <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Phone</th>
                                <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Date</th>
                                <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Activities</th>
                                <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Store Name</th>
                                <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Package Name</th>
                                <th className="min-w-[100px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Action</th>
                                </tr>
                                </thead>
                                {/* <tbody className="w-full">
                                {requests.map((request, index) => (
                                                        request.status === "history" && (
                                                        <tr className="w-full border-b-2" key={request.id}>
                                                        <td
                                                                className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                        >
                                                                {index + 1}
                                                        </td>
                                                        <td
                                                                className="min-w-[100px] sm:min-w-[100px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                        >
                                                                {request.user_name || 'Null'}
                                                        </td>
                                                        <td
                                                                className="min-w-[100px] sm:min-w-[100px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                        >
                                                                {request.user_phone || 'Null'}
                                                        </td>
                                                        <td
                                                                className="min-w-[100px] sm:min-w-[100px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                        >
                                                                {request.offer_name || 'Null'}
                                                        </td>
                                                        <td
                                                                className="min-w-[100px] sm:min-w-[100px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                        >
                                                                {request.pick_up_date || 'Null'}
                                                        </td>
                                                        <td
                                                                className="min-w-[100px] sm:min-w-[100px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                        >
                                                                {request.request_time || 'Null'}
                                                        </td>
                                                        <td
                                                                className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                        >
                                                                {request.pick_up_address || 'Null'}
                                                        </td> 
                                                        <td
                                                className="min-w-[100px] sm:min-w-[80px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                        >
                                                <div className="flex items-center justify-center gap-x-3">
                                                <Link to={`edit/${request.id}`} state={request.id} type="button">
                                                        <EditIcon />
                                                </Link>
                                                <button type="button" onClick={() => handleOpenDialog(request.id)}>
                                                        <DeleteIcon />
                                                </button>
                                                {openDialog === request.id && (
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
                                                                                                                You will delete request {request.user_name|| "null"}
                                                                                                        </DialogTitle>
                                                                                                </div>
                                                                                        </div>
                                                                                </div>
                                                                                <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                                        <button
                                                                                                type="button"
                                                                                                onClick={() => handleDelete(request.id)}
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
                                                </tr>
                                                        )
                                        ))}
                                </tbody> */}
                                </table>
                        </div>
                        )}

      
                </div>
              </>
       )
}

export default OrderPage