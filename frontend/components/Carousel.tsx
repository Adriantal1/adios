import React from 'react'
import Offer from '@/components/Offer'
import Egypt from '@/public/images/egipt.png'
import France from '@/public/images/francja.png'
import Bulgaria from '@/public/images/bulgaria.png'
import { MdOutlineArrowForwardIos } from 'react-icons/md'

export default function Carousel() {
  return (
    <div>
      <ul className='flex justify-center'>
        <li><MdOutlineArrowForwardIos /></li>
        <li><Offer image={Egypt} text="Egypt"/></li>
        <li><Offer image={France} text="France"/></li>
        <li><Offer image={Bulgaria} text="Bulgaria"/></li>
        <li></li>
      </ul>
    </div>
  )
}
