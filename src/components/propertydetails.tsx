"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import {
  Bed,
  Bath,
  Square,
  MapPin,
  Camera,
  Check,
  Share2,
  User,
  ArrowLeft,
  ArrowRight,
  Heart,
  Phone,
  Calendar,
} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { motion } from "framer-motion"
import Link from "next/link"
import { useInView } from "react-intersection-observer"
import { toast, Toaster } from "react-hot-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Fix for default marker icon
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
})

export interface ImageData {
  id: number
  url: string
  publicId: string
  propertyId: number
  createdAt: string
  updatedAt: string
}

export interface PropertyFeature {
  id: number
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

export interface PropertyType {
  id: number
  name: string
  createdAt: string
  updatedAt: string
}

export type SimilarPropertyData = {
  id: number
  name: string
  county: string
  images: ImageData[]
  bedrooms: number
  size: string
  saleType: string
  price: number
  propertyType: PropertyType
}

export interface PropertyData {
  id: number
  name: string
  description: string
  streetAddress: string
  city: string
  area: string
  state: string
  country: string
  county: string
  latitude: string
  longitude: string
  saleType: string
  featured: boolean
  propertyTypeId: number
  size: string
  distance: string
  price: number
  pricePerMonth: number
  bedrooms: number
  bathrooms: number
  createdAt: string
  updatedAt: string
  propertyToFeatures: PropertyFeature[]
  propertyType: PropertyType
}

export interface PropertyResponse {
  status: string
  data: {
    property: PropertyData
    images: ImageData[]
  }
}

export interface SimilarProperty {
  status: string
  data: SimilarPropertyData[]
}

// Form validation schema
const ContactFormSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.string().required("Phone number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  message: Yup.string().required("Message is required"),
})

export default function PropertyDetail({
  property,
  similarproperties,
}: {
  property: PropertyResponse
  similarproperties: SimilarProperty
}) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [thumbnailsToShow, setThumbnailsToShow] = useState(4)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isShared, setIsShared] = useState(false)
  const [isSharing, setIsSharing] = useState(false)

  const images = property?.data?.images?.map((image: any) => image.url) || []
  const features = property?.data?.property?.propertyToFeatures || []

  // Get coordinates for map
  const latitude = Number.parseFloat(property?.data?.property?.latitude || "-1.2345")
  const longitude = Number.parseFloat(property?.data?.property?.longitude || "36.80271")
  const position: [number, number] = [latitude, longitude]

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Update thumbnails to show based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setThumbnailsToShow(3)
      } else if (window.innerWidth < 1024) {
        setThumbnailsToShow(4)
      } else {
        setThumbnailsToShow(5)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  }

  const handleShare = () => {
    setIsSharing(true)
    const url = window.location.href
    if (navigator.share) {
      navigator
        .share({
          title: property?.data?.property?.name || "Property",
          text: `Check out this property: ${property?.data?.property?.name}`,
          url: url,
        })
        .then(() => {
          setIsShared(true)
          setIsSharing(false)
        })
        .catch((error) => {
          console.log("Error sharing:", error)
          setIsSharing(false)
        })
    } else {
      // Fallback: Copy link to clipboard
      navigator.clipboard.writeText(url).then(() => {
        setIsShared(true)
        setIsSharing(false)
        toast.success("Link copied to clipboard!")
      })
    }
  }

  const handleNext = () => {
    setSelectedImage((prev) => (prev + 1) % images.length)
  }

  const handlePrev = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleContactSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          propertyId: property?.data?.property?.id,
          propertyName: property?.data?.property?.name,
        }),
      })

      if (response.ok) {
        toast.success("Message sent successfully!")
        resetForm()
      } else {
        toast.error("Failed to send message. Please try again.")
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.")
      console.error("Error submitting form:", error)
    } finally {
      setSubmitting(false)
    }
  }

  if (!property?.data?.property) {
    return <div className="container py-20 text-center">Loading property details...</div>
  }

  return (
    <div className="">
      <Toaster position="top-right" />

      {/* Property Header */}
      <div className="bg-white">
        <div className="container mx-auto py-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              {property.data.property.featured && <Badge className="bg-green-500 hover:bg-green-600">FEATURED</Badge>}
              <Badge variant="secondary">{property.data.property.saleType}</Badge>
              <span className="text-sm text-muted-foreground ml-auto">
                Listed on {new Date(property.data.property.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h1 className="text-2xl md:text-3xl font-bold">{property.data.property.name}</h1>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="gap-2" onClick={() => setIsFavorite(!isFavorite)}>
                  <Heart className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                  {isFavorite ? "Saved" : "Save"}
                </Button>
                <Button variant="outline" size="sm" className="gap-2" onClick={handleShare} disabled={isSharing}>
                  <Share2 className="w-4 h-4" />
                  {isSharing ? "Sharing..." : "Share"}
                </Button>
              </div>
            </div>

            <div className="flex items-center text-muted-foreground">
              <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">
                {`${property.data.property.streetAddress}, ${property.data.property.city}, ${property.data.property.state}, ${property.data.property.country}`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:container px-2 md:px-0 mx-auto py-8">
        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative aspect-[16/9] cursor-pointer group">
                    <Image
                      src={images[selectedImage] || "/placeholder.svg?height=600&width=1000"}
                      alt="Property"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="bg-black/50 text-white px-4 py-2 rounded-full">
                        <Camera className="w-5 h-5 inline mr-2" />
                        View all photos
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-5xl p-0 bg-black rounded-lg">
                  <div className="relative w-full h-[80vh]">
                    <Image
                      src={images[selectedImage] || "/placeholder.svg?height=800&width=1200"}
                      alt={`Property ${selectedImage + 1}`}
                      fill
                      className="object-contain w-full h-full"
                    />
                    <button
                      onClick={handlePrev}
                      className="absolute top-1/2 left-4 transform -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
                      aria-label="Previous image"
                    >
                      <ArrowLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
                      aria-label="Next image"
                    >
                      <ArrowRight className="w-6 h-6" />
                    </button>
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                      <div className="bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                        {selectedImage + 1} / {images.length}
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 p-2 overflow-x-auto">
                  {images.slice(0, thumbnailsToShow).map((image, index) => (
                    <div
                      key={index}
                      className={`relative w-20 h-20 flex-shrink-0 cursor-pointer ${
                        selectedImage === index ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  ))}
                  {images.length > thumbnailsToShow && (
                    <div
                      className="relative w-20 h-20 flex-shrink-0 cursor-pointer bg-black/50 flex items-center justify-center text-white rounded"
                      onClick={() =>
                        document
                          .querySelector('[role="dialog"]')
                          ?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
                      }
                    >
                      +{images.length - thumbnailsToShow}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Price and Key Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Price</p>
                  <div className="text-3xl font-bold text-primary">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "KES",
                      maximumFractionDigits: 0,
                    }).format(property.data.property.price)}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="flex flex-col items-center">
                    <Bed className="w-5 h-5 text-muted-foreground mb-1" />
                    <span className="font-medium">{property.data.property.bedrooms}</span>
                    <span className="text-xs text-muted-foreground">Beds</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Bath className="w-5 h-5 text-muted-foreground mb-1" />
                    <span className="font-medium">{property.data.property.bathrooms}</span>
                    <span className="text-xs text-muted-foreground">Baths</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Square className="w-5 h-5 text-muted-foreground mb-1" />
                    <span className="font-medium">{property.data.property.size}</span>
                    <span className="text-xs text-muted-foreground">Area</span>
                  </div>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-medium">{property.data.property.propertyType?.name.charAt(0).toUpperCase()}{property.data.property.propertyType?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sale</p>
                  <p className="font-medium">{property.data.property.saleType}</p>
                </div>
                {/* <div>
                  <p className="text-sm text-muted-foreground">Year Built</p>
                  <p className="font-medium">{new Date(property.data.property.createdAt).getFullYear()}</p>
                </div> */}
              </div>
            </div>

            {/* Tabs for Description, Features, Location */}
            <Tabs defaultValue="description" className="bg-white rounded-lg shadow-sm">
              <TabsList className="w-full border-b rounded-none p-0 h-auto">
                <TabsTrigger
                  value="description"
                  className="flex-1 py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value="features"
                  className="flex-1 py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
                >
                  Features
                </TabsTrigger>
                <TabsTrigger
                  value="location"
                  className="flex-1 py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
                >
                  Location
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="p-6 focus-visible:outline-none focus-visible:ring-0">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">About this property</h2>
                  <p className="text-muted-foreground whitespace-pre-line">{property.data.property.description}</p>

                  <div className="mt-6">
                    <h3 className="font-semibold mb-2">Prices:</h3>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div>
                          <span className="text-muted-foreground">
                            {property.data.property.bedrooms} Bedroom ({property.data.property.size})
                          </span>
                        </div>
                        <div className="font-semibold">
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "KES",
                            maximumFractionDigits: 0,
                          }).format(property.data.property.price)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="features" className="p-6 focus-visible:outline-none focus-visible:ring-0">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Property Features</h2>

                  {features.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
                      {features.map((feature) => (
                        <div key={feature.id} className="flex items-center gap-2">
                          <div className="bg-primary/10 p-1 rounded-full">
                            <Check className="w-4 h-4 text-primary" />
                          </div>
                          <span>{feature.name}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No features listed for this property.</p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="location" className="focus-visible:outline-none focus-visible:ring-0">
                <div className="p-6 pb-0">
                  <h2 className="text-xl font-semibold mb-4">Location</h2>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="font-medium mb-2">Address Details</h3>
                      <div className="space-y-2 text-muted-foreground">
                        <p>
                          <span className="font-medium text-foreground">Street:</span>{" "}
                          {property.data.property.streetAddress}
                        </p>
                        <p>
                          <span className="font-medium text-foreground">City:</span> {property.data.property.city}
                        </p>
                        <p>
                          <span className="font-medium text-foreground">Area:</span> {property.data.property.area}
                        </p>
                        <p>
                          <span className="font-medium text-foreground">County:</span> {property.data.property.county}
                        </p>
                        <p>
                          <span className="font-medium text-foreground">Country:</span> {property.data.property.country}
                        </p>
                      </div>
                    </div>
                    <div>
                      <Button
                        variant="outline"
                        className="w-full mb-2"
                        onClick={() => {
                          const { city, area, county, country, latitude, longitude } = property.data.property
                          const address = `${city}, ${area}, ${county}, ${country}`
                          const mapsUrl =
                            latitude && longitude
                              ? `https://www.google.com/maps?q=${latitude},${longitude}`
                              : `https://www.google.com/maps/search/?q=${address}`

                          window.open(mapsUrl, "_blank")
                        }}
                      >
                        <MapPin className="mr-2 h-4 w-4" />
                        Open on Google Maps
                      </Button>
                      <p className="text-sm text-muted-foreground">Click to view the exact location on Google Maps</p>
                    </div>
                  </div>
                </div>

                <div className="h-[400px] w-full relative z-10">
                  <MapContainer
                    center={position}
                    zoom={15}
                    style={{ height: "100%", width: "100%" }}
                    scrollWheelZoom={false}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={position}>
                      <Popup>
                        {property.data.property.name}
                        <br />
                        {property.data.property.streetAddress}
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Contact Form */}
          <div className="space-y-6">
            <Card className="shadow-sm sticky top-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Contact Agent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-6 pb-6 border-b">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Intime Homes</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        <span>Contact Agent</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>Schedule Tour</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Formik
                  initialValues={{
                    name: "",
                    phone: "",
                    email: "",
                    message: `Hello, I am interested in [${property.data.property.name} for ${property.data.property.saleType} in ${property.data.property.streetAddress}]`,
                  }}
                  validationSchema={ContactFormSchema}
                  onSubmit={handleContactSubmit}
                >
                  {({ isSubmitting, errors, touched }) => (
                    <Form className="space-y-4">
                      <div>
                        <Field name="name">
                          {({ field }: any) => (
                            <Input
                              {...field}
                              placeholder="Your Name"
                              className={errors.name && touched.name ? "border-red-500" : ""}
                            />
                          )}
                        </Field>
                        <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
                      </div>

                      <div>
                        <Field name="phone">
                          {({ field }: any) => (
                            <Input
                              {...field}
                              placeholder="Phone Number"
                              className={errors.phone && touched.phone ? "border-red-500" : ""}
                            />
                          )}
                        </Field>
                        <ErrorMessage name="phone" component="div" className="text-red-500 text-xs mt-1" />
                      </div>

                      <div>
                        <Field name="email">
                          {({ field }: any) => (
                            <Input
                              {...field}
                              placeholder="Email Address"
                              type="email"
                              className={errors.email && touched.email ? "border-red-500" : ""}
                            />
                          )}
                        </Field>
                        <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                      </div>

                      <div>
                        <Field name="message">
                          {({ field }: any) => (
                            <Textarea
                              {...field}
                              placeholder="Your Message"
                              rows={4}
                              className={errors.message && touched.message ? "border-red-500" : ""}
                            />
                          )}
                        </Field>
                        <ErrorMessage name="message" component="div" className="text-red-500 text-xs mt-1" />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 text-white"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>

                      <p className="text-xs text-center text-muted-foreground">
                        By submitting this form, you agree to our privacy policy and terms of service.
                      </p>
                    </Form>
                  )}
                </Formik>
              </CardContent>
            </Card>

            {/* Property Details Card */}
            {/* <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Property Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Property ID</p>
                      <p className="font-medium">{property.data.property.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Property Type</p>
                      <p className="font-medium">{property.data.property.propertyType?.name}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Bedrooms</p>
                      <p className="font-medium">{property.data.property.bedrooms}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Bathrooms</p>
                      <p className="font-medium">{property.data.property.bathrooms}</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-sm text-muted-foreground">Size</p>
                    <p className="font-medium">{property.data.property.size}</p>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-sm text-muted-foreground">Last Updated</p>
                    <p className="font-medium">{new Date(property.data.property.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </div>

      {/* Full-width Similar Listings Section */}
     
        <div className="mt-12 py-12 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Similar Properties</h2>
            <p className="text-muted-foreground mb-8">Explore more properties like this one</p>

            <motion.div
              ref={ref}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {similarproperties.data.map((property) => (
                <motion.div key={property.id} variants={itemVariants}>
                  <Card className="overflow-hidden h-full border-none shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative aspect-[4/3]">
                      {property.images.length > 0 ? (
                        <Image
                          src={property.images[0].url || "/placeholder.svg"}
                          alt={property.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <Camera className="w-8 h-8 text-muted-foreground" />
                        </div>
                      )}

                      <div className="absolute top-2 left-2">
                        <Badge variant="secondary">{property.saleType}</Badge>
                      </div>

                      <div className="absolute bottom-2 left-2">
                        <div className="bg-black/60 text-white px-2 py-1 rounded text-sm font-medium">
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "KES",
                            maximumFractionDigits: 0,
                          }).format(property.price)}
                        </div>
                      </div>
                    </div>

                    <Link href={`/listing/${property.id}`}>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-1 line-clamp-1">{property.name}</h3>
                        <div className="flex items-center text-muted-foreground text-sm mb-2">
                          <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                          <span className="truncate">{property.county}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Bed className="w-3 h-3 mr-1" />
                            {property.bedrooms} Beds
                          </div>
                          <div className="flex items-center">
                            <Square className="w-3 h-3 mr-1" />
                            {property.size}
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <p className="text-xs text-muted-foreground">{property.propertyType.name}</p>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {similarproperties.data.length > 3 && (
              <div className="mt-8 text-center">
                <Button variant="outline" size="lg">
                  View All Similar Properties
                </Button>
              </div>
            )}
          </div>
        </div>
      
    </div>
  )
}

