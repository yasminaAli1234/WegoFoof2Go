// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Loading from '../../../Components/Loading';
// import { useAuth } from '../../../Context/Auth'; // Assuming you're using useAuth for auth context
// import InputCustom from '../../../Components/InputCustom';
// import { Link, useLocation } from 'react-router-dom';
// import { AiTwotoneEdit } from "react-icons/ai";
// import { Button } from '../../../Components/Button';
// import image from '../../../../public/Images/logo.png'

// const UserEditProfilePage =()=>{
//   const [isLoading, setIsLoading] = useState(false);
//   const auth = useAuth();
//   const location = useLocation();
//   const user = location.state || {};

//   const [name, setName] = useState(user.userData.name);
//   const [phone, setPhone] = useState(user.userData.phone);
//   const [email, setEmail] = useState(user.userData.email);
//   const [image, setImage] = useState(user.userData.image);

//   useEffect(() => {
//     console.log("userData", user); 
//     // setName(userData.name)
//     // setPhone(userData.phone)
//     // setEmail(userData.email)
//   }, []);

//     if (isLoading) {
//         return (
//           <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
//             <Loading />
//           </div>
//         );
//     }  

//     const handleSubmitEdit = async (userId,event) => {
//         console.log(userId)
//         event.preventDefault();
 
//         if (!name) {
//             auth.toastError('Please Enter Name.');
//             return;
//         }
//         if (!phone) {
//             auth.toastError('Please Enter Phone.');
//             return;
//         }
//         if (!email) {
//             auth.toastError('Please Enter Email.');
//             return;
//         }
     
//         const formData = new FormData();
//         formData.append('name', name);
//         // formData.append('image', userImage);
//         formData.append('email', email);
//         formData.append('phone', phone);
 
//         for (let pair of formData.entries()) {
//                console.log(pair[0] + ', ' + pair[1]);
//         }        
 
//         setIsLoading(true);
//         try {
//             const response = await axios.put(`https://login.wegostores.com/user/v1/domains/profile/update/${userId}`,formData, {
//                 headers: {
//                     Authorization: `Bearer ${auth.user.token}`,
//                     'Content-Type': 'application/json', // Use JSON since we're sending a JSON object now
//                 },
//             });
 
//             if (response.status === 200) {
//                 auth.toastSuccess('Profile Updated successfully!');
//                 handleGoBack();
//             } else {
//                 auth.toastError('Failed to Updated Profile.');
//             }
//         } catch (error) {
//           console.log(error)
//             const errorMessages = error?.response?.data.errors;
//             let errorMessageString = 'Error occurred';
 
//             if (errorMessages) {
//                 errorMessageString = Object.values(errorMessages).flat().join(' ');
//             }
//         handleGoBack();
//         } finally {
//             setIsLoading(false);
//         }
//     };
      
//     return(
//         <form onSubmit={(event) => handleSubmitEdit(user.userData.id, event)} className="w-full flex flex-col gap-y-10 p-4">
//         <div className="w-full flex flex-col lg:flex-row gap-10 items-center">
//             <div className='w-80 h-80 flex relative rounded-full border-2'>
//                 <img
//                     src={image}
//                     alt="ProfileImage"
//                     className="w-full object-contain rounded-full"
//                 />
//                 <button className="bg-white text-mainColor shadow p-2 rounded-full absolute flex items-center bottom-7 right-4 hover:bg-gray-300">
//                     <AiTwotoneEdit size={40}/>
//                 </button>
//             </div>
//         </div>
     
//         <div className="w-full flex flex-wrap items-center justify-start gap-10">
//             <div className="w-full flex flex-col lg:flex-row gap-10">
//                 <div className="lg:w-[35%] sm:w-full">
//                     <InputCustom
//                         type="text"
//                         placeholder="Name"
//                         borderColor="mainColor"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                     />
//                 </div>
//                 <div className="lg:w-[35%] sm:w-full">
//                     <InputCustom
//                         type="email"
//                         placeholder="Email"
//                         borderColor="mainColor"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />
//                 </div>
//             </div>
//             <div className="w-full flex flex-col lg:flex-row gap-10">
//                 <div className="lg:w-[35%] sm:w-full">
//                 <InputCustom
//                         type="text"
//                         placeholder="Phone"
//                         borderColor="mainColor"
//                         value={phone}
//                         onChange={(e) => setPhone(e.target.value)}
//                 />
//                 </div>
//             </div>
//             <div className="w-full flex items-center justify-center">
//                 <div className="flex items-center justify-center w-full lg:w-96 md:w-96 ">
//                     <Button
//                         Text="Update Profile"
//                         BgColor="bg-mainColor"
//                         Color="text-white"
//                         Width="full"
//                         Size="text-2xl"
//                         px="px-14"
//                         rounded="rounded-2xl"
//                     //   stateLoding={isLoading}
//                     />
//                 </div>
//             </div>
//         </div>
//     </form>
//     )
// }

// export default UserEditProfilePage;


import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from '../../../Components/Loading';
import { useAuth } from '../../../Context/Auth';
import InputCustom from '../../../Components/InputCustom';
import { Link, useLocation } from 'react-router-dom';
import { AiTwotoneEdit } from "react-icons/ai";
import { Button } from '../../../Components/Button';

const UserEditProfilePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();
  const location = useLocation();
  const user = location.state || {};

  const [name, setName] = useState(user.userData.name);
  const [phone, setPhone] = useState(user.userData.phone);
  const [email, setEmail] = useState(user.userData.email);
  const [image, setImage] = useState(user.userData.image);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    console.log("userData", user); 
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImage(URL.createObjectURL(file)); // Update preview with selected file
    }
  };

  const handleSubmitEdit = async (userId, event) => {
    event.preventDefault();

    if (!name || !phone || !email) {
      auth.toastError('Please complete all fields.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    if (selectedFile) {
      formData.append('image', selectedFile); // Add image file to formData
    }

    setIsLoading(true);
    try {
      const response = await axios.put(
        `https://login.wegostores.com/user/v1/profile/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${auth.user.token}`,
          },
        }
      );

      if (response.status === 200) {
        auth.toastSuccess('Profile updated successfully!');
        // Navigate back or refresh data as needed
      } else {
        auth.toastError('Failed to update profile.');
      }
    } catch (error) {
      console.error(error);
      auth.toastError('An error occurred while updating the profile.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={(event) => handleSubmitEdit(user.userData.id, event)} className="w-full flex flex-col gap-y-10 p-4">
      <div className="w-full flex flex-col lg:flex-row gap-10 items-center">
        <div className='w-80 h-80 flex relative rounded-full border-2'>
          <img
            src={image}
            alt="Profile"
            className="w-full object-contain rounded-full"
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="file-input"
            onChange={handleFileChange}
          />
          <label htmlFor="file-input" className="bg-white text-mainColor shadow p-2 rounded-full absolute flex items-center bottom-7 right-4 hover:bg-gray-300 cursor-pointer">
            <AiTwotoneEdit size={40} />
          </label>
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
              type="submit"
              Text="Update Profile"
              BgColor="bg-mainColor"
              Color="text-white"
              Width="full"
              Size="text-2xl"
              px="px-14"
              rounded="rounded-2xl"
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default UserEditProfilePage;
