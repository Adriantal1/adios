import React from 'react'

export default function Destinations() {
  return (
    <div className='bg-white rounded-md p-5'>
      <span className='font-bold text-xl'>Destinations</span>
      <ul className='mt-2 space-y-2'>
      <li><input type="checkbox" /><span className='pl-2'>Francja</span></li>
      <li><input type="checkbox" /><span className='pl-2'>Grecja</span></li>
      <li><input type="checkbox" /><span className='pl-2'>Turcja</span></li>
      </ul>
      <button className='bg-blue-200 rounded-md p-1.5 mt-2 ml-auto'>Wyszukaj</button>
    </div>
  )
}
