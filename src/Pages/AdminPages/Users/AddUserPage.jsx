import React, { useState, useRef,useEffect } from 'react';
import axios from 'axios';
import InputCustom from '../../../Components/InputCustom';
import { Button } from '../../../Components/Button';
import { useAuth } from '../../../Context/Auth';
import { useNavigate } from 'react-router-dom'
import Loading from '../../../Components/Loading';

// import CheckBox from '../../../Components/CheckBox';

const AddUserPage = () => {
    const auth = useAuth();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [storeName, setStoreName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    // const uploadRef = useRef();

    // const handleInputClick = () => {
    //     if (uploadRef.current) {
    //         uploadRef.current.click(); // Trigger a click on the hidden file input
    //     }
    // };

    // const handleFileChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         setThumbnailFile(file); // Set file object for upload
    //         setThumbnails(file.name); // Display file name in the text input
    //     }
    // };

    const handleGoBack = () => {
        navigate(-1, { replace: true });
    };

    const handleSubmitAdd = async (event) => {
        event.preventDefault();

        // if (!thumbnails) {
        //     auth.toastError('Please upload the Thumbnail Image.');
        //     return;
        // }
        // if (!title) {
        //     auth.toastError('Please Enter the Title.');
        //     return;
        // }
        // if (!description) {
        //     auth.toastError('Please Enter the Description.');
        //     return;
        // }

        // setIsLoading(true);
        // try {
        //     const formData = new FormData();
        //     formData.append('name', title);
        //     formData.append('description', description);
        //     formData.append('thumbnail', thumbnailFile); // Append the file

        //     const response = await axios.post(
        //         'https://login.wegostores.com/admin/v1/payment/method/create',
        //         formData,
        //         {
        //             headers: {
        //                 Authorization: `Bearer ${auth.user.token}`,
        //                 'Content-Type': 'multipart/form-data',
        //             },
        //         }
        //     );

        //     if (response.status === 200) {
        //         console.log('Payment Method added successfully');
        //         auth.toastSuccess('Payment Method added successfully!');
        //         handleGoBack();
        //     } else {
        //         console.error('Failed to add Payment Method:', response.status, response.statusText);
        //         auth.toastError('Failed to add Payment Method.');
        //     }
        // } catch (error) {
        //     console.error('Error adding Payment Method:', error?.response?.data?.errors || 'Network error');
        //     const errorMessages = error?.response?.data?.errors;
        //     let errorMessageString = 'Error occurred';

        //     if (errorMessages) {
        //         errorMessageString = Object.values(errorMessages).flat().join(' ');
        //     }

        //     auth.toastError(errorMessageString);
        // } finally {
        //     setIsLoading(false);
        // }
    };

    return (
        <form onSubmit={handleSubmitAdd} className="w-full flex flex-col items-center justify-center gap-y-10">
                  <div className="w-full flex flex-wrap items-center justify-start gap-10">
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
                                placeholder="Store Name"
                                value={storeName}
                                onChange={(e) => setStoreName(e.target.value)}
                                width="w-full"
                            />
                      </div>
                      {/* <div className="lg:w-[30%] sm:w-full">
                        <InputCustom
                                type="text"
                                borderColor="mainColor"
                                placeholder="Thumbnail"
                                value={emai}
                                readOnly={true} 
                                onClick={handleInputClick}
                                upload="true"
                            />
                            <input
                                type="file"
                                className="hidden"
                                onChange={handleFileChange}
                                ref={uploadRef}
                            />
                        </div> */}
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

export default AddUserPage;
