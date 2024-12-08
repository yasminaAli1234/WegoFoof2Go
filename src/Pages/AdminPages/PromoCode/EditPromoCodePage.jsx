import React, { useEffect, useState ,useRef,useContext} from 'react';
import InputCustom from '../../../Components/InputCustom';
import { Button } from '../../../Components/Button';
import axios from 'axios';
import Loading from '../../../Components/Loading';
import { useAuth } from '../../../Context/Auth';
import { useNavigate } from 'react-router-dom';
import DropDownMenu from '../../../Components/DropDownMenu';
import {PromoCodeDataLayout} from '../../../Layouts/AdminLayouts/EditPromoCodeLayout'
const EditPromoCodePage =()=>{
 
    const promoCodeContent=useContext(PromoCodeDataLayout)
    
    const auth = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [code , setCode]=useState('')
    const [title , setTitle]=useState('')
    const [startDate , setStartDate]=useState('')
    const [endDate,setEndDate]=useState('')
    const [limit,setLimit]=useState('')

    const [valueMonthly,setValueMonthly]=useState('')
    const [valueQuarterly,setValueQuarterly]=useState('')
    const [valueSemiAnnual,setValueSemiAnnual]=useState('')
    const [valueYearly,setValueYearly]=useState('')

    const [valueType, setValueType] = useState([{ name: 'Percentage' }, { name: 'Value' }]);
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

    const dropdownValueTypeRef = useRef();
    const dropdownUsageTypeRef = useRef();
    const dropdownStatusRef = useRef();
    const dropdownTypeRef = useRef();

    useEffect(()=>{
        if (promoCodeContent) {

            setCode(promoCodeContent.code)
            setTitle(promoCodeContent.title)
            setStartDate(promoCodeContent.start_date)
            setEndDate(promoCodeContent.end_date)
            setLimit(promoCodeContent.user_usage)

            if (promoCodeContent.user_type === 'renueve') {
                    setSelectUsageType("Renew");
                    setSelectUsageTypeName("Renew");

            } else if (promoCodeContent.user_type === 'first_usage') {
                setSelectUsageType("First Usage");
                setSelectUsageTypeName("First Usage");
            } 
             else {
                    setSelectUsageType('Select UsageType');
                    setSelectUsageTypeName(null);
            }

        if (promoCodeContent.calculation_method === "percentage") {
            setSelectValueType("Percentage");
            setSelectValueTypeName("Percentage");

        } else if (promoCodeContent.calculation_method === 'amount') {
            setSelectValueType("Value");
            setSelectValueTypeName("Value");
        } 
         else {
            setSelectValueType('Select ValueType');
            setSelectValueTypeName(null);
        }

        setValueMonthly(promoCodeContent.monthly)
        setValueQuarterly(promoCodeContent.quarterly)
        setValueSemiAnnual(promoCodeContent["semi_annual"])
        setValueYearly(promoCodeContent.yearly)

        if (promoCodeContent.promo_status === "fixed") {
            setSelectStatus("Fixed");
            setSelectStatusName("Fixed");
            setUsageNumber(promoCodeContent.usage)

        } else if (promoCodeContent.promo_status === 'unlimited') {
            setSelectStatus("UnLimited");
            setSelectStatusName("UnLimited");
        } 
         else {
            setSelectStatus('Select Status');
            setSelectStatusName(null);
        }

        if (promoCodeContent.promo_type === "plan") {
            setSelectType("Plan");
            setSelectTypeName("Plan");

        } else if (promoCodeContent.promo_type === 'extra') {
            setSelectType("Extra Product");
            setSelectTypeName("Extra Product");
        } 
        else if (promoCodeContent.promo_type === 'domain') {
            setSelectType("Domain");
            setSelectTypeName("Domain");
            setAmount(promoCodeContent.amount)
        } 
         else {
            setSelectType('Select Type');
            setSelectTypeName(null);
        }
        }
    },[promoCodeContent])

    const handleOpenValueType = () => {
        setOpenSelectValueType(!openSelectValueType);
        setOpenSelectUsageType(false)
        setOpenSelectStatus(false)
        setOpenSelectType(false)
      };
    const handleOpenUsageType = () => {
        setOpenSelectValueType(false);
        setOpenSelectUsageType(!openSelectUsageType);
        setOpenSelectStatus(false)
        setOpenSelectType(false)
    };
    const handleOpenStatus = () => {
        setOpenSelectValueType(false);
        setOpenSelectUsageType(false);
        setOpenSelectStatus(!openSelectStatus)
        setOpenSelectType(false)
    };
    const handleOpenType = () => {
        setOpenSelectValueType(false);
        setOpenSelectUsageType(false);
        setOpenSelectStatus(false)
        setOpenSelectType(!openSelectType)
    };

    const handleSelectValueType = (e) => {
        const inputElement = e.currentTarget.querySelector('.inputVal');
        const selectedOptionName = e.currentTarget.textContent.trim();
        const selectedOptionValue = inputElement ? inputElement.value : null;
        setSelectValueType(selectedOptionName);
        setSelectValueTypeName(selectedOptionValue)
        setOpenSelectValueType(false);
        console.log('Selected ValueType:', selectedOptionName);
      };
      const handleSelectUsageType = (e) => {
        const inputElement = e.currentTarget.querySelector('.inputVal');
        const selectedOptionName = e.currentTarget.textContent.trim();
        const selectedOptionValue = inputElement ? inputElement.value : null;
        setSelectUsageType(selectedOptionName);
        setSelectUsageTypeName(selectedOptionValue)
        setOpenSelectUsageType(false);
        console.log('Selected UsageType:', selectedOptionName);
      };
      const handleSelectStatus = (e) => {
        const inputElement = e.currentTarget.querySelector('.inputVal');
        const selectedOptionName = e.currentTarget.textContent.trim();
        const selectedOptionValue = inputElement ? inputElement.value : null;
        setSelectStatus(selectedOptionName);
        setSelectStatusName(selectedOptionValue)
        setOpenSelectStatus(false);
        console.log('Selected Status:', selectedOptionName);
      };
      const handleSelectType = (e) => {
        const inputElement = e.currentTarget.querySelector('.inputVal');
        const selectedOptionName = e.currentTarget.textContent.trim();
        const selectedOptionValue = inputElement ? inputElement.value : null;
        setSelectType(selectedOptionName);
        setSelectTypeName(selectedOptionValue)
        setOpenSelectType(false);
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
 
    const handleSubmitEdit = async (codeId, event) => {
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
        
      
        const formData = new FormData();
        formData.append('code', code);
        formData.append('title', title);
        formData.append('start_date', startDate);
        formData.append('end_date', endDate);
        formData.append('user_usage', limit);

        const calculationMethod = selectValueType === 'Percentage' ? 'percentage' : 'amount';
        formData.append('calculation_method', calculationMethod);

        const userType = selectUsageType === 'First Usage' ? 'first_usage' : 'renueve';
        formData.append('user_type', userType);

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
 
        setIsLoading(true);
        try {
            const response = await axios.post(`https://login.wegostores.com/admin/v1/promoCode/update/${codeId}`,formData, {
                headers: {
                    Authorization: `Bearer ${auth.user.token}`,
                    'Content-Type': 'application/json', // Use JSON since we're sending a JSON object now
                },
            });
 
            if (response.status === 200) {
                auth.toastSuccess('PromoCode Updated successfully!');
                // handleGoBack();
            } else {
                auth.toastError('Failed to Update PromoCode.');
            }
        } catch (error) {    
            console.log(error)
            if (error.response.data.faild === 'You have exceeded the maximum use promo code'){
                auth.toastError('You have exceeded the maximum use promo code');
            }else{
                const errorMessages = error?.response?.data.errors;
                let errorMessageString = 'Error occurred';
                if (errorMessages) {
                    errorMessageString = Object.values(errorMessages).flat().join(' ');
                }
                auth.toastError('Error', errorMessageString);
            }
    
        } finally {
            setIsLoading(false);
        }
    };
 
    return(
        <>
        <form onSubmit={(event) => handleSubmitEdit(promoCodeContent.id, event)} className="w-full flex flex-col items-center justify-center gap-y-10">
                 <div className="w-full flex flex-wrap items-center justify-start gap-10">
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
                       {selectValueType === 'Value' && (
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
                       {selectValueType === 'Percentage' && (
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
                             stateLoding={isLoading}
                         />
                     </div>
                     <button onClick={handleGoBack} className="text-2xl text-mainColor">Cancel</button>
                 </div>
        </form>
       </>
    )
}

export default EditPromoCodePage;