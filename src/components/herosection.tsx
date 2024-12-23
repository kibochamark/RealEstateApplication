'use client'

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useRouter, useSearchParams } from "next/navigation"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useState } from "react"
import { log } from "console"

type PropertyTypes = {

}

export default function HeroSection({ propertytypes }: { propertytypes: any[] }) {

  // our states

  const [bugdettype, setBudgetType] = useState("")

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
      bedrooms: "3",
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
      search.set('limit',  '10');
      search.set('page', '0');
      search.set('filters', JSON.stringify({
          saleType: values.saleType.charAt(0).toUpperCase() + values.saleType.slice(1),
          propertyTypeId:values.propertyTypeId,
          location: {
            area:values.location.area
          },
          bedrooms: values.bedrooms,
          budget: values.from + "-" + values.to,
      }));


      router.push(`/s?${search}`)

    },
  })



  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/home.jpg?height=1080&width=1920")',
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content */}
      <div className="relative">


        {/* Hero Content */}
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] pt-16  px-6 md:px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >


            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-6xl md:text-7xl font-light text-secondary400"
            >
              Intime Homes Consultancy
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-primary200 text-2xl md:text-3xl italic"
            >
              Turning Dreams Into Homes
            </motion.p>
          </motion.div>

          {/* Search Form */}
          <form action="" onSubmit={formik.handleSubmit}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className={`w-fit lg:w-full ${bugdettype == "fixed" || bugdettype == "" ? "lg:max-w-6xl lg:flex-row" : "lg:flex-col"} mt-16 p-6 mb-12 lg:rounded-full bg-white/10 backdrop-blur-sm flex flex-col  items-center gap-4 justify-between`}
            >
              <Select onValueChange={(value)=>{
                formik.setFieldValue("propertyTypeId", value)
              }}name="propertyTypeId" defaultValue={formik.values.propertyTypeId}>
                <SelectTrigger className="w-[200px] bg-transparent text-white border-white/20">
                  <SelectValue placeholder="Looking For?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="test">Select property type</SelectItem>
                  {propertytypes[0]?.map((p: {
                    id: number;
                    name: string;
                  }) => (
                    <SelectItem key={p.id} value={p.id.toString()} className="font-semibold cursor-pointer">{p.name}</SelectItem>
                  ))}

                </SelectContent>
              </Select>

              <Select onValueChange={(value)=>{
                formik.setFieldValue("bedrooms", value)
              }} name="bedrooms" defaultValue={formik.values.bedrooms}>
                <SelectTrigger className="w-[200px] bg-transparent text-white border-white/20">
                  <SelectValue placeholder="Bedrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Bedroom</SelectItem>
                  <SelectItem value="2">2 Bedrooms</SelectItem>
                  <SelectItem value="3">3 Bedrooms</SelectItem>
                  <SelectItem value="4">4+ Bedrooms</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={(value)=>{
                formik.setFieldValue("location.area", value)
              }} name="location.area" defaultValue={formik.values.location.area}>
                <SelectTrigger className="w-[200px] bg-transparent text-white border-white/20">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Runda">Runda</SelectItem>
                  <SelectItem value="Westlands">Westlands</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={(value)=>{
                formik.setFieldValue("saleType", value)
              }} name="saleType" defaultValue={formik.values.saleType}>
                <SelectTrigger className="w-[200px] bg-transparent text-white border-white/20">
                  <SelectValue placeholder="For Rent/For Sale" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem className="font-semibold" value="rent">For Rent</SelectItem>
                  <SelectItem className="font-semibold" value="sale">For Sale</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={(value) => {
                setBudgetType(value)
              }} defaultValue={bugdettype}>
                <SelectTrigger className="w-[200px] bg-transparent text-white border-white/20">
                  <SelectValue placeholder="select budget type" />
                </SelectTrigger>
                <SelectContent >
                  <SelectItem value="test">Select budget type</SelectItem>
                  <SelectItem value="fixed">Fixed budget</SelectItem>
                  <SelectItem value="dynamic">Range</SelectItem>
                </SelectContent>
              </Select>


              {bugdettype == "fixed"  ? (


                <Input
                  type="number"
                  placeholder="Budget"
                  name="from"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-[200px] bg-transparent text-white border-white/20 placeholder:text-white/70"
                />
              ) :  bugdettype == "dynamic" && (

                <>
                  <Input
                    type="number"
                    placeholder="from price"
                    name="from"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-[200px] bg-transparent text-white border-white/20 placeholder:text-white/70"
                  />
                  <Input
                    type="number"
                    placeholder="to price"
                    name="to"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-[200px] bg-transparent text-white border-white/20 placeholder:text-white/70"
                  />

                </>


              )}



              <Button type="submit"  className="bg-primary400 text-white hover:bg-secondary300 rounded-none px-8">
                Search
              </Button>
            </motion.div>
          </form>
        </div>
      </div>
    </div>
  )
}