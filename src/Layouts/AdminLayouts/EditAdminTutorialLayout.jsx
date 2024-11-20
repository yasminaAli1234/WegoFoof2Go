import React, { createContext, useEffect, useState } from 'react';
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate ,useParams} from 'react-router-dom';
import { EditAdminTutorialPage } from "../../Pages/AllPages";
import Loading from '../../Components/Loading';
import axios from 'axios';
import { useAuth } from '../../Context/Auth';

export const TutorialGroupLayout = createContext();

const EditAdminTutorialLayout = () => {

        const auth = useAuth();
        const [isLoading, setIsLoading] = useState(false);
        const [allTutorialGroupsData, setAllTutorialGroupsData] = useState([]);
        const [tutorialGroupEdit, setTutorialGroupEdit] = useState(null);
        const { groupId } = useParams();

       useEffect(() => {
              const fetchData = async () => {
                     setIsLoading(true);
                     try {
                            const response = await axios.get('https://login.wegostores.com/admin/v1/tutorial_group', {
                                   headers: {
                                          Authorization: `Bearer ${auth.user.token}`,
                                   },
                            });
                            if (response.status === 200) {
                                   console.log(response.data)
                                   setAllTutorialGroupsData(response.data.tutorial_group);
                                }
                     } catch (error) {
                            console.error('Error fetching data:', error);
                     } finally {
                            setIsLoading(false);
                     }
                 };
       fetchData(); }, []);

       useEffect(() => {
              if (allTutorialGroupsData.length > 0 && groupId) {
                     const filteredTutorialGroup = allTutorialGroupsData.find(
                     (group) => group.id === parseInt(groupId)
                     );
                     setTutorialGroupEdit(filteredTutorialGroup);
              }
              }, [allTutorialGroupsData, groupId]);
              
              console.log('allTutorialGroupsData', allTutorialGroupsData); // Logging the whole array
              console.log('tutorialGroupEdit', tutorialGroupEdit);


       const navigate = useNavigate();
       const handleGoBack = () => {
       navigate(-1, { replace: true });
       };
       return (
              <>
              <HeaderPageSection handleClick={handleGoBack} name="Edit Tutorial Group" />
              <TutorialGroupLayout.Provider value={tutorialGroupEdit}>
                     <EditAdminTutorialPage/>
              </TutorialGroupLayout.Provider>
              </>
       )
}

export default EditAdminTutorialLayout
