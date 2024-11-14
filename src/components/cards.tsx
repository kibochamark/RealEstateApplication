'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bed, Maximize2, MapPin, Expand } from "lucide-react"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Component() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const router = useRouter()

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const properties = [
    {
      id: 1,
      title: "2 Bedroom Apartment",
      price: "Ksh.7,900,000",
      location: "Kilimani, Nairobi, Kenya",
      beds: 2,
      baths: 1,
      sqft: "80 sq m",
      featured: true,
      status: "FOR SALE",
      images: ["/1.jpg?height=300&width=400", "/2.jpg?height=300&width=400", "/3.jpg?height=300&width=400"]
    },
    {
      id: 2,
      title: "3 Bedroom Apartment Plus DSQ",
      price: "Ksh.27,000,000",
      location: "Nyali, Mombasa, Kenya",
      beds: 3,
      baths: 2,
      sqft: "4200 sq ft",
      featured: true,
      status: "FOR SALE",
      images: ["/4.jpg?height=300&width=400", "/5.jpg?height=300&width=400", "/6.jpg?height=300&width=400"]
    },
    {
      id: 3,
      title: "Villas For Sale And Rent",
      price: "From Ksh.95,000,000",
      location: "Lower Kabete, Nairobi, Kenya",
      beds: "3,4 & 5",
      status: "FOR RENT",
      featured: true,
      images: ["/7.jpg?height=300&width=400", "/8.jpg?height=300&width=400", "/9.jpg?height=300&width=400"]
    },
    {
      id: 4,
      title: "Amber Bay",
      price: "From Ksh.6,730,000",
      location: "Lavington, Nairobi, Kenya",
      beds: 1,
      featured: true,
      status: "FOR SALE",
      images: ["/10.jpg?height=300&width=400", "/11.jpg?height=300&width=400", "/12.jpg?height=300&width=400"]
    }
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="text-center mb-12"
      >
        <motion.div variants={itemVariants} className="w-12 h-1 bg-primary300 mx-auto mb-6" />
        <motion.h1 variants={itemVariants} className="text-4xl font-bold mb-4">
          FIND YOUR DREAM HOME
        </motion.h1>
        <motion.p variants={itemVariants} className="text-muted-foreground">
          Below are some of our real estate listings spread across Nairobi, Kenya.
        </motion.p>
        <motion.p variants={itemVariants} className="text-muted-foreground">
          Find your dream home today!
        </motion.p>
      </motion.div>

      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {properties.map((property) => (
          <motion.div key={property.id} variants={itemVariants} onClick={()=>{
            router.push(`/listing/${property.id}`)
          }}>
            <Card className="overflow-hidden shadow-none border-none">
              <div className="relative">
                <PropertyCarousel images={property.images} />
                <div className="absolute top-4 left-4 flex gap-2">
                  {property.featured && (
                    <Badge className="bg-green-500">FEATURED</Badge>
                  )}
                  <Badge variant="secondary">{property.status}</Badge>
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="text-white font-bold text-xl">
                    {property.price}
                  </div>
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">{property.title}</h3>
                <div className="flex items-center text-muted-foreground mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  {property.location}
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  {property.beds && (
                    <div className="flex items-center">
                      <Bed className="w-4 h-4 mr-1" />
                      {property.beds}
                    </div>
                  )}
                  {property.sqft && (
                    <div className="flex items-center">
                      <Maximize2 className="w-4 h-4 mr-1" />
                      {property.sqft}
                    </div>
                  )}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-muted-foreground">Intime Homes</p>
                </div>
              </CardContent>

             
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="flex justify-center gap-4 mt-8">
        <button className="px-4 py-2 border border-primary300 transition-all duration-300 hover:bg-primary300 hover:text-white cursor-pointer text-primary500 bg-white rounded-md">
          Load More
        </button>
        <Link href="/intime-listings">
          <button className="px-4 py-2 bg-primary300 transition-all duration-300 hover:bg-white hover:text-primary500 text-white rounded-md">

            View All Listings
          </button>
        </Link>
      </div>
    </div>
  )
}

export function PropertyCarousel({ images }: { images: string[] }) {
  const [] = useState(0)

  return (
    <div className="relative">
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <Image
                src={image}
                alt={`Property image ${index + 1}`}
                width={400}
                height={300}
                className="w-full h-[400px] object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
      </Carousel>
      <Dialog>
        <DialogTrigger asChild>
          <button className="absolute bottom-4 right-4 bg-black bg-opacity-50 p-2 rounded-full text-white">
            <Expand className="w-6 h-6" />
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl w-full h-full flex items-center justify-center">
          <Carousel className="w-full">
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <Image
                    src={image}
                    alt={`Property image ${index + 1}`}
                    width={1200}
                    height={800}
                    className="w-full h-auto object-contain"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </DialogContent>
      </Dialog>
    </div>
  )
}
