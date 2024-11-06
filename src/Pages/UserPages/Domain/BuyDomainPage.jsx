import React, { useEffect, useState ,useRef} from 'react';
import InputCustom from '../../../Components/InputCustom';
import { Button } from '../../../Components/Button';
import Loading from '../../../Components/Loading';
import { useAuth } from '../../../Context/Auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BuyDomainPage =()=>{
    const auth = useAuth();
    // const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [domainRequest, setDomainRequest] = useState('');
    const [domainApproved, setDomainApproved] = useState(false);
    const [domainRejected, setDomainRejected] = useState(false);
    const [domainPendding, setDomainPending] = useState(null);

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
                    //   setDomainApproved(response.data.my_domains)
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
                            placeholder="Store Name"
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

            <div className='mt-10'>
                <h1 className='font-semibold text-center text-3xl'>Domains Requests</h1>
            </div>

        </div>
    )
}

export default BuyDomainPage;