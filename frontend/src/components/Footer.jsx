import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 mt-40 my-10 text-sm'>
                <div>
                    <img src={assets.logo} alt="logo" className='mb-5 w-32' />
                    <p className='w-full md:w-2/3 text-gray-600'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius, nesciunt saepe ut incidunt quas ullam voluptas porro sunt velit! Voluptates vel cupiditate esse atque nulla ut suscipit nam tempora assumenda.
                    </p>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <Link to='/'>Home</Link>
                        <Link to='/about'>About Us</Link>
                        <Link to='/orders'>Delivery</Link>
                        <Link to='/'>Privacy Policy</Link>
                    </ul>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>FOLLOW US</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>+91 123-456-7890</li>
                        <li>jaga@gmail.com</li>
                        <li>www.jaga.com</li>
                        <li>Facebook</li>
                    </ul>
                </div>
            </div>

            <div>
                    <hr />
                    <p className='py-5 text-sm text-center'>Copyright 2024@ jaga.com All rights reserved</p>
                </div>
        </div>
    )
}

export default Footer