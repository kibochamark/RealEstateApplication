"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, CircleUserRound, Dock, Facebook, House, PlusIcon as HousePlus, Instagram, Menu, X } from "lucide-react"
import type React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  const searchParams = useSearchParams()
  const url = new URLSearchParams(searchParams)

  // Clear all search params
  url.forEach((v, k) => {
    url.delete(k)
  })

  // Set default search params
  url.set("limit", "200")
  url.set("page", "0")

  // Check if on mobile device
  useEffect(() => {
    if (typeof window === "undefined") return // Skip effect during SSR

    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile() // Initial check

    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    if (!isMenuOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest(".mobile-menu") && !target.closest(".menu-button")) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMenuOpen])

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const handleMenuClose = () => {
    setIsMenuOpen(false)
  }

  const toggleDropdown = (title: string) => {
    if (isMobile) {
      setActiveDropdown(activeDropdown === title ? null : title)
    }
  }

  const NavItem = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const isActive = pathname.split("/")[1] === href.split("/")[1]

    return (
      <Link
        href={href}
        className={`block py-2 px-3 rounded-full transition-all duration-200 ${
          isActive ? "bg-black text-white font-medium" : "hover:bg-gray-100"
        }`}
        onClick={handleMenuClose}
      >
        {children}
      </Link>
    )
  }

  const DropdownNavItem = ({ title, items }: { title: string; items: string[] }) => {
    const isOpen = activeDropdown === title

    return (
      <div className="relative">
        <button
          className={`flex items-center gap-1 py-2 px-3 rounded-full transition-all duration-200 ${
            isMobile && isOpen ? "bg-gray-100" : ""
          } hover:bg-gray-100`}
          onClick={() => toggleDropdown(title)}
        >
          {title}
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${isMobile && isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isMobile ? (
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden ml-4 my-1"
              >
                {items.map((item, index) => (
                  <Link
                    key={index}
                    href={`/property/${item}`}
                    className="block py-2 px-3 text-sm hover:bg-gray-100 rounded-md"
                    onClick={handleMenuClose}
                  >
                    {item}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        ) : (
          <div className="group-hover:opacity-100 group-hover:visible opacity-0 invisible absolute left-0 mt-2 w-48 rounded-md z-20 bg-white shadow-lg transition-all duration-200 group">
            {items.map((item, index) => (
              <div key={index}>
                <Link
                  href={`/property/${item}`}
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={handleMenuClose}
                >
                  {item}
                </Link>
                {index < items.length - 1 && <hr className="border-gray-100" />}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  if (pathname.includes("intime-admin") || pathname.startsWith("/intimehomes")) {
    return null
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <House className="h-8 w-8 text-primary" />
            <p className="font-semibold text-lg text-gray-800">Intime Homes</p>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <NavItem href="/">
              <div className="flex items-center gap-1.5">
                <Dock className="w-4 h-4" />
                Home
              </div>
            </NavItem>

            <div className="group relative px-1">
              <DropdownNavItem title="Sale" items={["Houses For Sale", "Apartment For Sale", "Land For Sale"]} />
            </div>

            <div className="group relative px-1">
              <DropdownNavItem
                title="Rentals"
                items={["Townhouses/Villas For Rent", "Studio Apartments For Rent", "Office Spaces For Rent"]}
              />
            </div>

            <NavItem href="/listing">Listings</NavItem>
            <NavItem href="/blogs">Blogs</NavItem>
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center gap-2">
            {/* Mobile: User icon and menu button */}
            <div className="md:hidden flex items-center">
              <Link href="/contact" className="p-2 rounded-full hover:bg-gray-100" onClick={handleMenuClose}>
                <CircleUserRound className="h-6 w-6 text-gray-600" />
              </Link>

              <Button
                variant="ghost"
                size="icon"
                className="menu-button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>

            {/* Desktop: User icon and CTA button */}
            <div className="hidden md:flex items-center gap-2">
              <Link href="/contact" className="p-2 rounded-full hover:bg-gray-100">
                <CircleUserRound className="h-6 w-6 text-gray-600" />
              </Link>

              <Button variant="default" className="rounded-full bg-primary hover:bg-primary/90">
                Manage Property
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 min-h-sreen md:hidden z-[100]"
              onClick={handleMenuClose}
            />

            {/* Slide-in menu */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-white h-screen  md:hidden mobile-menu overflow-y-auto"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2">
                  <HousePlus className="h-7 w-7 text-primary" />
                  <p className="font-semibold text-gray-800">Intime Homes</p>
                </div>

                <Button variant="ghost" size="icon" onClick={handleMenuClose} aria-label="Close menu">
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <nav className="p-4 space-y-1">
                <NavItem href="/">
                  <div className="flex items-center gap-1.5">
                    <Dock className="w-4 h-4" />
                    Home
                  </div>
                </NavItem>

                <DropdownNavItem title="Sale" items={["Houses For Sale", "Apartment For Sale", "Land For Sale"]} />

                <DropdownNavItem
                  title="Rentals"
                  items={["Townhouses/Villas For Rent", "Studio Apartments For Rent", "Office Spaces For Rent"]}
                />

                <NavItem href="/listing">Listings</NavItem>
                <NavItem href="/blogs">Blogs</NavItem>
                <NavItem href="/contact">Contact</NavItem>
              </nav>

              {/* Social links */}
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-gray-50">
                <p className="text-sm text-gray-500 mb-3">Follow us</p>
                <div className="flex items-center justify-around">
                  <Link
                    href="#"
                    className="p-2 rounded-full hover:bg-gray-200"
                    onClick={handleMenuClose}
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </Link>

                  <Link
                    href="#"
                    className="p-2 rounded-full hover:bg-gray-200"
                    onClick={handleMenuClose}
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </Link>

                  <Link
                    href="#"
                    className="p-2 rounded-full hover:bg-gray-200"
                    onClick={handleMenuClose}
                    aria-label="Twitter"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 50 50"
                      className="fill-current"
                    >
                      <path d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar

