// import React, { useState, useRef,useEffect } from 'react';
// import axios from 'axios';
// import InputCustom from '../../../Components/InputCustom';
// import { Button } from '../../../Components/Button';
// import { useAuth } from '../../../Context/Auth';
// import { useNavigate } from 'react-router-dom';
// import CheckBox from '../../../Components/CheckBox';
// import DropDownMenu from '../../../Components/DropDownMenu'
// const AddExtraProductPage = () => {
//     const auth = useAuth();
//     const [name, setName] = useState('');
//     const [description, setDescription] = useState('');
//     const [price, setPrice] = useState('');
//     const [appActive, setAppActive] = useState(0); // Default status to 0
//     const [isLoading, setIsLoading] = useState(false);
//     const navigate = useNavigate();

//     const [extraTypeData, setExtraTypeData] = useState([{ name: 'One Time' }, { name: 'Recurring' }]);
//     const [extraType, setExtraType] = useState('Select Type');
//     const [extraTypeName, setExtraTypeName] = useState();
//     const [openExtraType, setOpenExtraType] = useState(false);
//     const dropdownExtraType = useRef();

//     const handleOpenExtraType = () => {
//         setOpenExtraType(!openExtraType);
//       };

//     const handleExtraType = (e) => {
//         const inputElement = e.currentTarget.querySelector('.inputVal');
//         const selectedOptionName = e.currentTarget.textContent.trim();
//         const selectedOptionValue = inputElement ? inputElement.value.toLowerCase() : '';
//         setExtraType(selectedOptionName);
//         setExtraTypeName(selectedOptionValue);
//         setOpenExtraType(false);
//       };


//     const handleGoBack = () => {
//         navigate(-1, { replace: true });
//     };


//     const handleClick = (e) => {
//         const isChecked = e.target.checked; // Checked status
//         setAppActive(isChecked ? 1 : 0); // Set paymentActive as 1 (true) or 0 (false)
//     };

    // const handleSubmitAdd = async (event) => {
    //     event.preventDefault();

    //     // if (!title) {
    //     //     auth.toastError('Please Enter the Title.');
    //     //     return;
    //     // }
    //     // if (!description) {
    //     //     auth.toastError('Please Enter the Description.');
    //     //     return;
    //     // }

    //     // if (!fee) {
    //     //     auth.toastError('Please Enter the Setup Fees.');
    //     //     return;
    //     // }
    //     // if (!monthlyPrice) {
    //     //     auth.toastError('Please Enter the Monthly Price.');
    //     //     return;
    //     // }
    //     // if (!secondaryPrice) {
    //     //     auth.toastError('Please Enter the Secondary Price.');
    //     //     return;
    //     // }

    //     // setIsLoading(true);
    //     // try {
    //     //     const formData = new FormData();
    //     //     formData.append('title', title);
    //     //     formData.append('name', title);
    //     //     formData.append('description', description);
    //     //     formData.append('setup_fees', fee);
    //     //     formData.append('limet_store', limitPlan);
    //     //     formData.append('image', thumbnailFile); // Append the file
    //     //     formData.append('app', appActive); // Append the file
    //     //     // Append selected prices if inputs are shown and filled
    //     //     if (showSecondaryPriceInput && secondaryPrice) {
    //     //         formData.append('price_per_year', secondaryPrice);
    //     //     }
    //     //     if (showMonthlyPriceInput && monthlyPrice) {
    //     //         formData.append('price_per_month', monthlyPrice);
    //     //     }

    //     //     for (let pair of formData.entries()) {
    //     //         console.log(pair[0] + ', ' + pair[1]);
    //     //     } 

    //     //     const response = await axios.post(
    //     //         'https://login.wegostores.com/admin/v1/plan/create',
    //     //         formData,
    //     //         {
    //     //             headers: {
    //     //                 Authorization: `Bearer ${auth.user.token}`,
    //     //                 'Content-Type': 'multipart/form-data',
    //     //             },
    //     //         }
    //     //     );
    //     //      console.log(response)
    //     //     if (response.status === 200) {
    //     //         auth.toastSuccess('Plan added successfully!');
    //     //         handleGoBack();
    //     //     } else {
    //     //         auth.toastError('Failed to add Plan.');
    //     //     }
    //     // } catch (error) {
    //     //     console.log(error)
    //     //     const errorMessage = error?.response?.data?.errors || 'Network error';
    //     //     auth.toastError(errorMessage);
    //     // } finally {
    //     //     setIsLoading(false);
    //     // }
    // };

//     return (
//         <form onSubmit={handleSubmitAdd} className="w-full flex flex-col items-center justify-center gap-y-10">
//             <div className="w-full flex flex-wrap items-center justify-start gap-10">
//                 <div className="lg:w-[30%] sm:w-full">
//                     <InputCustom
//                         type="text"
//                         borderColor="mainColor"
//                         placeholder="Product Name"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         width="w-full"
//                     />
//                 </div>
//                 <div className="lg:w-[30%] sm:w-full">
//                     <InputCustom
//                         type="text"
//                         borderColor="mainColor"
//                         placeholder="Description"
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                         width="w-full"
//                     />
//                 </div>
//                 <div className="lg:w-[30%] sm:w-full">
//                     <DropDownMenu
//                     ref={dropdownExtraType}
//                     handleOpen={handleOpenExtraType}
//                     handleOpenOption={handleExtraType}
//                     stateoption={extraType}
//                     openMenu={openExtraType}
//                     options={extraTypeData}
//                     />
//                 </div>
//                 <div className="lg:w-[30%] sm:w-full">
//                     <InputCustom
//                         type="number"
//                         borderColor="mainColor"
//                         placeholder="Price"
//                         value={price}
//                         onChange={(e) => setPrice(e.target.value)}
//                         width="w-full"
//                     />
//                 </div>
            
//                 <div className="flex items-center gap-x-4 w-full">
//                         <span className="text-2xl text-mainColor font-medium">Application:</span>
//                          <div>
//                              <CheckBox handleClick={handleClick} checked={appActive}/>
//                          </div>
//                      </div>
//                 </div>

//             <div className="w-full flex sm:flex-col lg:flex-row items-center justify-start sm:gap-y-5 lg:gap-x-28 sm:my-8 lg:my-0">
//                 <div className="flex items-center justify-center w-72">
//                     <Button
//                         type="submit"
//                         Text="Done"
//                         BgColor="bg-mainColor"
//                         Color="text-white"
//                         Width="full"
//                         Size="text-2xl"
//                         px="px-28"
//                         rounded="rounded-2xl"
//                     />
//                 </div>
//                 <button onClick={handleGoBack} className="text-2xl text-mainColor">Cancel</button>
//             </div>
//         </form>
//     );
// };

// export default AddExtraProductPage;

import React, { useState, useRef } from 'react';
import axios from 'axios';
import InputCustom from '../../../Components/InputCustom';
import { Button } from '../../../Components/Button';
import { useAuth } from '../../../Context/Auth';
import { useNavigate } from 'react-router-dom';
import CheckBox from '../../../Components/CheckBox';
import DropDownMenu from '../../../Components/DropDownMenu';

const AddExtraProductPage = () => {
    const auth = useAuth();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(''); // For one-time price or monthly price
    const [monthlyPrice, setMonthlyPrice] = useState(''); // For one-time price or monthly price
    const [yearlyPrice, setYearlyPrice] = useState(''); // For yearly price in case of Recurring
    const [appActive, setAppActive] = useState(0); // Default status to 0
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const [extraTypeData, setExtraTypeData] = useState([{ name: 'One Time' }, { name: 'Recurring' }]);
    const [extraType, setExtraType] = useState('Select Type');
    const [extraTypeName, setExtraTypeName] = useState();
    const [openExtraType, setOpenExtraType] = useState(false);
    const dropdownExtraType = useRef();

    const handleOpenExtraType = () => {
        setOpenExtraType(!openExtraType);
    };

    const handleExtraType = (e) => {
        const inputElement = e.currentTarget.querySelector('.inputVal');
        const selectedOptionName = e.currentTarget.textContent.trim();
        const selectedOptionValue = inputElement ? inputElement.value.toLowerCase() : '';
        setExtraType(selectedOptionName);
        setExtraTypeName(selectedOptionValue);
        setOpenExtraType(false);
        console.log(selectedOptionName)
    };

    const handleGoBack = () => {
        navigate(-1, { replace: true });
    };

    const handleClick = (e) => {
        const isChecked = e.target.checked;
        setAppActive(isChecked ? 1 : 0);
    };

    const handleSubmitAdd = async (event) => {
        event.preventDefault();
    
        // Input validation based on the selected type
        if (!name) {
            auth.toastError('Please Enter the Product Name.');
            return;
        }
        if (!description) {
            auth.toastError('Please Enter the Description.');
            return;
        }
        if (!extraTypeName) {
            auth.toastError('Please Select Type.');
            return;
        }
    
        // Conditional validation for pricing fields based on type
        if (extraTypeName === 'one_time' && !price) {
            auth.toastError('Please Enter the Price.');
            return;
        }
        if (extraTypeName === 'recurring' && (!monthlyPrice || !yearlyPrice)) {
            auth.toastError('Please Enter the Monthly and Yearly Prices.');
            return;
        }
    
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
    
            // Set data fields based on selected type
            if (extraType === 'One Time') {
                formData.append('status', 'one_time');
                formData.append('price', price);
            } else if (extraType === 'Recurring') {
                formData.append('status', 'recurring');
                formData.append('monthly', monthlyPrice);
                formData.append('yearly', yearlyPrice);
            }
    
            // Logging formData for debugging
            for (let pair of formData.entries()) {
                console.log(pair[0] + ', ' + pair[1]);
            }
    
            // Sending the form data via POST request
            const response = await axios.post(
                'https://login.wegostores.com/admin/v1/extra/create',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${auth.user.token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
    
            if (response.status === 200) {
                auth.toastSuccess('Extra Product added successfully!');
                handleGoBack();
            } else {
                auth.toastError('Failed to add Extra Product.');
            }
        } catch (error) {
            console.log(error);
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
                        placeholder="Product Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                    <DropDownMenu
                        ref={dropdownExtraType}
                        handleOpen={handleOpenExtraType}
                        handleOpenOption={handleExtraType}
                        stateoption={extraType}
                        openMenu={openExtraType}
                        options={extraTypeData}
                    />
                </div>
                
                {/* Conditionally render price inputs based on extraType */}
                {extraType === 'One Time' && (
                    <div className="lg:w-[30%] sm:w-full">
                        <InputCustom
                            type="number"
                            borderColor="mainColor"
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            width="w-full"
                        />
                    </div>
                )}

                {extraType === 'Recurring' && (
                    <>
                        <div className="lg:w-[30%] sm:w-full">
                            <InputCustom
                                type="number"
                                borderColor="mainColor"
                                placeholder="Price (Monthly)"
                                value={monthlyPrice}
                                onChange={(e) => setMonthlyPrice(e.target.value)}
                                width="w-full"
                            />
                        </div>
                        <div className="lg:w-[30%] sm:w-full">
                            <InputCustom
                                type="number"
                                borderColor="mainColor"
                                placeholder="Price (Yearly)"
                                value={yearlyPrice}
                                onChange={(e) => setYearlyPrice(e.target.value)}
                                width="w-full"
                            />
                        </div>
                    </>
                )}

                {/* <div className="flex items-center gap-x-4 w-full">
                    <span className="text-2xl text-mainColor font-medium">Application:</span>
                    <div>
                        <CheckBox handleClick={handleClick} checked={appActive} />
                    </div>
                </div> */}
            </div>

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

export default AddExtraProductPage;

