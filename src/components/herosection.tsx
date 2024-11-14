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

export default function HeroSection() {

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

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/home.jpg?height=1080&width=1920")',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative">


        {/* Hero Content */}
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]  px-6 md:px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="w-12 h-1 mt-6 bg-primary300 mx-auto mb-6" />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-primary200 text-xl"
            >
              WELCOME TO
            </motion.p>
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="w-fit md:w-full md:max-w-6xl mt-16 p-6 mb-12 lg:rounded-full bg-white/10 backdrop-blur-sm flex flex-col md:flex-row items-center gap-4 justify-between"
          >
            <Select>
              <SelectTrigger className="w-[200px] bg-transparent text-white border-white/20">
                <SelectValue placeholder="Looking For?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="buy">Buy Property</SelectItem>
                <SelectItem value="rent">Rent Property</SelectItem>
              </SelectContent>
            </Select>

            <Select>
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

            <Select>
              <SelectTrigger className="w-[200px] bg-transparent text-white border-white/20">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="downtown">Downtown</SelectItem>
                <SelectItem value="suburb">Suburb</SelectItem>
                <SelectItem value="beach">Beach Area</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[200px] bg-transparent text-white border-white/20">
                <SelectValue placeholder="For Rent/For Sale" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rent">For Rent</SelectItem>
                <SelectItem value="sale">For Sale</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="number"
              placeholder="Budget"
              className="w-[200px] bg-transparent text-white border-white/20 placeholder:text-white/70"
            />

            <Button className="bg-primary400 text-white hover:bg-[#D5C361] px-8">
              Search
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}