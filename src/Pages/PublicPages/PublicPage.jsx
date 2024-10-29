import React from "react";
import logo from '../../../public/Images/logo white.png'
import { Button } from "../../Components/Button";
import { Link } from 'react-router-dom'
import homeImage from '../../../public/Images/homeImage.png'
const PublicPage =()=>{
    return(
<div className="bg-mainColor text-secondColor">
      {/* Navigation Bar */}
      <nav className="fixed w-full flex justify-between text-white bg-mainColor z-10">
        <div className="w-2/6 lg:w-1/4 lg:mt-0  flex text-white items-center justify-center py-4 px-4 text-xl font-semibold">
                  <img src={logo} alt="wegoStore" height={100} width={300}/>
         </div>
        <ul className="hidden mt-5 lg:flex w-2/4 justify-center space-x-8 py-4">
          <li><a href="#section1" className="text-2xl hover:underline">Home</a></li>
          <li><a href="#section2" className="text-2xl hover:underline">About Us</a></li>
          <li><a href="#section3" className="text-2xl hover:underline">Our features</a></li>
          <li><a href="#section4" className="text-2xl hover:underline">Plan</a></li>
          <li><a href="#section5" className="text-2xl hover:underline">Contact Us</a></li>
        </ul>
        <div className="flex py-4 gap-5 w-4/6 lg:w-1/4">
           <Link to="/login">
              <button className="text-2xl font-medium py-2 px-2 lg:py-4 lg:px-6 border rounded-xl hover:bg-secoundColor hover:text-mainColor">
                Login
              </button>
           </Link>
           <Link to="/signUp">
              <button className="text-2xl font-medium py-2 px-2 lg:py-4 lg:px-6  border rounded-xl hover:bg-secoundColor hover:text-mainColor">
                Sign Up
              </button>
           </Link>
        </div>
      </nav>

      {/* Sections */}
      <section id="section1" className="h-screen flex items-center justify-center text-white text-3xl">
        <div className="w-full flex flex-col gap-5 justify-center">
          <div className="w-full flex justify-center">
            <img src={homeImage} alt="" className="w-full lg:w-1/6 lg:h-1/6"/>
          </div>
          <h1 className="font-semibold text-2xl lg:text-5xl text-center">Design Your Perfect Website in One Click!</h1>
          <div className="w-full flex justify-center">
          <p className="font-normal text-2xl text-center w-5/6">Enjoy a fast and easy process to create a stunning website that reflects your
             identity, with our flexible packages ensuring you a unique experience in no
             time. Choose what suits you and start your digital journey with confidence!
          </p> 
          </div>
        </div>
      </section>
      <section id="section2" className="h-screen flex items-center justify-center text-white text-3xl">
        Section 2
      </section>
      <section id="section3" className="h-screen flex items-center justify-center text-white text-3xl">
        Section 3
      </section>
      <section id="section4" className="h-screen flex items-center justify-center text-white text-3xl">
        Section 4
      </section>
      <section id="section5" className="h-screen flex items-center justify-center text-white text-3xl">
        Section 5
      </section>
    </div>

    )
}

export default PublicPage;