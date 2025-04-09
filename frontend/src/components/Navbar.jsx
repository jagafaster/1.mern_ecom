import React, { useContext } from 'react'
import { useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {

    const [visible, setVisible] = useState(false);
    const { showSearch, setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);
    const logout = () => {
        navigate('/login');
        localStorage.removeItem('token');
        setToken('');
        setCartItems({});
    }

    return (
        <div className='flex justify-between items-center py-5 font-medium'>

            <Link to='/'><img src={assets.logo} alt="logo" className='w-36' /></Link>

            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>

                <NavLink to='/' className='flex flex-col items-center gap-1' onClick={() => setVisible(false)}>
                    <p>HOME</p>
                    <hr className='w-3/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>

                <NavLink to='/collection' className='flex flex-col items-center gap-1' onClick={() => setVisible(false)}>
                    <p>COLLECTION</p>
                    <hr className='w-3/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>

                <NavLink to='/about' className='flex flex-col items-center gap-1' onClick={() => setVisible(false)}>
                    <p>ABOUT</p>
                    <hr className='w-3/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>

                <NavLink to='/contact' className='flex flex-col items-center gap-1' onClick={() => setVisible(false)}>
                    <p>CONTACT</p>
                    <hr className='w-3/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>

            </ul>

            <div className='flex items-center gap-6'>
                <img onClick={() => setShowSearch(!showSearch)} src={assets.search_icon} alt="search" className='w-5 cursor-poiner' />

                <div className='group relavite'>
                    <img onClick={() => token ? null : navigate('/login')} src={assets.profile_icon} alt="user" className='w-5 cursor-pointer' />

                    {/* {Dropdown Menu} */}
                    {token &&
                        <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                            <div className='flex flex-col mr-15 gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                                {/* <p className='cursor-pointer hover:text-black'>My Profile</p> */}
                                <p onClick={() => navigate('/my-profile')} className='cursor-pointer hover:text-black'>My Profile</p>
                                <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                                <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                            </div>
                        </div>}

                </div>

                <Link to='/cart' className='relative'>
                    <img src={assets.cart_icon} alt="cart" className='w-5 min-w-5' />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] '>{getCartCount()}</p>
                </Link>

                <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="menu" />
            </div>

            {/* sidebar menu for small screena */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all duration-300 ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col items-center gap-5 text-sm text-gray-600 py-5'>

                    <div className='relative flex justify-end w-full px-4 pt-3'>
                        <img onClick={() => setVisible(false)} src={assets.menu_icon} className='w-5 cursor-pointer' alt="close" />
                    </div>


                    <NavLink onClick={() => setVisible(false)} to='/' className='flex flex-col items-center gap-1'>
                        <p>HOME</p>
                        <hr className='w-3/4 border-none h-[1.5px] bg-gray-700 hidden' />
                    </NavLink>

                    <NavLink onClick={() => setVisible(false)} to='/collection' className='flex flex-col items-center gap-1'>
                        <p>COLLECTION</p>
                        <hr className='w-3/4 border-none h-[1.5px] bg-gray-700 hidden' />
                    </NavLink>

                    <NavLink onClick={() => setVisible(false)} to='/about' className='flex flex-col items-center gap-1'>
                        <p>ABOUT</p>
                        <hr className='w-3/4 border-none h-[1.5px] bg-gray-700 hidden' />
                    </NavLink>

                    <NavLink onClick={() => setVisible(false)} to='/contact' className='flex flex-col items-center gap-1'>
                        <p>CONTACT</p>
                        <hr className='w-3/4 border-none h-[1.5px] bg-gray-700 hidden' />
                    </NavLink>

                </div>
            </div>

        </div>
    )
}

export default Navbar