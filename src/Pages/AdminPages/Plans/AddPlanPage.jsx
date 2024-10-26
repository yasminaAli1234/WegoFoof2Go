// import React, { useState, useRef,useEffect } from 'react';
// import axios from 'axios';
// import InputCustom from '../../../Components/InputCustom';
// import { Button } from '../../../Components/Button';
// import { useAuth } from '../../../Context/Auth';
// import { useNavigate } from 'react-router-dom'
// import Loading from '../../../Components/Loading';
// import CheckBox from '../../../Components/CheckBox';

// const AddPlanPage = () => {
//     const auth = useAuth();
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [face, setFace] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const navigate = useNavigate();
    // const [paymentActive, setPaymentActive] = useState(0); // Default status to 0
//     const [paymentData, setPaymentData] = useState([]);

    // const handleClick = (e) => {
    //     const isChecked = e.target.checked; // Checked status
    //     setPaymentActive(isChecked ? 1 : 0); // Set paymentActive as 1 (true) or 0 (false)
    // };
   
//     const handleGoBack = () => {
//         navigate(-1, { replace: true });
//     };

//     const handleSubmitAdd = async (event) => {
//         event.preventDefault();

//         if (!thumbnails) {
//             auth.toastError('Please upload the Thumbnail Image.');
//             return;
//         }
//         if (!title) {
//             auth.toastError('Please Enter the Title.');
//             return;
//         }
//         if (!description) {
//             auth.toastError('Please Enter the Description.');
//             return;
//         }

//         setIsLoading(true);
//         try {
//             const formData = new FormData();
//             formData.append('name', title);
//             formData.append('description', description);
//             formData.append('thumbnail', thumbnailFile); // Append the file

//             const response = await axios.post(
//                 'https://login.wegostores.com/admin/v1/payment/method/create',
//                 formData,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${auth.user.token}`,
//                         'Content-Type': 'multipart/form-data',
                        
//                     },
//                 }
//             );

//             if (response.status === 200) {
//                 console.log('Payment Method added successfully');
//                 auth.toastSuccess('Payment Method added successfully!');
//                 handleGoBack();
//             } else {
//                 console.error('Failed to add Payment Method:', response.status, response.statusText);
//                 auth.toastError('Failed to add Payment Method.');
//             }
//         } catch (error) {
//             console.error('Error adding Payment Method:', error?.response?.data?.errors || 'Network error');
//             const errorMessages = error?.response?.data?.errors;
//             let errorMessageString = 'Error occurred';

//             if (errorMessages) {
//                 errorMessageString = Object.values(errorMessages).flat().join(' ');
//             }

//             auth.toastError(errorMessageString);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmitAdd} className="w-full flex flex-col items-center justify-center gap-y-10">
//                   <div className="w-full flex flex-wrap items-center justify-start gap-10">
//                       <div className="lg:w-[30%] sm:w-full">
//                         <InputCustom
//                                 type="text"
//                                 borderColor="mainColor"
//                                 placeholder="Title"
//                                 value={title}
//                                 onChange={(e) => setTitle(e.target.value)}
//                                 width="w-full"
//                             />
//                       </div>
//                       <div className="lg:w-[30%] sm:w-full">
//                         <InputCustom
//                                 type="text"
//                                 borderColor="mainColor"
//                                 placeholder="Description"
//                                 value={description}
//                                 onChange={(e) => setDescription(e.target.value)}
//                                 width="w-full"
//                             />
//                       </div>
//                       <div className="lg:w-[30%] sm:w-full">
//                         <InputCustom
//                                 type="text"
//                                 borderColor="mainColor"
//                                 placeholder="Setup Face"
//                                 value={face}
//                                 onChange={(e) => setFace(e.target.value)}
//                                 width="w-full"
//                             />
//                       </div>

//                       <div className="flex items-center gap-x-4 lg:w-[30%] sm:w-full">
//                         <span className="text-2xl text-mainColor font-medium">Application:</span>
//                         <div>
//                             <CheckBox handleClick={handleClick} checked={paymentActive}/>
//                         </div>
//                     </div>
//                   </div>
      
//                   <div className="w-full flex sm:flex-col lg:flex-row items-center justify-start sm:gap-y-5 lg:gap-x-28 sm:my-8 lg:my-0">
//                       <div className="flex items-center justify-center w-72">
//                           <Button
//                               type="submit"
//                               Text="Done"
//                               BgColor="bg-mainColor"
//                               Color="text-white"
//                               Width="full"
//                               Size="text-2xl"
//                               px="px-28"
//                               rounded="rounded-2xl"
//                             //   stateLoding={isLoading}
//                           />
//                       </div>
//                       <button onClick={handleGoBack} className="text-2xl text-mainColor">Cancel</button>
//                   </div>
//         </form>
           
//     );
// };

// export default AddPlanPage;


import React, { useState } from 'react'; 
import axios from 'axios';
import InputCustom from '../../../Components/InputCustom';
import { Button } from '../../../Components/Button';
import { useAuth } from '../../../Context/Auth';
import { useNavigate } from 'react-router-dom';
import CheckBox from '../../../Components/CheckBox';

const AddPlanPage = () => {
    const auth = useAuth();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [face, setFace] = useState('');
    const [paymentActive, setPaymentActive] = useState(0); // Default status to 0
    const [isLoading, setIsLoading] = useState(false);
    const [secondaryPrice, setSecondaryPrice] = useState(''); // Price for Secondary
    const [monthlyPrice, setMonthlyPrice] = useState(''); // Price for Monthly
    const [showSecondaryPriceInput, setShowSecondaryPriceInput] = useState(false); // Toggle for Secondary Price Input
    const [showMonthlyPriceInput, setShowMonthlyPriceInput] = useState(false); // Toggle for Monthly Price Input
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1, { replace: true });
    };

    const handleClick = (e) => {
        const isChecked = e.target.checked; // Checked status
        setPaymentActive(isChecked ? 1 : 0); // Set paymentActive as 1 (true) or 0 (false)
    };

    const handleSubmitAdd = async (event) => {
        event.preventDefault();

        if (!title) {
            auth.toastError('Please Enter the Title.');
            return;
        }
        if (!description) {
            auth.toastError('Please Enter the Description.');
            return;
        }

        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', title);
            formData.append('description', description);
            
            // Append selected prices if inputs are shown and filled
            if (showSecondaryPriceInput && secondaryPrice) {
                formData.append('secondary_price', secondaryPrice);
            }
            if (showMonthlyPriceInput && monthlyPrice) {
                formData.append('monthly_price', monthlyPrice);
            }

            const response = await axios.post(
                'https://login.wegostores.com/admin/v1/payment/method/create',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${auth.user.token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.status === 200) {
                auth.toastSuccess('Payment Method added successfully!');
                handleGoBack();
            } else {
                auth.toastError('Failed to add Payment Method.');
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.errors || 'Network error';
            auth.toastError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmitAdd} className="w-full flex flex-col items-center justify-center gap-y-10">
            <div className="w-full flex flex-wrap items-center justify-start gap-10">
                <div className="lg:w-[30%] sm:w-full">
                    <InputCustom
                        type="text"
                        borderColor="mainColor"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        width="w-full"
                    />
                </div>
                <div className="lg:w-[30%] sm:w-full">
                    <InputCustom
                        type="text"
                        borderColor="mainColor"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        width="w-full"
                    />
                </div>
                <div className="lg:w-[30%] sm:w-full">
                    <InputCustom
                        type="text"
                        borderColor="mainColor"
                        placeholder="Setup Face"
                        value={face}
                        onChange={(e) => setFace(e.target.value)}
                        width="w-full"
                    />
                </div>

                <div className="flex items-center gap-x-4 w-full">
                        <span className="text-2xl text-mainColor font-medium">Application:</span>
                         <div>
                             <CheckBox handleClick={handleClick} checked={paymentActive}/>
                         </div>
                     </div>

                {/* Price Option Checkboxes */}
                {/* <div className="lg:w-[30%] sm:w-full flex flex-col gap-2"> */}
                    <div className="flex w-full lg:w-[50%] flex-col gap-10">
                        {/* Secondary Price Checkbox */}
                        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-5">
                        <div className=" flex items-center gap-3 w-full lg:w-1/2">
                            <input 
                                type="checkbox" 
                                checked={showSecondaryPriceInput}
                                onChange={() => setShowSecondaryPriceInput(prev => !prev)}
                                className="h-5 w-5 rounded-full border-mainColor checked:w-8 checked:h-8  checked:bg-blue-500"
                            />
                            <label  className="text-2xl text-mainColor font-medium">Secondary</label>
                        </div>
                            {/* Conditional Price Inputs */}
                            {showSecondaryPriceInput && (
                            <div className="lg:w-1/2 sm:w-full">
                                <InputCustom
                                    type="text"
                                    borderColor="mainColor"
                                    placeholder="Enter Secondary Price"
                                    value={secondaryPrice}
                                    onChange={(e) => setSecondaryPrice(e.target.value)}
                                    width="w-full"
                                />
                            </div>
                            )}
                        </div>
                        {/* Monthly Price Checkbox */}
                        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-5">
                        <div className="flex items-center gap-3 w-full lg:w-1/2 ">
                            <input 
                                type="checkbox" 
                                checked={showMonthlyPriceInput}
                                onChange={() => setShowMonthlyPriceInput(prev => !prev)}
                                className="h-5 w-5 rounded-full border-mainColor checked:w-8 checked:h-8  checked:bg-blue-500"
                            />
                            <label  className="text-2xl text-mainColor font-medium">Monthly</label>
                        </div>
                            {showMonthlyPriceInput && (
                        <div className="lg:w-1/2 sm:w-full">
                            <InputCustom
                                type="text"
                                borderColor="mainColor"
                                placeholder="Enter Monthly Price"
                                value={monthlyPrice}
                                onChange={(e) => setMonthlyPrice(e.target.value)}
                                width="w-full"
                            />
                        </div>
                            )}
                        </div>
                    </div>

                   
                </div>
            {/* </div> */}

            <div className="w-full flex sm:flex-col lg:flex-row items-center justify-start sm:gap-y-5 lg:gap-x-28 sm:my-8 lg:my-0">
                <div className="flex items-center justify-center w-72">
                    <Button
                        type="submit"
                        Text="Done"
                        BgColor="bg-mainColor"
                        Color="text-white"
                        Width="full"
                        Size="text-2xl"
                        px="px-28"
                        rounded="rounded-2xl"
                    />
                </div>
                <button onClick={handleGoBack} className="text-2xl text-mainColor">Cancel</button>
            </div>
        </form>
    );
};

export default AddPlanPage;
