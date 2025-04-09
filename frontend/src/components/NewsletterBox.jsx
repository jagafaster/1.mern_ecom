import React from 'react'

const NewsletterBox = () => {

    const onSubmitHandler = (event) => {
        // handle form submission
        event.preventDefault();
    }

    return (
        <div>
            <div className='text-center'>
                <p className='text-3xl font-semibold text-gray-800'>Subscribe to our newsletter</p>
                <p className='text-gray-500 mt-3 mb-3'>Get updates on our latest products and sales</p>
            </div>

            <form onClick={onSubmitHandler} className='w-full sm:w-1/2 items-center mx-auto flex gap-3 mt-10 my-6-8 border pl-3'>
                <input type="email" name="mail" id="mail" placeholder='Enter your email' className='w-full sm:flex-1 outline-none' required/>
                <button type="submit" className='bg-black text-white text-xs px-10 py-4 cursor-pointer'>SUBSCRIBE</button>
            </form>
        </div>
    )
}

export default NewsletterBox