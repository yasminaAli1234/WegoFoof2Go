import React, { useState, useRef,useEffect } from 'react';
import axios from 'axios';
import InputCustom from '../../../Components/InputCustom';
import { Button } from '../../../Components/Button';
import { useAuth } from '../../../Context/Auth';
import { useNavigate } from 'react-router-dom';
import CheckBox from '../../../Components/CheckBox';
import DropDownMenu from '../../../Components/DropDownMenu';
import MultipleChoiceMenu from '../../../Components/MultipleChoiceMenu';

const AddExtraProductPage = () => {
    const auth = useAuth();
    // first language en
    // const translation= new FormData();
    const [language,setLanguage]= useState('en')
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(''); // For one-time price or monthly price
    const [fee, setFee] = useState('');
    // const [monthlyPrice, setMonthlyPrice] = useState(''); // For one-time price or monthly price
    // const [yearlyPrice, setYearlyPrice] = useState(''); // For yearly price in case of Recurring
    const [included, setIncluded] = useState(''); // Default status to 0
    const [isLoading, setIsLoading] = useState(false);
    

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

    // set arabic
    const [name_ar, setName_ar] = useState('');
    const [description_ar, setDescription_ar] = useState('');
    // const [price_ar, setPrice_ar] = useState(''); // For one-time price or monthly price
    // const [fee_ar, setFee_ar] = useState('');
    // const [monthlyPrice, setMonthlyPrice] = useState(''); // For one-time price or monthly price
    // const [yearlyPrice, setYearlyPrice] = useState(''); // For yearly price in case of Recurring
    // const [included_ar, setIncluded_ar] = useState(''); // Default status to 0
    // const [isLoading_ar, setIsLoading_ar] = useState(false);
    const navigate = useNavigate();

    // const [monthlyPrice_ar, setMonthlyPrice_ar] = useState('');
    // const [monthlyDiscountPrice_ar, setMonthlyDiscountPrice_ar] = useState('');
    // const [MonthlySetUpFeesPrice_ar, setMonthlySetUpFeesPrice_ar] = useState('');

    // const [quarterlyPrice_ar, setQuarterlyPrice_ar] = useState('');
    // const [quarterlyDiscountPrice_ar, setQuarterlyDiscountPrice_ar] = useState('');
    // const [quarterlySetUpFeesPrice_ar, setQuarterlySetUpFeesPrice_ar] = useState('');

    // const [semiAnnualPrice_ar, setSemiAnnualPrice_ar] = useState('');
    // const [semiAnnualDiscountPrice_ar, setSemiAnnualDiscountPrice_ar] = useState('');
    // const [semiAnnualSetUpFeesPrice_ar, setSemiAnnualSetUpFeesPrice_ar] = useState('');

    // const [yearlyPrice_ar, setYearlyPrice_ar] = useState(''); 
    // const [yearlyDiscountPrice_ar, setYearlyDiscountPrice_ar] = useState(''); 
    // const [yearlySetUpFeesPrice_ar, setYearlySetUpFeesPrice_ar] = useState(''); 

    // const [showMonthlyPriceInput_ar, setShowMonthlyPriceInput_ar] = useState(false);
    // const [showQuarterlyPriceInput_ar, setShowQuarterlyPriceInput_ar] = useState(false);
    // const [showSemiAnnualPriceInput_ar, setShowSemiAnnualPriceInput_ar] = useState(false);
    // const [showYearlyPriceInput_ar, setShowYearlyPriceInput_ar] = useState(false);

    
    // const [extraType_ar, setExtraType_ar] = useState('اختار النوع');
    // const [extraTypeName_ar, setExtraTypeName_ar] = useState();
    // const [openExtraType_ar, setOpenExtraType_ar] = useState(false);
    const dropdownExtraType = useRef();

    const [plans, setPlans] = useState([]);
    const [selectPlan, setSelectPlan] = useState('');
    const [selectPlanId, setSelectPlanId] = useState('');
    const [openSelectPlan, setOpenSelectPlan] = useState(false);
    const dropdownPlanRef =useRef();

    const handleChangeLanguage = () => {
        const newLanguage = language === 'en' ? 'ar' : 'en'; 
        setLanguage(newLanguage); 
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
               const response = await axios.get(' https://www.wegostores.com/admin/v1/plan/show', {
                      headers: {
                             Authorization: `Bearer ${auth.user.token}`,
                      },
               });
               if (response.status === 200) {
                      console.log(response.data)
                      setPlans(response.data.plan)
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

    const handleOpenExtraType = () => {
        setOpenExtraType(!openExtraType);
        setOpenSelectPlan(false)
        // // ---
        // setOpenExtraType_ar(!openExtraType);
        
    };
    const handleOpenSelectPlan = () => {
        setOpenSelectPlan(prev => !prev)
        
        setOpenExtraType(false)
    };
    
    const handleExtraType = (e) => {
        const inputElement = e.currentTarget.querySelector('.inputVal');
        const selectedOptionName = e.currentTarget.textContent.trim();
        const selectedOptionValue = inputElement ? inputElement.value.toLowerCase() : '';
        
        // Set values for English
        setExtraType(selectedOptionName);
        setExtraTypeName(selectedOptionValue);
        setOpenExtraType(false);
        // set value to arabic
        // setExtraType_ar(selectedOptionName);
        // setExtraTypeName_ar(selectedOptionValue);
        // setOpenExtraType_ar(false);
        console.log(selectedOptionName)
    };
    const handleSelectPlan = (e) => {
        const inputElement = e.currentTarget.querySelector('.inputVal');
        const selectedOptionName = e.currentTarget.textContent.trim();
        const selectedOptionValue = inputElement ? inputElement.value : null;
        setSelectPlan(prev =>
            prev.includes(selectedOptionName)
              ? prev.filter(name => name !== selectedOptionName)
              : [...prev, selectedOptionName]
          );
      
          setSelectPlanId(prev =>
            prev.includes(selectedOptionValue)
              ? prev.filter(id => id !== selectedOptionValue)
              : [...prev, selectedOptionValue]
          );
          setOpenSelectPlan(false)
      
        console.log('Selected Plan:', selectedOptionName);
        console.log('Plan ID:', selectedOptionValue);
    };
    const handleRemoveSubject = (PlanName) => {
        setSelectPlan(selectPlan.filter(plan => plan !== PlanName));
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);
    
      const handleClickOutside = (event) => {
        if (dropdownPlanRef.current && !dropdownPlanRef.current.contains(event.target)&&
            dropdownExtraType.current && !dropdownExtraType.current.contains(event.target)
        ) {
            setOpenSelectPlan(false); 
            setOpenExtraType(false); 
        }
      };

    const handleGoBack = () => {
        navigate(-1, { replace: true });
    };

    const handleClick = (e) => {
        const isChecked = e.target.checked;
        setIncluded(isChecked ? 1 : 0);
        // setIncluded_ar(isChecked ? 1 : 0);
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
    
        // -----------
        if (!name_ar) {
            auth.toastError('Please Enter the Product Name Arabic.');
            return;
        }
        if (!description_ar) {
            auth.toastError('Please Enter the Description Arabic.');
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
                auth.toastError('Please Enter the Semi-Annual Price.');
                return;
            }
            if (!yearlyPrice) {
                auth.toastError('Please Enter the Yearly Price.');
                return;
            }
        }
    
        // if (extraTypeName_ar === 'one_time' && !price_ar) {
        //     auth.toastError(':الرجاء إدخال السعر');
        //     return;
        // }
        // if (extraTypeName_ar === 'recurring') {
        //     if (!monthlyPrice_ar) {
        //         auth.toastError('الرجاء إدخال السعر الشهري.');
        //         return;
        //     }
        //     if (!quarterlyPrice_ar) {
        //         auth.toastError('الرجاء إدخال السعر ربع السنوي.');
        //         return;
        //     }
        //     if (!semiAnnualPrice_ar) {
        //         auth.toastError('الرجاء إدخال السعر نصف السنوي.');
        //         return;
        //     }
        //     if (!yearlyPrice_ar) {
        //         auth.toastError('الرجاء إدخال السعر السنوي.');
        //         return;
        //     }
        // }
    
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('setup_fees', fee);
            formData.append('included', included || 0);
    
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
                }
                if (showQuarterlyPriceInput && quarterlyPrice) {
                    formData.append('quarterly', quarterlyPrice);
                    formData.append('discount_quarterly', quarterlyDiscountPrice);
                }
                if (showSemiAnnualPriceInput && semiAnnualPrice) {
                    formData.append('semi_annual', semiAnnualPrice);
                    formData.append('discount_semi_annual', semiAnnualDiscountPrice);
                }
                if (showYearlyPriceInput && yearlyPrice) {
                    formData.append('yearly', yearlyPrice);
                    formData.append('discount_yearly', yearlyDiscountPrice);
                }
            }
    
            // selectPlanId.forEach((planId, index) => {
            //     formData.append(`plans[${index}]`, planId);
            // });
    
            // Create translation array
            const translations = [
                { key: 'name', value: name_ar, locale: 'ar' },
                { key: 'description', value: description_ar, locale: 'ar' },
                
            ];
    
            // Handle the translation for recurring products
            // if (extraType === 'One Time') {
            //     translations.push({ key: 'status', value: 'one_time', locale: 'ar' });
            //     translations.push({ key: 'price', value: price, locale: 'ar' });
            // } else if (extraType === 'Recurring') {
            //     translations.push({ key: 'status', value: 'recurring', locale: 'ar' });
    
            //     if (showMonthlyPriceInput && monthlyPrice) {
            //         translations.push({ key: 'monthly', value: monthlyPrice, locale: 'ar' });
            //         translations.push({ key: 'discount_monthly', value: monthlyDiscountPrice, locale: 'ar' });
            //     }
            //     if (showQuarterlyPriceInput && quarterlyPrice) {
            //         translations.push({ key: 'quarterly', value: quarterlyPrice, locale: 'ar' });
            //         translations.push({ key: 'discount_quarterly', value: quarterlyDiscountPrice, locale: 'ar' });
            //     }
            //     if (showSemiAnnualPriceInput && semiAnnualPrice) {
            //         translations.push({ key: 'semi_annual', value: semiAnnualPrice, locale: 'ar' });
            //         translations.push({ key: 'discount_semi_annual', value: semiAnnualDiscountPrice, locale: 'ar' });
            //     }
            //     if (showYearlyPriceInput && yearlyPrice) {
            //         translations.push({ key: 'yearly', value: yearlyPrice, locale: 'ar' });
            //         translations.push({ key: 'discount_yearly', value: yearlyDiscountPrice, locale: 'ar' });
            //     }
            // }
    
          translations.forEach((translation, index) => {
            Object.entries(translation).forEach(([fieldKey, fieldValue]) => {
                formData.append(`translations[${index}][${fieldKey}]`, fieldValue);
            });
        });
    
            // Sending the form data via POST request
            const response = await axios.post(
                ' https://www.wegostores.com/admin/v1/extra/create',
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
                auth.toastError( 'Failed to add Extra Product.');
            }
        } catch (error) {
            console.log(error);
            const errorMessage = error?.response?.data?.errors ||
                                 'Network error' ;
            auth.toastError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };
    
    
    return (
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
<form onSubmit={handleSubmitAdd} className="w-full flex flex-col items-center justify-center gap-y-10 m-5">
           
            {language==='en'?
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
            {/* <div className="lg:w-[30%] sm:w-full">
                <InputCustom
                    type="text"
                    borderColor="mainColor"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    width="w-full"
                />
            </div> */}
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
                         required={false}
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
                        required={false}
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
                        required={false}
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
                        required={false}
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

            {
                included ===1 && (
                <div className="lg:w-[30%] sm:w-full">
                <MultipleChoiceMenu
                  ref={dropdownPlanRef}
                  handleOpen={handleOpenSelectPlan}
                  selectedOptions={selectPlan}
                  openMenu={openSelectPlan}
                  handleSelectOption={handleSelectPlan}
                  handleRemoveOption={handleRemoveSubject}
                  options={plans}
                  name="Select Plans"
                />
              </div>
                )
            }

            <div className="lg:w-[30%] sm:w-full flex items-center gap-x-4 w-full">
                        <span className="text-2xl text-mainColor font-medium">Included:</span>
                        <div>
                            <CheckBox handleClick={handleClick} checked={included}/>
                        </div>
                    </div>  
            </div>:
            <div className="w-full flex flex-wrap items-center justify-start gap-10">
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
            {/* <div className="lg:w-[30%] sm:w-full">
                <InputCustom
                    type="text"
                    borderColor="mainColor"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    width="w-full"
                />
            </div> */}
            <div className="lg:w-[30%] sm:w-full">
            <textarea
                className="w-full px-2 py-4 border-2 font-normal eleValueInput rounded-xl border-mainColor text-2xl focus:outline-none focus:ring-2 focus:ring-mainColor"
                placeholder="الوصف"
                value={description_ar}
                onChange={(e) => setDescription_ar(e.target.value)}
                rows={1}
            ></textarea>
            </div>
            {/* <div className="lg:w-[30%] sm:w-full">
                <InputCustom
                    type="number"
                    borderColor="mainColor"
                    placeholder="رسوم الإعداد"
                    value={fee}
                    onChange={(e) => setFee_ar(e.target.value)}
                    width="w-full"
                />
            </div> */}
          

            {/* {
                included === 1 && (
                <div className="lg:w-[30%] sm:w-full">
                <MultipleChoiceMenu
                  ref={dropdownPlanRef}
                  handleOpen={handleOpenSelectPlan}
                  selectedOptions={selectPlan}
                  openMenu={openSelectPlan}
                  handleSelectOption={handleSelectPlan}
                  handleRemoveOption={handleRemoveSubject}
                  options={plans}
                  name="اختار الخطة"
                />
              </div>
                )
            } */}

            {/* <div className="lg:w-[30%] sm:w-full flex items-center gap-x-4 w-full">
                        <span className="text-2xl text-mainColor font-medium">مشمول</span>
                        <div>
                            <CheckBox handleClick={handleClick} checked={included}/>
                        </div>
                    </div>   */}
            </div>}
                

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
    );
};

export default AddExtraProductPage;

