import React from "react";
import logo from '../../../public/Images/logo white.png'

const PublicPage =()=>{
    return(
<div className="bg-mainColor text-secondColor">
      {/* Navigation Bar */}
      <nav className="fixed w-full text-white z-10 ">
        <div className="w-full lg:mt-0 sm:mt-6 flex text-white items-center justify-center border-b-2 py-6 px-4 text-xl font-semibold">
                  <img src={logo} alt="wegoStore" height={200} width={100}/>
         </div>
        <ul className="flex justify-center space-x-8 py-4">
          <li><a href="#section1" className="hover:underline">Section 1</a></li>
          <li><a href="#section2" className="hover:underline">Section 2</a></li>
          <li><a href="#section3" className="hover:underline">Section 3</a></li>
          <li><a href="#section4" className="hover:underline">Section 4</a></li>
          <li><a href="#section5" className="hover:underline">Section 5</a></li>
        </ul>
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