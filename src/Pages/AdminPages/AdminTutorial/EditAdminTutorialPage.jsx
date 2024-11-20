import React, { useState, useRef,useEffect,useContext } from 'react';
import axios from 'axios';
import InputCustom from '../../../Components/InputCustom';
import { Button } from '../../../Components/Button';
import { useAuth } from '../../../Context/Auth';
import { useNavigate } from 'react-router-dom'
import Loading from '../../../Components/Loading';
import { TutorialGroupLayout } from '../../../Layouts/AdminLayouts/EditAdminTutorialLayout';

const EditAdminTutorialPage =()=>{

    const tutorialGroupContent = useContext(TutorialGroupLayout);
    const auth = useAuth();
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1, { replace: true });
    };

    useEffect(() => {
        if (tutorialGroupContent) {
            setName(tutorialGroupContent.name|| '')
        }
    }, [tutorialGroupContent]);

    const handleSubmitEdit = async (groupId ,event) => {
        event.preventDefault();

        if (!name) {
            auth.toastError('Please Enter the Group Name.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);

        setIsLoading(true);
        try {

         const response = await axios.post(
                `https://login.wegostores.com/admin/v1/tutorial_group/update/${groupId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${auth.user.token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.status === 200) {
                auth.toastSuccess('Tutorial Group updated successfully!');
                handleGoBack();
            } else {
                console.error('Failed to updated Tutorial Group:', response.status, response.statusText);
                auth.toastError('Failed to updated Tutorial Group.');
            }
        } catch (error) {
            console.error('Error updateing Tutorial Group:', error?.response?.data?.errors || 'Network error');
            const errorMessages = error?.response?.data?.errors;
            let errorMessageString = 'Error occurred';

            if (errorMessages) {
                errorMessageString = Object.values(errorMessages).flat().join(' ');
            }

            auth.toastError(errorMessageString);
        } finally {
            setIsLoading(false);
        }
    };

    return(
        <form onSubmit={(event) => handleSubmitEdit(tutorialGroupContent.id, event)} className="w-full flex flex-col items-center justify-center gap-y-10">
        <div className="w-full flex flex-wrap items-center justify-start gap-10">
            <div className="lg:w-[30%] sm:w-full">
              <InputCustom
                      type="text"
                      borderColor="mainColor"
                      placeholder="Group Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      width="w-full"
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

export default EditAdminTutorialPage;