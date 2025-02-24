"use client"

import type React from "react"
import { useState } from "react"
import { useFormik } from "formik"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FeatureBadges } from "./features"
import { postProperty } from "@/actions/property"
import toast from "react-hot-toast"
import { Loader } from "lucide-react"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy } from "@dnd-kit/sortable"
import { SortableImage } from "./sortable-image"

interface PropertyImage {
  url: string
  Image: File
  id: string
}

interface AddPropertyProps {
  features:{id:number; name:string;}[];
  propertytypes: { id: number; name: string }[]
}

export default function AddProperty({ features, propertytypes }: AddPropertyProps) {
  const router = useRouter()
  const [uploadedImages, setUploadedImages] = useState<PropertyImage[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      street_address: "",
      city: "",
      saleType: "Sale",
      longitude: "",
      latitude: "",
      featured: false,
      propertyType: "",
      size: "",
      distance: "",
      price: "",
      pricepermonth: "",
      features: [] as string[],
      state: "",
      country: "",
      county: "",
      area: "",
      bedrooms: "",
    },
    onSubmit: async (values) => {
      const updatedValues = {
        ...values,
        features: values.features.join(","),
      }

      const formattedValues = Object.entries(updatedValues).filter(([key, value]) => {
        if (key === "images" || key === "Image") {
          return false
        }
        return true
      })

      try {
        setIsLoading(true)
        const formData = new FormData()
        uploadedImages.forEach((image) => {
          formData.append(`images`, image.Image)
        })
        formData.append("json", JSON.stringify(Object.fromEntries(formattedValues)))

        const response = await postProperty(formData)

        setIsLoading(false)
        if (!response[0]) {
          toast.success("Property successfully posted")
          formik.resetForm()
          setUploadedImages([])
        } else {
          toast.error("Error posting property")
        }
      } catch (error) {
        console.error("Error posting property:", error)
        setIsLoading(false)
      }
    },
  })

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newImages = Array.from(files).map((file) => ({
        url: URL.createObjectURL(file),
        Image: file,
        id: `image-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      }))
      setUploadedImages((prevImages) => [...prevImages, ...newImages])
    }
  }

  // const handleImageDelete = (id: string) => {
  //   setUploadedImages((prevImages) => prevImages.filter((image) => image.id !== id))
  // }
const handleImageDelete = (
  index: number,
  setFieldValue: (field: string, value: any) => void
) => {
  // Create a new array without the deleted image
  const newImages = [...uploadedImages];
  newImages.splice(index, 1); // Remove the image at the specified index
  
  // Update the state with the new images array
  setUploadedImages(newImages);
  
  // Update Formik values with the new images (after deletion)
  setFieldValue("images", newImages.map((img) => img.url));
};

  
  
  

  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setUploadedImages((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  return (
    <Card className="w-full border-none shadow-none">
      <CardHeader>
        <CardTitle>Create New Property</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4 md:grid-cols-3" onSubmit={formik.handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name">Property Title</Label>
            <Input
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              placeholder="Enter property title"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              placeholder="Enter property description"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="saleType">Sale Type</Label>
            <Select
              name="saleType"
              value={formik.values.saleType}
              onValueChange={(value) => formik.setFieldValue("saleType", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select sale type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sale">Sale</SelectItem>
                <SelectItem value="Rent">Rental</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="street_address">Street Address</Label>
            <Input
              id="street_address"
              name="street_address"
              value={formik.values.street_address}
              onChange={formik.handleChange}
              placeholder="Enter street address"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              placeholder="Enter city"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              name="state"
              value={formik.values.state}
              onChange={formik.handleChange}
              placeholder="Enter state"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              name="country"
              value={formik.values.country}
              onChange={formik.handleChange}
              placeholder="Enter country"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="county">County</Label>
            <Input
              id="county"
              name="county"
              value={formik.values.county}
              onChange={formik.handleChange}
              placeholder="Enter county"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="area">Area</Label>
            <Input
              id="area"
              name="area"
              value={formik.values.area}
              onChange={formik.handleChange}
              placeholder="Enter area"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="longitude">Longitude</Label>
            <Input
              id="longitude"
              name="longitude"
              value={formik.values.longitude}
              onChange={formik.handleChange}
              placeholder="Enter longitude"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="latitude">Latitude</Label>
            <Input
              id="latitude"
              name="latitude"
              value={formik.values.latitude}
              onChange={formik.handleChange}
              placeholder="Enter latitude"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="propertyType">Property Type</Label>
            <Select
              name="propertyType"
              value={formik.values.propertyType}
              onValueChange={(value) => formik.setFieldValue("propertyType", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                {propertytypes.map((type) => (
                  <SelectItem key={type.id} value={type.id.toString()}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="size">Size</Label>
            <Input
              id="size"
              name="size"
              value={formik.values.size}
              onChange={formik.handleChange}
              placeholder="Enter size"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="distance">Distance</Label>
            <Input
              id="distance"
              name="distance"
              value={formik.values.distance}
              onChange={formik.handleChange}
              placeholder="Enter distance"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={formik.values.price}
              onChange={formik.handleChange}
              placeholder="Enter price"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pricepermonth">Price per Month</Label>
            <Input
              id="pricepermonth"
              name="pricepermonth"
              type="number"
              value={formik.values.pricepermonth}
              onChange={formik.handleChange}
              placeholder="Enter price per month"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bedrooms">Bedrooms</Label>
            <Input
              id="bedrooms"
              name="bedrooms"
              type="number"
              value={formik.values.bedrooms}
              onChange={formik.handleChange}
              placeholder="Enter number of bedrooms"
            />
          </div>

          <div className="space-y-2 md:col-span-3">
            <Label>Features</Label>
            <FeatureBadges
              features={features}
              selectedFeatures={formik.values.features}
              onFeatureToggle={(feature: string) => {
                const updatedFeatures = formik.values.features.includes(feature)
                  ? formik.values.features.filter((f) => f !== feature)
                  : [...formik.values.features, feature]
                formik.setFieldValue("features", updatedFeatures)
              }}
            />
          </div>

          <div className="flex items-center space-x-2 md:col-span-3">
            <Checkbox
              id="featured"
              name="featured"
              checked={formik.values.featured}
              onCheckedChange={(checked) => formik.setFieldValue("featured", checked)}
            />
            <Label htmlFor="featured">Featured Property</Label>
          </div>

          <div className="space-y-2 md:col-span-3">
  <Label htmlFor="property-images">Images</Label>
  <Input id="property-images" name="images" type="file" multiple onChange={handleImageUpload} />
  
  <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
    <SortableContext items={uploadedImages} strategy={rectSortingStrategy}>
      <div className="mt-4 grid grid-cols-3 gap-4">
        {uploadedImages.map((image, index) => (
          <SortableImage
            key={image.id} // Using a unique `id` as the key here
            id={image.id}  // Pass the unique image ID
            url={image.url}
            onDelete={() => handleImageDelete(index, formik.setFieldValue)} // Pass the correct index and setFieldValue here
          />
        ))}
      </div>
    </SortableContext>
  </DndContext>
</div>


          <Button type="submit" className="w-full md:col-span-3" disabled={isLoading}>
            {isLoading ? <Loader className="animate-spin mr-2" /> : null}
            {isLoading ? "Creating Property..." : "Create Property"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

