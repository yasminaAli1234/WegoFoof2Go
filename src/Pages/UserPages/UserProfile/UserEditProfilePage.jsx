import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from '../../../Components/Loading';
import { useAuth } from '../../../Context/Auth'; // Assuming you're using useAuth for auth context
import InputCustom from '../../../Components/InputCustom';
import { Link, useLocation } from 'react-router-dom';
import { AiTwotoneEdit } from "react-icons/ai";
import { Button } from '../../../Components/Button';
import image from '../../../../public/Images/logo.png'

const UserEditProfilePage =()=>{
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();
  const location = useLocation();
  const user = location.state || {};

  const [name, setName] = useState(user.userData.name);
  const [phone, setPhone] = useState(user.userData.phone);
  const [email, setEmail] = useState(user.userData.email);
  const [image, setImage] = useState(user.userData.image);

  useEffect(() => {
    console.log("userData", user); 
    // setName(userData.name)
    // setPhone(userData.phone)
    // setEmail(userData.email)
  }, []);

    if (isLoading) {
        return (
          <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
            <Loading />
          </div>
        );
    }  
      
    return(
        <form className="w-full flex flex-col gap-y-10 p-4">
        <div className="w-full flex flex-col lg:flex-row gap-10 items-center">
            <div className='w-80 h-80 flex relative rounded-full border-2'>
                <img
                    src={image}
                    alt="ProfileImage"
                    className="w-full object-contain rounded-full"
                />
                <button className="bg-white text-mainColor shadow p-2 rounded-full absolute flex items-center bottom-7 right-4 hover:bg-gray-300">
                    <AiTwotoneEdit size={40}/>
                </button>
            </div>
        </div>
     
        <div className="w-full flex flex-wrap items-center justify-start gap-10">
            <div className="w-full flex flex-col lg:flex-row gap-10">
                <div className="lg:w-[35%] sm:w-full">
                    <InputCustom
                        type="text"
                        placeholder="Name"
                        borderColor="mainColor"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="lg:w-[35%] sm:w-full">
                    <InputCustom
                        type="email"
                        placeholder="Email"
                        borderColor="mainColor"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </div>
            <div className="w-full flex flex-col lg:flex-row gap-10">
                <div className="lg:w-[35%] sm:w-full">
                <InputCustom
                        type="text"
                        placeholder="Phone"
                        borderColor="mainColor"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                />
                </div>
            </div>
             <div className="w-full flex items-center justify-center">
                      <div className="flex items-center justify-center w-full lg:w-96 md:w-96 ">
                          <Button
                              Text="Update Profile"
                              BgColor="bg-mainColor"
                              Color="text-white"
                              Width="full"
                              Size="text-2xl"
                              px="px-14"
                              rounded="rounded-2xl"
                              stateLoding={isLoading}
                          />
                      </div>
            </div>
        </div>
    </form>
    )
}

export default UserEditProfilePage;