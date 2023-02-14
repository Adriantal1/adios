import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '@/public/images/logo.png'

export default function Navbar() {
  return (
    <nav className='bg-white flex justify-center shadow-lg'>
      <ul className='flex space-x-10 items-center my-2'>
        <li>Placeholder</li>
        <li><Link href=""><Image src={Logo} alt="" width={150} /></Link></li>
        <li>Placeholder</li>
      </ul>
    </nav>
  )
}
