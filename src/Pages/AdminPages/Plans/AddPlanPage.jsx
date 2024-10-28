import React, { useState, useRef,useEffect } from 'react';
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
    const [fee, setFee] = useState('');
    const [limitPlan, setLimitPlan] = useState('');
    const [thumbnails, setThumbnails] = useState('');
    const [thumbnailFile, setThumbnailFile] = useState(null); // Store the file object
    const [appActive, setAppActive] = useState(0); // Default status to 0
    const [isLoading, setIsLoading] = useState(false);
    const [secondaryPrice, setSecondaryPrice] = useState(''); // Price for Secondary
    const [monthlyPrice, setMonthlyPrice] = useState(''); // Price for Monthly
    const [showSecondaryPriceInput, setShowSecondaryPriceInput] = useState(false); // Toggle for Secondary Price Input
    const [showMonthlyPriceInput, setShowMonthlyPriceInput] = useState(false); // Toggle for Monthly Price Input
    const navigate = useNavigate();
    const uploadRef = useRef();

    const handleGoBack = () => {
        navigate(-1, { replace: true });
    };

    const handleInputClick = () => {
        if (uploadRef.current) {
            uploadRef.current.click(); // Trigger a click on the hidden file input
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setThumbnailFile(file); // Set file object for upload
            setThumbnails(file.name); // Display file name in the text input
        }
    };

    const handleClick = (e) => {
        const isChecked = e.target.checked; // Checked status
        setAppActive(isChecked ? 1 : 0); // Set paymentActive as 1 (true) or 0 (false)
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

        if (!fee) {
            auth.toastError('Please Enter the Setup Fees.');
            return;
        }
        if (!monthlyPrice) {
            auth.toastError('Please Enter the Monthly Price.');
            return;
        }
        if (!secondaryPrice) {
            auth.toastError('Please Enter the Secondary Price.');
            return;
        }

        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('name', title);
            formData.append('description', description);
            formData.append('setup_fees', fee);
            formData.append('limet_store', limitPlan);
            formData.append('image', thumbnailFile); // Append the file
            formData.append('app', appActive); // Append the file
            // Append selected prices if inputs are shown and filled
            if (showSecondaryPriceInput && secondaryPrice) {
                formData.append('price_per_year', secondaryPrice);
            }
            if (showMonthlyPriceInput && monthlyPrice) {
                formData.append('price_per_month', monthlyPrice);
            }

            for (let pair of formData.entries()) {
                console.log(pair[0] + ', ' + pair[1]);
            } 

            const response = await axios.post(
                'https://login.wegostores.com/admin/v1/plan/create',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${auth.user.token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
             console.log(response)
            if (response.status === 200) {
                auth.toastSuccess('Plan added successfully!');
                handleGoBack();
            } else {
                auth.toastError('Failed to add Plan.');
            }
        } catch (error) {
            console.log(error)
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
                        type="number"
                        borderColor="mainColor"
                        placeholder="Setup Fees"
                        value={fee}
                        onChange={(e) => setFee(e.target.value)}
                        width="w-full"
                    />
                </div>
                <div className="lg:w-[30%] sm:w-full">
                    <InputCustom
                        type="number"
                        borderColor="mainColor"
                        placeholder="Limit Store"
                        value={limitPlan}
                        onChange={(e) => setLimitPlan(e.target.value)}
                        width="w-full"
                    />
                </div>
                <div className="lg:w-[30%] sm:w-full">
                    <InputCustom
                            type="text"
                            borderColor="mainColor"
                            placeholder="Thumbnail"
                            value={thumbnails}
                            readOnly={true} 
                            onClick={handleInputClick}
                            upload="true"
                        />
                        <input
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                            ref={uploadRef}
                        />
                </div>

                <div className="flex items-center gap-x-4 w-full">
                        <span className="text-2xl text-mainColor font-medium">Application:</span>
                         <div>
                             <CheckBox handleClick={handleClick} checked={appActive}/>
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
                                    type="number"
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
                                type="number"
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
