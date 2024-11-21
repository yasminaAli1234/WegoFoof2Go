import React, { useState, useRef,useEffect ,useContext} from 'react';
import axios from 'axios';
import InputCustom from '../../../Components/InputCustom';
import { Button } from '../../../Components/Button';
import { useAuth } from '../../../Context/Auth';
import { useNavigate } from 'react-router-dom'
import Loading from '../../../Components/Loading';
import CheckBox from '../../../Components/CheckBox';
import DropDownMenu from '../../../Components/DropDownMenu';
import { SubscriperLayout } from '../../../Layouts/AdminLayouts/EditSubscriptionLayout';

const EditSubscriptionPage =()=>{
    const subscriperContent = useContext(SubscriperLayout);

    const auth = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const [userData, setrUserData] = useState([]);
    const [planData, setPlanData] = useState([]);
    const [packageData, setPackageData] = useState([{ name: 'Monthly' }, { name: '3 Months' },{ name: '6 Months' },{ name: 'Yearly' }]);

    const [selectUser, setSelectUser] = useState('Select User');
    const [selectUserId, setSelectUserId] = useState([]);
    const [openSelectUser, setOpenSelectUser] = useState(false);

    const [selectPlan, setSelectPlan] = useState('Select Plan');
    const [selectPlanId, setSelectPlanId] = useState([]);
    const [openSelectPlan, setOpenSelectPlan] = useState(false);

    const [selectPackage, setSelectPackage] = useState('Select Plan Package');
    const [selectPackageName, setSelectPackageName] = useState(null);
    const [openSelectPackage, setOpenSelectPackage] = useState(false);

    const dropdownUserRef = useRef();
    const dropdownPlanRef = useRef();
    const dropdownPackageRef = useRef();

    useEffect(() => {
        if (subscriperContent) {
            if (subscriperContent.id) {
                    setSelectUser(subscriperContent.name);
                    setSelectUserId(subscriperContent.id);
            } else {
                    setSelectUser('Select User');
                    setSelectUserId(null);
            }

            if (subscriperContent.plan_id) {
                setSelectPlan(subscriperContent.plan?.name);
                setSelectPlanId(subscriperContent.plan?.id);
            } else {
                setSelectPlan('Select Plan');
                setSelectPlanId(null);
            }

            if (subscriperContent.package) {
                console.log(`Package value: ${subscriperContent.package}`); // Add this log
                if (subscriperContent.package === '1') {
                    setSelectPackage('Monthly')
                    setSelectPackageName('Monthly');
                } else if (subscriperContent.package === '3') {
                    setSelectPackage('3 Months')
                    setSelectPackageName('3 Months');
                } else if (subscriperContent.package === '6') {
                    setSelectPackage('6 Month')
                    setSelectPackageName('6 Months');
                } else if (subscriperContent.package === 'yearly') {
                    setSelectPackage('Yearly')
                    setSelectPackageName('Yearly');
                } else {
                    setSelectPackage('Select Plan Package');
                    setSelectPackageName(null);
                }
            }

        }
    }, [subscriperContent]);

    const fetchUserData = async () => {
        setIsLoading(true);
        try {
               const response = await axios.get('https://login.wegostores.com/admin/v1/users/view', {
                      headers: {
                             Authorization: `Bearer ${auth.user.token}`,
                      },
               });
               if (response.status === 200) {
                      console.log(response.data)
                      setrUserData(response.data.user)
               }
        } catch (error) {
               console.error('Error fetching data:', error);
        } finally {
               setIsLoading(false);
        }
    };
    const fetchPlanData = async () => {
        setIsLoading(true);
        try {
               const response = await axios.get('https://login.wegostores.com/admin/v1/plan/show', {
                      headers: {
                             Authorization: `Bearer ${auth.user.token}`,
                      },
               });
               if (response.status === 200) {
                      console.log(response.data)
                      setPlanData(response.data.plan)
               }
        } catch (error) {
               console.error('Error fetching data:', error);
        } finally {
               setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData(); 
        fetchPlanData();
    }, []);

    
    const handleOpenSelectPlan = () => {
        setOpenSelectUser(false);
        setOpenSelectPlan(!openSelectPlan)
    };
    const handleOpenSelectUser = () => {
        setOpenSelectUser(!openSelectUser);
        setOpenSelectPlan(false)
    };
    const handleOpenSelectPackage = () => {
        setOpenSelectPackage(!openSelectPackage);
        setOpenSelectPlan(false)
        setOpenSelectUser(false);
      };
 
    const handleSelectPlan = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? inputElement.value : null;
    setSelectPlan(selectedOptionName);
    setSelectPlanId(parseInt(selectedOptionValue));
    setOpenSelectPlan(false);
    console.log('Selected Plan:', selectedOptionName);
    console.log('Plan ID:', selectedOptionValue);
    };
    const handleSelectUser = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? inputElement.value : null;
    setSelectUser(selectedOptionName);
    setSelectUserId(parseInt(selectedOptionValue));
    setOpenSelectUser(false);
    console.log('Selected User:', selectedOptionName);
    console.log('User ID:', selectedOptionValue);
    };
    const handleSelectPackage = (e) => {
        const inputElement = e.currentTarget.querySelector('.inputVal');
        const selectedOptionName = e.currentTarget.textContent.trim();
        const selectedOptionValue = inputElement ? inputElement.value : null;
        setSelectPackage(selectedOptionName);
        setSelectPackageName(selectedOptionValue);
        setOpenSelectPackage(false);
        console.log('Selected Package:', selectedOptionName);
        console.log('Package Name:', selectedOptionValue);
    };
 
      useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);
    
      const handleClickOutside = (event) => {
        if (dropdownPlanRef.current && !dropdownPlanRef.current.contains(event.target) &&
            dropdownUserRef.current && !dropdownUserRef.current.contains(event.target)&&
            dropdownPackageRef.current && !dropdownPackageRef.current.contains(event.target)
        )
         {
           setOpenSelectPlan(false);   
           setOpenSelectUser(false);   
        }
      };
 
    const handleGoBack = () => {
        navigate(-1, { replace: true });
    };

    const handleSubmitEdit = async (userId ,event) => {
        event.preventDefault();

        if (!selectPlanId) {
            auth.toastError('Please Select Plan.');
            return;
        }
        if (!selectUserId) {
            auth.toastError('Please Select User.');
            return;
        }
        if (!selectPackageName) {
            auth.toastError('Please Select Plan Package.');
            return;
        }

        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('plan_id', selectPlanId);
            formData.append('user_id', selectUserId);

            if (selectPackageName === 'Monthly') {
                formData.append('package', "1"); 
            } else if (selectPackageName === '3 Months') {
                formData.append('package', "3"); 
            } else if (selectPackageName === '6 Months') {
                formData.append('package', "6"); 
            } else if (selectPackageName === 'Yearly') {
                formData.append('package', "yearly"); 
            }

            for (let pair of formData.entries()) {
                console.log(pair[0] + ', ' + pair[1]);
            } 

            const response = await axios.post(
                `https://login.wegostores.com/admin/v1/subscripe/update/${userId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${auth.user.token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.status === 200) {
                auth.toastSuccess('Subscriper updated successfully!');
                handleGoBack();
            } else {
                console.error('Failed to update Subscriper:', response.status, response.statusText);
                auth.toastError('Failed to update Subscriper.');
            }
        }  catch (error) {
            const errors = error.response?.data?.error;
            console.log('Error details:', errors);
        } finally {
            setIsLoading(false);
        }
    };

    
    if (isLoading) {
        return (
          <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
            <Loading />
          </div>
        );
    }    

    return(
        <form onSubmit={(event) => handleSubmitEdit(subscriperContent.id, event)} className="w-full flex flex-col items-center justify-center gap-y-10">
        <div className="w-full flex flex-wrap items-center justify-start gap-10">
        <div className="lg:w-[30%] sm:w-full">
                  <DropDownMenu
                  ref={dropdownUserRef}
                  handleOpen={handleOpenSelectUser}
                  handleOpenOption={handleSelectUser}
                  stateoption={selectUser}
                  openMenu={openSelectUser}
                  options={userData}
                  />
           </div>
           <div className="lg:w-[30%] sm:w-full">
                  <DropDownMenu
                  ref={dropdownPlanRef}
                  handleOpen={handleOpenSelectPlan}
                  handleOpenOption={handleSelectPlan}
                  stateoption={selectPlan}
                  openMenu={openSelectPlan}
                  options={planData}
                  />
           </div>
           <div className="lg:w-[30%] sm:w-full">
                  <DropDownMenu
                  ref={dropdownPackageRef}
                  handleOpen={handleOpenSelectPackage}
                  handleOpenOption={handleSelectPackage}
                  stateoption={selectPackage}
                  openMenu={openSelectPackage}
                  options={packageData}
                  />
           </div>
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
    )
}

export default EditSubscriptionPage;