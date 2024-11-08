'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import { 
  Bed, 
  Square, 
  MapPin, 
  Camera,
  Check,
  Share2,
  Building2,
  User
} from 'lucide-react'

export default function PropertyDetail() {
  const [selectedImage, setSelectedImage] = useState(0)
  
  const images = [
    '/14.jpg',
    '/11.jpg',
    '/12.jpg',
  ]

  const features = [
    { icon: 'CCTV', label: '24 Hour CCTV' },
    { icon: 'Generator', label: 'Backup Generator' },
    { icon: 'Balcony', label: 'Balcony' },
    { icon: 'Water', label: 'Borehole Water' },
    { icon: 'Gym', label: 'Gym' },
    { icon: 'Intercom', label: 'Intercom' },
    { icon: 'Lift', label: 'Lift' },
    { icon: 'Parking', label: 'Parking' },
    { icon: 'Pool', label: 'Swimming Pool' },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-[1fr_400px] gap-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge className="bg-green-500 hover:bg-green-600">FEATURED</Badge>
              <Badge variant="secondary">FOR SALE</Badge>
            </div>
            <h1 className="text-3xl font-bold">2 and 3 Bedroom Apartments for Sale in Riverside</h1>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="w-4 h-4 mr-2" />
              Riverside Drive, Nairobi, Kenya
            </div>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">
                From <span className="text-primary">Kshs.13,500,000</span>
              </div>
              <Button variant="outline" className="gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="space-y-2">
            <Dialog>
              <DialogTrigger asChild>
                <div className="relative aspect-video cursor-pointer group">
                  <Image
                    src={images[selectedImage]}
                    alt="Property"
                    fill
                    className="object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    <Camera className="w-4 h-4 inline mr-2" />
                    View all photos
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <div className="grid grid-cols-2 gap-2">
                  {images.map((src, idx) => (
                    <Image
                      key={idx}
                      src={src}
                      alt={`Property ${idx + 1}`}
                      width={400}
                      height={300}
                      className="rounded-lg"
                    />
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Property Details */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-muted-foreground" />
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Property Type</p>
                    <p className="font-medium">Apartment</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Bed className="w-4 h-4 text-muted-foreground" />
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Bedrooms</p>
                    <p className="font-medium">2</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Square className="w-4 h-4 text-muted-foreground" />
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Square Meters</p>
                    <p className="font-medium">101</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="text-muted-foreground">
              Located along Riverside Drive near Riverside Square. Flexible payment plans with 20% deposit.
            </p>
            <div className="space-y-2">
              <h3 className="font-semibold">Prices:</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>2 Bedroom (101 sqm, master en-suite) - KSh 13.5M</li>
                <li>3 Bedroom (DSQ/168 sqm) - KSh 20.5M</li>
              </ul>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>{feature.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:sticky lg:top-8 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Musilli Homes</h3>
                  <Button variant="link" className="h-auto p-0">View Listings</Button>
                </div>
              </div>
              <form className="space-y-4">
                <Input placeholder="Name" />
                <Input placeholder="Phone" />
                <Input placeholder="Email" />
                <Textarea 
                  placeholder="Message" 
                  defaultValue="Hello, I am interested in [2 and 3 Bedroom Apartments for Sale in Riverside]"
                />
                <Button className="w-full bg-[#B5A887] hover:bg-[#A39775] text-white">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}