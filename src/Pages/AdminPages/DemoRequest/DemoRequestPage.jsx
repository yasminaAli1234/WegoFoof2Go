// import React, { useEffect, useState } from 'react';
// import { useAuth } from '../../../Context/Auth';
// import Loading from '../../../Components/Loading';
// import axios from 'axios';
// import { Button } from '../../../Components/Button';
// import { useNavigate } from 'react-router-dom';

// const DemoRequestPage = () => {
//     const auth = useAuth();
//     const navigate = useNavigate();
//     const [isLoading, setIsLoading] = useState(false);
//     const [requests, setRequests] = useState([]);
//     const [showConfirmation, setShowConfirmation] = useState(false);
//     const [selectedRequest, setSelectedRequest] = useState(null);

//     const fetchData = async () => {
//         setIsLoading(true);
//         try {
//             const response = await axios.get('https://login.wegostores.com/admin/v1/demoRequest/show', {
//                 headers: {
//                     Authorization: `Bearer ${auth.user.token}`,
//                 },
//             });
//             if (response.status === 200) {
//                 console.log('Demo Request Data:', response.data.demoRequest);
//                 setRequests(response.data.demoRequest);
//             }
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const handlePendingClick = (request) => {
//         console.log('Selected Request:', request); 
//         setSelectedRequest(request);
//         setShowConfirmation(true); 
//     };

//     const handleConfirmAction = async () => {
//         try {
//             const formData = new FormData();
//             formData.append('demo_link', selectedRequest.demo_link || 'null');
//             formData.append('email', selectedRequest.email || 'null');
//             formData.append('password', selectedRequest.password || 'null');
//             formData.append('start_date', selectedRequest.start_date || 'null');
//             formData.append('end_date', selectedRequest.end_date || 'null');

//             for (let pair of formData.entries()) {
//                 console.log(`${pair[0]}: ${pair[1]}`);
//             }

//             const response = await axios.post(
//                 `https://login.wegostores.com/admin/v1/demoRequest/approved/${selectedRequest.id}`,
//                 formData,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${auth.user.token}`,
//                         'Content-Type': 'multipart/form-data',
//                     },
//                 }
//             );

//             if (response.status === 200) {
//                 console.log('Request approved successfully');
//                 fetchData(); 
//             }
//         } catch (error) {
//             console.error('Error updating request:', error);
//         } finally {
//             setShowConfirmation(false); 
//         }
//     };

//     if (isLoading) {
//         return (
//             <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
//                 <Loading />
//             </div>
//         );
//     }

//     if (!requests.length) {
//         return <div className='text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center'>No demo requests data available</div>;
//     }

//     return (
//         <div className="w-full">
//             {showConfirmation && (
//                 <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
//                     <div className="bg-white rounded-lg shadow-lg p-6 text-center w-80">
//                         <p className="text-lg font-semibold mb-4">Are you sure you want to approve this request?</p>
//                         <div className="flex justify-around">
//                             <Button Text="Cancel" handleClick={() => setShowConfirmation(false)} />
//                             <Button Text="Sure" handleClick={handleConfirmAction} />
//                         </div>
//                     </div>
//                 </div>
//             )}

        //     <div className="w-full flex items-center justify-between mt-4 overflow-x-auto">
        //         <table className="w-full sm:min-w-0">
        //             <thead className="w-full">
        //                 <tr className="w-full border-b-2">
        //                     <th className="min-w-[80px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">#</th>
        //                     <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Name</th>
        //                     <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Email</th>
        //                     <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Phone</th>
        //                     <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Activities</th>
        //                     <th className="min-w-[100px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Action</th>
        //                 </tr>
        //             </thead>
        //             <tbody className="w-full">
        //                 {requests.map((request, index) => (
        //                     <tr className="w-full border-b-2" key={request.id}>
        //                         <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
        //                             {index + 1}
        //                         </td>
        //                         <td className="min-w-[100px] sm:min-w-[100px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
        //                             {request.users?.name || '_'}
        //                         </td>
        //                         <td className="min-w-[100px] sm:min-w-[100px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
        //                             {request.users?.email || '_'}
        //                         </td>
        //                         <td className="min-w-[100px] sm:min-w-[100px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
        //                             {request.users?.phone || '_'}
        //                         </td>
        //                         <td className="px-4 py-4 text-center">
        //                             {request.activity_name || '_'}
        //                         </td>
        //                         <td>
        //                             {request.status === "1" ? (
        //                                 <button className="w-full py-2 px-2 rounded bg-green-500 text-xl text-white font-medium">
        //                                     Approved
        //                                 </button>
        //                             ) : (
        //                                 <button onClick={() => handlePendingClick(request)} className="w-full py-2 px-2 text-xl rounded bg-gray-500 text-white font-medium">
        //                                     Pending
        //                                 </button>
        //                             )}
        //                         </td>
        //                     </tr>
        //                 ))}
        //             </tbody>
        //         </table>
        //     </div>
        // </div>
//     );
// };

// export default DemoRequestPage;


import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../Context/Auth';
import Loading from '../../../Components/Loading';
import axios from 'axios';
import { Button } from '../../../Components/Button';
import { useNavigate } from 'react-router-dom';

const DemoRequestPage = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [requests, setRequests] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [formValues, setFormValues] = useState({
        demo_link: '',
        email: '',
        password: '',
        start_date: '',
        end_date: '',
    });

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('https://login.wegostores.com/admin/v1/demoRequest/show', {
                headers: {
                    Authorization: `Bearer ${auth.user.token}`,
                },
            });
            if (response.status === 200) {
                console.log('Demo Request Data:', response.data.demoRequest);
                setRequests(response.data.demoRequest);
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

    const handlePendingClick = (request) => {
        setSelectedRequest(request);
        setFormValues({
            demo_link: '',
            email: '',
            password: '',
            start_date: '',
            end_date: '',
        });
        setShowModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            Object.entries(formValues).forEach(([key, value]) => {
                formData.append(key, value);
            });

            const response = await axios.post(
                `https://login.wegostores.com/admin/v1/demoRequest/approved/${selectedRequest.id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${auth.user.token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.status === 200) {
                auth.toastSuccess('Request approved successfully');
                fetchData();
            }
            else {
                auth.toastError('Failed to add Plan.');
            }
        } catch (error) {
            console.error('Error submitting request:', error);
        } finally {
            setShowModal(false);
        }
    };

    if (isLoading) {
        return (
            <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
                <Loading />
            </div>
        );
    }

    if (!requests.length) {
        return (
            <div className="text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center">
                No demo requests data available
            </div>
        );
    }

    return (
        <div className="w-full">
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[400px]">
                        <h3 className="text-lg font-bold mb-4">Approve Request</h3>
                        <div className="mb-3">
                            <input
                                type="text"
                                name="demo_link"
                                placeholder="Demo Link"
                                className="w-full p-2 border rounded"
                                value={formValues.demo_link}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="w-full p-2 border rounded"
                                value={formValues.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="w-full p-2 border rounded"
                                value={formValues.password}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="date"
                                name="start_date"
                                placeholder="Start Date"
                                className="w-full p-2 border rounded"
                                value={formValues.start_date}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="date"
                                name="end_date"
                                placeholder="End Date"
                                className="w-full p-2 border rounded"
                                value={formValues.end_date}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex justify-center gap-2">
                            <Button px = "px-3" Size = "text-xl" Text="Cancel" handleClick={() => setShowModal(false)} />
                            <Button px = "px-3" Size = "text-xl" Text="Submit" handleClick={handleSubmit} />
                        </div>
                    </div>
                </div>
            )}
                 <div className="w-full flex items-center justify-between mt-4 overflow-x-auto">
                <table className="w-full sm:min-w-0">
                    <thead className="w-full">
                        <tr className="w-full border-b-2">
                            <th className="min-w-[80px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">#</th>
                            <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Name</th>
                            <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Email</th>
                            <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Phone</th>
                            <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Activities</th>
                            <th className="min-w-[100px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Action</th>
                        </tr>
                    </thead>
                    <tbody className="w-full">
                        {requests.map((request, index) => (
                            <tr className="w-full border-b-2" key={request.id}>
                                <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                    {index + 1}
                                </td>
                                <td className="min-w-[100px] sm:min-w-[100px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                    {request.users?.name || '_'}
                                </td>
                                <td className="min-w-[100px] sm:min-w-[100px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                    {request.users?.email || '_'}
                                </td>
                                <td className="min-w-[100px] sm:min-w-[100px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                    {request.users?.phone || '_'}
                                </td>
                                <td className="px-4 py-4 text-center">
                                    {request.activity_name || '_'}
                                </td>
                                <td>
                                    {request.status === "1" ? (
                                        <button className="w-full py-2 px-2 rounded bg-green-500 text-xl text-white font-medium">
                                            Approved
                                        </button>
                                    ) : (
                                        <button onClick={() => handlePendingClick(request)} className="w-full py-2 px-2 text-xl rounded bg-gray-500 text-white font-medium">
                                            Pending
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DemoRequestPage;

