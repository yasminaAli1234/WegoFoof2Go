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
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [plan, setPlan] = useState('demo');
    const [billingType, setBillingType] = useState('');
    const [type, setType] = useState('user');
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

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Validation Checks
        if (phone.length < 11) {
            setError("Phone number must be at least 11 characters.");
            return;
        }
    
        if (password.length < 8 || !/[a-zA-Z]/.test(password) || !/\d/.test(password) || !/[!@#$%^&*]/.test(password)) {
            setError("Password must be at least 8 characters and include letters, numbers, and special characters.");
            return;
        }
    
        if (password !== confPassword) {
            setError("Passwords do not match.");
            return;
        }
    
        setError(""); // Clear previous errors
        setIsLoading(true);
    
        try {
            const response = await axios.post('https://login.wegostores.com/user/v1/signUp', {
                name,
                phone,
                email,
                password,
                conf_password: confPassword,
            }, {
                headers: { 'Content-Type': 'application/json' },
            });
    
            if (response.status === 200) {
                const userData = {
                    ...response.data.user,
                    roles: [response.data.user.role],
                };
                auth.toastSuccess('Signup successful!');
                setData(userData);
                setType(response.data.user.role);
            }
        } catch (error) {
            const errors = error.response?.data?.["signUp.errors"];
            if (errors) {
                if (errors.email?.includes('The email has already been taken.')) {
                    auth.toastError('The email has already been taken.');
                } else if (errors.phone?.includes('The phone has already been taken.')) {
                    auth.toastError('The phone has already been taken.');
                } else {
                    auth.toastError('Unexpected error occurred.');
                }
            } else {
                auth.toastError('Error posting data!');
            }
            console.log('Error details:', error.response?.data || error.message);
        } finally {
            setIsLoading(false);
        }
    };    

    return(
        <>
        <div className="loginPage flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-around w-full xl:h-screen lg:h-full bg-mainColor text-secoundColor">
                <div className="w-full flex justify-center">
                        {/* <form className="w-full sm:w-8/12 flex flex-col items-start justify-center gap-10 mt-10" onSubmit={handleSubmit}>
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
                            
                        </form> */}
                <form className="w-full sm:w-10/12 flex flex-col items-start justify-center gap-5" onSubmit={handleSubmit}>
                <div className='flex w-full flex-col text-secoundColor font-bold gap-8 text-4xl lg:text-5xl'>
                    <h1>Sign up to WegoStores</h1>
                    <h1 className='text-3xl lg:text-4xl'>Welcome</h1>
                </div>

                {/* Two Inputs in One Row - Name and Phone */}
                <div className="flex flex-col md:flex-row gap-5 w-full">
                    <div className="relative w-full md:w-1/2">
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full text-secoundColor bg-mainColor border-b-2 border-secoundColor outline-none px-2 py-3 text-2xl font-normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    </div>
                    <div className="relative w-full md:w-1/2">
                    <input
                        type="text"
                        placeholder="Phone"
                        className="w-full text-secoundColor bg-mainColor border-b-2 border-secoundColor outline-none px-2 py-3 text-2xl font-normal"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                    </div>
                </div>

                {/* Email Input */}
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
                <div className="flex flex-col md:flex-row gap-5 w-full">
                {/* Password Input */}
                {/* Password Input */}
                <div className="relative w-full">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="w-full text-secoundColor bg-mainColor border-b-2 border-secoundColor outline-none px-2 py-3 text-2xl font-normal"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                {showPassword ? (
                                    <IoMdEye
                                        className="absolute top-4 right-2 text-2xl text-secoundColor cursor-pointer"
                                        onClick={togglePasswordVisibility}
                                    />
                                ) : (
                                    <IoMdEyeOff
                                        className="absolute top-4 right-2 text-2xl text-secoundColor cursor-pointer"
                                        onClick={togglePasswordVisibility}
                                    />
                                )}
                </div>

                {/* Confirm Password Input */}
                <div className="relative w-full">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        className="w-full text-secoundColor bg-mainColor border-b-2 border-secoundColor outline-none px-2 py-3 text-2xl font-normal"
                        value={confPassword}
                        onChange={(e) => setConfPassword(e.target.value)}
                        required
                    />
                    {showConfirmPassword ? (
                        <IoMdEye
                            className="absolute top-4 right-2 text-2xl text-secoundColor cursor-pointer"
                            onClick={toggleConfirmPasswordVisibility}
                        />
                    ) : (
                        <IoMdEyeOff
                            className="absolute top-4 right-2 text-2xl text-secoundColor cursor-pointer"
                            onClick={toggleConfirmPasswordVisibility}
                        />
                    )}
                </div>

            </div>

                {/* Error Handling */}
                {/* {error && <div className="w-full text-red-500 text-center text-xl mb-4 font-bold">{error}</div>} */}
                {error && (
                <div className="w-full text-red-500 text-center text-lg p-4 bg-red-100 border border-red-500 rounded-md">
                    <strong>{error}</strong>
                </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full mt-5 text-center text-3xl font-medium px-6 py-3 text-mainColor bg-secoundColor rounded-md"
                    disabled={isLoading}
                >
                    SignUp                
                </button>

                <div className='flex flex-col lg:flex-row gap-5 text-2xl font-medium'>
                    <p>I have an account?</p>
                    <Link to="/login_user" className='underline'>
                    Log In
                    </Link>
                </div>
                <div className="flex items-center gap-2 text-xl">
                <input
                    type="checkbox"
                    id="termsCheckbox"
                    className="w-4 h-4 accent-blue-500"
                />
                <label htmlFor="termsCheckbox" className="text-white">
                    I agree to the{" "}
                    <a
                    href="https://example.com/terms-and-conditions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 underline hover:text-blue-400"
                    >
                    Terms and Conditions
                    </a>.
                </label>
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