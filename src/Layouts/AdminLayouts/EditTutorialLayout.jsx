import React, { createContext, useEffect, useState } from 'react';
import { EditTutorialPage } from "../../Pages/AllPages";
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate ,useParams ,useLocation} from 'react-router-dom';
import Loading from '../../Components/Loading';
import axios from 'axios';
import { useAuth } from '../../Context/Auth';

export const TutorialsLayout = createContext();

const EditAdminTutorialLayout = () => {

        const auth = useAuth();
        const [isLoading, setIsLoading] = useState(false);
        const [allTutorialsData, setAllTutorialsData] = useState([]);
        const [tutorialEdit, setTutorialEdit] = useState(null);
        const { tutorialId } = useParams();
        const location = useLocation();
        const { groupId } = location.state || {}; // Retrieve the tutorial data

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
                                   setAllTutorialsData(response.data.tutorial_group);
                                }
                     } catch (error) {
                            console.error('Error fetching data:', error);
                     } finally {
                            setIsLoading(false);
                     }
                 };
       fetchData(); }, []);

        // Find the specific tutorial to edit
      useEffect(() => {
        if (allTutorialsData.length > 0 && groupId) {
          const selectedGroup = allTutorialsData.find((group) => group.id === parseInt(groupId));
          if (selectedGroup && tutorialId) {
            const selectedTutorial = selectedGroup.tutorials.find((tutorial) => tutorial.id === parseInt(tutorialId));
            setTutorialEdit(selectedTutorial || null);
          }
        }
      }, [allTutorialsData, groupId, tutorialId]);
              
      console.log('allTutorialsData', allTutorialsData); // Logging the whole array
      console.log('tutorialEdit', tutorialEdit);
      console.log('groupId', groupId);

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
       if (!allTutorialsData.length) {
        return <div className="text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center">No Tutorial Groups data available</div>;
      }
       return (
              <>
              <HeaderPageSection handleClick={handleGoBack} name="Edit Tutorial" />
              <TutorialsLayout.Provider value={tutorialEdit}>
                <EditTutorialPage/>
              </TutorialsLayout.Provider>
              </>
       )
}

export default EditAdminTutorialLayout
