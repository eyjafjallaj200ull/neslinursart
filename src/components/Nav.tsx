"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Nav() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
    const {isAuthenticated} = useKindeBrowserClient()
    const pathName = usePathname()
    function handleMenuClick() {
        setMobileMenuOpen(!mobileMenuOpen)
    }

    useEffect(() => {
        function handleResize() {
            if(window.innerWidth >= 768) {
                setMobileMenuOpen(false)
            }
        }

        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)
    }, [])
    return (
        <div>
            <div className={`border-b border-[var(--foreground)] flex flex-wrap items-center justify-between px-4 py-5 gap-4 text-xl underline-offset-7`}>
                <h1 className="">Neslinur&apos;s Art</h1>
                <nav className={`hidden md:flex gap-4 `}>
                    <Link className={`hover:underline ${pathName === "/" ? "underline" : ""}`} href="/">Home</Link>
                    <Link className={`hover:underline ${pathName === "/about" ? "underline" : ""} `} href="/about">About</Link>
                    <Link className={`hover:underline ${pathName === "/portfolio" ? "underline" : ""} `} href="/portfolio">Portfolio</Link>
                </nav>
                <nav className="flex gap-4">
                    <Link className="hidden md:inline-block" href="/checkout">Etsy Shop</Link>
                    {isAuthenticated && 
                        (
                        <>
                            <Link href="/dashboard" >Dashboard</Link>
                            <LogoutLink>Log out</LogoutLink>
                        </>
                        )
                    }
                    <button onClick={handleMenuClick} className="md:hidden flex flex-col justify-center items-center">
                        <span className={`bg-[var(--foreground)] block transition-all duration-300 ease-out 
                            h-0.5 w-6 rounded-sm ${mobileMenuOpen ? 
                            'rotate-45 translate-y-1' : '-translate-y-0.5'
                            }`} >
                        </span>
                        <span className={`bg-[var(--foreground)] block transition-all duration-300 ease-out 
                            h-0.5 w-6 rounded-sm my-0.5 ${mobileMenuOpen ? 
                            'opacity-0' : 'opacity-100'
                            }`} >
                        </span>
                        <span className={`bg-[var(--foreground)] block transition-all duration-300 ease-out 
                            h-0.5 w-6 rounded-sm ${mobileMenuOpen ? 
                            '-rotate-45 -translate-y-1' : 'translate-y-0.5'
                            }`} >
                        </span>    
                    </button>
                </nav>
            </div>
            {
                mobileMenuOpen && 
               <nav>
                    <ul className={`flex flex-col text-2xl`}>
                        <li className="border-b p-4 flex justify-center items-center"><Link className="" href="/">Home</Link></li>
                        <li className="border-b p-4 flex justify-center items-center"><Link className="" href="/about">About</Link></li>
                        <li className="border-b p-4 flex justify-center items-center"><Link className="" href="/portfolio">Portfolio</Link></li>
                        <li className="border-b p-4 flex justify-center items-center"><Link className="" href="/shop">Etsy Shop</Link></li>
                    </ul>
                </nav> 
            }
        </div>
    )
}