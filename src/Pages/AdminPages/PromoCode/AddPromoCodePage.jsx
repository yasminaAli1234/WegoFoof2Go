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

    const [valueMonthly,setValueMonthly]=useState('')
    const [valueQuarterly,setValueQuarterly]=useState('')
    const [valueSemiAnnual,setValueSemiAnnual]=useState('')
    const [valueYearly,setValueYearly]=useState('')

    const [valueType, setValueType] = useState([{ name: 'percentage' }, { name: 'value' }]);
    const [selectValueType, setSelectValueType] = useState('Select ValueType');
    const [selectValueTypeName, setSelectValueTypeName] = useState(null);
    const [openSelectValueType, setOpenSelectValueType] = useState(false);

    const [usageTypeData, setUsageTypeData] = useState([{ name: 'unlimited' }, { name: 'fixed' }]);
    const [selectUsageType, setSelectUsageType] = useState('Select UsageType');
    const [selectUsageTypeName, setSelectUsageTypeName] = useState(null);
    const [openSelectUsageType, setOpenSelectUsageType] = useState(false);

    const dropdownValueTypeRef = useRef();
    const dropdownUsageTypeRef = useRef();

    const handleOpenValueType = () => {
        setOpenSelectValueType(!openSelectValueType);
        setOpenSelectUsageType(false)
      };
    const handleOpenUsageType = () => {
        setOpenSelectValueType(false);
        setOpenSelectUsageType(!openSelectUsageType);
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

      useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);
    
      const handleClickOutside = (event) => {
        if (dropdownValueTypeRef.current && !dropdownValueTypeRef.current.contains(event.target) &&
            dropdownUsageTypeRef.current && !dropdownUsageTypeRef.current.contains(event.target)  
        ) {
            setOpenSelectValueType(false)
            setOpenSelectUsageType(false)
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
        
      
        const formData = new FormData();
        formData.append('code', code);
        formData.append('title', title);
        formData.append('start_date', startDate);
        formData.append('end_date', endDate);


        const calculationMethod = selectValueType === 'percentage' ? 'percentage' : 'amount';
        formData.append('calculation_method', calculationMethod);

        const userType = selectUsageType === 'fixed' ? 'first_usage' : 'renueve';
        formData.append('user_type', userType);

        formData.append('monthly',valueMonthly);
        formData.append('quarterly',valueQuarterly);
        formData.append('semi-annual', valueSemiAnnual);
        formData.append('yearly', valueYearly);


        for (let pair of formData.entries()) {
               console.log(pair[0] + ', ' + pair[1]);
        }        
 
        setIsLoading(true);
        try {
            const response = await axios.post('https://login.wegostores.com/admin/v1/promoCode/create',formData, {
                headers: {
                    Authorization: `Bearer ${auth.user.token}`,
                    'Content-Type': 'application/json', // Use JSON since we're sending a JSON object now
                },
            });
 
            if (response.status === 201) {
                auth.toastSuccess('PromoCode added successfully!');
                handleGoBack();
            } else {
                auth.toastError('Failed to add PromoCode.');
            }
        } catch (error) {    
            console.log(error)
            const errorMessages = error?.response?.data.errors;
            let errorMessageString = 'Error occurred';
            if (errorMessages) {
                errorMessageString = Object.values(errorMessages).flat().join(' ');
            }
            auth.toastError('Error', errorMessageString);
        } finally {
            setIsLoading(false);
        }
    };
 
       return (
        <>
         <form onSubmit={handleSubmitAdd} className="w-full flex flex-col items-center justify-center gap-y-10">
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

export default AddPromoCodePage
