import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../Context/Auth';
import Loading from '../../../Components/Loading';
import axios from 'axios';
import { ButtonAdd } from '../../../Components/Button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { PiVideoFill } from "react-icons/pi";

const TutorialPage = () => {
    const auth = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [tutorialGroups, setTutorialGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null); // This tracks the selected group
    const navigate = useNavigate();

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('https://login.wegostores.com/user/v1/tutorial', {
                headers: {
                    Authorization: `Bearer ${auth.user.token}`,
                },
            });
            if (response.status === 200) {
                setTutorialGroups(response.data.tutorial_groups);
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

    // Handle tutorial title click
    const handleTutorialClick = (tutorialId) => {
        navigate(`/tutorial/${tutorialId}`);
    };

    // Toggle tutorial group visibility
    const handleGroupToggle = (group) => {
        if (selectedGroup?.name === group.name) {
            setSelectedGroup(null); // If the same group is clicked, hide tutorials
        } else {
            setSelectedGroup(group); // Show tutorials for the selected group
        }
    };

    if (isLoading) {
        return (
          <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
            <Loading />
          </div>
        );
    }    
      
    return (
        <div>
            <h1 className='text-center font-semibold mb-5 text-2xl text-mainColor'>Tutorial Groups</h1>

            {/* Display all tutorial groups */}
            {isLoading ? (
                <Loading /> // Display loading component if fetching data
            ) : (
                tutorialGroups.map((group, index) => (
                    <div key={index} className="relative mb-6">
                        {/* Group Box */}
                        <div
                            className="bg-white border rounded-lg shadow-lg cursor-pointer"
                            style={{ minHeight: '60px' }}
                            onClick={() => handleGroupToggle(group)} // Toggle group selection
                        >
                            <div className="flex justify-between items-center p-4">
                                <span className="text-2xl font-semibold whitespace-normal break-words text-mainColor">
                                    {group.name}
                                </span>
                                <span>
                                    {selectedGroup?.name === group.name ? (
                                        <IoIosArrowUp className="text-xl text-mainColor" />
                                    ) : (
                                        <IoIosArrowDown className="text-xl text-mainColor" />
                                    )}
                                </span>
                            </div>
                        </div>

                        {/* Tutorials List */}
                        {selectedGroup?.name === group.name && (
                            <div className="flex flex-col gap-5 bg-gray-100 border rounded-lg w-full p-4">
                                {group.tutorials.length === 0 ? (
                                    <p className="text-center text-mainColor text-xl font-semibold">There are no tutorials</p>
                                ) : (
                                    group.tutorials.map((tutorial, index) => (
                                            <Link
                                                to={tutorial.path}
                                                key={index}
                                                className="flex items-center gap-3 text-mainColor text-xl font-bold hover:underline"
                                                onClick={() => handleTutorialClick(tutorial.id)}
                                            >
                                                <div className="text-mainColor text-xl">
                                                <PiVideoFill size={30}/>
                                                </div>
                                                <div className="text-mainColor text-xl mb-1">
                                                {tutorial.title}
                                                </div>
                                            </Link>

                                    ))
                                )}
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default TutorialPage;
