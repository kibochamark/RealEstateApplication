'use client'

import { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Testimonial, TestimonialProps } from './Testimonial'
import Autoplay from 'embla-carousel-autoplay'


interface TestimonialSliderProps {
  testimonials: TestimonialProps[]
}

export function TestimonialSlider({ testimonials }: TestimonialSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()])
  const [currentIndex, setCurrentIndex] = useState(0)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCurrentIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <div className="relative w-full max-w-3xl mx-auto">
        {testimonials.length > 0 ? (
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0">
              <AnimatePresence>
                {index === currentIndex && (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Testimonial {...testimonial} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
      </div>
        </div>):(
          <p className="flex text-center w-full justify-center text-gray-500"> No Teastimonials yet</p>
        )}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
        onClick={scrollPrev}
      >
        <ChevronLeft className="w-6 h-6 text-gray-600" />
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
        onClick={scrollNext}
      >
        <ChevronRight className="w-6 h-6 text-gray-600" />
      </button>
    </div>
  )
}

