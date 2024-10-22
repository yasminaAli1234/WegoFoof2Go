
import { useState } from 'react';
import { RiCloseFill, RiMenu2Fill } from 'react-icons/ri';
// import SidebarUser from '../Components/'
// import NavbarUser from '../Components/Navbar'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
       const [isSidebarOpen, setIsSidebarOpen] = useState(false);

       const toggleSidebar = () => {
           setIsSidebarOpen(!isSidebarOpen);
       };

  return (
    <div className="relative flex gap-x-4">
      {/* Fixed Menu Icon for Small Screens */}
      <div className="relative top-0 z-20 lg:hidden bg-[#fff]">
        <button onClick={toggleSidebar} className="text-black p-2 focus:outline-none">
          {isSidebarOpen ? (
            <RiCloseFill className="w-8 h-8 ml-auto z-10" color="black" />
          ) : (
            <RiMenu2Fill className="w-8 h-8" color="black" />
          )}
        </button>
      </div>

      {/* Sidebar that overlays the content on small screens */}
      <SidebarUser isOpen={isSidebarOpen} />

      {/* Main Content Section */}
      <div className={`contentSection md:w-full sm:w-full lg:w-4/5 min-h-screen transition-opacity ${isSidebarOpen ? 'opacity-50' : 'opacity-100'}`}>
                    {/* <HeaderStudent /> */}
                    <NavbarUser />
                    <div className="pl-5">
                        <Outlet />
                    </div>
                </div>
    </div>
  );
};

export default UserLayout;
