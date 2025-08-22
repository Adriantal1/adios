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
  // start is the index of the left-most visible item
  const [start, setStart] = useState(0)

  const items = [
    { image: Egypt, text: 'Egypt', price: 3000, stars: 4},
    { image: France, text: 'France', price: 2500, stars: 5 },
    { image: Bulgaria, text: 'Bulgaria', price: 1501, stars: 4 },
    { image: Malta, text: 'Malta', price: 1329, stars: 4 },
    { image: Italy, text: 'Italy', price: 1788, stars: 5 },
    { image: Cyprus, text: 'Cyprus', price: 1699, stars: 3 },
    { image: Czechia, text: 'Czechia', price: 1058, stars: 4 },
    { image: Iceland, text: 'Iceland', price: 8219, stars: 5 },
    { image: Poland, text: 'Poland', price: 319, stars: 0 },
  ]

  const len = items.length

  function decrementSlide() {
    setStart(prev => (prev - 1 + len) % len)
  }

  function incrementSlide() {
    setStart(prev => (prev + 1) % len)
  }

  return (
    <div>
  <ul className='flex justify-center items-center mt-20' role="list" aria-label="Featured destinations">
        <li>
          <button aria-label="Previous slide" onClick={decrementSlide} className="p-2">
            <MdOutlineArrowBackIosNew className='text-7xl text-white'/>
          </button>
        </li>
        {[
          items[start % len],
          items[(start + 1) % len],
          items[(start + 2) % len]
        ].map((it, idx) => (
          <li key={it.text} className="mx-1">
            <Offer
              image={it.image}
              text={it.text}
              price={it.price}
              stars={it.stars}
              alt={`${it.text} photo`}
            />
          </li>
        ))}
        <li>
          <button aria-label="Next slide" onClick={incrementSlide} className="p-2">
            <MdOutlineArrowForwardIos className='text-7xl text-white'/>
          </button>
        </li>
      </ul>
    </div>
  )
}
