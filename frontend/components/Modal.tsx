'use client'

import { useState, useEffect, useRef } from 'react'

interface ModalProps {
  open: boolean,
  onClose: () => void,
  children: React.ReactNode,
}

export default function Modal({ open, onClose, children }: ModalProps) {
  const [ visible, setVisible ] = useState(false)

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => setVisible(open), [open])

  useEffect(() => {
    async function handleMouseDown(e: MouseEvent) {
      if(ref.current?.contains(e.target as HTMLElement) === false) {
        setVisible(false)
        await new Promise(resolve => setTimeout(resolve, 100))
        onClose()
      }
    }

    window.addEventListener ('mousedown', handleMouseDown)

    return () => window.removeEventListener('mousedown', handleMouseDown)
  }, [])

  return (
    <div className={`fixed top-0 left-0${open ? ' w-full h-screen' : ''} z-50 flex justify-center items-center`}>
      {open && 
        <>
          <div className={`fixed top-0 left-0 w-full h-full bg-black/50 ${!visible ? ' opacity-0' : ''}`} />
          <div 
            ref={ref} 
            className={`transition ease-in-out duration-[250ms]${!visible ? ' scale-0' : ''} z-20`}
          >
            {children}
          </div>
        </>
      }
    </div>
  )
}