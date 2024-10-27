import React from "react";
import { UserEditProfilePage } from "../../Pages/AllPages";
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate } from 'react-router-dom';

const UserProfileLayout =()=>{

    const navigate = useNavigate();
    const handleGoBack = () => {
      navigate(-1, { replace: true });
    };
    return(
        <>
        <HeaderPageSection handleClick={handleGoBack} name="Edit Profile" />
        <UserEditProfilePage/>
        </>
    )
}

export default UserProfileLayout;