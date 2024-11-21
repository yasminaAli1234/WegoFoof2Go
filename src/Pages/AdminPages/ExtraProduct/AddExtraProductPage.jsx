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
    const [fee, setFee] = useState('');
    // const [monthlyPrice, setMonthlyPrice] = useState(''); // For one-time price or monthly price
    // const [yearlyPrice, setYearlyPrice] = useState(''); // For yearly price in case of Recurring
    const [appActive, setAppActive] = useState(0); // Default status to 0
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const [monthlyPrice, setMonthlyPrice] = useState('');
    const [monthlyDiscountPrice, setMonthlyDiscountPrice] = useState('');
    const [MonthlySetUpFeesPrice, setMonthlySetUpFeesPrice] = useState('');

    const [quarterlyPrice, setQuarterlyPrice] = useState('');
    const [quarterlyDiscountPrice, setQuarterlyDiscountPrice] = useState('');
    const [quarterlySetUpFeesPrice, setQuarterlySetUpFeesPrice] = useState('');

    const [semiAnnualPrice, setSemiAnnualPrice] = useState('');
    const [semiAnnualDiscountPrice, setSemiAnnualDiscountPrice] = useState('');
    const [semiAnnualSetUpFeesPrice, setSemiAnnualSetUpFeesPrice] = useState('');

    const [yearlyPrice, setYearlyPrice] = useState(''); 
    const [yearlyDiscountPrice, setYearlyDiscountPrice] = useState(''); 
    const [yearlySetUpFeesPrice, setYearlySetUpFeesPrice] = useState(''); 

    const [showMonthlyPriceInput, setShowMonthlyPriceInput] = useState(false);
    const [showQuarterlyPriceInput, setShowQuarterlyPriceInput] = useState(false);
    const [showSemiAnnualPriceInput, setShowSemiAnnualPriceInput] = useState(false);
    const [showYearlyPriceInput, setShowYearlyPriceInput] = useState(false);


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
        if (extraTypeName === 'recurring') {
            if (!monthlyPrice) {
                auth.toastError('Please Enter the Monthly Price.');
                return;
            }
            if (!quarterlyPrice) {
                auth.toastError('Please Enter the Quarterly Price.');
                return;
            }
            if (!semiAnnualPrice) {
                auth.toastError('Please Enter the semi-Annual Price.');
                return;
            }
            if (!yearlyPrice) {
                auth.toastError('Please Enter the Yearly Price.');
                return;
            }
        }
        
    
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('setup_fees', fee);

            // Set data fields based on selected type
            if (extraType === 'One Time') {
                formData.append('status', 'one_time');
                formData.append('price', price);
            } else if (extraType === 'Recurring') {
                formData.append('status', 'recurring');

                // Append selected prices if inputs are shown and filled
            if (showMonthlyPriceInput && monthlyPrice) {
                formData.append('monthly', monthlyPrice);
                formData.append('discount_monthly', monthlyDiscountPrice);
                // formData.append('setupFees_monthly', MonthlySetUpFeesPrice);
            }
            if (showQuarterlyPriceInput && quarterlyPrice) {
                formData.append('quarterly', quarterlyPrice);
                formData.append('discount_quarterly', quarterlyDiscountPrice);
                // formData.append('setupFees_quarterly', quarterlyDiscountPrice);
            }
            if (showSemiAnnualPriceInput && semiAnnualPrice) {
                formData.append('semi-annual', semiAnnualPrice);
                formData.append('discount_semi_annual', semiAnnualDiscountPrice);
                // formData.append('setupFees_semi_annual', semiAnnualSetUpFeesPrice);
            }
            if (showYearlyPriceInput && yearlyPrice) {
                formData.append('yearly', yearlyPrice);
                formData.append('discount_yearly', yearlyDiscountPrice);
                // formData.append('setupFees_yearly', yearlySetUpFeesPrice);
            }
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
                        {/* <div className="lg:w-[30%] sm:w-full">
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
                        </div> */}

                <div className="flex w-full flex-col gap-5">
                    {/* Monthly Price Checkbox */}
                    <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-5">
                    <div className=" flex items-center gap-3 w-full lg:w-1/3">
                        <input 
                            type="checkbox" 
                            checked={showMonthlyPriceInput}
                            onChange={() => setShowMonthlyPriceInput(prev => !prev)}
                            className="h-5 w-5 rounded-full border-mainColor checked:w-8 checked:h-8  checked:bg-blue-500"
                        />
                        <label  className="text-2xl text-mainColor font-medium">Monthly</label>
                    </div>
                        {/* Conditional Price Inputs */}
                        {showMonthlyPriceInput && (
                        <>
                        <div className="lg:w-1/2 sm:w-full">
                            <InputCustom
                                type="number"
                                borderColor="mainColor"
                                placeholder="Enter Price"
                                value={monthlyPrice}
                                onChange={(e) => setMonthlyPrice(e.target.value)}
                                width="w-full"
                            />
                        </div>
                        <div className="lg:w-1/2 sm:w-full">
                         <InputCustom
                             type="number"
                             borderColor="mainColor"
                             placeholder="Enter Discount Price"
                             value={monthlyDiscountPrice}
                             onChange={(e) => setMonthlyDiscountPrice(e.target.value)}
                             width="w-full"
                         />
                        </div>
                        <div className="lg:w-1/2 sm:w-full">
                        <InputCustom
                            type="number"
                            borderColor="mainColor"
                            placeholder="Enter SetUp Fees"
                            value={MonthlySetUpFeesPrice}
                            onChange={(e) => setMonthlySetUpFeesPrice(e.target.value)}
                            width="w-full"
                        />
                        </div>
                        </>
                        )}
                    </div>

                    {/* 3 Months Price Checkbox */}
                    <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-5">
                    <div className="flex items-center gap-3 w-full lg:w-1/3 ">
                        <input 
                            type="checkbox" 
                            checked={showQuarterlyPriceInput}
                            onChange={() => setShowQuarterlyPriceInput(prev => !prev)}
                            className="h-5 w-5 rounded-full border-mainColor checked:w-8 checked:h-8  checked:bg-blue-500"
                        />
                        <label  className="text-2xl text-mainColor font-medium">Quarterly</label>
                    </div>
                    {showQuarterlyPriceInput && (
                        <>
                        <div className="lg:w-1/2 sm:w-full">
                            <InputCustom
                                type="number"
                                borderColor="mainColor"
                                placeholder="Enter Price"
                                value={quarterlyPrice}
                                onChange={(e) => setQuarterlyPrice(e.target.value)}
                                width="w-full"
                            />
                        </div>
                        <div className="lg:w-1/2 sm:w-full">
                        <InputCustom
                            type="number"
                            borderColor="mainColor"
                            placeholder="Enter Discount Price"
                            value={quarterlyDiscountPrice}
                            onChange={(e) => setQuarterlyDiscountPrice(e.target.value)}
                            width="w-full"
                        />
                        </div>
                        <div className="lg:w-1/2 sm:w-full">
                        <InputCustom
                            type="number"
                            borderColor="mainColor"
                            placeholder="Enter SetUp Fees"
                            value={quarterlySetUpFeesPrice}
                            onChange={(e) => setQuarterlySetUpFeesPrice(e.target.value)}
                            width="w-full"
                        />
                        </div>
                        </>
                    )}
                    </div>

                    {/* 6 Months Price Checkbox */}
                    <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-5">
                    <div className="flex items-center gap-3 w-full lg:w-1/3 ">
                        <input 
                            type="checkbox" 
                            checked={showSemiAnnualPriceInput}
                            onChange={() => setShowSemiAnnualPriceInput(prev => !prev)}
                            className="h-5 w-5 rounded-full border-mainColor checked:w-8 checked:h-8  checked:bg-blue-500"
                        />
                        <label  className="text-2xl text-mainColor font-medium">Semi-Annual</label>
                    </div>
                    {showSemiAnnualPriceInput && (
                        <>
                        <div className="lg:w-1/2 sm:w-full">
                            <InputCustom
                                type="number"
                                borderColor="mainColor"
                                placeholder="Enter Price"
                                value={semiAnnualPrice}
                                onChange={(e) => setSemiAnnualPrice(e.target.value)}
                                width="w-full"
                            />
                        </div>
                        <div className="lg:w-1/2 sm:w-full">
                        <InputCustom
                            type="number"
                            borderColor="mainColor"
                            placeholder="Enter Discount Price"
                            value={semiAnnualDiscountPrice}
                            onChange={(e) => setSemiAnnualDiscountPrice(e.target.value)}
                            width="w-full"
                        />
                        </div>
                        <div className="lg:w-1/2 sm:w-full">
                        <InputCustom
                            type="number"
                            borderColor="mainColor"
                            placeholder="Enter SetUp Fees"
                            value={semiAnnualSetUpFeesPrice}
                            onChange={(e) => setSemiAnnualSetUpFeesPrice(e.target.value)}
                            width="w-full"
                        />
                        </div>
                        </>
                    )}
                    </div>

                    {/* yearly Price Checkbox */}
                    <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-5">
                    <div className="flex items-center gap-3 w-full lg:w-1/3 ">
                        <input 
                            type="checkbox" 
                            checked={showYearlyPriceInput}
                            onChange={() => setShowYearlyPriceInput(prev => !prev)}
                            className="h-5 w-5 rounded-full border-mainColor checked:w-8 checked:h-8  checked:bg-blue-500"
                        />
                        <label  className="text-2xl text-mainColor font-medium">Yearly</label>
                    </div>
                    {showYearlyPriceInput && (
                        <>
                        <div className="lg:w-1/2 sm:w-full">
                            <InputCustom
                                type="number"
                                borderColor="mainColor"
                                placeholder="Enter Price"
                                value={yearlyPrice}
                                onChange={(e) => setYearlyPrice(e.target.value)}
                                width="w-full"
                            />
                        </div>
                        <div className="lg:w-1/2 sm:w-full">
                        <InputCustom
                            type="number"
                            borderColor="mainColor"
                            placeholder="Enter Discount Price"
                            value={yearlyDiscountPrice}
                            onChange={(e) => setYearlyDiscountPrice(e.target.value)}
                            width="w-full"
                        />
                        </div>
                        <div className="lg:w-1/2 sm:w-full">
                        <InputCustom
                            type="number"
                            borderColor="mainColor"
                            placeholder="Enter SetUp Fees"
                            value={yearlySetUpFeesPrice}
                            onChange={(e) => setYearlySetUpFeesPrice(e.target.value)}
                            width="w-full"
                        />
                        </div>
                        </>
                    )}
                    </div>
                </div>
                    </>
                )}
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

