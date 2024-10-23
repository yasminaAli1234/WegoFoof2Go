import React, { useState ,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import ImageLogo from "../../../public/Images/LogoImage.png";
import axios from 'axios';
import { useAuth } from '../../Context/Auth';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { toast } from 'react-toastify';

const SignUpPage =()=>{
    const navigate = useNavigate();
    const auth = useAuth();
    console.log('auth.user', auth.user)
    const [data, setData] = useState(null);
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confpassword, setConfPassword] = useState('');
    const [type, setType] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (data) {
               console.log('Calling auth.login with data:', data); // Debugging line
               auth.login(data); // Call auth.login with the updated data
               setIsLoading(false);

               if (type === "user") {
                      navigate("/dashboard_user", { replace: true });
               }
        }
    }, [data]);

    const handleSubmit = async (event) => {
        console.log(email)
        console.log(password)
        event.preventDefault();

        if (!email || !password) {
            console.error("Email or Password is missing");
            return;
        }
        setIsLoading(true);

        try {
            const response = await axios.post('https://login.wegostores.com/user/v1/signUp', {
                'name': name,
                'phone': phone,
                'email': email,
                'password': password,
                'conf_password': confpassword,
            });

            if (response.status === 200) {
                console.log(response)
                    const userData = {
                        ...response.data.user,
                        roles: [response.data.user.role] // Assuming role is the user's role
                    };
                    console.log('Login response:', response); // Debugging line
                    auth.toastSuccess('Login successfully!');
                    setData(userData);
                    setType(response.data.user.role)
                }
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    auth.toastError('Please Enter Correct Email or Password');
                    console.log('Login failed:', error.response.data);
             } else {
                    auth.toastError('You do not have account');
                    console.error('An error occurred:', error);
             }
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
                                   <h1>Sign up  to  Wegostores</h1>
                                   <h1 className='text-3xl lg:text-4xl'>Welcome</h1>
                                </div>
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        className="w-full text-secoundColor bg-mainColor border-b-2 border-secoundColor outline-none px-2 py-3 text-2xl font-normal"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        placeholder="Phone"
                                        className="w-full text-secoundColor bg-mainColor border-b-2 border-secoundColor outline-none px-2 py-3 text-2xl font-normal"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                    />
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
                                <div className="relative w-full">
                                    <input
                                        type={show ? "text" : "password"}
                                        placeholder="Confirm Password"
                                        className="w-full text-secoundColor bg-mainColor border-b-2 border-secoundColor outline-none px-2 py-3 text-2xl font-normal"
                                        value={confpassword}
                                        onChange={(e) => setConfPassword(e.target.value)}
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

                                {error && <div className="w-full text-white text-center text-2xl mb-4 font-bold">{error}</div>}
                                 
                                <button
                                type="submit"
                                className="w-full mt-5 text-center text-3xl font-medium px-6 py-3 text-mainColor bg-secoundColor rounded-md"
                                disabled={isLoading}
                                >
                                    Send
                                </button>

                                <div className='flex gap-5 text-2xl font-medium'>
                                    <p>I have an account?</p>
                                    <Link to="/login_user" className='underline'>
                                      Log In
                                    </Link>
                                </div>
                            
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

    export default SignUpPage;