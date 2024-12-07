import React from "react";
import { EditWelcomOfferPage} from "../../Pages/AllPages";
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate } from 'react-router-dom';

const EditWelcomOfferLayout =()=>{

    const navigate = useNavigate();
    const handleGoBack = () => {
      navigate(-1, { replace: true });
    };
    return(
        <>
        <HeaderPageSection handleClick={handleGoBack} name="Edit Welcom Offer" />
        <EditWelcomOfferPage/>
        </>
    )
}

export default EditWelcomOfferLayout;