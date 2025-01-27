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

const HeroSearchBar = () => {
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
            // console.log(values, "dsjf;lj")
            search.set('limit', '10');
            search.set('page', '0');
            search.set('filters', JSON.stringify({
                saleType: values.saleType.charAt(0).toUpperCase() + values.saleType.slice(1),
                propertyTypeId: values.propertyTypeId,
                location: {
                    area: values.location.area
                },
                bedrooms: values.bedrooms,
                budget: values.from + "-" + values.to,
            }));


            router.push(`/s?${search}`)

        }
    })

    return (
        <>
            {/* Search Form */}
            <form action="" onSubmit={formik.handleSubmit}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className={'md:flex grid grid-cols-2 md:flex-row flex-grow gap-2'}
                >
                    <Select onValueChange={(value) => {
                        formik.setFieldValue("propertyTypeId", value)
                    }} name="propertyTypeId" defaultValue={formik.values.propertyTypeId}>
                        <SelectTrigger className="w-[120px] border border-secondary300">
                            <SelectValue placeholder="Looking For?" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="test">Select property type</SelectItem>
                            {/* {propertytypes[0].length > 0 ? propertytypes[0]?.map((p: {
                                id: number;
                                name: string;
                            }) => (
                                <SelectItem key={p.id} value={p.id.toString()} className="font-semibold cursor-pointer">{p.name}</SelectItem>
                            )) : (<></>)} */}

                        </SelectContent>
                    </Select>

                    <Select onValueChange={(value) => {
                        formik.setFieldValue("bedrooms", value)
                    }} name="bedrooms" defaultValue={formik.values.bedrooms}>
                        <SelectTrigger className="w-[120px] border border-secondary300">
                            <SelectValue placeholder="Bedrooms" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">1 Bedroom</SelectItem>
                            <SelectItem value="2">2 Bedrooms</SelectItem>
                            <SelectItem value="3">3 Bedrooms</SelectItem>
                            <SelectItem value="4">4+ Bedrooms</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select onValueChange={(value) => {
                        formik.setFieldValue("location.area", value)
                    }} name="location.area" defaultValue={formik.values.location.area}>
                        <SelectTrigger className="w-[120px] border border-secondary300 ">
                            <SelectValue placeholder="Location" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Runda">Runda</SelectItem>
                            <SelectItem value="Westlands">Westlands</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select onValueChange={(value) => {
                        formik.setFieldValue("saleType", value)
                    }} name="saleType" defaultValue={formik.values.saleType}>
                        <SelectTrigger className="w-[120px] border border-secondary300 ">
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
                        <SelectTrigger className="w-[120px] border border-secondary300 ">
                            <SelectValue placeholder="select budget type" />
                        </SelectTrigger>
                        <SelectContent >
                            <SelectItem value="test">Select budget type</SelectItem>
                            <SelectItem value="fixed">Fixed budget</SelectItem>
                            <SelectItem value="dynamic">Range</SelectItem>
                        </SelectContent>
                    </Select>


                    {bugdettype == "fixed" ? (


                        <Input
                            type="number"
                            placeholder="Budget"
                            name="from"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-[120px] border border-secondary300  placeholder"
                        />
                    ) : bugdettype == "dynamic" && (

                        <>
                            <Input
                                type="number"
                                placeholder="from price"
                                name="from"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-[120px] border border-secondary300  placeholder"
                            />
                            <Input
                                type="number"
                                placeholder="to price"
                                name="to"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-[120px] border border-secondary300  placeholder"
                            />

                        </>


                    )}



                    <Button type="submit" className="bg-secondary300 col-span-2 text-black hover:bg-primary400 rounded-none px-8">
                        Search
                    </Button>
                </motion.div>
            </form>
        </>
    )
}

export default HeroSearchBar