"use client"

import { useState } from 'react'
import Modal from './Modal'
import Destinations from './Destinations'

export default function Button({text, element}:{text:string, element:JSX.Element}) {
  const [show, setShow] = useState(false)

  return (
    <>
    <button className='bg-blue-200 px-4 py-2 rounded-md' onClick={() => setShow(true)}>{text}</button>
    <Modal open={show} onClose={() => setShow(false)} children={element} />
    </>
  )
}
