import React, { createContext, useEffect, useState } from 'react';
import { EditExtraProductPage } from "../../Pages/AllPages";
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate ,useParams} from 'react-router-dom';
import Loading from '../../Components/Loading';
import axios from 'axios';
import { useAuth } from '../../Context/Auth';

export const productDataContext = createContext();


const EditExtraProductLayout =()=>{

    const auth = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [allProductData, setAllProductData] = useState([]);
    const [productEdit, setProductEdit] = useState(null);
    const { extraId } = useParams();

    const fetchData = async () => {
        setIsLoading(true);
        try {
               const response = await axios.get(' https://www.wegostores.com/admin/v1/extra/show', {
                      headers: {
                             Authorization: `Bearer ${auth.user.token}`,
                      },
               });
               if (response.status === 200) {
                      console.log(response.data)
                      setAllProductData(response.data.extra)
               }
        } catch (error) {
               console.error('Error fetching data:', error);
        } finally {
               setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData(); 
    }, []);

    useEffect(() => {
        if (allProductData.length > 0 && extraId) {
               const filteredProduct = allProductData.find(
               (extra) => extra.id === parseInt(extraId)
               );
               setProductEdit(filteredProduct);
        }
      }, [allProductData, extraId]);
  
      console.log('allProductData', allProductData); // Logging the whole array
      console.log('productEditData', productEdit);
  
      const navigate = useNavigate();
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
    return(
        <>
        <HeaderPageSection handleClick={handleGoBack} name="Edit Extra Product" />
        <productDataContext.Provider value={productEdit}>
           <EditExtraProductPage/>
        </productDataContext.Provider>
        </>
    )
}

export default EditExtraProductLayout;