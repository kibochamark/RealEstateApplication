"use client"

import { useMemo, useState } from "react"
import { Search, MapPin, Home, DollarSign, Filter, SearchIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { useRouter, useSearchParams } from "next/navigation"
import { useFormik } from "formik"

export default function PropertySearch({propertytypes}:{propertytypes:any}) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [priceRange, setPriceRange] = useState([10000, 1000000])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price)
  }


  // -------



  const router = useRouter()

  const searchparams = useSearchParams()
  const search = new URLSearchParams(searchparams)


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

  const handleSearch = () => {
      router.push(`/s?${search}`)
  }


  // formik to handle search
  const formik = useFormik({
      initialValues: {
          saleType: "",
          location: {
              city: "",
              state: "",
              area: ""
          },
          bedrooms: "",
          budget: "0",
          from: "",
          to: "",
          propertyTypeId: ""
      },
      // validationSchema: Yup.object().shape({
      //   saleType: Yup.string().required(),
      //   location: Yup.object().shape({
      //     area:Yup.string().required()
      //   }),
      //   bedrooms: Yup.string().required(),
      //   budget: Yup.string().required(),
      //   propertyTypeId:Yup.string().required()
      // }),
      onSubmit(values, formikHelpers) {
          console.log(values, "dsjf;lj")
          search.set('limit', '10');
          search.set('page', '0');
          search.set('filters', JSON.stringify({
              saleType: values.saleType.charAt(0).toUpperCase() + values.saleType.slice(1),
              propertyTypeId: values.propertyTypeId,
              location: {
                  area: values.location.area
              },
              bedrooms: values.bedrooms,
              budget: values.budget,
          }));


          router.push(`/s?${search}`)

      }
  })

  useMemo(()=>{
    formik.setFieldValue("budget", `${priceRange[0]}-${priceRange[1]}`)
  }, [priceRange, setPriceRange])


  
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div
        className={cn(
          "bg-white rounded-lg shadow-lg transition-all duration-300 overflow-hidden",
          searchOpen ? "max-h-[500px]" : "max-h-16",
        )}
      >
        <form action="" onSubmit={formik.handleSubmit}>
        {/* Main search bar */}
        <div className="flex items-center p-4 border-b border-gray-100">
          <div className="flex-1 flex items-center gap-2">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              name="location.area"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
                defaultValue={formik.values.location.area}
              placeholder="Search by city, neighborhood, or address"
              className="border-none shadow-none focus-visible:ring-0 text-base"
            //   onClick={() => setSearchOpen(true)}
            />
          </div>
          <div className="flex gap-2 items-center justify-center">
          <Button
            variant={searchOpen ? "default" : "outline"}
           type="submit"
            className="ml-2"
          >
            {searchOpen ? "Search" : <SearchIcon className="h-4 w-4 mr-2" />}
          </Button>
          <Filter  onClick={() => setSearchOpen(!searchOpen)} className="h-4 w-4 mr-2" />
          </div>
       
        </div>

        {/* Advanced search options */}
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              <MapPin className="h-4 w-4" /> Location
            </label>
            <Select defaultValue="any">
              <SelectTrigger>
                <SelectValue placeholder="Any location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any location</SelectItem>
                <SelectItem value="downtown">Downtown</SelectItem>
                <SelectItem value="suburbs">Suburbs</SelectItem>
                <SelectItem value="beachfront">Beachfront</SelectItem>
                <SelectItem value="countryside">Countryside</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              <Home className="h-4 w-4" /> Property Type
            </label>
            <Select onValueChange={(value) => {
                        formik.setFieldValue("propertyTypeId", value)
                    }} name="propertyTypeId" defaultValue={formik.values.propertyTypeId}>
              <SelectTrigger>
                <SelectValue placeholder="property type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any type</SelectItem>
               {propertytypes[0].length > 0 ? propertytypes[0]?.map((p: {
                                id: number;
                                name: string;
                            }) => (
                                <SelectItem key={p.id} value={p.id.toString()} className="font-semibold cursor-pointer">{p.name}</SelectItem>
                            )) : (<></>)}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              <DollarSign className="h-4 w-4" /> Price Range
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4 p-2">
                  <h4 className="font-medium">Select price range</h4>
                  <Slider
                    defaultValue={[0, 1000000]}
                    max={2000000}
                    step={50000}
                    onValueChange={(value) => setPriceRange(value as number[])}
                    className="my-6"
                  />
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{formatPrice(priceRange[0])}</div>
                    <div className="font-medium">{formatPrice(priceRange[1])}</div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Bedrooms</label>
            <Select onValueChange={(value) => {
                        formik.setFieldValue("bedrooms", value)
                    }} name="bedrooms" defaultValue={formik.values.bedrooms}>
                        <SelectTrigger className="w-full border border-secondary300">
                            <SelectValue placeholder="Bedrooms" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="0">select bedrooms</SelectItem>
                            <SelectItem value="1">1 Bedroom</SelectItem>
                            <SelectItem value="2">2 Bedrooms</SelectItem>
                            <SelectItem value="3">3 Bedrooms</SelectItem>
                            <SelectItem value="4">4+ Bedrooms</SelectItem>
                        </SelectContent>
                    </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Sale Type</label>
            <Select onValueChange={(value) => {
                        formik.setFieldValue("saleType", value)
                    }} name="saleType" defaultValue={formik.values.saleType}>
                        <SelectTrigger className="w-full border border-secondary300 ">
                            <SelectValue placeholder="For Rent/For Sale" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem className="font-semibold" value="rent">For Rent</SelectItem>
                            <SelectItem className="font-semibold" value="sale">For Sale</SelectItem>
                        </SelectContent>
                    </Select>
          </div>

         
        </div>

        <div className="p-4 bg-muted/30 flex flex-wrap gap-2 justify-end">
          <Button variant="outline" onClick={() => {
            
            setSearchOpen(false)
            formik.resetForm()
            
            }}>
            Reset
          </Button>
          <Button className="" type="submit">Find Properties</Button>
        </div>
        </form>
      </div>
    </div>
  )
}

