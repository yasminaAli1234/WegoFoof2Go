import React from "react";
import logo from '../../../public/Images/logo white.png'
import { Button } from "../../Components/Button";
import { Link } from 'react-router-dom'

const PublicPage =()=>{
    return(
<div className="bg-mainColor text-secondColor">
      {/* Navigation Bar */}
      <nav className="fixed w-full flex justify-between text-white bg-mainColor z-10">
        <div className="w-2/6 lg:w-1/4 lg:mt-0  flex text-white items-center justify-center py-6 px-4 text-xl font-semibold">
                  <img src={logo} alt="wegoStore" height={200} width={200}/>
         </div>
        <ul className="hidden lg:flex w-2/4 justify-center space-x-8 py-4">
          <li><a href="#section1" className="hover:underline">Section 1</a></li>
          <li><a href="#section2" className="hover:underline">Section 2</a></li>
          <li><a href="#section3" className="hover:underline">Section 3</a></li>
          <li><a href="#section4" className="hover:underline">Section 4</a></li>
          <li><a href="#section5" className="hover:underline">Section 5</a></li>
        </ul>
        <div className="flex py-4 gap-5 w-4/6 lg:w-1/4">
           <Link to="/login_user">
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
        Section 1
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