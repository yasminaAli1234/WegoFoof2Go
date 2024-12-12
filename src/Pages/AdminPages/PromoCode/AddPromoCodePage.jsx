import React, { useEffect, useState ,useRef} from 'react';
import InputCustom from '../../../Components/InputCustom';
import { Button } from '../../../Components/Button';
import axios from 'axios';
import Loading from '../../../Components/Loading';
import { useAuth } from '../../../Context/Auth';
import { useNavigate } from 'react-router-dom';
import DropDownMenu from '../../../Components/DropDownMenu';

const AddPromoCodePage = () => {

    const auth = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [code , setCode]=useState('')
    const [title , setTitle]=useState('')
    const [startDate , setStartDate]=useState('')
    const [endDate,setEndDate]=useState('')
    const [limit,setLimit]=useState('')
    const translate= new FormData();
    const [language,setLanguage]= useState('en')

    const [valueMonthly,setValueMonthly]=useState('')
    const [valueQuarterly,setValueQuarterly]=useState('')
    const [valueSemiAnnual,setValueSemiAnnual]=useState('')
    const [valueYearly,setValueYearly]=useState('')

    const [valueType, setValueType] = useState([{ name: 'percentage' }, { name: 'value' }]);
    const [selectValueType, setSelectValueType] = useState('Select ValueType');
    const [selectValueTypeName, setSelectValueTypeName] = useState(null);
    const [openSelectValueType, setOpenSelectValueType] = useState(false);

    const [usageTypeData, setUsageTypeData] = useState([{ name: 'First Usage' }, { name: 'Renew' }]);
    const [selectUsageType, setSelectUsageType] = useState('Select UsageType');
    const [selectUsageTypeName, setSelectUsageTypeName] = useState(null);
    const [openSelectUsageType, setOpenSelectUsageType] = useState(false);

    const [statusData, setStatusData] = useState([{ name: 'UnLimited' }, { name: 'Fixed' }]);
    const [selectStatus, setSelectStatus] = useState('Select Status');
    const [selectStatusName, setSelectStatusName] = useState(null);
    const [openSelectStatus, setOpenSelectStatus] = useState(false);

    const [usageNumber,setUsageNumber]=useState('')

    const [typeData, setTypeData] = useState([{ name: 'Plan' }, { name: 'Extra Product' }, { name: 'Domain' }]);
    const [selectType, setSelectType] = useState('Select Type');
    const [selectTypeName, setSelectTypeName] = useState(null);
    const [openSelectType, setOpenSelectType] = useState(false);

    const [amount,setAmount]=useState('')

        // set arabic 
        const [code_ar , setCode_ar]=useState('')
        const [title_ar , setTitle_ar]=useState('')
        const [startDate_ar , setStartDate_ar]=useState('')
        const [endDate_ar,setEndDate_ar]=useState('')
        const [limit_ar,setLimit_ar]=useState('')

        const [valueMonthly_ar,setValueMonthly_ar]=useState('')
        const [valueQuarterly_ar,setValueQuarterly_ar]=useState('')
        const [valueSemiAnnual_ar,setValueSemiAnnual_ar]=useState('')
        const [valueYearly_ar,setValueYearly_ar]=useState('')
    
        const [valueType_ar, setValueType_ar] = useState([{ name: 'نسبة مئوية' }, { name: 'قيمة' }]);
        const [selectValueType_ar, setSelectValueType_ar] = useState('اختر نوع القيمة');
        const [selectValueTypeName_ar, setSelectValueTypeName_ar] = useState(null);
        const [openSelectValueType_ar, setOpenSelectValueType_ar] = useState(false);
    
        // const [usageTypeData_ar, setUsageTypeData_ar] = useState([{ name: 'استخدام أول' }, { name: 'تجديد' }]);
        const [selectUsageType_ar, setSelectUsageType_ar] = useState('اختيار نوع الاستخدام');
        const [selectUsageTypeName_ar, setSelectUsageTypeName_ar] = useState(null);
        const [openSelectUsageType_ar, setOpenSelectUsageType_ar] = useState(false);
    
        // const [statusData_ar, setStatusData_ar] = useState([{ name: 'غير محدود' }, { name: 'ثابت' }]);
        const [selectStatus_ar, setSelectStatus_ar] = useState('اختيار الحالة');
        const [selectStatusName_ar, setSelectStatusName_ar] = useState(null);
        const [openSelectStatus_ar, setOpenSelectStatus_ar] = useState(false);
    
        const [usageNumber_ar,setUsageNumber_ar]=useState('')
    
        // const [typeData_ar, setTypeData_ar] = useState([{ name: 'خطة' }, { name: 'منتج إضافي' }, { name: 'دومين' }]);
        const [selectType_ar, setSelectType_ar] = useState('اختيار النوع');
        const [selectTypeName_ar, setSelectTypeName_ar] = useState(null);
        const [openSelectType_ar, setOpenSelectType_ar] = useState(false);
    

    const dropdownValueTypeRef = useRef();
    const dropdownUsageTypeRef = useRef();
    const dropdownStatusRef = useRef();
    const dropdownTypeRef = useRef();

    const handleOpenValueType = () => {
        setOpenSelectValueType(!openSelectValueType);
        setOpenSelectUsageType(false)
        setOpenSelectStatus(false)
        setOpenSelectType(false)
        // --------------------
        setOpenSelectValueType_ar(!openSelectValueType_ar);
        setOpenSelectUsageType_ar(false)
        setOpenSelectStatus_ar(false)
        setOpenSelectType_ar(false)
      };
    const handleOpenUsageType = () => {
        setOpenSelectValueType(false);
        setOpenSelectUsageType(!openSelectUsageType);
        setOpenSelectStatus(false)
        setOpenSelectType(false)
        // -------------------------
        setOpenSelectValueType_ar(false);
        setOpenSelectUsageType_ar(!openSelectUsageType_ar);
        setOpenSelectStatus_ar(false)
        setOpenSelectType_ar(false)
    };
    const handleOpenStatus = () => {
        setOpenSelectValueType(false);
        setOpenSelectUsageType(false);
        setOpenSelectStatus(!openSelectStatus)
        setOpenSelectType(false)
        // --------------------
        setOpenSelectValueType_ar(false);
        setOpenSelectUsageType_ar(false);
        setOpenSelectStatus_ar(!openSelectStatus)
        setOpenSelectType_ar(false)
    };
    const handleOpenType = () => {
        setOpenSelectValueType(false);
        setOpenSelectUsageType(false);
        setOpenSelectStatus(false)
        setOpenSelectType(!openSelectType)
        // ---------------------
        setOpenSelectValueType_ar(false);
        setOpenSelectUsageType_ar(false);
        setOpenSelectStatus_ar(false)
        setOpenSelectType_ar(!openSelectType_ar)
    };

    const handleSelectValueType = (e) => {
        const inputElement = e.currentTarget.querySelector('.inputVal');
        const selectedOptionName = e.currentTarget.textContent.trim();
        const selectedOptionValue = inputElement ? inputElement.value : null;
        setSelectValueType(selectedOptionName);
        setSelectValueTypeName(selectedOptionValue)
        setOpenSelectValueType(false);

        // -----------------------

        setSelectValueType_ar(selectedOptionName);
        setSelectValueTypeName_ar(selectedOptionValue)
        setOpenSelectValueType_ar(false);
        console.log('Selected ValueType:', selectedOptionName);
      };
      const handleSelectUsageType = (e) => {
        const inputElement = e.currentTarget.querySelector('.inputVal');
        const selectedOptionName = e.currentTarget.textContent.trim();
        const selectedOptionValue = inputElement ? inputElement.value : null;
        setSelectUsageType(selectedOptionName);
        setSelectUsageTypeName(selectedOptionValue)
        setOpenSelectUsageType(false);
        // -------------------
        setSelectUsageType_ar(selectedOptionName);
        setSelectUsageTypeName_ar(selectedOptionValue)
        setOpenSelectUsageType_ar(false);
        console.log('Selected UsageType:', selectedOptionName);
      };
      const handleSelectStatus = (e) => {
        const inputElement = e.currentTarget.querySelector('.inputVal');
        const selectedOptionName = e.currentTarget.textContent.trim();
        const selectedOptionValue = inputElement ? inputElement.value : null;
        setSelectStatus(selectedOptionName);
        setSelectStatusName(selectedOptionValue)
        setOpenSelectStatus(false);
        // ---------------
        setSelectStatus_ar(selectedOptionName);
        setSelectStatusName_ar(selectedOptionValue)
        setOpenSelectStatus_ar(false);
        console.log('Selected Status:', selectedOptionName);
      };
      const handleSelectType = (e) => {
        const inputElement = e.currentTarget.querySelector('.inputVal');
        const selectedOptionName = e.currentTarget.textContent.trim();
        const selectedOptionValue = inputElement ? inputElement.value : null;

        if (selectedOptionValue=== ""){
            setSelectType(selectedOptionName);
            setSelectTypeName(selectedOptionValue)
            setOpenSelectType(false);

            setSelectType_ar(selectedOptionName);
            setSelectTypeName_ar(selectedOptionValue)
            setOpenSelectType_ar(false);
        }
        else{
            setSelectType(selectedOptionName);
            setSelectTypeName(selectedOptionValue)
            setOpenSelectType(false);

            setSelectType_ar(selectedOptionName);
            setSelectTypeName_ar(selectedOptionValue)
            setOpenSelectType_ar(false);
        }



        // setSelectType(selectedOptionName);
        // setSelectTypeName(selectedOptionValue)
        // setOpenSelectType(false);
        // // ---------------------
        // setSelectType_ar(selectedOptionName);
        // setSelectTypeName_ar(selectedOptionValue)
        // setOpenSelectType_ar(false);
        console.log('Selected Type:', selectedOptionName);
      };


      useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);
    
      const handleClickOutside = (event) => {
        if (dropdownValueTypeRef.current && !dropdownValueTypeRef.current.contains(event.target) &&
            dropdownUsageTypeRef.current && !dropdownUsageTypeRef.current.contains(event.target) &&
            dropdownStatusRef.current && !dropdownStatusRef.current.contains(event.target) && 
            dropdownTypeRef.current && !dropdownTypeRef.current.contains(event.target)
        ) {
            setOpenSelectValueType(false)
            setOpenSelectUsageType(false)
            setOpenSelectStatus(false)
            setOpenSelectType(false);
            // ----------------
            setOpenSelectValueType_ar(false)
            setOpenSelectUsageType_ar(false)
            setOpenSelectStatus_ar(false)
            setOpenSelectType_ar(false);
        }
      };
 
        const handleGoBack = () => {
               navigate(-1, { replace: true });
        };
 
        if (isLoading) {
               return (
                 <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
                   <Loading />
                 </div>
               );
           }    
 
    const handleSubmitAdd = async (event) => {
        event.preventDefault();

        if (!code) {
            auth.toastError('Please Enter Code.');
            return;
        } 
        if (!title) {
            auth.toastError('Please Enter Title.');
            return;
        } 
        if (!startDate) {
            auth.toastError('Please Enter Vaild From.');
            return;
        }
        if (!endDate) {
            auth.toastError('Please Enter Vaild To.');
            return;
        }
        if (!selectValueTypeName) {
            auth.toastError('Please Select Value Type.');
        }
        if (!selectUsageTypeName) {
            auth.toastError('Please Enter Usage Type.');
            return;
        }
        if (!selectStatusName) {
            auth.toastError('Please Select Status.');
            return;
        }
        if (!selectTypeName) {
            auth.toastError('Please Select Type.');
            return;
        }
        // -----------------------------


        if (!code_ar) {
            auth.toastError('الرجاء إدخال الكود.');
            return;
        } 
        if (!title_ar) {
            auth.toastError('الرجاء إدخال العنوان.');
            return;
        } 
        if (!startDate_ar) {
            auth.toastError('الرجاء إدخال تاريخ البداية الصحيح.');
            return;
        }
        if (!endDate_ar) {
            auth.toastError('الرجاء إدخال تاريخ النهاية الصحيح.');
            return;
        }
        if (!selectValueTypeName_ar) {
            auth.toastError('الرجاء اختيار نوع القيمة.');
        }
        if (!selectUsageTypeName_ar) {
            auth.toastError('الرجاء إدخال نوع الاستخدام.');
            return;
        }
        if (!selectStatusName_ar) {
            auth.toastError('الرجاء اختيار الحالة.');
            return;
        }
        if (!selectTypeName_ar) {
            auth.toastError('الرجاء اختيار النوع.');
            return;
        }

        const formData = new FormData();
        formData.append('code', code);
        formData.append('title', title);
        formData.append('start_date', startDate);
        formData.append('end_date', endDate);
        formData.append('user_usage', limit);

        const calculationMethod = selectValueType === 'percentage'  ? 'percentage' : 'amount';
        const calculationMethod_ar = selectValueType_ar === 'نسبة مئوية'  ? 'نسبة مئوية' :  'قيمة' ;
        formData.append('calculation_method', calculationMethod);
        translate['calculation_method']= calculationMethod_ar;
        const userType_ar = selectUsageType_ar === 'استخدام أول' ? 'استخدام أول' : 'تجديد';
        const userType = selectUsageType === 'First Usage' ? 'first_usage' : 'renueve';
        formData.append('user_type', userType);
        translate['user_type',userType_ar]
        
        formData.append('monthly',valueMonthly);
        formData.append('quarterly',valueQuarterly);
        formData.append('semi_annual', valueSemiAnnual);
        formData.append('yearly', valueYearly);

        if(selectStatus=== 'UnLimited'){
            formData.append('promo_status','unlimited');
        }
        else if (selectStatus=== 'Fixed'){
            formData.append('promo_status','fixed');
            formData.append('usage', usageNumber);
        }

        if(selectType === 'Plan'){
            formData.append('promo_type','plan');
        }
        else if (selectType=== 'Extra Product'){
            formData.append('promo_type','extra');
        }
        else if (selectType=== 'Domain'){
            formData.append('promo_type','domain');
            formData.append('amount', amount);
        }
        


        for (let pair of formData.entries()) {
               console.log(pair[0] + ', ' + pair[1]);
        }  
        // ----------------------------------------------
        translate['code'] = code_ar
        translate['title']= title_ar;
        translate['start_date'] = startDate_ar;
        translate['end_date'] = endDate_ar
        translate['user_usage']= limit_ar;
        

        // const calculationMethod = selectValueType === 'percentage' ? 'percentage' : 'amount';
        // formData.append('calculation_method', calculationMethod);

        // const userType = selectUsageType === 'First Usage' ? 'first_usage' : 'renueve';
        // formData.append('user_type', userType);

        translate.append('monthly',valueMonthly_ar);
        translate.append('quarterly',valueQuarterly_ar);
        translate.append('semi_annual', valueSemiAnnual_ar);
        translate.append('yearly', valueYearly_ar);

        if(selectStatus_ar=== 'UnLimited'){
            translate.append('promo_status','unlimited');
        }
        else if (selectStatus_ar=== 'Fixed'){
            translate.append('promo_status','fixed');
            translate.append('usage', usageNumber_ar);
        }

        if(selectType_ar === 'Plan'){
            translate.append('promo_type','plan');
        }
        else if (selectType_ar=== 'Extra Product'){
            translate.append('promo_type','extra');
        }
        else if (selectType_ar=== 'Domain'){
            translate.append('promo_type','domain');
            translate.append('amount', amount);
        }

        formData.append('translation', translate)
                
        setIsLoading(true);
        try {
            const response = await axios.post('https://login.wegostores.com/admin/v1/promoCode/create',formData, {
                headers: {
                    Authorization: `Bearer ${auth.user.token}`,
                    'Content-Type': 'application/json', // Use JSON since we're sending a JSON object now
                },
            });
 
            if (response.status === 200) {
                auth.toastSuccess(language === 'ar' ? 'تم إضافة الكود الترويجي بنجاح!' : 'PromoCode added successfully!');
                handleGoBack();
            } else {
                auth.toastError(language === 'ar' ? 'فشل في إضافة الكود الترويجي.' : 'Failed to add PromoCode.');
            } 
        }catch (error) {    
                console.log(error);
                if (error.response?.data?.faild === 'You have exceeded the maximum use promo code') {
                    auth.toastError(language === 'ar' ? 'لقد تجاوزت الحد الأقصى لاستخدام الكود الترويجي' : 'You have exceeded the maximum use promo code');
                } else {
                    const errorMessages = error?.response?.data?.errors;
                    let errorMessageString = language === 'ar' ? 'حدث خطأ' : 'Error occurred';
                    if (errorMessages) {
                        errorMessageString = Object.values(errorMessages).flat().join(' ');
                    }
                    auth.toastError(language === 'ar' ? 'خطأ' : 'Error', errorMessageString);
                }
            } finally {
                setIsLoading(false);
            }
    };
    const handleChangeLanguage = () => {
        const newLanguage = language === 'en' ? 'ar' : 'en'; 
        setLanguage(newLanguage); 
    };
    
 
       return (
        <>
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
                {language==='en' ?   <div className="w-full flex flex-wrap items-center justify-start gap-10">
                      <div className="lg:w-[30%] sm:w-full">
                          <InputCustom
                              type="text"
                              placeholder="Code"
                              borderColor="mainColor"
                              value={code}
                              onChange={(e) => setCode(e.target.value)}
                          />
                      </div>
                      <div className="lg:w-[30%] sm:w-full">
                          <InputCustom
                              type="text"
                              placeholder="Title"
                              borderColor="mainColor"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                          />
                      </div>
                      <div className="lg:w-[30%] sm:w-full">
                          <InputCustom
                              type="Date"
                              placeholder="Vaild From"
                              borderColor="mainColor"
                              value={startDate}
                              onChange={(e) => setStartDate(e.target.value)}
                          />
                      </div>
                      <div className="lg:w-[30%] sm:w-full">
                          <InputCustom
                              type="Date"
                              placeholder="Vaild To"
                              borderColor="mainColor"
                              value={endDate}
                              onChange={(e) => setEndDate(e.target.value)}
                          />
                      </div>
                      <div className="lg:w-[30%] sm:w-full">
                          <InputCustom
                              type="number"
                              placeholder="User Usage"
                              borderColor="mainColor"
                              value={limit}
                              onChange={(e) => setLimit(e.target.value)}
                          />
                      </div>
                      <div className="lg:w-[30%] sm:w-full">
                        <DropDownMenu
                        ref={dropdownUsageTypeRef}
                        handleOpen={handleOpenUsageType}
                        handleOpenOption={handleSelectUsageType}
                        stateoption={selectUsageType}
                        openMenu={openSelectUsageType}
                        options={usageTypeData}
                        />
                    </div> 
                      <div className="lg:w-[30%] sm:w-full">
                            <DropDownMenu
                            ref={dropdownValueTypeRef}
                            handleOpen={handleOpenValueType}
                            handleOpenOption={handleSelectValueType}
                            stateoption={selectValueType}
                            openMenu={openSelectValueType}
                            options={valueType}
                            />
                        </div> 
                        {selectValueType === 'value' && (
                            <>
                            <div className="lg:w-[30%] sm:w-full">
                            <InputCustom
                                placeholder="Value Monthly"
                                borderColor="mainColor"
                                value={valueMonthly}
                                onChange={(e) => setValueMonthly(e.target.value)}
                            />
                            </div>
                            <div className="lg:w-[30%] sm:w-full">
                            <InputCustom
                                placeholder="Value Quarterly"
                                borderColor="mainColor"
                                value={valueQuarterly}
                                onChange={(e) => setValueQuarterly(e.target.value)}
                            />
                            </div>
                            <div className="lg:w-[30%] sm:w-full">
                            <InputCustom
                                placeholder="Value Semi-annual"
                                borderColor="mainColor"
                                value={valueSemiAnnual}
                                onChange={(e) => setValueSemiAnnual(e.target.value)}
                            />
                            </div>
                            <div className="lg:w-[30%] sm:w-full">
                            <InputCustom
                                placeholder="Value Yearly"
                                borderColor="mainColor"
                                value={valueYearly}
                                onChange={(e) => setValueYearly(e.target.value)}
                            />
                            </div>
                            </>
                        )}
                        {selectValueType === 'percentage' && (
                           <>
                           <div className="lg:w-[30%] sm:w-full">
                           <InputCustom
                               placeholder="Percentage Monthly"
                               borderColor="mainColor"
                               value={valueMonthly}
                               onChange={(e) => setValueMonthly(e.target.value)}
                           />
                           </div>
                           <div className="lg:w-[30%] sm:w-full">
                           <InputCustom
                               placeholder="Percentage Quarterly"
                               borderColor="mainColor"
                               value={valueQuarterly}
                               onChange={(e) => setValueQuarterly(e.target.value)}
                           />
                           </div>
                           <div className="lg:w-[30%] sm:w-full">
                           <InputCustom
                               placeholder="Percentage Semi-annual"
                               borderColor="mainColor"
                               value={valueSemiAnnual}
                               onChange={(e) => setValueSemiAnnual(e.target.value)}
                           />
                           </div>
                           <div className="lg:w-[30%] sm:w-full">
                           <InputCustom
                               placeholder="Percentage Yearly"
                               borderColor="mainColor"
                               value={valueYearly}
                               onChange={(e) => setValueYearly(e.target.value)}
                           />
                           </div>
                           </>
                        )}

                        <div className="lg:w-[30%] sm:w-full">
                            <DropDownMenu
                            ref={dropdownStatusRef}
                            handleOpen={handleOpenStatus}
                            handleOpenOption={handleSelectStatus}
                            stateoption={selectStatus}
                            openMenu={openSelectStatus}
                            options={statusData}
                            />
                        </div> 
                        {selectStatus === 'Fixed' && (
                            <div className="lg:w-[30%] sm:w-full">
                            <InputCustom
                                placeholder="Value"
                                borderColor="mainColor"
                                value={usageNumber}
                                onChange={(e) => setUsageNumber(e.target.value)}
                            />
                            </div>
                        )}

                        <div className="lg:w-[30%] sm:w-full">
                            <DropDownMenu
                            ref={dropdownTypeRef}
                            handleOpen={handleOpenType}
                            handleOpenOption={handleSelectType}
                            stateoption={selectType}
                            openMenu={openSelectType}
                            options={typeData}
                            />
                        </div> 
                        {selectType === 'Domain' && (
                            <div className="lg:w-[30%] sm:w-full">
                            <InputCustom
                                placeholder="Amount"
                                borderColor="mainColor"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                            </div>
                        )}
                  </div>:
                   <div className="w-full flex flex-wrap items-center justify-start gap-10">
                   <div className="lg:w-[30%] sm:w-full">
                       <InputCustom
                           type="text"
                           placeholder="الكود"
                           borderColor="mainColor"
                           value={code_ar}
                           onChange={(e) => setCode_ar(e.target.value)}
                       />
                   </div>
                   <div className="lg:w-[30%] sm:w-full">
                       <InputCustom
                           type="text"
                           placeholder="العنوان"
                           borderColor="mainColor"
                           value={title_ar}
                           onChange={(e) => setTitle_ar(e.target.value)}
                       />
                   </div>
                   <div className="lg:w-[30%] sm:w-full">
                       <InputCustom
                           type="Date"
                           placeholder="صالح من"
                           borderColor="mainColor"
                           value={startDate_ar}
                           onChange={(e) => setStartDate_ar(e.target.value)}
                       />
                   </div>
                   <div className="lg:w-[30%] sm:w-full">
                       <InputCustom
                           type="Date"
                           placeholder="صالح إلى"
                           borderColor="mainColor"
                           value={endDate_ar}
                           onChange={(e) => setEndDate_ar(e.target.value)}
                       />
                   </div>
                   <div className="lg:w-[30%] sm:w-full">
                       <InputCustom
                           type="number"
                           placeholder="استخدام المستخدم"
                           borderColor="mainColor"
                           value={limit_ar}
                           onChange={(e) => setLimit_ar(e.target.value)}
                       />
                   </div>
                   <div className="lg:w-[30%] sm:w-full">
                     <DropDownMenu
                     ref={dropdownUsageTypeRef}
                     handleOpen={handleOpenUsageType}
                     handleOpenOption={handleSelectUsageType}
                     stateoption={selectUsageType_ar}
                     openMenu={openSelectUsageType_ar}
                     options={usageTypeData}
                     />
                 </div> 
                   <div className="lg:w-[30%] sm:w-full">
                         <DropDownMenu
                         ref={dropdownValueTypeRef}
                         handleOpen={handleOpenValueType}
                         handleOpenOption={handleSelectValueType}
                         stateoption={selectValueType_ar}
                         openMenu={openSelectValueType_ar}
                         options={valueType}
                         />
                     </div> 
                     {selectValueType_ar ===  'value'  && (
                         <>
                         <div className="lg:w-[30%] sm:w-full">
                         <InputCustom
                             placeholder='القيمة الشهرية'
                             borderColor="mainColor"
                             value={valueMonthly_ar}
                             onChange={(e) => setValueMonthly_ar(e.target.value)}
                         />
                         </div>
                         <div className="lg:w-[30%] sm:w-full">
                         <InputCustom
                             placeholder='القيمة ربع السنوية'
                             borderColor="mainColor"
                             value={valueQuarterly_ar}
                             onChange={(e) => setValueQuarterly_ar(e.target.value)}
                         />
                         </div>
                         <div className="lg:w-[30%] sm:w-full">
                         <InputCustom
                             placeholder='القيمة نصف السنوية'
                             borderColor="mainColor"
                             value={valueSemiAnnual_ar}
                             onChange={(e) => setValueSemiAnnual_ar(e.target.value)}
                         />
                         </div>
                         <div className="lg:w-[30%] sm:w-full">
                         <InputCustom
                             placeholder='القيمة السنوية'
                             borderColor="mainColor"
                             value={valueYearly_ar}
                             onChange={(e) => setValueYearly_ar(e.target.value)}
                         />
                         </div>
                         </>
                     )}
                     {selectValueType === 'percentage' && (
                        <>
                        <div className="lg:w-[30%] sm:w-full">
                        <InputCustom
                            placeholder='النسبة الشهرية'
                            borderColor="mainColor"
                            value={valueMonthly_ar}
                            onChange={(e) => setValueMonthly_ar(e.target.value)}
                        />
                        </div>
                        <div className="lg:w-[30%] sm:w-full">
                        <InputCustom
                            placeholder='النسبة ربع السنوية'
                            borderColor="mainColor"
                            value={valueQuarterly_ar}
                            onChange={(e) => setValueQuarterly_ar(e.target.value)}
                        />
                        </div>
                        <div className="lg:w-[30%] sm:w-full">
                        <InputCustom
                            placeholder='النسبة نصف السنوية'
                            borderColor="mainColor"
                            value={valueSemiAnnual_ar}
                            onChange={(e) => setValueSemiAnnual_ar(e.target.value)}
                        />
                        </div>
                        <div className="lg:w-[30%] sm:w-full">
                        <InputCustom
                            placeholder='النسبة السنوية'
                            borderColor="mainColor"
                            value={valueYearly_ar}
                            onChange={(e) => setValueYearly_ar(e.target.value)}
                        />
                        </div>
                        </>
                     )}

                     <div className="lg:w-[30%] sm:w-full">
                         <DropDownMenu
                         ref={dropdownStatusRef}
                         handleOpen={handleOpenStatus}
                         handleOpenOption={handleSelectStatus}
                         stateoption={selectStatus_ar}
                         openMenu={openSelectStatus_ar}
                         options={statusData}
                         />
                     </div> 
                     {selectStatus_ar === 'Fixed' && (
                         <div className="lg:w-[30%] sm:w-full">
                         <InputCustom
                             placeholder="القيمة"
                             borderColor="mainColor"
                             value={usageNumber_ar}
                             onChange={(e) => setUsageNumber_ar(e.target.value)}
                         />
                         </div>
                     )}

                     <div className="lg:w-[30%] sm:w-full">
                         <DropDownMenu
                         ref={dropdownTypeRef}
                         handleOpen={handleOpenType}
                         handleOpenOption={handleSelectType}
                         stateoption={selectType_ar}
                         openMenu={openSelectType_ar}
                         options={typeData}
                         />
                     </div> 
                     {selectType ==='Domain' && (
                         <div className="lg:w-[30%] sm:w-full">
                         <InputCustom
                             placeholder="الكمية"
                             borderColor="mainColor"
                             value={amount}
                             onChange={(e) => setAmount(e.target.value)}
                         />
                         </div>
                     )}
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
                              stateLoding={isLoading}
                          />
                      </div>
                      <button onClick={handleGoBack} className="text-2xl text-mainColor">Cancel</button>
                  </div>
         </form>
        </>
       )
}

export default AddPromoCodePage
