import React, { useState ,useEffect} from "react";
import {DemorequestsIcon, DollerIcon, ExtraIcon, HomeIcon, OrderIcon, PaymentIcon, PlanIcon, PromoCodeIcon, SettingIcon, SubscriptionIcon, UserIcon,
    // ProfileIcon,StoreIcon,SubscriptionIcon,DomainIcon,ExtraIcon,PaymentIcon,TutorialIcon
} from "../Icons/AllIcons";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../Context/Auth";
import { Link, useNavigate } from 'react-router-dom'
import { IoIosLogOut } from "react-icons/io";

const MenuSideAdmin = () => {

       const auth = useAuth();
       const navigate = useNavigate();
       const savedState = JSON.parse(localStorage.getItem('sidebarAdminState')) || {};

       const [isActiveHome, setIsActiveHome] =  useState(savedState.isActiveHome ?? true);
       const [isActiveDemoRequest, setIsActiveDemoRequest] =  useState(savedState.isActiveDemoRequest ?? false);
       const [isActivePaymentPending, setIsActivePaymentPending] =  useState(savedState.isActivePaymentPending ?? false);
       const [isActiveOrder, setIsActiveOrder] =  useState(savedState.isActiveOrder ?? false);
       const [isActiveUser, setIsActiveUser] =  useState(savedState.isActiveUser ?? false);
       const [isActiveSubscription, setIsActiveSubscription] =  useState(savedState.isActiveSubscription ?? false);
       const [isActivePlan, setIsActivePlan] =  useState(savedState.isActivePlan ?? false);
       const [isActiveExtra, setIsActiveExtra] =  useState(savedState.isActiveExtra ?? false);
       const [isActivePayment, setIsActivePayment] =  useState(savedState.isActivePayment ?? false);

       const [isActiveSetting, setIsActiveSetting] =  useState(savedState.isActiveSetting ?? false);
              const [isActiveSettingList, setIsActiveSettingList] =  useState(savedState.isActiveSettingList ?? false);
              const [isActivePaymentMethod, setIsActivePaymentMethod] =  useState(savedState.isActivePaymentMethod ?? false);
              const [isActivePromoCode, setIsActivePromoCode] =  useState(savedState.isActivePromoCode ?? false);


       const handleLogout = () => {
              auth.logout();
              // navigate("/", { replace: true });
       }

       useEffect(() => {
              const sidebarAdminState = {
                     isActiveHome,isActiveDemoRequest,isActivePaymentPending,
                     isActiveOrder,isActiveUser,isActiveSubscription,isActivePlan,
                     isActiveExtra,isActivePayment,isActiveSetting,isActiveSettingList,isActivePromoCode
              };
              localStorage.setItem('sidebarAdminState', JSON.stringify(sidebarAdminState));
       }, [isActiveHome,isActiveDemoRequest,isActivePaymentPending,
           isActiveOrder,isActiveUser,isActiveSubscription,isActivePlan,
           isActiveExtra,isActivePayment,isActiveSetting,isActiveSettingList,isActivePromoCode
       ]);

       const handleClickHome = () => {
              setIsActiveHome(true);
              setIsActiveDemoRequest(false)
              setIsActivePaymentPending(false)
              setIsActiveOrder(false)
              setIsActiveUser(false)
              setIsActiveSubscription(false)
              setIsActivePlan(false)
              setIsActiveExtra(false)
              setIsActivePayment(false)
              setIsActiveSetting(false)
              setIsActiveSettingList(false)
              setIsActivePaymentMethod(false)
              setIsActivePromoCode(false)
       };
       const handleClickDemoRequest = () => {
              setIsActiveHome(false);
              setIsActiveDemoRequest(true)
              setIsActivePaymentPending(false)
              setIsActiveOrder(false)
              setIsActiveUser(false)
              setIsActiveSubscription(false)
              setIsActivePlan(false)
              setIsActiveExtra(false)
              setIsActivePayment(false)
              setIsActiveSetting(false)
              setIsActiveSettingList(false)
              setIsActivePaymentMethod(false)
              setIsActivePromoCode(false)
       };
       const handleClickPaymentPending =() =>{
              setIsActiveHome(false);
              setIsActiveDemoRequest(false)
              setIsActivePaymentPending(true)
              setIsActiveOrder(false)
              setIsActiveUser(false)
              setIsActiveSubscription(false)
              setIsActivePlan(false)
              setIsActiveExtra(false)
              setIsActivePayment(false)
              setIsActiveSetting(false)
              setIsActiveSettingList(false)
              setIsActivePaymentMethod(false)
              setIsActivePromoCode(false)
       }
       const handleClickOrder=() =>{
              setIsActiveHome(false);
              setIsActiveDemoRequest(false)
              setIsActivePaymentPending(false)
              setIsActiveOrder(true)
              setIsActiveUser(false)
              setIsActiveSubscription(false)
              setIsActivePlan(false)
              setIsActiveExtra(false)
              setIsActivePayment(false)
              setIsActiveSetting(false)
              setIsActiveSettingList(false)
              setIsActivePaymentMethod(false)
              setIsActivePromoCode(false)
       }
       const handleClickUser =() =>{
              setIsActiveHome(false);
              setIsActiveDemoRequest(false)
              setIsActivePaymentPending(false)
              setIsActiveOrder(false)
              setIsActiveUser(true)
              setIsActiveSubscription(false)
              setIsActivePlan(false)
              setIsActiveExtra(false)
              setIsActivePayment(false)
              setIsActiveSetting(false)
              setIsActiveSettingList(false)
              setIsActivePaymentMethod(false)
              setIsActivePromoCode(false)
       }
       const handleClickSubscription =() =>{
              setIsActiveHome(false);
              setIsActiveDemoRequest(false)
              setIsActivePaymentPending(false)
              setIsActiveOrder(false)
              setIsActiveUser(false)
              setIsActiveSubscription(true)
              setIsActivePlan(false)
              setIsActiveExtra(false)
              setIsActivePayment(false)
              setIsActiveSetting(false)
              setIsActiveSettingList(false)
              setIsActivePaymentMethod(false)
              setIsActivePromoCode(false)
       }
       const handleClickPlan =() =>{
              setIsActiveHome(false);
              setIsActiveDemoRequest(false)
              setIsActivePaymentPending(false)
              setIsActiveOrder(false)
              setIsActiveUser(false)
              setIsActiveSubscription(false)
              setIsActivePlan(true)
              setIsActiveExtra(false)
              setIsActivePayment(false)
              setIsActiveSetting(false)
              setIsActiveSettingList(false)
              setIsActivePaymentMethod(false)
              setIsActivePromoCode(false)
       }
       const handleClickExtra =() =>{
              setIsActiveHome(false);
              setIsActiveDemoRequest(false)
              setIsActivePaymentPending(false)
              setIsActiveOrder(false)
              setIsActiveUser(false)
              setIsActiveSubscription(false)
              setIsActivePlan(false)
              setIsActiveExtra(true)
              setIsActivePayment(false)
              setIsActiveSetting(false)
              setIsActiveSettingList(false)
              setIsActivePaymentMethod(false)
              setIsActivePromoCode(false)
       }
       const handleClickPayment =() =>{
              setIsActiveHome(false);
              setIsActiveDemoRequest(false)
              setIsActivePaymentPending(false)
              setIsActiveOrder(false)
              setIsActiveUser(false)
              setIsActiveSubscription(false)
              setIsActivePlan(false)
              setIsActiveExtra(false)
              setIsActivePayment(true)
              setIsActiveSetting(false)
              setIsActiveSettingList(false)
              setIsActivePaymentMethod(false)
              setIsActivePromoCode(false)
       }
       const handleClickSetting =() =>{
              setIsActiveHome(false);
              setIsActiveDemoRequest(false)
              setIsActivePaymentPending(false)
              setIsActiveOrder(false)
              setIsActiveUser(false)
              setIsActiveSubscription(false)
              setIsActivePlan(false)
              setIsActiveExtra(false)
              setIsActivePayment(false)
              setIsActiveSetting(true)
              setIsActiveSettingList(true)
              setIsActiveSetting(true)
              setIsActivePromoCode(false)
       }
       const handleClickPaymentMethod =() =>{
              setIsActiveHome(false);
              setIsActiveDemoRequest(false)
              setIsActivePaymentPending(false)
              setIsActiveOrder(false)
              setIsActiveUser(false)
              setIsActiveSubscription(false)
              setIsActivePlan(false)
              setIsActiveExtra(false)
              setIsActivePayment(false)
              setIsActiveSettingList(true)
              setIsActiveSetting(false)
              setIsActivePaymentMethod(true)
              setIsActivePromoCode(false)
       }
       const handleClickPromoCode =() =>{
              setIsActiveHome(false);
              setIsActiveDemoRequest(false)
              setIsActivePaymentPending(false)
              setIsActiveOrder(false)
              setIsActiveUser(false)
              setIsActiveSubscription(false)
              setIsActivePlan(false)
              setIsActiveExtra(false)
              setIsActivePayment(false)
              setIsActiveSettingList(true)
              setIsActiveSetting(false)
              setIsActivePaymentMethod(false)
              setIsActivePromoCode(true)
       }
       return (
              <>
                     <div className="w-full h-full mt-3 flex justify-center mb-10">
                            <div className="MenuSide w-5/6 flex flex-col items-center gap-y-4">                      
                                   <Link to="/dashboard_admin" onClick={handleClickHome} className={`${isActiveHome ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}>
                                          <HomeIcon isActive={isActiveHome} />
                                          <span className={`${isActiveHome ? "text-mainColor" : "text-secoundColor"} text-xl font-medium`}>Home</span>
                                   </Link>
                                   <Link to="demo_request" onClick={handleClickDemoRequest} className={`${isActiveDemoRequest ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}>
                                          <DemorequestsIcon isActive={isActiveDemoRequest} />
                                          <span className={`${isActiveDemoRequest ? "text-mainColor" : "text-secoundColor"} text-xl font-medium`}>Demo Requests</span>
                                   </Link>
                                   <Link to="pending_payment" onClick={handleClickPaymentPending} className={`${isActivePaymentPending ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}>
                                          <DollerIcon isActive={isActivePaymentPending} />
                                          <span className={`${isActivePaymentPending ? "text-mainColor" : "text-secoundColor"} text-xl font-medium`}>Payment Pending</span>
                                   </Link>
                                   <Link to="order" onClick={handleClickOrder} className={`${isActiveOrder ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}>
                                          <OrderIcon isActive={isActiveOrder} />
                                          <span className={`${isActiveOrder ? "text-mainColor" : "text-secoundColor"} text-xl font-medium`}>Order</span>
                                   </Link> 
                                   <Link to="user" onClick={handleClickUser} className={`${isActiveUser ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}>
                                          <UserIcon isActive={isActiveUser} />
                                          <span className={`${isActiveUser ? "text-mainColor" : "text-secoundColor"} text-xl font-medium`}>User</span>
                                   </Link> 
                                   <Link to="subscription" onClick={handleClickSubscription} className={`${isActiveSubscription ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}>
                                          <SubscriptionIcon isActive={isActiveSubscription} />
                                          <span className={`${isActiveSubscription ? "text-mainColor" : "text-secoundColor"} text-xl font-medium`}>Subscriptions</span>
                                   </Link>
                                   <Link to="plan" onClick={handleClickPlan} className={`${isActivePlan ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}>
                                          <PlanIcon isActive={isActivePlan} />
                                          <span className={`${isActivePlan ? "text-mainColor" : "text-secoundColor"} text-xl font-medium`}>plan</span>
                                   </Link> 

                                   <Link to="extra_product" onClick={handleClickExtra} className={`${isActiveExtra ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}>
                                          <ExtraIcon isActive={isActiveExtra} />
                                          <span className={`${isActiveExtra ? "text-mainColor" : "text-secoundColor"} text-xl font-medium`}>Extras Product</span>
                                   </Link>
                                   <Link to="payment" onClick={handleClickPayment} className={`${isActivePayment ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}>
                                          <PaymentIcon isActive={isActivePayment} />
                                          <span className={`${isActivePayment ? "text-mainColor" : "text-secoundColor"} text-xl font-medium`}>Payment</span>
                                   </Link>
                                  
                                   {/* <Link to="setting" onClick={handleClickSetting} className={`${isActiveSetting ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}>
                                          <SettingIcon isActive={isActiveSetting} />
                                          <span className={`${isActiveSetting ? "text-mainColor" : "text-secoundColor"} text-xl font-medium`}>Settings</span>
                                   </Link>   */}

                                   <>
                                   <Link to="payment_method" onClick={handleClickSetting} className={`${isActiveSetting ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}>
                                          <SettingIcon isActive={isActiveSetting} />
                                          <span className={`${isActiveSetting ? "text-mainColor" : "text-secoundColor"} text-xl font-medium`}>Settings</span>
                                   </Link>
                                   <div className={`${isActiveSettingList ? "h-25" : "h-0 overflow-hidden"} w-full transition-all duration-500`}>
                                          <ul className={`${isActiveSettingList ? "h-full overflow-hidden" : "h-0 overflow-hidden"} listUser ml-10 bg-blacks transition-all duration-700 flex flex-col gap-y-2`} >
                                                 <Link to="payment_method" onClick={handleClickPaymentMethod} className={`${isActivePaymentMethod ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}>
                                                        <PromoCodeIcon isActive={isActivePaymentMethod} />
                                                        <span className={`${isActivePaymentMethod ? "text-mainColor" : "text-secoundColor"} text-xl font-medium`}>Payment Method</span>
                                                 </Link> 
                                                 <Link to="promocode" onClick={handleClickPromoCode} className={`${isActivePromoCode ? 'active' : ''} w-full flex items-center justify-start px-0 py-2 gap-x-5`}>
                                                        <PromoCodeIcon isActive={isActivePromoCode} />
                                                        <span className={`${isActivePromoCode ? "text-mainColor" : "text-secoundColor"} text-xl font-medium`}>PromoCode</span>
                                                 </Link> 
                                          </ul>
                                   </div>
                                   </>
                                   <Link to="/" onClick={handleLogout} className="w-full flex items-center justify-start px-0 py-2 gap-x-5">
                                          <IoIosLogOut size={23} style={{ strokeWidth: 2 }} color="#ffff"/>
                                          <span className="text-secoundColor text-xl font-medium">Log Out</span>
                                   </Link>
                            </div>
                     </div>
              </>
       );
};

export default MenuSideAdmin;
