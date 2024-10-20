import React from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import TitleHeader from './TitleHeader'

const HeaderPageSection = ({ handleClick, name, size }) => {
       return (
              <>
                     <div className="w-full flex items-center justify-start mb-10">
                            <button type='button' className='' onClick={handleClick}>
                                   <IoIosArrowDown className="rotate-90 text-mainColor text-5xl" />
                            </button>
                            <div className="w-full text-center">
                                   <TitleHeader text={name} size={size}/>
                            </div>
                     </div>
              </>
       )
}

export default HeaderPageSection