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
  // layout constants (px)
  // Match Tailwind `max-w-sm` (24rem = 384px) so cards keep pre-animation size
  const MAX_CARD_WIDTH = 384
  const GAP = 12
  const VISIBLE_COUNT = 3
  const MAX_VIEWPORT_WIDTH = (MAX_CARD_WIDTH * VISIBLE_COUNT) + (GAP * (VISIBLE_COUNT - 1))

  // dynamic card width (responsive). starts at MAX_CARD_WIDTH and is recalculated
  const [cardWidth, setCardWidth] = React.useState<number>(MAX_CARD_WIDTH)
  const viewportRef = React.useRef<HTMLDivElement | null>(null)

  // trackIndex points into the extended array (with cloned head/tail) and drives transform
  const [trackIndex, setTrackIndex] = useState(VISIBLE_COUNT)
  const [disableTransition, setDisableTransition] = useState(false)

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

  const CLONE_COUNT = VISIBLE_COUNT

  const extended = [
    ...items.slice(-CLONE_COUNT),
    ...items,
    ...items.slice(0, CLONE_COUNT)
  ]

  // update card width when viewport resizes
  React.useEffect(() => {
    const el = viewportRef.current
    if (!el) return
    const update = () => {
      const w = el.clientWidth || MAX_VIEWPORT_WIDTH
      const cw = (w - GAP * (VISIBLE_COUNT - 1)) / VISIBLE_COUNT
      setCardWidth(Math.min(cw, MAX_CARD_WIDTH))
    }

    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // move left (previous)
  function decrementSlide() {
    setTrackIndex(prev => prev - 1)
  }

  // move right (next)
  function incrementSlide() {
    setTrackIndex(prev => prev + 1)
  }

  // when we jump into cloned areas, reset trackIndex to the corresponding real index without transition
  React.useEffect(() => {
    if (!disableTransition) return
    const t = setTimeout(() => setDisableTransition(false), 40)
    return () => clearTimeout(t)
  }, [disableTransition])

  return (
    <div className="flex justify-center items-center mt-20">
      <button aria-label="Previous slide" onClick={decrementSlide} className="p-2 mr-4">
        <MdOutlineArrowBackIosNew className='text-5xl text-white'/>
      </button>

      {/* viewport */}
      <div
        ref={viewportRef}
        className="overflow-hidden bg-transparent"
        style={{ width: '100%', maxWidth: `${MAX_VIEWPORT_WIDTH}px` }}
        aria-roledescription="carousel"
      >
        {/* track */}
        <div
          className="flex items-stretch"
            onTransitionEnd={() => {
              // when we've animated into cloned area, snap to corresponding real index without transition
              if (trackIndex >= len + CLONE_COUNT) {
                setDisableTransition(true)
                setTrackIndex(CLONE_COUNT)
              } else if (trackIndex < CLONE_COUNT) {
                setDisableTransition(true)
                setTrackIndex(len + CLONE_COUNT - 1)
              }
            }}
            style={{
              gap: `${GAP}px`,
              transform: `translateX(-${trackIndex * (cardWidth + GAP)}px)`,
              transition: disableTransition ? 'none' : 'transform 400ms ease'
            }}
        >
          {extended.map((it, idx) => (
            <div key={`${it.text}-${idx}`} style={{ flex: '0 0 auto', width: `${cardWidth}px` }}>
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
