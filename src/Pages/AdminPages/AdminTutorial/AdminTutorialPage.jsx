// import React, { useEffect, useState } from 'react';
// import { useAuth } from '../../../Context/Auth';
// import Loading from '../../../Components/Loading';
// import axios from 'axios';
// import {ButtonAdd} from '../../../Components/Button'
// import { Link } from 'react-router-dom';
// import {Wroning,DeleteIcon,EditIcon} from '../../../Components/Icons/AllIcons';
// import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
// import { MdCheck } from "react-icons/md";
// import { useNavigate } from 'react-router-dom';
// import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
// import { PiVideoFill } from "react-icons/pi";

// const AdminTutorialPage = () => {

//     const auth = useAuth();
//     const [isLoading, setIsLoading] = useState(false);
//     const [tutorialGroups, setTutorialGroups] = useState([]);
//     const [selectedGroup, setSelectedGroup] = useState(null); // This tracks the selected group
//     const [isDeleting, setIsDeleting] = useState(false);
//     const [openDialog, setOpenDialog] = useState(null);

//     const fetchData = async () => {
//         setIsLoading(true);
//         try {
//                const response = await axios.get('https://login.wegostores.com/admin/v1/tutorial_group', {
//                       headers: {
//                              Authorization: `Bearer ${auth.user.token}`,
//                       },
//                });
//                if (response.status === 200) {
//                       console.log(response.data)
//                       setTutorialGroups(response.data.tutorial_group)
//                }
//         } catch (error) {
//                console.error('Error fetching data:', error);
//         } finally {
//                setIsLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchData(); 
//     }, []);

//     // Handle tutorial title click
//     const handleTutorialClick = (tutorial) => {
//         navigate(`video/${tutorial.id}`, { state: { tutorial } });
//     };
    

//     // Toggle tutorial group visibility
//     const handleGroupToggle = (group) => {
//         if (selectedGroup?.name === group.name) {
//             setSelectedGroup(null); // If the same group is clicked, hide tutorials
//         } else {
//             setSelectedGroup(group); // Show tutorials for the selected group
//         }
//     };

//     // const handleOpenDialog = (paymentId) => {
//     //    setOpenDialog(paymentId);
//     //    };

//     // const handleCloseDialog = () => {
//     //         setOpenDialog(null);
//     // };

// //    const handleDelete = async (paymentId) => {
// //           setIsDeleting(true);
// //           const success = await deletePayment(paymentId, auth.user.token);
// //           setIsDeleting(false);
// //           handleCloseDialog();

// //           if (success) {
// //                  setPaymentChanged(!paymentChanged)
// //                  auth.toastSuccess('Payment Method deleted successfully!');
// //                  setPayments((prevPayment) =>
// //                     prevPayment.filter((payment) => payment.id !== paymentId)
// //                  );
// //           } else {
// //                  auth.toastError('Failed to delete Payment Method.');
// //           }
// //    };

//     //    const deletePayment = async (paymentId, authToken) => {
//     //           try {
//     //             const response = await axios.delete(`https://login.wegostores.com/admin/v1/payment/method/delete/${paymentId}`, {
//     //                     headers: {
//     //                                Authorization: `Bearer ${authToken}`,
//     //                         },
//     //                  });

//     //                  if (response.status === 200) {
//     //                         console.log('payment method deleted successfully');
//     //                         return true;
//     //                  } else {
//     //                         console.error('Failed to delete payment method:', response.status, response.statusText);
//     //                         return false;
//     //                  }
//     //           } catch (error) {
//     //                  console.error('Error deleting payment method:', error);
//     //                  return false;
//     //           }
//     //    };


//     if (isLoading) {
//         return (
//           <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
//             <Loading />
//           </div>
//         );
//     }    
      
//     if (!tutorialGroups) {
//         return <div className='text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center'>No Tutorial Groups data available</div>;
//     }

//        return (
//               <>
//               <div className='w-full flex flex-col gap-10'>
//                      <div className='w-2/3 lg:w-1/6'>
//                      <Link to={'add'}>
//                             <ButtonAdd Text='Add Group' isWidth="true" BgColor ="mainColor" Color="white" iconColor="white"/>
//                      </Link>
//                      </div>
//                      {/* <div className="w-full flex items-center justify-between mt-4 overflow-x-auto"> */}
//                      <div>
//                         <h1 className='text-center font-semibold mb-5 text-2xl text-mainColor'>Tutorial Groups</h1>
//                         {/* Display all tutorial groups */}
//                         {isLoading ? (
//                             <Loading /> // Display loading component if fetching data
//                         ) : (
//                             tutorialGroups.map((group, index) => (
//                                 <div key={index} className="relative mb-6">
//                                     {/* Group Box */}
                                    // <div
                                    //     className="bg-white border rounded-lg shadow-lg cursor-pointer"
                                    //     style={{ minHeight: '60px' }}
                                    //     onClick={() => handleGroupToggle(group)} // Toggle group selection
                                    // >
//                                         <div className="flex justify-between items-center p-4">
//                                             <span className="text-2xl font-semibold whitespace-normal break-words text-mainColor">
//                                                 {group.name}
//                                             </span>
//                                             <span>
//                                                 {selectedGroup?.name === group.name ? (
//                                                     <IoIosArrowUp className="text-xl text-mainColor" />
//                                                 ) : (
//                                                     <IoIosArrowDown className="text-xl text-mainColor" />
//                                                 )}
//                                             </span>
//                                         </div>
//                                     </div>

//                                     {/* Tutorials List */}
//                                     {selectedGroup?.name === group.name && (
//                                         <div className="flex flex-col gap-5 bg-gray-100 border rounded-lg w-full p-4">
//                                             {group.tutorials.length === 0 ? (
//                                                 <p className="text-center text-mainColor text-xl font-semibold">There are no tutorials</p>
//                                             ) : (
//                                                 group.tutorials.map((tutorial, index) => (
//                                                         <button
//                                                             // to={tutorial.path}
//                                                             key={index}
//                                                             className="flex items-center gap-3 text-mainColor text-xl font-bold hover:underline"
//                                                             onClick={() => handleTutorialClick(tutorial)}
//                                                         >
//                                                             <div className="text-mainColor text-xl">
//                                                             <PiVideoFill size={30}/>
//                                                             </div>
//                                                             <div className="text-mainColor text-xl mb-1">
//                                                             {tutorial.title}
//                                                             </div>
//                                                         </button>
//                                                 ))
//                                             )}
//                                         </div>
//                                     )}
//                                 </div>
//                             ))
//                         )}
//                     </div>
//                     </div>
//               {/* </div> */}
//               </>
//        )
// }

// export default AdminTutorialPage


import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../Context/Auth';
import Loading from '../../../Components/Loading';
import axios from 'axios';
import { ButtonAdd } from '../../../Components/Button';
import { Link } from 'react-router-dom';
import { DeleteIcon, EditIcon } from '../../../Components/Icons/AllIcons';
import { Dialog } from '@headlessui/react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { PiVideoFill } from 'react-icons/pi';

const AdminTutorialPage = () => {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [tutorialGroups, setTutorialGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://login.wegostores.com/admin/v1/tutorial_group', {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      });
      if (response.status === 200) {
        setTutorialGroups(response.data.tutorial_group);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteGroup = async (groupId) => {
    try {
      const response = await axios.delete(`https://login.wegostores.com/admin/v1/tutorial_group/${groupId}`, {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      });
      if (response.status === 200) {
        setTutorialGroups((prev) => prev.filter((group) => group.id !== groupId));
        auth.toastSuccess('Group deleted successfully');
      } else {
        auth.toastError('Failed to delete group');
      }
    } catch (error) {
      console.error('Error deleting group:', error);
      auth.toastError('Error deleting group');
    }
  };

  const handleGroupToggle = (group) => {
    setSelectedGroup((prevGroup) => (prevGroup?.name === group.name ? null : group));
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
        <Loading />
      </div>
    );
  }

  if (!tutorialGroups.length) {
    return <div className="text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center">No Tutorial Groups data available</div>;
  }

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="w-2/3 lg:w-1/6">
        <Link to="add">
          <ButtonAdd Text="Add Group" isWidth="true" BgColor="mainColor" Color="white" iconColor="white" />
        </Link>
      </div>

      <div>
        <h1 className="text-center font-semibold mb-5 text-2xl text-mainColor">Tutorial Groups</h1>
        {tutorialGroups.map((group) => (
          <div key={group.id} className="relative mb-6">
            {/* Group Box */}
            <div
                className="bg-white border rounded-lg shadow-lg cursor-pointer"
                style={{ minHeight: '60px' }}
                onClick={() => handleGroupToggle(group)} // Toggle group selection
            >
            {/* <div className="bg-white border rounded-lg shadow-lg cursor-pointer"> */}
              <div className="flex justify-between items-center p-4">
                <span className="text-2xl font-semibold text-mainColor">{group.name}</span>
                <div className="flex gap-3">
                  {/* Add Tutorial Icon */}
                  <Link to={`/add-tutorial/${group.id}`}>
                    <PiVideoFill className="text-green-500" size={25} title="Add Tutorial" />
                  </Link>
                  {/* Edit Icon */}
                  <Link to={`/edit-group/${group.id}`}>
                    <EditIcon className="text-blue-500" size={25} title="Edit Group" />
                  </Link>
                  {/* Delete Icon */}
                  <button
                    onClick={() => deleteGroup(group.id)}
                    className="text-red-500"
                    title="Delete Group"
                  >
                    <DeleteIcon size={25} />
                  </button>
                  {/* Toggle Arrow */}
                  {selectedGroup?.name === group.name ? (
                    <IoIosArrowUp className="text-xl text-mainColor" />
                  ) : (
                    <IoIosArrowDown className="text-xl text-mainColor" />
                  )}
                </div>
              </div>
            </div>

            {/* Tutorials List */}
            {selectedGroup?.name === group.name && (
              <div className="flex flex-col gap-5 bg-gray-100 border rounded-lg w-full p-4">
                {group.tutorials.length === 0 ? (
                  <p className="text-center text-mainColor text-xl font-semibold">There are no tutorials</p>
                ) : (
                  group.tutorials.map((tutorial) => (
                    <div key={tutorial.id} className="flex items-center gap-3 text-mainColor text-xl font-bold hover:underline">
                      <PiVideoFill size={30} />
                      <span>{tutorial.title}</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTutorialPage;
