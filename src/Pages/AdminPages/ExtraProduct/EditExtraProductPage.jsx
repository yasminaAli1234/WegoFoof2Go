import React, { useState, useRef ,useContext,useEffect} from 'react';
import axios from 'axios';
import InputCustom from '../../../Components/InputCustom';
import { Button } from '../../../Components/Button';
import { useAuth } from '../../../Context/Auth';
import { useNavigate } from 'react-router-dom';
import CheckBox from '../../../Components/CheckBox';
import DropDownMenu from '../../../Components/DropDownMenu';
import { productDataContext } from '../../../Layouts/AdminLayouts/EditExtraProductLayout';

const EditExtraProductPage =()=>{
    const translation= new FormData();
    const [language,setLanguage]= useState('en')
    const auth = useAuth();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(''); // For one-time price or monthly price
    const [fee, setFee] = useState('');
    const [included, setIncluded] = useState(0); // Default status to 0
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
    const dropdownExtraType_ar = useRef();

    const productContent = useContext(productDataContext);
// arabic edit
const [name_ar, setName_ar] = useState('');
const [description_ar, setDescription_ar] = useState('');
const [price_ar, setPrice_ar] = useState(''); // For one-time price or monthly price
const [fee_ar, setFee_ar] = useState('');

const [monthlyPrice_ar, setMonthlyPrice_ar] = useState('');
const [monthlyDiscountPrice_ar, setMonthlyDiscountPrice_ar] = useState('');
const [MonthlySetUpFeesPrice_ar, setMonthlySetUpFeesPrice_ar] = useState('');

const [quarterlyPrice_ar, setQuarterlyPrice_ar] = useState('');
const [quarterlyDiscountPrice_ar, setQuarterlyDiscountPrice_ar] = useState('');
const [quarterlySetUpFeesPrice_ar, setQuarterlySetUpFeesPrice_ar] = useState('');

const [semiAnnualPrice_ar, setSemiAnnualPrice_ar] = useState('');
const [semiAnnualDiscountPrice_ar, setSemiAnnualDiscountPrice_ar] = useState('');
const [semiAnnualSetUpFeesPrice_ar, setSemiAnnualSetUpFeesPrice_ar] = useState('');

const [yearlyPrice_ar, setYearlyPrice_ar] = useState(''); 
const [yearlyDiscountPrice_ar, setYearlyDiscountPrice_ar] = useState(''); 
const [yearlySetUpFeesPrice_ar, setYearlySetUpFeesPrice_ar] = useState(''); 

const [showMonthlyPriceInput_ar, setShowMonthlyPriceInput_ar] = useState(false);
const [showQuarterlyPriceInput_ar, setShowQuarterlyPriceInput_ar] = useState(false);
const [showSemiAnnualPriceInput_ar, setShowSemiAnnualPriceInput_ar] = useState(false);
const [showYearlyPriceInput_ar, setShowYearlyPriceInput_ar] = useState(false);


const [extraType_ar, setExtraType_ar] = useState('اختار النوع');
const [extraTypeName_ar, setExtraTypeName_ar] = useState();
const [openExtraType_ar, setOpenExtraType_ar] = useState(false);
// change handle button
const handleChangeLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en'; 
    setLanguage(newLanguage); 
};
    useEffect(() => {
        if (productContent) {
            setName(productContent.name || '');
            setDescription(productContent.description|| '');
            setFee(productContent.setup_fees|| '');
            // set arabic
            setName_ar(productContent.name || '');
            setDescription_ar(productContent.description|| '');
            setFee_ar(productContent.setup_fees|| '');

            if (productContent.status) {
            
                if (productContent.status === 'one_time') {
                    setExtraType('One Time')
                    setExtraTypeName('One Time')
                    setPrice(productContent.price)

                    setExtraType_ar('One Time')
                    setExtraTypeName_ar('One Time')
                    setPrice_ar(productContent.price)


                }

                // // set arabic
                // if (productContent.status ==='مرة واحدة') {
                //     setExtraType_ar('مرة واحدة')
                //     setExtraTypeName_ar('مرة واحدة')
                //     setPrice_ar(productContent.price)
                // }


                 else if (productContent.status === 'recurring') {
                    setExtraType('Recurring')
                    setExtraTypeName('Recurring')

                    // -------
                    setExtraType_ar('Recurring')
                    setExtraTypeName_ar('Recurring')


                    if(productContent.monthly){
                        setShowMonthlyPriceInput(true)
                        setMonthlyPrice(productContent.monthly)
                        setMonthlyDiscountPrice(productContent.discount_monthly)
                        // -----
                        setShowMonthlyPriceInput_ar(true)
                        setMonthlyPrice_ar(productContent.monthly)
                        setMonthlyDiscountPrice_ar(productContent.discount_monthly)
                    }
                    if(productContent.quarterly){
                        setShowQuarterlyPriceInput(true)
                        setQuarterlyPrice(productContent.quarterly)
                        setQuarterlyDiscountPrice(productContent.discount_quarterly)
                        // ---------------
                        setShowQuarterlyPriceInput_ar(true)
                        setQuarterlyPrice_ar(productContent.quarterly)
                        setQuarterlyDiscountPrice_ar(productContent.discount_quarterly)
                    }
                    if(productContent["semi_annual"]){
                        setShowSemiAnnualPriceInput(true)
                        setSemiAnnualPrice(productContent["semi_annual"])
                        setSemiAnnualDiscountPrice(productContent.discount_semi_annual)

                        // ----------
                        setShowSemiAnnualPriceInput_ar(true)
                        setSemiAnnualPrice_ar(productContent["semi_annual"])
                        setSemiAnnualDiscountPrice_ar(productContent.discount_semi_annual)
                    }
                    if(productContent.yearly){
                        setShowYearlyPriceInput(true)
                        setYearlyPrice(productContent.yearly)
                        setYearlyDiscountPrice(productContent.discount_yearly)
                        // --------
                        setShowYearlyPriceInput_ar(true)
                        setYearlyPrice_ar(productContent.yearly)
                        setYearlyDiscountPrice_ar(productContent.discount_yearly)
                    }
                } 
                // set arabic
                // else if (productContent.status === 'متكرر') {
                //     setExtraType_ar('متكرر')
                //     setExtraTypeName_ar('متكرر')

                //     if(productContent.monthly){
                //         setShowMonthlyPriceInput_ar(true)
                //         setMonthlyPrice_ar(productContent.monthly)
                //         setMonthlyDiscountPrice_ar(productContent.discount_monthly)
                //     }
                //     if(productContent.quarterly){
                //         setShowQuarterlyPriceInput_ar(true)
                //         setQuarterlyPrice_ar(productContent.quarterly)
                //         setQuarterlyDiscountPrice_ar(productContent.discount_quarterly)
                //     }
                //     if(productContent["semi_annual"]){
                //         setShowSemiAnnualPriceInput_ar(true)
                //         setSemiAnnualPrice_ar(productContent["semi_annual"])
                //         setSemiAnnualDiscountPrice_ar(productContent.discount_semi_annual)
                //     }
                //     if(productContent.yearly){
                //         setShowYearlyPriceInput_ar(true)
                //         setYearlyPrice_ar(productContent.yearly)
                //         setYearlyDiscountPrice_ar(productContent.discount_yearly)
                //     }
                // } 
            }

        }
    }, [productContent]);

    const handleOpenExtraType = () => {
        setOpenExtraType(!openExtraType);
        setOpenExtraType_ar(!openExtraType_ar);
    };

    // const handleExtraType_ar = (e) => {
    //     const inputElement = e.currentTarget.querySelector('.inputVal');
    //     const selectedOptionName = e.currentTarget.textContent.trim();
        
    //     const selectedOptionValue = inputElement ? inputElement.value.toLowerCase() : '';
    //     setExtraType_ar(selectedOptionName);
        
    //     setOpenExtraType_ar(false);
    //     console.log(selectedOptionName)
    // };

    const handleExtraType = (e) => {
        const inputElement = e.currentTarget.querySelector('.inputVal');
        const selectedOptionName = e.currentTarget.textContent.trim();
        const selectedOptionValue = inputElement ? inputElement.value.toLowerCase() : '';
       
        setExtraType(selectedOptionName);
        setExtraTypeName(selectedOptionValue);
        // --------
        setExtraType_ar(selectedOptionName);
        setExtraTypeName_ar(selectedOptionValue);
        setOpenExtraType(false);
        console.log(selectedOptionValue)
        console.log(selectedOptionName)

    
        // Handle changes based on the selected option name in either language
        // if (selectedOptionName === 'مرة واحدة' || selectedOptionName === 'One Time') {
        //     setExtraType('One Time');
        //     setExtraTypeName_ar('One Time');
        //     setExtraTypeName_ar('مرة واحدة');
        // } else if (selectedOptionName === 'متكرر' || selectedOptionName === 'Recurring') {
        //     setExtraType('Recurring');
        //     setExtraType_ar('متكرر');
        // }
    
        // Handle extra type value from the input field
        
    
        setExtraTypeName(selectedOptionValue);
        setExtraTypeName_ar(selectedOptionValue);
        setOpenExtraType_ar(false);
    
        console.log(selectedOptionName);
    };
    

    const handleGoBack = () => {
        navigate(-1, { replace: true });
    };

    const handleClick = (e) => {
        const isChecked = e.target.checked;
        setIncluded(isChecked ? 1 : 0);
        
    };

    const handleSubmitEdit = async (productId,event) => {
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
        // ------
        if (!name_ar) {
            auth.toastError('الرجاء إدخال اسم المنتج.');
            return;
        }
        if (!description_ar) {
            auth.toastError('الرجاء إدخال الوصف.');
            return;
        }
        if (!extraTypeName_ar) {
            auth.toastError('الرجاء اختيار النوع.');
            return;
        }
        
        // Conditional validation for pricing fields based on type
      
    
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
        // ----------------
        if (extraTypeName_ar === 'one_time' && !price_ar) {
            auth.toastError(':الرجاء إدخال السعر');
            return;
        }
        if (extraTypeName_ar === 'recurring') {
            if (!monthlyPrice_ar) {
                auth.toastError('الرجاء إدخال السعر الشهري.');
                return;
            }
            if (!quarterlyPrice_ar) {
                auth.toastError('الرجاء إدخال السعر ربع السنوي.');
                return;
            }
            if (!semiAnnualPrice_ar) {
                auth.toastError('الرجاء إدخال السعر نصف السنوي.');
                return;
            }
            if (!yearlyPrice_ar) {
                auth.toastError('الرجاء إدخال السعر السنوي.');
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
                formData.append('semi_annual', semiAnnualPrice);
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
            // append to list in arabic
            translation['name']= name_ar;
            translation['description']= description_ar;
            translation['setup_fees']= fee_ar

                        // Set data fields based on selected type
                        if (extraType_ar === 'One Time') {
                            translation.append('status', 'one_time');
                            translation.append('price', price);
                        } else if (extraType_ar === 'Recurring') {
                            translation.append('status', 'recurring');
            
                            // Append selected prices if inputs are shown and filled
                        if (showMonthlyPriceInput_ar && monthlyPrice_ar) {
                            translation.append('monthly', monthlyPrice_ar);
                            translation.append('discount_monthly', monthlyDiscountPrice_ar);
                            // formData.append('setupFees_monthly', MonthlySetUpFeesPrice);
                        }
                        if (showQuarterlyPriceInput_ar && quarterlyPrice_ar) {
                            translation.append('quarterly', quarterlyPrice_ar);
                            translation.append('discount_quarterly', quarterlyDiscountPrice_ar);
                            // formData.append('setupFees_quarterly', quarterlyDiscountPrice);
                        }
                        if (showSemiAnnualPriceInput_ar && semiAnnualPrice_ar) {
                            translation.append('semi_annual', semiAnnualPrice_ar);
                            translation.append('discount_semi_annual', semiAnnualDiscountPrice_ar);
                            // formData.append('setupFees_semi_annual', semiAnnualSetUpFeesPrice);
                        }
                        if (showYearlyPriceInput_ar && yearlyPrice_ar) {
                            translation.append('yearly', yearlyPrice_ar);
                            translation.append('discount_yearly', yearlyDiscountPrice_ar);
                            // formData.append('setupFees_yearly', yearlySetUpFeesPrice);
                        }
                        }
                        formData.append('translations', translation)
            

    
            // Sending the form data via POST request
            const response = await axios.post(
                `https://login.wegostores.com/admin/v1/extra/update/${productId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${auth.user.token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
    
            if (response.status === 200) {
                auth.toastSuccess(`${language === 'en' ? 'Extra Product updated successfully!' : 'تم تحديث المنتج الإضافي بنجاح!'}`);
                handleGoBack();
            } else {
                auth.toastError(`${language === 'en' ? 'Failed to update Extra Product.' : 'فشل في تحديث المنتج الإضافي.'}`);
            }
        } catch (error) {
            console.log(error);
            const errorMessage = error?.response?.data?.errors || 
                                 (language === 'en' ? 'Network error' : 'خطأ في الشبكة');
            auth.toastError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };
    return(
    <>
      <div className="">
      <Button 
    type="submit"
    Text={`Change to ${language === 'en' ? 'Arabic' : 'English'}`}
    BgColor="bg-mainColor"
    Color="text-white"
    Width="fit"
    Size="text-2xl"
    px="px-28"
    rounded="rounded-2xl"
     
    handleClick={() => handleChangeLanguage()}
/>
      <form onSubmit={(event) => handleSubmitEdit(productContent.id, event)} className="w-full flex flex-col items-center justify-center gap-y-10 m-5">
         {language==='en' ?    <div className="w-full flex flex-wrap items-center justify-start gap-10">
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
                <textarea
                    className="w-full px-2 py-4 border-2 font-normal eleValueInput rounded-xl border-mainColor text-2xl focus:outline-none focus:ring-2 focus:ring-mainColor"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={1}
                ></textarea>
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
                        {/* <div className="lg:w-1/2 sm:w-full">
                        <InputCustom
                            type="number"
                            borderColor="mainColor"
                            placeholder="Enter SetUp Fees"
                            value={MonthlySetUpFeesPrice}
                            onChange={(e) => setMonthlySetUpFeesPrice(e.target.value)}
                            width="w-full"
                        />
                        </div> */}
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
                        {/* <div className="lg:w-1/2 sm:w-full">
                        <InputCustom
                            type="number"
                            borderColor="mainColor"
                            placeholder="Enter SetUp Fees"
                            value={quarterlySetUpFeesPrice}
                            onChange={(e) => setQuarterlySetUpFeesPrice(e.target.value)}
                            width="w-full"
                        />
                        </div> */}
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
                        {/* <div className="lg:w-1/2 sm:w-full">
                        <InputCustom
                            type="number"
                            borderColor="mainColor"
                            placeholder="Enter SetUp Fees"
                            value={semiAnnualSetUpFeesPrice}
                            onChange={(e) => setSemiAnnualSetUpFeesPrice(e.target.value)}
                            width="w-full"
                        />
                        </div> */}
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
                        {/* <div className="lg:w-1/2 sm:w-full">
                        <InputCustom
                            type="number"
                            borderColor="mainColor"
                            placeholder="Enter SetUp Fees"
                            value={yearlySetUpFeesPrice}
                            onChange={(e) => setYearlySetUpFeesPrice(e.target.value)}
                            width="w-full"
                        />
                        </div> */}
                        </>
                    )}
                    </div>
                </div>
                    </>
                )}
            </div>:  <div className="w-full flex flex-wrap items-center justify-start gap-10">
                <div className="lg:w-[30%] sm:w-full">
                    <InputCustom
                        type="text"
                        borderColor="mainColor"
                        placeholder="اسم المنتج"
                        value={name_ar}
                        onChange={(e) => setName_ar(e.target.value)}
                        width="w-full"
                    />
                </div>
                <div className="lg:w-[30%] sm:w-full">
                <textarea
                    className="w-full px-2 py-4 border-2 font-normal eleValueInput rounded-xl border-mainColor text-2xl focus:outline-none focus:ring-2 focus:ring-mainColor"
                    placeholder="الوصف"
                    value={description_ar}
                    onChange={(e) => setDescription_ar(e.target.value)}
                    rows={1}
                ></textarea>
                </div>
                <div className="lg:w-[30%] sm:w-full">
                    <InputCustom
                        type="number"
                        borderColor="mainColor"
                        placeholder="رسوم الإعداد"
                        value={fee_ar}
                        onChange={(e) => setFee_ar(e.target.value)}
                        width="w-full"
                    />
                </div>
                <div className="lg:w-[30%] sm:w-full">
                    <DropDownMenu
                        ref={dropdownExtraType_ar}
                        handleOpen={handleOpenExtraType}
                        handleOpenOption={handleExtraType}
                        stateoption={extraType_ar}
                        openMenu={openExtraType_ar}
                        options={extraTypeData}
                    />
                </div>
                
                {/* Conditionally render price inputs based on extraType */}
                {extraType_ar === 'One Time' && (
                    <div className="lg:w-[30%] sm:w-full">
                        <InputCustom
                            type="number"
                            borderColor="mainColor"
                            placeholder="السعر"
                            value={price_ar}
                            onChange={(e) => setPrice_ar(e.target.value)}
                            width="w-full"
                        />
                    </div>
                )}

                {extraType_ar === 'Recurring' && (
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
                            checked={showMonthlyPriceInput_ar}
                            onChange={() => setShowMonthlyPriceInput_ar(prev => !prev)}
                            className="h-5 w-5 rounded-full border-mainColor checked:w-8 checked:h-8  checked:bg-blue-500"
                        />
                        <label  className="text-2xl text-mainColor font-medium">شهري</label>
                    </div>
                        {/* Conditional Price Inputs */}
                        {showMonthlyPriceInput_ar && (
                        <>
                        <div className="lg:w-1/2 sm:w-full">
                            <InputCustom
                                type="number"
                                borderColor="mainColor"
                                 placeholder="أدخل السعر"
                                value={monthlyPrice_ar}
                                onChange={(e) => setMonthlyPrice_ar(e.target.value)}
                                width="w-full"
                            />
                        </div>
                        <div className="lg:w-1/2 sm:w-full">
                         <InputCustom
                             type="number"
                             borderColor="mainColor"
                             placeholder="أدخل سعر الخصم"
                             value={monthlyDiscountPrice_ar}
                             onChange={(e) => setMonthlyDiscountPrice_ar(e.target.value)}
                             width="w-full"
                         />
                        </div>
                        {/* <div className="lg:w-1/2 sm:w-full">
                        <InputCustom
                            type="number"
                            borderColor="mainColor"
                            placeholder="Enter SetUp Fees"
                            value={MonthlySetUpFeesPrice}
                            onChange={(e) => setMonthlySetUpFeesPrice(e.target.value)}
                            width="w-full"
                        />
                        </div> */}
                        </>
                        )}
                    </div>

                    {/* 3 Months Price Checkbox */}
                    <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-5">
                    <div className="flex items-center gap-3 w-full lg:w-1/3 ">
                        <input 
                            type="checkbox" 
                            checked={showQuarterlyPriceInput_ar}
                            onChange={() => setShowQuarterlyPriceInput_ar(prev => !prev)}
                            className="h-5 w-5 rounded-full border-mainColor checked:w-8 checked:h-8  checked:bg-blue-500"
                        />
                        <label  className="text-2xl text-mainColor font-medium">ربع سنوي</label>
                    </div>
                    {showQuarterlyPriceInput_ar && (
                        <>
                        <div className="lg:w-1/2 sm:w-full">
                            <InputCustom
                                type="number"
                                borderColor="mainColor"
                                 placeholder="أدخل السعر"
                                value={quarterlyPrice_ar}
                                onChange={(e) => setQuarterlyPrice_ar(e.target.value)}
                                width="w-full"
                            />
                        </div>
                        <div className="lg:w-1/2 sm:w-full">
                        <InputCustom
                            type="number"
                            borderColor="mainColor"
                            placeholder="أدخل سعر الخصم"
                            value={quarterlyDiscountPrice_ar}
                            onChange={(e) => setQuarterlyDiscountPrice_ar(e.target.value)}
                            width="w-full"
                        />
                        </div>
                        {/* <div className="lg:w-1/2 sm:w-full">
                        <InputCustom
                            type="number"
                            borderColor="mainColor"
                            placeholder="Enter SetUp Fees"
                            value={quarterlySetUpFeesPrice}
                            onChange={(e) => setQuarterlySetUpFeesPrice(e.target.value)}
                            width="w-full"
                        />
                        </div> */}
                        </>
                    )}
                    </div>

                    {/* 6 Months Price Checkbox */}
                    <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-5">
                    <div className="flex items-center gap-3 w-full lg:w-1/3 ">
                        <input 
                            type="checkbox" 
                            checked={showSemiAnnualPriceInput_ar}
                            onChange={() => setShowSemiAnnualPriceInput_ar(prev => !prev)}
                            className="h-5 w-5 rounded-full border-mainColor checked:w-8 checked:h-8  checked:bg-blue-500"
                        />
                        <label  className="text-2xl text-mainColor font-medium">نصف سنوي</label>
                    </div>
                    {showSemiAnnualPriceInput_ar && (
                        <>
                        <div className="lg:w-1/2 sm:w-full">
                            <InputCustom
                                type="number"
                                borderColor="mainColor"
                                 placeholder="أدخل السعر"
                                value={semiAnnualPrice_ar}
                                onChange={(e) => setSemiAnnualPrice_ar(e.target.value)}
                                width="w-full"
                            />
                        </div>
                        <div className="lg:w-1/2 sm:w-full">
                        <InputCustom
                            type="number"
                            borderColor="mainColor"
                            placeholder="أدخل سعر الخصم"
                            value={semiAnnualDiscountPrice_ar}
                            onChange={(e) => setSemiAnnualDiscountPrice_ar(e.target.value)}
                            width="w-full"
                        />
                        </div>
                        {/* <div className="lg:w-1/2 sm:w-full">
                        <InputCustom
                            type="number"
                            borderColor="mainColor"
                            placeholder="Enter SetUp Fees"
                            value={semiAnnualSetUpFeesPrice}
                            onChange={(e) => setSemiAnnualSetUpFeesPrice(e.target.value)}
                            width="w-full"
                        />
                        </div> */}
                        </>
                    )}
                    </div>

                    {/* yearly Price Checkbox */}
                    <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-5">
                    <div className="flex items-center gap-3 w-full lg:w-1/3 ">
                        <input 
                            type="checkbox" 
                            checked={showYearlyPriceInput_ar}
                            onChange={() => setShowYearlyPriceInput_ar(prev => !prev)}
                            className="h-5 w-5 rounded-full border-mainColor checked:w-8 checked:h-8  checked:bg-blue-500"
                        />
                        <label  className="text-2xl text-mainColor font-medium">سنوي</label>
                    </div>
                    {showYearlyPriceInput_ar && (
                        <>
                        <div className="lg:w-1/2 sm:w-full">
                            <InputCustom
                                type="number"
                                borderColor="mainColor"
                                 placeholder="أدخل السعر"
                                value={yearlyPrice_ar}
                                onChange={(e) => setYearlyPrice_ar(e.target.value)}
                                width="w-full"
                            />
                        </div>
                        <div className="lg:w-1/2 sm:w-full">
                        <InputCustom
                            type="number"
                            borderColor="mainColor"
                            placeholder="أدخل سعر الخصم"
                            value={yearlyDiscountPrice_ar}
                            onChange={(e) => setYearlyDiscountPrice_ar(e.target.value)}
                            width="w-full"
                        />
                        </div>
                        {/* <div className="lg:w-1/2 sm:w-full">
                        <InputCustom
                            type="number"
                            borderColor="mainColor"
                            placeholder="Enter SetUp Fees"
                            value={yearlySetUpFeesPrice}
                            onChange={(e) => setYearlySetUpFeesPrice(e.target.value)}
                            width="w-full"
                        />
                        </div> */}
                        </>
                    )}
                    </div>
                </div>
                    </>
                )}
            </div>}

            {/* create arabic */}
           

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
      </div>
    </>
    )
}

export default EditExtraProductPage;