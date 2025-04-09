import React, { use, useEffect } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'


const SearchBar = () => {

    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const location = useLocation();

    useEffect(() => {
        if(location.pathname === '/collection'){
            setShowSearch(true);
        } else{
            setShowSearch(false);
        }
    }, [location])

  return showSearch? (
    <div className='border-t border-b bg-gray-50 text-center'>
        <div className='inline-flex item-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
            <input value={search} onChange={(e)=>setSearch(e.target.value)} type="text" placeholder='Search'className='flex-1 outline-none bg-inherit text-sm'/>
            <img src={assets.search_icon} alt="search" className='w-5'/>
        </div>
        <img src={assets.cross_icon} alt="close" className='inline w-3 cursor-pointer' onClick={()=>setShowSearch(false)}/>
    </div>
  ): null
}

export default SearchBar