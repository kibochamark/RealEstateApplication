"use client";

import { useState } from "react";
import {
  ArrowUpDown,
  LayoutGrid,
  LayoutList,
  ChevronLeft,
  ChevronRight,
  SearchIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bed, Maximize2, MapPin } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useInView } from "react-intersection-observer";
import { PropertyCarousel } from "./cards";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function ViewListing({ properties, numberofpages }: { properties: any[]; numberofpages: number }) {
  const [isGridView, setIsGridView] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [budgetRange, setBudgetRange] = useState([0, 100000000]);
  const [bedrooms, setBedrooms] = useState("");
  const [propertyType, setPropertyType] = useState("");


  // acces the searchparams
  const searchparams = useSearchParams()
  const limit = searchparams.get("limit")
  const page = searchparams.get("page")

  const router = useRouter();

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // const properties = [
  //     {
  //         id: 1,
  //         title: "2 Bedroom Apartment",
  //         price: 7900000,
  //         location: "Kilimani, Nairobi, Kenya",
  //         beds: 2,
  //         baths: 1,
  //         sqft: "80 sq m",
  //         type: "APARTMENT",
  //         featured: true,
  //         status: "FOR SALE",
  //         images: ["/1.jpg?height=300&width=400", "/2.jpg?height=300&width=400", "/3.jpg?height=300&width=400"]
  //     },
  //     {
  //         id: 2,
  //         title: "3 Bedroom Apartment Plus DSQ",
  //         price: 27000000,
  //         location: "Nyali, Mombasa, Kenya",
  //         beds: 3,
  //         baths: 2,
  //         sqft: "4200 sq ft",
  //         featured: true,
  //         type: "APARTMENT",
  //         status: "FOR SALE",
  //         images: ["/4.jpg?height=300&width=400", "/5.jpg?height=300&width=400", "/6.jpg?height=300&width=400"]
  //     },
  //     {
  //         id: 3,
  //         title: "Villas For Sale And Rent",
  //         price: 95000000,
  //         location: "Lower Kabete, Nairobi, Kenya",
  //         beds: "3,4 & 5",
  //         status: "FOR RENT",
  //         type: "LAND",
  //         featured: true,
  //         images: ["/7.jpg?height=300&width=400", "/8.jpg?height=300&width=400", "/9.jpg?height=300&width=400"]
  //     },
  //     {
  //         id: 4,
  //         title: "Amber Bay",
  //         price: 6730000,
  //         location: "Lavington, Nairobi, Kenya",
  //         beds: 1,
  //         featured: true,
  //         type: "LAND",
  //         status: "FOR SALE",
  //         images: ["/10.jpg?height=300&width=400", "/11.jpg?height=300&width=400", "/12.jpg?height=300&width=400"]
  //     },
  //     {
  //         id: 5,
  //         title: "Amber Bay",
  //         price: 6750000,
  //         location: "Lavington, Nairobi, Kenya",
  //         beds: 1,
  //         featured: true,
  //         type: "LAND",
  //         status: "FOR SALE",
  //         images: ["/10.jpg?height=300&width=400", "/11.jpg?height=300&width=400", "/12.jpg?height=300&width=400"]
  //     }
  // ]


  const url = new URLSearchParams(searchparams)

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
   


    url.set("limit", "200"),
    url.set("page", page.toString())
    console.log(url, "url");
    

    router.replace(`/listing?${url}`)

  };

  const filteredProperties = properties.filter(
    (property) =>
      property.price >= budgetRange[0] &&
      property.price <= budgetRange[1] &&
      (bedrooms === "" || property.bedrooms === parseInt(bedrooms)) &&
      (propertyType === "" || property.propertyType.name === propertyType)
  );

  return (
    <div className="container max-w-full  relative px-4 py-8 flex lg:flex-row flex-col lg:gap-10 gap-2">
      <div className="mb-8 p-6 bg-card h-fit w-[100] lg:sticky top-20 flex flex-col  rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                </div> */}
        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="w-full p-2 flex flex-col gap-2"
        >
          <div className="grid md:grid-cols-2 gap-2 w-full">
            <div className="col-span-1">
              {" "}
              <Select>
                <SelectTrigger className="w-full bg-transparent text-black border-black">
                  <SelectValue placeholder="Looking For?" />
                </SelectTrigger>
                <SelectContent className="text-black">
                  <SelectItem value="buy">Buy Property</SelectItem>
                  <SelectItem value="rent">Rent Property</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-1">
              <Select>
                <SelectTrigger className="w-full bg-transparent text-black border-black">
                  <SelectValue placeholder="Bedrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Bedroom</SelectItem>
                  <SelectItem value="2">2 Bedrooms</SelectItem>
                  <SelectItem value="3">3 Bedrooms</SelectItem>
                  <SelectItem value="4">4+ Bedrooms</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-1">
              <Select>
                <SelectTrigger className="w-full bg-transparent text-black border-black">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="downtown">Downtown</SelectItem>
                  <SelectItem value="suburb">Suburb</SelectItem>
                  <SelectItem value="beach">Beach Area</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-1">
              <Select>
                <SelectTrigger className="w-full bg-transparent text-black border-black">
                  <SelectValue placeholder="For Rent/For Sale" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rent">For Rent</SelectItem>
                  <SelectItem value="sale">For Sale</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <p className="my-2 text-black tracking-tight text-md text-left">
            Filter By Budget
          </p>

          <div className="w-full flex flex-1 flex-row gap-2">
            <div className="border text-center p-2 text-sm border-secondary300  hover:bg-white hover:text-secondary300 duration-300 transition-all cursor-pointer text-black tracking-tight">
              0 - 500k
            </div>
            <div className="border text-center p-2 text-sm border-secondary300  hover:bg-white hover:text-secondary300 duration-300 transition-all cursor-pointer text-black tracking-tight">
              0 - 500k
            </div>
            <div className="border text-center p-2 text-sm border-secondary300  hover:bg-white hover:text-secondary300 duration-300 transition-all cursor-pointer text-black tracking-tight">
              0 - 500k
            </div>
            <div className="border text-center p-2 text-sm border-secondary300  hover:bg-white hover:text-secondary300 duration-300 transition-all cursor-pointer text-black tracking-tight">
              0 - 500k
            </div>
          </div>
          <div className="relative w-full border border-secondary400">
            <Input
              type="text"
              placeholder="Search property by type or location"
              className="w-full h-full py-4 pl-8 tracking-tight leading-tight focus:outline-none outline-none rounded-none bg-transparent border-none text-black placeholder:text-black/40"
            />
            <SearchIcon className="absolute w-6 h-6 left-0 top-4 px-1 text-gray-400" />
          </div>

          <div className="flex gap-2 flex-row items-center justify-center">
            <div className="bg-secondary300 h-1 w-full"></div>
            <p className="text-md font-semibold">Or</p>
            <div className="bg-secondary300 h-1 w-full"></div>
          </div>

          <div>
            <Label htmlFor="budget-range">Custom Budget Range (Kshs)</Label>
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
                onChange={(e) =>
                  setBudgetRange([parseInt(e.target.value), budgetRange[1]])
                }
                className="w-[45%]"
              />
              <Input
                type="number"
                value={budgetRange[1]}
                onChange={(e) =>
                  setBudgetRange([budgetRange[0], parseInt(e.target.value)])
                }
                className="w-[45%]"
              />
            </div>
          </div>

          <Button className="bg-primary400 rounded-none text-white hover:bg-[#D5C361] px-8">
            Search
          </Button>
          <Button className="text-primary400 rounded-none  bg-white/30 border hover:bg-gray-400 hover:text-white border-primary400 px-8">
            Clear filter
          </Button>
        </motion.div>
        {/* <Filter /> */}
      </div>

      <div className="flex flex-col gap-2 w-full relative ">
        <div className="grid grid-cols-2">
          <h1 className="text-2xl font-medium">
            {filteredProperties.length} Properties
          </h1>
          <div className=" col-span-1 flex w-full items-center gap-2 justify-end">
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
          className={`grid gap-6 w-full ${isGridView
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1"
            }`}
        >
          {filteredProperties.map((property) => (
            <motion.div
              key={property.id}
              variants={itemVariants}
              onClick={() => {
                // router.push(`/listing/${property.id}`)
              }}
            >
              <Card className="overflow-hidden shadow-none border-none">
                <div className="relative">
                  <PropertyCarousel
                    images={property.images.map(
                      (image: { url: any }) => image.url
                    )} // Extract URLs from images
                    propertyId={property.id}
                  />{" "}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {property.featured && (
                      <Badge className="bg-green-500">FEATURED</Badge>
                    )}
                    <Badge variant="secondary">{property.saleType}</Badge>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="text-white font-bold text-xl">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "KES",
                      }).format(property.price)}{" "}
                    </div>
                  </div>
                </div>
                <Link href={`/listing/${property.id}`}>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{property.name}</h3>
                    <div className="flex items-center text-muted-foreground mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {property.area}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {property.bedrooms && (
                        <div className="flex items-center">
                          <Bed className="w-4 h-4 mr-1" />
                          {property.bedrooms}
                        </div>
                      )}
                      {property.size && (
                        <div className="flex items-center">
                          <Maximize2 className="w-4 h-4 mr-1" />
                          {property.size}
                        </div>
                      )}
                    </div>
                    {property.propertyType && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm text-muted-foreground">
                          {property.propertyType.name}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Link>
              </Card>
            </motion.div>
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
          {Array.from({ length: numberofpages }, (_, i) => i + 1).map((page) => (
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
            disabled={currentPage === numberofpages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
