import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../Context/Auth';
import Loading from '../../../Components/Loading';
import axios from 'axios';
import {ButtonAdd} from '../../../Components/Button'
import { Link } from 'react-router-dom';
import {Wroning,DeleteIcon,EditIcon} from '../../../Components/Icons/AllIcons';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';

const PendingPaymentPage = () => {
    const auth = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [paymentsPending, setPaymentsPending] = useState('');
    const [paymentsPendingChanged, setPaymentsPendingChanged] = useState(false);
    const [openViewPhoto, setOpenViewPhoto] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [openDialog, setOpenDialog] = useState(null);

const [showPopup, setShowPopup] = useState(false);
const [selectedOption, setSelectedOption] = useState("");
const [selectedPaymentId, setSelectedPaymentId] = useState(null);
const [rejectReason, setRejectReason] = useState("");
const [paymentStatuses, setPaymentStatuses] = useState({});


    const handleCloseViewPhoto = () => {
        setOpenViewPhoto(null);
      };
      const handleOpenViewPhoto = (paymentId) => {
        setOpenViewPhoto(paymentId);
      };
        // Handle the option change
      const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        if (event.target.value !== "Reject") {
          setRejectReason(""); // Clear reject reason if not rejecting
        }
      };
    
      // Handle rejection reason input
      const handleRejectReasonChange = (event) => {
        setRejectReason(event.target.value);
      };
    
      // Close the popup
      const closePopup = () => {
        setShowPopup(false);
        setSelectedOption("");
        setSelectedPaymentId(null);
        setRejectReason(""); // Clear the reason input
      };
    
      const handleDone = async () => {
        if (selectedOption && selectedPaymentId) {
          console.log(selectedPaymentId)
          console.log(rejectReason || "Approved")
          try {
            let response;
            if (selectedOption === "Approve") {
              response = await axios.put(`https://bdev.elmanhag.shop/admin/payment/pendding/approve/${selectedPaymentId}`, {}, {
                headers: {
                  Authorization: `Bearer ${auth.user.token}`,
                },
              });
            } else if (selectedOption === "Reject") {
              response = await axios.put(` https://bdev.elmanhag.shop/admin/payment/pendding/rejected/${selectedPaymentId}`,
                {
                  rejected_reason: rejectReason
                },
                {
                  headers: {
                    Authorization: `Bearer ${auth.user.token}`,
                  },
                });
            }
    
            if (response.status === 200) {
              console.log(`${selectedOption} Action sent successfully`);
              // Optionally, refresh the payments list or handle success here
              // Update the paymentStatuses state based on the selected option
              setPaymentStatuses(prevStatuses => ({
                ...prevStatuses,
                [selectedPaymentId]: selectedOption
              }));
            } else {
              console.error(`Failed to send ${selectedOption} action`);
            }
          } catch (error) {
            console.error('Error sending action:', error);
          }
        }
        closePopup();
      };

    const fetchData = async () => {
        setIsLoading(true);
        try {
               const response = await axios.get('https://login.wegostores.com/admin/v1/payment/show/pending', {
                      headers: {
                             Authorization: `Bearer ${auth.user.token}`,
                      },
               });
               if (response.status === 200) {
                      console.log(response.data)
                      setPaymentsPending(response.data.payment)
               }
        } catch (error) {
               console.error('Error fetching data:', error);
        } finally {
               setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData(); 
    }, [paymentsPendingChanged]);

   

    if (isLoading) {
        return (
          <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
            <Loading />
          </div>
        );
    }    
      
    if (!paymentsPending) {
        return <div className='text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center'>No Pending payments data available</div>;
    }
       return (
        <>
        <div className="w-full flex items-center justify-between mt-4 overflow-x-auto">
            <table className="w-full sm:min-w-0">
                <thead className="w-full">
                    <tr className="w-full border-b-2">
                        <th className="min-w-[80px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">#</th>
                        <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Name</th>
                        <th className="min-w-[200px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Email</th>
                        <th className="min-w-[200px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Phone</th>
                        <th className="min-w-[200px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">PaymentMethod</th>
                        <th className="min-w-[200px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Amount</th>
                        <th className="min-w-[200px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Receipt</th>
                        <th className="min-w-[100px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Action</th>
                    </tr>
                </thead>
                <tbody className="w-full">
                        {paymentsPending.map((payment, index) => (

                            <tr className="w-full border-b-2" key={payment.id}>
                                    <td
                                            className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                    >
                                            {index + 1}
                                    </td>
                                    <td
                                            className="min-w-[200px] sm:min-w-[120px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                    >
                                            {payment?.user?.name || '_'}
                                    </td>
                                    <td
                                            className="min-w-[200px] sm:min-w-[120px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                    >
                                            {payment?.user?.email || '_'}
                                    </td>
                                    <td
                                            className="min-w-[200px] sm:min-w-[120px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                    >
                                            {payment?.user?.phone || '_'}
                                    </td>
                                    <td
                                            className="min-w-[200px] sm:min-w-[120px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                    >
                                            {payment?.payment_method?.name || '_'}
                                    </td>
                                    <td
                                            className="min-w-[200px] sm:min-w-[120px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                    >
                                            {payment?.plan?.amount || '_'}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <span
                                                className="cursor-pointer text-mainColor font-semibold underline"
                                                onClick={() => handleOpenViewPhoto(payment.id)}
                                                >
                                                View
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <button
                                        onClick={() => {
                                                setSelectedPaymentId(payment.id);
                                                setShowPopup(true);
                                        }}
                                        className={`w-full py-2 px-4 rounded text-white font-medium ${paymentStatuses[payment.id] === "Approve"
                                                ? "bg-green-500"
                                                : paymentStatuses[payment.id] === "Reject"
                                                ? "bg-red-500"
                                                : "bg-thirdColor"
                                                }`}
                                        >
                                        {paymentStatuses[payment.id] || "Pending"}
                                        </button>
                                   </td>
                                        {openViewPhoto === payment.id && (
                                        <Dialog
                                        open={true}
                                        onClose={handleCloseViewPhoto}
                                        className="relative z-10"
                                        >
                                        {/* Backdrop */}
                                        <div
                                                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                                                onClick={handleCloseViewPhoto}
                                        />

                                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                                                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">

                                                <div className="p-6">
                                                <span className="ml-6 text-3xl font-semibold text-mainColor border-b-2 border-mainColor">Receipt</span>
                                                </div>

                                                {/* Image Container */}
                                                <div className="w-full flex flex-wrap items-center justify-center gap-4 my-4 px-4 sm:p-6 sm:pb-4">
                                                <img
                                                        src={payment.invoice_image|| '-'}
                                                        className="w-[400px] h-[450px] object-contain object-center rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
                                                        alt="Receipt"
                                                        loading="lazy"
                                                />
                                                </div>

                                                {/* Dialog Footer */}
                                                <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                <button
                                                        type="button"
                                                        onClick={handleCloseViewPhoto}
                                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-medium text-white shadow-sm sm:mt-0 sm:w-auto hover:bg-mainColor-dark transition-colors duration-300 focus:outline-none"
                                                >
                                                        Close
                                                </button>
                                                </div>

                                                </DialogPanel>
                                                </div>
                                        </div>
                                        </Dialog>
                                        )}
                                        {showPopup && (
                                                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
                                                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                                                <h2 className="text-2xl text-mainColor font-semibold mb-6">Choose Action</h2>
                                                <div className="flex flex-col gap-4">
                                                <label className="flex items-center gap-2 text-mainColor text-xl cursor-pointer">
                                                        <input
                                                        type="radio"
                                                        value="Approve"
                                                        checked={selectedOption === "Approve"}
                                                        onChange={handleOptionChange}
                                                        className="w-6 h-6 cursor-pointer"
                                                        />
                                                        Approve
                                                </label>
                                                <label className="flex items-center gap-2 text-mainColor text-xl cursor-pointer">
                                                        <input
                                                        type="radio"
                                                        value="Reject"
                                                        checked={selectedOption === "Reject"}
                                                        onChange={handleOptionChange}
                                                        className="w-6 h-6 cursor-pointer"
                                                        />
                                                        Reject
                                                </label>

                                                {selectedOption === "Reject" && (
                                                        <div className="flex flex-col">
                                                        <label className="text-mainColor mb-2 font-medium" htmlFor="rejectReason">
                                                        Reason for Rejection:
                                                        </label>
                                                        <input
                                                        id="rejectReason"
                                                        type="text"
                                                        value={rejectReason}
                                                        onChange={handleRejectReasonChange}
                                                        className="w-full p-2 border border-gray-300 rounded"
                                                        placeholder="Enter rejection reason"
                                                        />
                                                        </div>
                                                )}
                                                </div>

                                                <div className="mt-6 flex justify-between">
                                                <button
                                                        onClick={handleDone}
                                                        className="bg-mainColor text-white py-2 px-4 rounded shadow hover:bg-mainColor-dark transition"
                                                >
                                                        Done
                                                </button>
                                                <button
                                                        onClick={closePopup}
                                                        className="text-red-600 py-2 px-4 hover:underline"
                                                >
                                                        Cancel
                                                </button>
                                                </div>
                                                </div>
                                                </div>
                                        )}                                  
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
        </>
       )
}

export default PendingPaymentPage
