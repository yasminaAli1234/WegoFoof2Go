import React, { useState, useRef,useEffect } from 'react';
import axios from 'axios';
import InputCustom from '../../../Components/InputCustom';
import { Button } from '../../../Components/Button';
import { useAuth } from '../../../Context/Auth';
import { useNavigate } from 'react-router-dom'
import Loading from '../../../Components/Loading';

const AddAdminInformationPage = () => {
    const auth = useAuth();
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [whatsApp, setWhatsApp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    
    const handleGoBack = () => {
        navigate(-1, { replace: true });
    };

    const handleSubmitAdd = async (event) => {
        event.preventDefault();

        if (!email) {
            auth.toastError('Please Enter the Email.');
            return;
        }
        if (!phone) {
            auth.toastError('Please Enter the Phone.');
            return;
        }
        if (!whatsApp) {
            auth.toastError('Please Enter the whatsApp Number.');
            return;
        }

        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('phone', phone);
            formData.append('watts_app', whatsApp); // Append the file

            const response = await axios.post(
                'https://login.wegostores.com/admin/v1/contact_us/add',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${auth.user.token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.status === 200) {
                auth.toastSuccess('Contact Information added successfully!');
                handleGoBack();
            } else {
                console.error('Failed to add Contact Information:', response.status, response.statusText);
                auth.toastError('Failed to add Contact Information.');
            }
        } catch (error) {
            console.error('Error adding Contact Information:', error?.response?.data?.errors || 'Network error');
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

    return (
        <form onSubmit={handleSubmitAdd} className="w-full flex flex-col items-center justify-center gap-y-10">
                  <div className="w-full flex flex-wrap items-center justify-start gap-10">
                      <div className="lg:w-[30%] sm:w-full">
                        <InputCustom
                                type="email"
                                borderColor="mainColor"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                width="w-full"
                            />
                      </div>
                      <div className="lg:w-[30%] sm:w-full">
                        <InputCustom
                                type="text"
                                borderColor="mainColor"
                                placeholder="Phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                width="w-full"
                            />
                      </div>
                      <div className="lg:w-[30%] sm:w-full">
                        <InputCustom
                                type="text"
                                borderColor="mainColor"
                                placeholder="WhatsApp"
                                value={whatsApp}
                                onChange={(e) => setWhatsApp(e.target.value)}
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
                            //   stateLoding={isLoading}
                          />
                      </div>
                      <button onClick={handleGoBack} className="text-2xl text-mainColor">Cancel</button>
                  </div>
        </form>
           
    );
};

export default AddAdminInformationPage;
