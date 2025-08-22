'use client'
'use client'

import React from 'react'
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
  const MAX_CARD_WIDTH = 384
  const GAP = 12
  const VISIBLE_COUNT = 3
  const MAX_VIEWPORT_WIDTH = (MAX_CARD_WIDTH * VISIBLE_COUNT) + (GAP * (VISIBLE_COUNT - 1))

  // dynamic card width (responsive). starts at MAX_CARD_WIDTH and is recalculated
  const [cardWidth, setCardWidth] = React.useState<number>(MAX_CARD_WIDTH)
  const viewportRef = React.useRef<HTMLDivElement | null>(null)

  // trackIndex points into the extended array (with cloned head/tail) and drives transform
  const [trackIndex, setTrackIndex] = React.useState(VISIBLE_COUNT)
  const [disableTransition, setDisableTransition] = React.useState(false)
  // prevent rapid clicks while a transition (or snap) is running
  const [isAnimating, setIsAnimating] = React.useState(false)

  type CarouselItem = {
    image: any
    text: string
    price: number
    stars: number
  }

  const items: CarouselItem[] = [
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
    if (isAnimating) return
    setIsAnimating(true)
    setTrackIndex(prev => prev - 1)
  }

  // move right (next)
  function incrementSlide() {
    if (isAnimating) return
    setIsAnimating(true)
    setTrackIndex(prev => prev + 1)
  }

  // when we jump into cloned areas, reset trackIndex to the corresponding real index without transition
  function handleTransitionEnd() {
    if (trackIndex >= len + CLONE_COUNT) {
      // animated into cloned tail — snap to real start
      setDisableTransition(true)
      setTrackIndex(CLONE_COUNT)
    } else if (trackIndex < CLONE_COUNT) {
      // animated into cloned head — snap to real end
      setDisableTransition(true)
      setTrackIndex(len + CLONE_COUNT - 1)
    }
    // always clear animating flag when a transition finishes
    setIsAnimating(false)
  }

  // when a snap without transition completes, re-enable transitions
  React.useEffect(() => {
    if (!disableTransition) return
    const t = requestAnimationFrame(() => {
      // next frame ensure DOM has applied the non-transitioned transform
      setDisableTransition(false)
    })
    return () => cancelAnimationFrame(t)
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
          onTransitionEnd={handleTransitionEnd}
          style={{
            gap: `${GAP}px`,
            transform: `translateX(-${trackIndex * (cardWidth + GAP)}px)`,
            transition: disableTransition ? 'none' : 'transform 400ms ease'
          }}
        >
          {extended.map((it, idx) => {
            const isClone = idx < CLONE_COUNT || idx >= CLONE_COUNT + len
            return (
              <div
                key={`${it.text}-${idx}`}
                style={{ flex: '0 0 auto', width: `${cardWidth}px` }}
                aria-hidden={isClone}
                tabIndex={isClone ? -1 : undefined}
              >
                <Offer
                  image={it.image}
                  text={it.text}
                  price={it.price}
                  stars={it.stars}
                  alt={`${it.text} photo`}
                />
              </div>
            )
          })}
        </div>
      </div>

      <button aria-label="Next slide" onClick={incrementSlide} className="p-2 ml-4">
        <MdOutlineArrowForwardIos className='text-5xl text-white'/>
      </button>
    </div>
  )
}
