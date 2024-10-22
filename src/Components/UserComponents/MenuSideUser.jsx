import React, { useState ,useEffect} from "react";
import {
       HomeIcon
} from "./Icons/All_Icons";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Context/Auth";
import { Link, useNavigate } from 'react-router-dom'
import { IoIosLogOut } from "react-icons/io";

const MenuSide = () => {

       const auth = useAuth();
       const navigate = useNavigate();
       const savedState = JSON.parse(localStorage.getItem('sidebarUserState')) || {};

       const [isActiveHome, setIsActiveHome] =  useState(savedState.isActiveHome ?? true);

     
    //    const handleLogout = () => {
    //           auth.logout();
    //           // navigate("/", { replace: true });
    //    }

       useEffect(() => {
           console.log(auth.user.role)
           console.log(Premission)
              }
       , [])

       useEffect(() => {
              const sidebarUserState = {
                     isActiveHome,
              };
              localStorage.setItem('sidebarUserState', JSON.stringify(sidebarUserState));
       }, [isActiveHome]);

       const handleClickHome = () => {
              setIsActiveHome(true);
       };

       return (
              <>
                     <div className="w-full h-full mt-3 flex justify-center mb-10">
                            <div className="MenuSide w-5/6 flex flex-col items-center gap-y-4">                      
                                   <Link to="/dashboard" onClick={handleClickHome} className={`${isActiveHome ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}>
                                          <HomeIcon isActive={isActiveHome} />
                                          <span className={`${isActiveHome ? "text-mainColor" : "text-secoundColor"} text-xl font-medium`}>Home</span>
                                   </Link>
                                             
                            </div>
                     </div>
              </>
       );
};

export default MenuSide;
