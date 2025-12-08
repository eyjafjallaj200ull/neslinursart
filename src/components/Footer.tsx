import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <footer className='mt-30 w-full border-t-1 border-solid border-foreground/60 text-center p-10'>
        <p>All content <span className='align-middle'>©</span> 2020-2025 neslinursart. All rights reserved.</p>
        <Link className='mr-1 underline' href="https://www.instagram.com/neslinursart" target='_blank'>Instagram</Link>
        <span>|</span>
        <Link className='ml-1 underline' href="https://www.etsy.com/shop/Neslinursart" target='_blank'>Etsy</Link>
    </footer>
  )
}

export default Footer