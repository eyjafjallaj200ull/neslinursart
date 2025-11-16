import Link from 'next/link'

function MobileMenu() {
  return (
    <nav>
          <ul className={`flex flex-col text-2xl`}>
            <li className="border-b p-4 flex justify-center items-center"><Link className="" href="/">Home</Link></li>
            <li className="border-b p-4 flex justify-center items-center"><Link className="" href="/about">About</Link></li>
            <li className="border-b p-4 flex justify-center items-center"><Link className="" href="/portfolio">Portfolio</Link></li>
            <li className="border-b p-4 flex justify-center items-center"><a className="" target='_blank' href="https://www.etsy.com/shop/Neslinursart">Etsy Shop</a></li>
        </ul>
    </nav> 
  )
}

export default MobileMenu