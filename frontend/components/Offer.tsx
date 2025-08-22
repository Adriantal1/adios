import React from 'react'
import Image, { StaticImageData } from 'next/image'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

export default function Offer({ image, text, price, stars, alt }:{ image: StaticImageData, text: string, price: number, stars: number, alt?: string }) {
  function getRating() {
    const ratings = []

    for(let i = 0; i < 5; i++) {
      if(i < stars) {
  ratings.push(<AiFillStar key={i} />)
      }
      else {
  ratings.push(<AiOutlineStar key={i} />)
      }
    }

    return ratings
  }
  
  return (
    <div className='bg-white p-5 max-w-sm flex justify-center mx-3 rounded-lg text-center shadow-md'>
  <ul>
  <li><Image src={image} alt={alt ?? text} /></li>
      <li>{text}</li>
      <li>Od {price} zł za osobę</li>
      <li className='flex justify-center text-2xl text-yellow-400'>{getRating().map(rating => rating)}</li>
      </ul>
    </div>
  )
}
