import Link from 'next/link'
import { usePathname } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import React from 'react';

function Navbar({children}: {children?: React.ReactNode}) {
    const pathName = usePathname()
    const {isAuthenticated} = useKindeBrowserClient()

    return (
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
                        {children}
                    </nav>
                </div>
    )
}

export default Navbar