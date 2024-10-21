import React, { useState ,useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import ImageLogo from "../../../public/Images/LogoImage.png";
// import axios from 'axios';
// import { useAuth } from '../../Context/Auth';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { toast } from 'react-toastify';

const LoginAdmin =()=>{

    // const auth = useAuth();
    const [data, setData] = useState(null);
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    // const navigate = useNavigate();

    // useEffect(() => {
    //     if (data) {
    //            console.log('Calling auth.login with data:', data); // Debugging line
    //            auth.login(data); // Call auth.login with the updated data
    //            console.log(type)

    //            setIsLoading(false);
    //            navigate("/dashboard", { replace: true });
    //     }
    // }, [data]);

    const handleSubmit = async (event) => {
        console.log(email)
        console.log(password)
        console.log(type)
        event.preventDefault();

        if (!email || !password) {
            console.error("Email or Password is missing");
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post('https://transitstation.online/api/login', {
                email,
                password,
            });

            if (response.status === 200) {
                console.log(response.data)
                const userData = {
                    ...response.data,
                    roles: [response.data.role] // Assuming role is the user's role
                };
                if(response.data.role === "admin"){
                auth.login(userData); // Call auth.login with the user data
                console.log('Login response:', response); // Debugging line
                auth.toastSuccess('Login successfully!');
                setData(userData);
                setType(response.data.role)
                navigate("/dashboard", { replace: true });
            }else{
                auth.toastError("Not Valid")
            }
        } else {
                auth.toastError('Failed to login');
                setError('Failed to login');
                console.log("error", error);
            }
        } catch (error) {
            setError('There was an error posting the data!');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };


    return(
        <>
        <div className="loginPage flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-around w-full lg:h-screen bg-mainColor text-secoundColor">
                <div className="w-full flex justify-center">
                        <form className="w-full sm:w-8/12 flex flex-col items-start justify-center gap-10 mt-10" onSubmit={handleSubmit}>
                                <div className='flex w-full flex flex-col text-secoundColor font-bold gap-8 text-4xl lg:text-5xl'>
                                   <h1>Log In To  WegoStores</h1>
                                   <h1 className='text-3xl lg:text-4xl'>Welcome Back</h1>
                                </div>
                                <div className="relative w-full">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="w-full text-secoundColor bg-mainColor border-b-2 border-secoundColor outline-none px-2 py-3 text-2xl font-normal"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="relative w-full">
                                    <input
                                        type={show ? "text" : "password"}
                                        placeholder="Password"
                                        className="w-full text-secoundColor bg-mainColor border-b-2 border-secoundColor outline-none px-2 py-3 text-2xl font-normal"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    {show ? (
                                        <IoMdEye
                                            className="absolute top-4 right-2 text-2xl text-right text-secoundColor cursor-pointer"
                                            onClick={() => setShow(!show)}
                                        />
                                    ) : (
                                        <IoMdEyeOff
                                            className="absolute top-4 right-2 text-2xl text-right text-secoundColor cursor-pointer"
                                            onClick={() => setShow(!show)}
                                        />
                                    )}
                                </div>

                                {error && <div className="w-full text-mainColor text-center text-2xl mb-4 font-bold">{error}</div>}
                                 
                                <button
                                type="submit"
                                className="w-full mt-10 text-center text-3xl font-medium px-6 py-3 text-mainColor bg-secoundColor rounded-md"
                                disabled={isLoading}
                            >
                                Send
                            </button>
                            
                        </form>
                </div>
                <div className="w-full flex justify-center">
                    <img
                    src={ImageLogo}
                    alt="LoginImage"
                    />              
                </div>
            </div>
        </>
    )
    }

    export default LoginAdmin;