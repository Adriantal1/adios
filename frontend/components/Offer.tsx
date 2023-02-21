import React from 'react'
import Image, { StaticImageData } from 'next/image'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

export default function Offer({ image, text, price, stars }:{ image: StaticImageData, text: string, price: number, stars: number }) {
  function getRating() {
    const ratings = []

    for(let i = 0; i < 5; i++) {
      if(i < stars) {
        ratings.push(<AiFillStar />)
      }
      else {
        ratings.push(<AiOutlineStar />)
      }
    }

    return ratings
  }
  
  return (
    <div className='bg-white p-5 max-w-sm flex justify-center mx-3 rounded-lg text-center shadow-md'>
      <ul>
      <li><Image src={image} alt=""/></li>
      <li>{text}</li>
      <li>Od {price} zł za osobę</li>
      <li className='flex justify-center text-2xl text-yellow-400'>{getRating().map(rating => rating)}</li>
      </ul>
    </div>
  )
}
