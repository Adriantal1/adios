'use client'

import React, { useState } from 'react'
import Offer from '@/components/Offer'
import Egypt from '@/public/images/egipt.png'
import France from '@/public/images/francja.png'
import Bulgaria from '@/public/images/bulgaria.png'
import Malta from '@/public/images/malta.png'
import Italy from '@/public/images/wlochy.png'
import Cyprus from '@/public/images/cypr.png'
import Czechia from '@/public/images/czechy.png'
import Iceland from '@/public/images/islandia.png'
import Poland from '@/public/images/polska.png'
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIosNew } from 'react-icons/md'

export default function Carousel() {
  const [slide, setSlide] = useState(0)

  const pictures = [
    [{ image: Egypt, text: 'Egypt' }, { image: France, text: 'France' }, { image: Bulgaria, text: 'Bulgaria' }],
    [{ image: Malta, text: 'Malta' }, { image: Italy, text: 'Italy' }, { image: Cyprus, text: 'Cyprus' }],
    [{ image: Czechia, text: 'Czechia' }, { image: Iceland, text: 'Iceland' }, { image: Poland, text: 'Poland' }],
  ]

  function decrementSlide() {
    if (slide>0) {
      setSlide(prevSlide => prevSlide - 1)
    }
    else setSlide(pictures.length-1)
  }

  function incrementSlide() {
    console.log(slide)
    if (slide<pictures.length-1) {
      setSlide(prevSlide => prevSlide + 1)
      console.log(slide)
    }
    else setSlide(0)
  }

  return (
    <div>
      <ul className='flex justify-center items-center mt-20'>
        <li><button><MdOutlineArrowBackIosNew onClick={decrementSlide} className='text-7xl text-white'/></button></li>
        <li><Offer image={pictures[slide][0].image} text={pictures[slide][0].text} /></li>
        <li><Offer image={pictures[slide][1].image} text={pictures[slide][1].text} /></li>
        <li><Offer image={pictures[slide][2].image} text={pictures[slide][2].text} /></li>
        <li><button><MdOutlineArrowForwardIos onClick={incrementSlide} className='text-7xl text-white'/></button></li>
      </ul>
    </div>
  )
}
