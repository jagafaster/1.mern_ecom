import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      {/* ------------- About Us ------------- */}
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="about" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas eum repellat, rerum soluta eligendi porro, quasi cumque reiciendis consequatur tempora aperiam delectus? Voluptatibus, saepe deserunt magni ullam dolores porro sequi.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt, accusantium animi. Inventore atque quisquam, cumque autem eos laboriosam quia possimus, magnam officiis, earum commodi eaque voluptate asperiores minima qui nesciunt!</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti excepturi molestiae iste fugit aperiam atque maxime similique quibusdam doloribus ut! Consequatur harum minima obcaecati eligendi labore iste placeat perspiciatis voluptatibus.</p>
        </div>
      </div>

      {/* ------------- Why choose us ------------ */}
      <div className='text-xl py-4 '>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        {/* ------------------------ */}
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione, aliquid tempora. Ipsam iusto aliquam, pariatur cum, ratione non ullam perspiciatis explicabo quibusdam itaque dolores nobis sapiente laudantium! Magnam, quaerat unde!</p>
        </div>
        {/* ----------------------------------- */}
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione, aliquid tempora. Ipsam iusto aliquam, pariatur cum, ratione non ullam perspiciatis explicabo quibusdam itaque dolores nobis sapiente laudantium! Magnam, quaerat unde!</p>
        </div>
        {/* ------------------------------------------ */}
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione, aliquid tempora. Ipsam iusto aliquam, pariatur cum, ratione non ullam perspiciatis explicabo quibusdam itaque dolores nobis sapiente laudantium! Magnam, quaerat unde!</p>
        </div>
      </div>

      <NewsletterBox/>

    </div>
  )
}

export default About