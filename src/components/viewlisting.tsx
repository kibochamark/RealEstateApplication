'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowUpDown, LayoutGrid, LayoutList, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bed, Maximize2, MapPin, Expand } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { motion } from "framer-motion"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useInView } from "react-intersection-observer"
import { PropertyCarousel } from './cards'
import Filter from './filter'
import Link from 'next/link'

export default function ViewListing() {
    const [isGridView, setIsGridView] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [budgetRange, setBudgetRange] = useState([0, 100000000])
    const [bedrooms, setBedrooms] = useState('')
    const [propertyType, setPropertyType] = useState('')
    const totalPages = 10

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
            price: 7900000,
            location: "Kilimani, Nairobi, Kenya",
            beds: 2,
            baths: 1,
            sqft: "80 sq m",
            type: "APARTMENT",
            featured: true,
            status: "FOR SALE",
            images: ["/1.jpg?height=300&width=400", "/2.jpg?height=300&width=400", "/3.jpg?height=300&width=400"]
        },
        {
            id: 2,
            title: "3 Bedroom Apartment Plus DSQ",
            price: 27000000,
            location: "Nyali, Mombasa, Kenya",
            beds: 3,
            baths: 2,
            sqft: "4200 sq ft",
            featured: true,
            type: "APARTMENT",
            status: "FOR SALE",
            images: ["/4.jpg?height=300&width=400", "/5.jpg?height=300&width=400", "/6.jpg?height=300&width=400"]
        },
        {
            id: 3,
            title: "Villas For Sale And Rent",
            price: 95000000,
            location: "Lower Kabete, Nairobi, Kenya",
            beds: "3,4 & 5",
            status: "FOR RENT",
            type: "LAND",
            featured: true,
            images: ["/7.jpg?height=300&width=400", "/8.jpg?height=300&width=400", "/9.jpg?height=300&width=400"]
        },
        {
            id: 4,
            title: "Amber Bay",
            price: 6730000,
            location: "Lavington, Nairobi, Kenya",
            beds: 1,
            featured: true,
            type: "LAND",
            status: "FOR SALE",
            images: ["/10.jpg?height=300&width=400", "/11.jpg?height=300&width=400", "/12.jpg?height=300&width=400"]
        }
    ]


    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const filteredProperties = properties.filter(property =>
        property.price >= budgetRange[0] &&
        property.price <= budgetRange[1] &&
        (bedrooms === '' || property.beds === parseInt(bedrooms)) &&
        (propertyType === '' || property.type === propertyType)
    )

    return (
        <div className="container mx-auto px-4 py-8 ">

            <div className="mb-8 p-6 bg-card rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Filters</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <Label htmlFor="budget-range">Budget Range (Kshs)</Label>
                        <Slider
                            id="budget-range"
                            min={0}
                            max={100000000}
                            step={1000000}
                            value={budgetRange}
                            onValueChange={setBudgetRange}
                            className="mt-2"
                        />
                        <div className="flex justify-between mt-2">
                            <Input
                                type="number"
                                value={budgetRange[0]}
                                onChange={(e) => setBudgetRange([parseInt(e.target.value), budgetRange[1]])}
                                className="w-[45%]"
                            />
                            <Input
                                type="number"
                                value={budgetRange[1]}
                                onChange={(e) => setBudgetRange([budgetRange[0], parseInt(e.target.value)])}
                                className="w-[45%]"
                            />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="bedrooms">Bedrooms</Label>
                        <Select value={bedrooms} onValueChange={setBedrooms}>
                            <SelectTrigger id="bedrooms">
                                <SelectValue placeholder="Any" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="any">Any</SelectItem>
                                <SelectItem value="1">1</SelectItem>
                                <SelectItem value="2">2</SelectItem>
                                <SelectItem value="3">3</SelectItem>
                                <SelectItem value="4">4+</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="property-type">Property Type</Label>
                        <Select value={propertyType} onValueChange={setPropertyType}>
                            <SelectTrigger id="property-type">
                                <SelectValue placeholder="Any" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="any">Any</SelectItem>
                                <SelectItem value="APARTMENT">Apartment</SelectItem>
                                <SelectItem value="TOWNHOUSE">Townhouse</SelectItem>
                                <SelectItem value="LAND">Land</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                {/* <Filter /> */}
            </div>

            <div className="flex items-center justify-between mb-6 w-full">
                <h1 className="text-2xl font-semibold">{filteredProperties.length} Properties</h1>
                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="gap-2">
                                <ArrowUpDown className="h-4 w-4" />
                                Default Order
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
                            <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
                            <DropdownMenuItem>Newest First</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div className="flex gap-1">
                        <Button
                            variant={isGridView ? "secondary" : "outline"}
                            size="icon"
                            onClick={() => setIsGridView(true)}
                        >
                            <LayoutGrid className="h-4 w-4" />
                        </Button>
                        <Button
                            variant={!isGridView ? "secondary" : "outline"}
                            size="icon"
                            onClick={() => setIsGridView(false)}
                        >
                            <LayoutList className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>


            <motion.div
                ref={ref}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={containerVariants}
                className={`grid gap-6 w-full ${isGridView ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'}`}
            >
                {filteredProperties.map((property) => (
                    <Link href={`/listing/${property.id}`} key={property.id}>
                        <motion.div key={property.id} variants={itemVariants}>
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
                    </Link>
                ))}
            </motion.div>


            <div className="flex items-center justify-center space-x-2 mt-8">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        onClick={() => handlePageChange(page)}
                        className="w-8 h-8 p-0"
                    >
                        {page}
                    </Button>
                ))}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}