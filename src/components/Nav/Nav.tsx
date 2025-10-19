"use client"
import { useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";
import Navbar from "./Navbar";
import HamburgerButton from "./HamburgerButton";
import { usePathname } from "next/navigation";


export default function Nav() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
    const pathname = usePathname()
    
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

    useEffect(() => {
        if(mobileMenuOpen) setMobileMenuOpen(false)
    }, [pathname])

    return (
        <>
            <Navbar>
                <HamburgerButton onClick={handleMenuClick} mobileMenuOpen={mobileMenuOpen} /> 
            </Navbar>
            
            {
                mobileMenuOpen && 
                <MobileMenu />
            }
        </>
    )
}