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

  // widthPercent is the percent width per item (3 items visible)
  const widthPercent = 100 / 3

  return (
    <div className="mt-20">
      <div className="relative">
        <button aria-label="Previous slide" onClick={decrementSlide} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2">
          <MdOutlineArrowBackIosNew className='text-5xl text-white'/>
        </button>

        <div className="overflow-hidden">
          <div
            className="flex will-change-transform"
            style={{
              width: `${(len) * 100 / 3}%`,
              transform: `translateX(-${start * widthPercent}%)`,
              transition: 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1)'
            }}
          >
            {items.map((it) => (
              <div key={it.text} className="flex-shrink-0" style={{ width: `${widthPercent}%` }}>
                <div className="px-2">
                  <Offer
                    image={it.image}
                    text={it.text}
                    price={it.price}
                    stars={it.stars}
                    alt={`${it.text} photo`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button aria-label="Next slide" onClick={incrementSlide} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2">
          <MdOutlineArrowForwardIos className='text-5xl text-white'/>
        </button>
      </div>
    </div>
  )
}
