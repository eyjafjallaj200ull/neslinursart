import Link from 'next/link'

function MobileMenu() {
  return (
    <nav>
          <ul className={`flex flex-col text-2xl`}>
            <li className="border-b p-4 flex justify-center items-center"><Link className="" href="/">Home</Link></li>
            <li className="border-b p-4 flex justify-center items-center"><Link className="" href="/about">About</Link></li>
            <li className="border-b p-4 flex justify-center items-center"><Link className="" href="/portfolio">Portfolio</Link></li>
            <li className="border-b p-4 flex justify-center items-center"><Link className="" href="/shop">Etsy Shop</Link></li>
        </ul>
    </nav> 
  )
}

export default MobileMenu