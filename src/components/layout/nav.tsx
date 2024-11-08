"use client"
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

import { usePathname} from 'next/navigation'
import Link from 'next/link'

const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const path = usePathname()

    // console.log(path, scrolled)

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    useEffect(() => {
        // Check if we're on the home page
        const isHomePage = path === "/"

        // Scroll event listener for background color change on home page only
        const handleScroll = () => {
            if (isHomePage) {
                setScrolled(window.scrollY > 50)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [path])

    const NavItem = ({ href, children }: { href: string; children: React.ReactNode }) => (
        <Link href={href} className="block py-2 hover:text-secondary300 ">{children}</Link>
    )

    const DropdownNavItem = ({ title, items }: { title: string; items: string[] }) => (
        <div className="group relative">
            <button className="flex items-center gap-1 py-2 hover:text-secondary300">
                {title}
                <ChevronDown className="h-4 w-4" />
            </button>
            <div className="absolute left-0 mt-2 w-48 rounded-md bg-white/10 backdrop-blur-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                {items.map((item, index) => (
                    <div key={index}>
                        <Link href="#" className="block px-4 py-2 text-sm text-white hover:bg-secondary300 ">
                            {item}
                        </Link>
                        {index < items.length - 1 && <hr className="border-white/20" />}
                    </div>
                ))}
            </div>
        </div>
    )

    return (
        <nav className={`flex items-center fixed justify-end z-20 w-full p-6 ${scrolled ? "bg-white text-black" : "bg-transparent  text-white"} transition-colors duration-300`}>
            <div className="flex-1 md:hidden">
                <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <Menu className="h-6 w-6" />
                </Button>
            </div>
            <AnimatePresence>
                {(isMenuOpen || !isMobile) && (
                    <motion.div
                        initial={isMobile ? { x: "-100%" } : { opacity: 1 }}
                        animate={isMobile ? { x: 0 } : { opacity: 1 }}
                        exit={isMobile ? { x: "-100%" } : { opacity: 1 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className={`fixed md:relative top-0 left-0 bottom-0 w-64 md:w-auto ${scrolled ? isMobile ? "text-white": "text-black" : "text-white"} z-[100] md:z-auto flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 p-6 md:p-0 ${isMobile ? "bg-black opacity-80" : "hidden md:flex"}`}
                    >
                        {isMobile && (
                            <Button variant="ghost" size="icon" className="self-end mb-4" onClick={() => setIsMenuOpen(false)}>
                                <X className="h-6 w-6" />
                            </Button>
                        )}
                        <NavItem href="#">Home</NavItem>
                        <DropdownNavItem
                            title="Properties For Sale"
                            items={["Houses For Sale", "Apartments For Sale", "Land For Sale"]}
                        />
                        <DropdownNavItem
                            title="Properties To Let"
                            items={["Townhouses/Villas For Rent", "Studio Apartments For Rent", "Office Spaces For Rent"]}
                        />
                        <NavItem href="#">Blog</NavItem>
                        <NavItem href="#">Testimonials</NavItem>
                        <NavItem href="#">Contact</NavItem>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}

export default Nav
