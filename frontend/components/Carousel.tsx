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

  // layout constants (px)
  // layout constants (px)
  // Match Tailwind `max-w-sm` (24rem = 384px) so cards keep pre-animation size
  const CARD_WIDTH = 384
  const GAP = 12
  const VISIBLE_COUNT = 3

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
    <div className="flex justify-center items-center mt-20">
      <button aria-label="Previous slide" onClick={decrementSlide} className="p-2 mr-4">
        <MdOutlineArrowBackIosNew className='text-5xl text-white'/>
      </button>

      {/* viewport */}
      <div
        className="overflow-hidden bg-transparent"
        style={{ width: `${(CARD_WIDTH * VISIBLE_COUNT) + (GAP * (VISIBLE_COUNT - 1))}px` }}
        aria-roledescription="carousel"
      >
        {/* track */}
        <div
          className="flex items-stretch"
          style={{
            gap: `${GAP}px`,
            transform: `translateX(-${start * (CARD_WIDTH + GAP)}px)`,
            transition: 'transform 400ms ease'
          }}
        >
          {items.map((it, idx) => (
            <div key={`${it.text}-${idx}`} style={{ flex: '0 0 auto', width: `${CARD_WIDTH}px` }}>
              <Offer
                image={it.image}
                text={it.text}
                price={it.price}
                stars={it.stars}
                alt={`${it.text} photo`}
              />
            </div>
          ))}
        </div>
      </div>

      <button aria-label="Next slide" onClick={incrementSlide} className="p-2 ml-4">
        <MdOutlineArrowForwardIos className='text-5xl text-white'/>
      </button>
    </div>
  )
}
