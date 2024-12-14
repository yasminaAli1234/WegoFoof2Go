import React, { useEffect, useState ,useRef ,useContext} from 'react';
import axios from 'axios';
import InputCustom from '../../../Components/InputCustom';
import { Button } from '../../../Components/Button';
import { useAuth } from '../../../Context/Auth';
import { useNavigate } from 'react-router-dom';
import CheckBox from '../../../Components/CheckBox';
import { PlanDataContext } from '../../../Layouts/AdminLayouts/EditPlanLayout';

const EditPlanPage =()=>{
    
    const auth = useAuth();
    // english translation
    
    const [language,setLanguage]= useState('en')
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [fee, setFee] = useState('');
    const [limitPlan, setLimitPlan] = useState('');
    const [thumbnails, setThumbnails] = useState('');
    const [thumbnailFile, setThumbnailFile] = useState(null); // Store the file object
    const [appActive, setAppActive] = useState(0); // Default status to 0
    const [isLoading, setIsLoading] = useState(false);

    const [monthlyPrice, setMonthlyPrice] = useState('');
    const [monthlyDiscountPrice, setMonthlyDiscountPrice] = useState('');
    // eslint-disable-next-line no-unused-vars
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

    // arabic translation
    const [name_ar, setName_ar] = useState('');
    const [title_ar, setTitle_ar] = useState('');
    const [description_ar, setDescription_ar] = useState('');
    const [fee_ar, setFee_ar] = useState('');
    const [limitPlan_ar, setLimitPlan_ar] = useState('');
    const [thumbnails_ar, setThumbnails_ar] = useState('');
    const [thumbnailFile_ar, setThumbnailFile_ar] = useState(null); // Store the file object
    const [appActive_ar, setAppActive_ar] = useState(0); // Default status to 0
    const [isLoading_ar, setIsLoading_ar] = useState(false);

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
    

    const navigate = useNavigate();
    const uploadRef = useRef();

    const planContent = useContext(PlanDataContext);

    useEffect(() => {
        if (planContent) {
            setName(planContent.name || '');
            // setTitle(planContent.title || '');
            setDescription(planContent.description|| '');
            setFee(planContent.setup_fees|| '');
            setLimitPlan(planContent.limet_store|| '');
            setAppActive(planContent.app|| '');

            if(planContent.monthly){
                setShowMonthlyPriceInput(true)
                setMonthlyPrice(planContent.monthly)
                setMonthlyDiscountPrice(planContent.discount_monthly)
            }
            if(planContent.quarterly){
                setShowQuarterlyPriceInput(true)
                setQuarterlyPrice(planContent.quarterly)
                setQuarterlyDiscountPrice(planContent.discount_quarterly)
            }
            if(planContent["semi_annual"]){
                setShowSemiAnnualPriceInput(true)
                setSemiAnnualPrice(planContent["semi_annual"])
                setSemiAnnualDiscountPrice(planContent.discount_semi_annual)
            }
            if(planContent.yearly){
                setShowYearlyPriceInput(true)
                setYearlyPrice(planContent.yearly)
                setYearlyDiscountPrice(planContent.discount_yearly)
            }

        }
    }, [planContent]);

    
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

    const handleSubmitEdit = async (planId,event) => {
        event.preventDefault();

    // Validation for English fields
    if (!title || !description || !fee || !monthlyPrice || !quarterlyPrice || !semiAnnualPrice || !yearlyPrice) {
        auth.toastError('All required fields must be filled out.');
        return;
    }

    // Validation for Arabic fields
    if (!title_ar || !description_ar || !fee_ar || !monthlyPrice_ar || !quarterlyPrice_ar || !semiAnnualPrice_ar || !yearlyPrice_ar) {
        auth.toastError('Please fill out all Arabic fields.');
        return;
    }

        setIsLoading(true);
        try {
      // Prepare translations data
      const translations = [
        { key: 'name', value: title_ar, locale: 'ar' },
        { key: 'plan_id', value: planId, locale: 'ar' },
        { key: 'description', value: description_ar, locale: 'ar' },
        { key: 'fee', value: fee_ar, locale: 'ar' },
        { key: 'limitPlan', value: limitPlan_ar, locale: 'ar' },
        { key: 'thumbnails', value: thumbnails_ar, locale: 'ar' },
        { key: 'app', value: appActive_ar, locale: 'ar' },
        { key: 'monthly', value: monthlyPrice_ar, locale: 'ar' },
        { key: 'quarterly', value: quarterlyPrice_ar, locale: 'ar' },
        { key: 'semi_annual', value: semiAnnualPrice_ar, locale: 'ar' },
        { key: 'yearly', value: yearlyPrice_ar, locale: 'ar' },
        { key: 'discount_monthly', value: monthlyDiscountPrice_ar, locale: 'ar' },
        { key: 'discount_quarterly', value: quarterlyDiscountPrice_ar, locale: 'ar' },
        { key: 'discount_semi_annual', value: semiAnnualDiscountPrice_ar, locale: 'ar' },
        { key: 'discount_yearly', value: yearlyDiscountPrice_ar, locale: 'ar' }
    ];

    const formData = new FormData();
    formData.append('plan_id', planId);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('setup_fees', fee);
    formData.append('limet_store', limitPlan);
    formData.append('image', thumbnailFile); // Append the file
    formData.append('app', appActive); // Append the file

    // Append selected prices if inputs are shown and filled
    if (showMonthlyPriceInput && monthlyPrice) {
        formData.append('monthly', monthlyPrice);
        formData.append('discount_monthly', monthlyDiscountPrice || 0);
    }
    if (showQuarterlyPriceInput && quarterlyPrice) {
        formData.append('quarterly', quarterlyPrice);
        formData.append('discount_quarterly', quarterlyDiscountPrice || 0);
    }
    if (showSemiAnnualPriceInput && semiAnnualPrice) {
        formData.append('semi_annual', semiAnnualPrice);
        formData.append('discount_semi_annual', semiAnnualDiscountPrice || 0);
    }
    if (showYearlyPriceInput && yearlyPrice) {
        formData.append('yearly', yearlyPrice);
        formData.append('discount_yearly', yearlyDiscountPrice || 0);
    }
      // Append translations array directly to FormData
      formData.append('translations', JSON.stringify(translations));
          // Debugging: log FormData entries
          let formDataEntries = [];
          for (let pair of formData.entries()) {
              formDataEntries.push(`${pair[0]}: ${pair[1]}`);
          }
  
          // Display the form data in a readable format (console log or alert)
          console.log("Form Data:");
          console.log(formDataEntries.join("\n"));


            const response = await axios.post(
                `https://login.wegostores.com/admin/v1/plan/update`,
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
                auth.toastSuccess('Plan Updated successfully!');
                handleGoBack();
            } else {
                auth.toastError('Failed to Updated Plan.');
            }
        } catch (error) {
            console.log(error)
            const errorMessage = error?.response?.data?.errors || 'Network error';
            auth.toastError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };
    const handleChangeLanguage = () => {
        const newLanguage = language === 'en' ? 'ar' : 'en'; // Fixed variable naming
        setLanguage(newLanguage); // Corrected variable usage
    };
    return(
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


        <form onSubmit={(event) => handleSubmitEdit(planContent.id, event)} className="w-full flex flex-col items-center justify-center gap-y-10 m-5">
            {/* data in english */}
            
            {language==='en'? <div className="w-full flex flex-wrap items-center justify-start gap-10">
                <div className="lg:w-[30%] sm:w-full">
                    <InputCustom
                        type="text"
                        borderColor="mainColor"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        width="w-full"
                    />
                </div>
                {/* <div className="lg:w-[30%] sm:w-full">
                    <InputCustom
                        type="text"
                        borderColor="mainColor"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
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
                            required={false}
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

                   
            </div>:<div className="w-full flex flex-wrap items-center justify-start gap-10">
                <div className="lg:w-[30%] sm:w-full">
                    <InputCustom
                        type="text"
                        borderColor="mainColor"
                        placeholder="الأسم"
                        value={name_ar}
                        onChange={(e) => setName_ar(e.target.value)}
                        width="w-full"
                    />
                </div>
                {/* <div className="lg:w-[30%] sm:w-full">
                    <InputCustom
                        type="text"
                        borderColor="mainColor"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
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
                    <InputCustom
                        type="number"
                        borderColor="mainColor"
                        placeholder="حد المتجر"
                        value={limitPlan_ar}
                        onChange={(e) => setLimitPlan_ar(e.target.value)}
                        width="w-full"
                    />
                </div>
                <div className="lg:w-[30%] sm:w-full">
                    <InputCustom
                            type="text"
                            borderColor="mainColor"
                            placeholder="الملف المصغر"
                            value={thumbnails}
                            readOnly={true} 
                            onClick={handleInputClick}
                            upload="true"
                            required={false}
                        />
                        <input
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                            ref={uploadRef}
                        />
                </div>

                <div className="flex items-center gap-x-4 w-full">
                        <span className="text-2xl text-mainColor font-medium">التطبيق:</span>
                         <div>
                             <CheckBox handleClick={handleClick} checked={appActive}/>
                         </div>
                </div>

                {/* Price Option Checkboxes */}
                {/* <div className="lg:w-[30%] sm:w-full flex flex-col gap-2"> */}
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
                            checked={showQuarterlyPriceInput_ar}
                            onChange={() => setShowQuarterlyPriceInput_ar(prev => !prev)}
                            className="h-5 w-5 rounded-full border-mainColor checked:w-8 checked:h-8  checked:bg-blue-500"
                        />
                        <label  className="text-2xl text-mainColor font-medium">ربع السعر</label>
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

                   
            </div>}
            {/* data in arabic */}
            
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
    </div>
    )
}

export default EditPlanPage;
