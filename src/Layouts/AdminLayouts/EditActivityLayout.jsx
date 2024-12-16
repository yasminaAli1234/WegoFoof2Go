import React, { createContext, useEffect, useState } from 'react';
import { EditActivityPage } from "../../Pages/AllPages";
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate ,useParams} from 'react-router-dom';
import Loading from '../../Components/Loading';
import axios from 'axios';
import { useAuth } from '../../Context/Auth';

export const ActivityDataLayout = createContext();

const EditActivityLayout =()=>{
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [allActivityData, setAllActivityData] = useState([]);
  const [activityEdit, setActivityEdit] = useState(null);
  const { activityId } = useParams();

  const fetchData = async () => {
    setIsLoading(true);
    try {
           const response = await axios.get(' https://www.wegostores.com/admin/v1/activity', {
                  headers: {
                         Authorization: `Bearer ${auth.user.token}`,
                  },
           });
           if (response.status === 200) {
                  console.log(response.data)
                  setAllActivityData(response.data.activity)
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
    if (allActivityData.length > 0 && activityId) {
           const filteredActivity = allActivityData.find(
           (activity) => activity.id === parseInt(activityId)
           );
           setActivityEdit(filteredActivity);
    }
    }, [allActivityData, activityId]);
    
    console.log('allActivityData', allActivityData); // Logging the whole array
    console.log('activityEdit', activityEdit);

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
        <HeaderPageSection handleClick={handleGoBack} name="Edit Activity" />
        <ActivityDataLayout.Provider value={activityEdit}>
            <EditActivityPage/>
        </ActivityDataLayout.Provider>
        </>
    )
}

export default EditActivityLayout;
