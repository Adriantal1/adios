import React from 'react'
import Image, { StaticImageData } from 'next/image'

export default function Offer({ image, text }:{ image: StaticImageData, text: string }) {
  return (
    <div className='bg-white mt-20 p-5 max-w-sm flex justify-center mx-3 rounded-lg text-center shadow-md'>
      <ul>
      <li><Image src={image} alt=""/></li>
      <li>{text}</li>
      </ul>
    </div>
  )
}
