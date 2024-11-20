import React, { useState, useRef,useEffect } from 'react';
import axios from 'axios';
import InputCustom from '../../../Components/InputCustom';
import { Button } from '../../../Components/Button';
import { useAuth } from '../../../Context/Auth';
import { useNavigate ,useLocation } from 'react-router-dom'
import Loading from '../../../Components/Loading';
import { useParams } from 'react-router-dom';

const AddTutorialPage = () => {
    const auth = useAuth();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [video, setVideo] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { groupId } = useParams();

    const videoRef = useRef();

    const handleGoBack = () => {
        navigate(-1, { replace: true });
    };

    const handleInputClick = (ref) => {
        if (ref.current) {
               ref.current.click();
        }
 };

    const handleVideoFileChange = (e) => {
            const file = e.target.files[0];
            if (file) {
                setVideoFile(file);
                setVideo(file.name);
            }
    };

    const handleSubmitAdd = async (event) => {
        event.preventDefault();

        if (!name) {
            auth.toastError('Please Enter the Name.');
            return;
        }
        if (!description) {
            auth.toastError('Please Enter the Description.');
            return;
        }
        if (!videoFile) {
            auth.toastError('Please Enter the Video.');
            return;
        }

        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('title', name);
            formData.append('description', description);
            formData.append('video', videoFile);
            formData.append('tutorial_group_id', groupId);

            for (let pair of formData.entries()) {
                console.log(pair[0] + ', ' + pair[1]);
            } 

            const response = await axios.post(
                'https://login.wegostores.com/admin/v1/tutorial/add',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${auth.user.token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.status === 200) {
                auth.toastSuccess('Tutorial added successfully!');
                handleGoBack();
            } else {
                console.error('Failed to add Tutorial:', response.status, response.statusText);
                auth.toastError('Failed to add Tutorial.');
            }
        } catch (error) {
            console.error('Error adding Tutorial:', error?.response?.data?.errors || 'Network error');
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
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                width="w-full"
                            />
                      </div>
                      <div className="lg:w-[30%] sm:w-full">
                        <InputCustom
                            type="text"
                            upload={true}
                            borderColor="mainColor"
                            paddinRight='pr-2'
                            placeholder="Video"
                            value={video}
                            readonly={true}
                            onClick={() => handleInputClick(videoRef)}
                        />
                        <input
                            type="file"
                            className="hidden"
                            onChange={handleVideoFileChange}
                            ref={videoRef}
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
    );
};

export default AddTutorialPage;
