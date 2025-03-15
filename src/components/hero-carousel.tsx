"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Home } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import PropertySearch from "@/components/property-search"

// Add text shadow utility
const textShadowClass = "text-shadow-lg"

// Add this to your global CSS or as a local style
if (typeof document !== "undefined") {
  const style = document.createElement("style")
  style.innerHTML = `
    .text-shadow-lg {
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    }
  `
  document.head.appendChild(style)
}

// Carousel data
const carouselItems = [
  {
    id: 1,
    image:
      "/FrontApartment.jpg?height=800&width=1600",
    title: "Find Your Dream Home",
    description: "Discover luxury properties in prime locations with our exclusive listings",
    cta: "View Properties",
    link: "/listings",
    color: "from-blue-900/40 to-blue-950/60",
  },
  {
    id: 2,
    image:
      "/apartment2.jpg",
    title: "Premium Waterfront Properties",
    description: "Wake up to stunning ocean views and beachfront living",
    cta: "Explore Waterfront",
    link: "/listings",
    color: "from-emerald-900/40 to-emerald-950/60",
  },
  {
    id: 3,
    image:
      "/apartment.jpg",
    title: "Urban Living Redefined",
    description: "Modern apartments in the heart of the city with amenities you'll love",
    cta: "See Urban Homes",
    link: "/ulistings",
    color: "from-purple-900/40 to-purple-950/60",
  },
]

export default function HeroCarousel({propertytypes}:{propertytypes:any}) {
  const [current, setCurrent] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  // Handle auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % carouselItems.length)
      }, 5000)
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isAutoPlaying])

  // Pause auto-play on hover
  const pauseAutoPlay = () => setIsAutoPlaying(false)
  const resumeAutoPlay = () => setIsAutoPlaying(true)

  // Navigation functions
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % carouselItems.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + carouselItems.length) % carouselItems.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  return (
    <div className="relative w-full">
      {/* Search bar overlay */}
      <div className="absolute top-0 left-0 right-0 z-10 px-4 py-6 md:px-8 lg:px-12">
        <PropertySearch propertytypes={propertytypes}/>
      </div>

      {/* Carousel */}
      <div
        className="relative h-[600px] md:h-[700px] w-full overflow-hidden bg-gray-900"
        onMouseEnter={pauseAutoPlay}
        onMouseLeave={resumeAutoPlay}
      >
        <AnimatePresence mode="sync" initial={false}>
          {carouselItems.map(
            (item, index) =>
              index === current && (
                <motion.div
                  key={item.id}
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    opacity: { duration: 0.2 },
                  }}
                  className="absolute inset-0"
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      priority
                      className="object-cover"
                    />
                    {/* <div className={`absolute inset-0 bg-gradient-to-r ${item.color}`} /> */}

                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 lg:p-16">
                      <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="max-w-3xl text-white text-shadow-lg backdrop-blur-sm bg-black/20 p-6 rounded-xl"
                      >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{item.title}</h2>
                        <p className="text-lg md:text-xl mb-6 text-white/90">{item.description}</p>
                        <Button asChild size="lg" className="font-semibold">
                          <Link href={item.link}>{item.cta}</Link>
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ),
          )}
        </AnimatePresence>

        {/* Navigation buttons */}
        {/* <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full p-2 text-white transition-all duration-200"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full p-2 text-white transition-all duration-200"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button> */}

        {/* Indicators */}
        <div className="absolute bottom-6 left-0 right-0 z-10 flex justify-center gap-2">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === current
                  ? `w-8 ${index === 0 ? "bg-blue-400" : index === 1 ? "bg-emerald-400" : "bg-purple-400"}`
                  : "w-2 bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Brand bar */}
      {/* <div className="bg-primary text-primary-foreground py-3 px-4 flex justify-center items-center">
        <div className="flex items-center gap-2">
          <Home className="h-5 w-5" />
          <span className="font-semibold">LuxuryEstates</span>
        </div>
        <div className="mx-auto text-center text-sm md:text-base">
          Trusted by over 10,000 families to find their perfect home
        </div>
        <Button variant="secondary" size="sm" className="text-xs md:text-sm">
          <Link href="/contact">Contact an Agent</Link>
        </Button>
      </div> */}
    </div>
  )
}

