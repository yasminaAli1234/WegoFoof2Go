import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../Context/Auth'

const Navbar = () => {
       const auth = useAuth()

       return (
           <>
                     <div className="flex lg:mr-0 sm:ml-12 lg:ml-0 items-center justify-between py-2 px-4 bg-white mb-10">
                            <div className='w-full flex items-center justify-start gap-5'>
                                   {/* image profile */}
                                   <div>
                                          {/* <img src={`data:image/jpeg;base64,${auth.user.data.image}`} className='w-20 h-20 rounded-full object-cover object-center' alt="Profile" /> */}
                                   </div>
                                   {/* Name Admin */}
                                   <div>
                                          <span className='text-3xl text-mainColor font-bold flex'>Hello, 
                                            {/* <span className='font-semibold text-[#000]'>{auth.user.data.name}</span> */}
                                            </span>
                                   </div>
                            </div>
                    </div>
              </>
       )
}

export default Navbar