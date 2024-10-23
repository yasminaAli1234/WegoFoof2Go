import React from 'react'
import { IoSearch } from 'react-icons/io5'

const SearchBar = ({ type = "text", bg, pr, value, handleChange, placeholder = 'Search' }) => {
       return (
              <div className='w-full relative border border-mainColor rounded-3xl'>
                     <input type={type} name="search" onChange={handleChange} value={value} className={`bg-${bg} w-full h-full pl-12 py-3 rounded-3xl outline-none font-medium text-mainColor ${pr}`} placeholder={placeholder} />
                     <IoSearch className='absolute top-3 left-4 text-mainColor font-bold text-xl' />

              </div>
       )
}

export default SearchBar