import React, { useEffect, useState ,useRef} from 'react';
import InputCustom from '../../../Components/InputCustom';
import { Button } from '../../../Components/Button';
import Loading from '../../../Components/Loading';
import { useAuth } from '../../../Context/Auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../Redux/CartSlice.js';

const BuyDomainPage =()=>{
    const auth = useAuth();
    // const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [domainRequest, setDomainRequest] = useState('');
    const [alldomainRequest, setAllDomainRequest] = useState('');
    const [domainApproved, setDomainApproved] = useState('');
    const [domainRejected, setDomainRejected] = useState('');
    const [domainPendding, setDomainPending] = useState('');
    const [activeTab, setActiveTab] = useState("Approved");

     // State to control modal visibility and content
     const [showModal, setShowModal] = useState(false);
     const [selectedReason, setSelectedReason] = useState('');
 
     // Function to open modal and set the rejection reason
     const handleViewReason = (reason) => {
         setSelectedReason(reason);
         setShowModal(true);
     };
 
     // Function to close the modal
     const closeModal = () => {
         setShowModal(false);
         setSelectedReason('');
     };

    const dispatch = useDispatch();

    const handleAddToCart = (domain) => {
        dispatch(addToCart(domain));
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
               const response = await axios.get('https://login.wegostores.com/user/v1/domains/my_domains', {
                      headers: {
                             Authorization: `Bearer ${auth.user.token}`,
                      },
               });
               if (response.status === 200) {
                      console.log(response.data)
                      setAllDomainRequest(response.data)
                      setDomainApproved(response.data.approve_domains)
                      setDomainPending(response.data.pending_domains)
                      setDomainRejected(response.data.rejected_domains)
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

    if (isLoading) {
        return (
          <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
            <Loading />
          </div>
        );
    }    
      
    if (!alldomainRequest) {
        return <div className='text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center'>No domain Request data available</div>;
    }

    return(
        <div>
            <form className="w-full flex flex-col justify-center gap-y-10">
            <div className="w-full flex flex-col gap-3 shadow-md p-6">
                <h1 className='text-2xl text-mainColor font-semibold'>Request for your own domain</h1>
                <div className="lg:w-[70%] w-full flex flex-col md:flex-row justify-start">
                    <div className="sm:w-full md:w-4/6 border-2 border-mainColor md:border-r-0"> 
                        <input
                        className='p-4 font-semibold text-xl w-full h-full rounded-2xl outline-none'
                            type="text"
                            placeholder="Enter Domain Name"
                            // borderWidth="1"
                            // borderColor="white"
                            value={domainRequest}
                            onChange={(e) => setDomainRequest(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-center w-full md:w-2/6 rounded-2xl">
                        <Button
                            type="submit"
                            Text="Send"
                            BgColor="bg-mainColor"
                            Color="text-white"
                            Width="full"
                            Size="text-2xl"
                            px="px-28"
                            rounded="rounded-lg"
                            // stateLoding={isLoading}
                        />
                    </div>
                </div>
            </div>
            </form>

            <div className='mt-10 mb-10'>
                <h1 className='font-semibold text-center text-3xl'>Domains Requests</h1>
                <div>
                <div className="flex w-full gap-3 mt-5 mb-5">
                        {/* Tab buttons */}
                        <div className='sm:w-2/4'> 
                        <Button
                        Text="Pending Requests"
                        Width="full"
                        px="px-1"
                        Size='text-xl'
                        BgColor={activeTab === "pending" ? "bg-mainColor" : "bg-white"}
                        Color={activeTab === "pending" ? "text-white" : "text-mainColor"}
                        handleClick={() => setActiveTab("pending")}
                        />
                        </div>
                        <div className='sm:w-2/4'> 
                        <Button
                        Text="Approved Requests"
                        Width="full"
                        px="px-1"
                        Size='text-xl'
                        BgColor={activeTab === "Approved" ? "bg-mainColor" : "bg-white"}
                        Color={activeTab === "Approved" ? "text-white" : "text-mainColor"}
                        handleClick={() => setActiveTab("Approved")}
                        />
                        </div>
                        <div className='sm:w-2/4'> 
                        <Button
                        Text="Rejected Requests"
                        Width="full"
                        px="px-1"
                        Size='text-xl'
                        BgColor={activeTab === "Rejected" ? "bg-mainColor" : "bg-white"}
                        Color={activeTab === "Rejected" ? "text-white" : "text-mainColor"}
                        handleClick={() => setActiveTab("Rejected")}
                        />
                        </div>            
                    </div>
                {activeTab === "pending" &&(
                    <>
                    {domainPendding.length !== 0 ?(
                        <>
                        <div className='w-full flex flex-col gap-10'>
                        <div className="w-full flex flex-wrap items-center justify-start gap-10">
                            {domainPendding.map((domain, index) => (
                                <>
                                    <div key={domain.id} className="lg:w-[80%] xl:w-[30%] text-mainColor sm:w-full border border-mainColor rounded-2xl">
                                        <div className='mb-2 p-4 pb-0 text-xl md:text-2xl xl:text-2xl font-semibold'>
                                            <h1 className='p-2'><span>Domain : </span>{domain.name || '-'}</h1>
                                            <h1 className='p-2'><span>Price : </span>{domain.price || '-'}</h1>
                                            <h1 className='p-2'><span>Store : </span>{domain.store?.store_name || '-'}</h1>
                                            <h1 className='p-2'><span>Renew Date : </span>{domain.renewdate || '-'}</h1>
                                            <h1 className='p-2 text-gray-500'><span className='text-mainColor'>Status : </span>{domain.status === 1? "Pending" :'Pending'}</h1>
                                        </div>
                                    </div>       
                                </>
                            ))}
                            </div>
                        </div>
                        </>
                    ):(
                            <>
                            <div className='w-full flex flex-col gap-5 justify-center items-center'>
                                    <h1 className='text-center text-2xl lg:text-3xl text-mainColor font-semibold'>There is no pending domain requests available</h1>
                            </div>
                            </>
                    )
                    }
                    </>
                )}

                {activeTab === "Approved" &&(
                    <>
                    {domainApproved.length !== 0 ?(
                        <>
                        <div className='w-full flex flex-col gap-10'>
                        <div className="w-full flex flex-wrap items-center justify-start gap-10">
                            {domainApproved.map((domain, index) => (
                                <>
                                    <div key={domain.id} className="lg:w-[80%] xl:w-[30%] text-mainColor sm:w-full border border-mainColor rounded-2xl">
                                        <div className='mb-2 p-4 pb-0 text-xl md:text-2xl xl:text-2xl font-semibold'>
                                            <h1 className='p-2'><span>Domain : </span>{domain.name || '-'}</h1>
                                            <h1 className='p-2'><span>Price : </span>{domain.price || '-'}</h1>
                                            <h1 className='p-2'><span>Store : </span>{domain.store?.store_name || '-'}</h1>
                                            <h1 className='p-2'><span>Renew Date : </span>{domain.renewdate || '-'}</h1>
                                            <h1 className='p-2 text-green-600'><span className='text-mainColor'>Status : </span>{domain.status === 1? "Approved" :'Approved'}</h1>
                                        </div>
                                        <div className='text-center font-semibold text-2xl border-t-2 border-mainColor'>
                                            <button
                                                    onClick={() => handleAddToCart(domain)}
                                                    className="w-full text-white p-4 rounded-b-xl bg-mainColor"
                                            >
                                                    Add to Cart
                                            </button>
                                        </div>
                                    </div>       
                                </>
                            ))}
                            </div>
                        </div>
                        </>
                    ):(
                            <>
                            <div className='w-full flex flex-col gap-5 justify-center items-center'>
                                    <h1 className='text-center text-2xl lg:text-3xl text-mainColor font-semibold'>There is no approved domain requests available</h1>
                            </div>
                            </>
                    )
                    }
                    </>
                )}

                {activeTab === "Rejected" &&(
                    <>
                    {domainRejected.length !== 0 ?(
                        <>
                        <div className='w-full flex flex-col gap-10'>
                        <div className="w-full flex flex-wrap items-center justify-start gap-10">
                            {domainRejected.map((domain, index) => (
                                <>
                                    <div key={domain.id} className="lg:w-[80%] xl:w-[30%] text-mainColor sm:w-full border border-mainColor rounded-2xl">
                                        <div className='mb-2 p-4 pb-0 text-xl md:text-2xl xl:text-2xl font-semibold'>
                                            <h1 className='p-2'><span>Domain : </span>{domain.name || '-'}</h1>
                                            <h1 className='p-2'><span>Price : </span>{domain.price || '-'}</h1>
                                            <h1 className='p-2'><span>Store : </span>{domain.store?.store_name || '-'}</h1>
                                            <h1 className='p-2'><span>Renew Date : </span>{domain.renewdate || '-'}</h1>
                                            <h1 className='p-2 text-red-500'><span className='text-mainColor'>Status : </span>{domain.status === 0? "Rejected" :'Rejected'}</h1>
                                            <h1 className='p-2'>
                                                <span>Rejected Reason : </span>
                                                <button 
                                                    className="text-red-500 underline cursor-pointer" 
                                                    onClick={() => handleViewReason(domain.rejected_reason)}>
                                                    View
                                                </button>
                                            </h1>                                       
                                        </div>
                                    </div>       
                                </>
                            ))}
                              {/* Modal for displaying the rejection reason */}
                                {showModal && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                                            <h2 className="text-2xl font-bold mb-4">Rejected Reason</h2>
                                            <p className="text-lg mb-4">{selectedReason}</p>
                                            <button 
                                                className="bg-mainColor text-white px-4 py-2 rounded" 
                                                onClick={closeModal}>
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        </>
                    ):(
                            <>
                            <div className='w-full flex flex-col gap-5 justify-center items-center'>
                                    <h1 className='text-center text-2xl lg:text-3xl text-mainColor font-semibold'>There is no approved domain requests available</h1>
                            </div>
                            </>
                    )
                    }
                    </>
                )}
                </div>

            </div>

        </div>
    )
}

export default BuyDomainPage;