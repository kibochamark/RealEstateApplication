'use client'

import React from 'react'
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { useRef } from 'react'

const Aboutus = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      ref={ref}
      className="bg-gradient-to-b from-primary50 to-primary100 py-16 px-4 sm:px-6 lg:px-8 w-full relative overflow-hidden"
    >
      {/* <svg className='absolute bottom-0 left-0 w-full' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#b9985f" fillOpacity="0.2" d="M0,224L48,186.7C96,149,192,75,288,53.3C384,32,480,64,576,101.3C672,139,768,181,864,197.3C960,213,1056,203,1152,181.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg> */}

      <svg className='absolute bottom-0 left-0 w-full' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
  <path fill="#b9985f" fill-opacity="1" d="M0,224L48,186.7C96,149,192,75,288,53.3C384,32,480,64,576,101.3C672,139,768,181,864,197.3C960,213,1056,203,1152,181.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
</svg>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-extrabold text-secondary600 mb-4">About Us</h2>
            <div className="space-y-4">
              <p className="text-lg text-gray-700 leading-relaxed tracking-wide">
                Intime Homes Consultancy is a professional Real Estate Company in Nairobi, Kenya focused on providing quality services to its clients. Our mission is to modernize the experience of buying and selling real estate through collaboration, innovation, and integrity. We offer property sales, management, and consultancy, connecting people to homes and communities. Our clients’ needs and best interests are at the heart of everything we do.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 px-6 py-3 bg-secondary600 text-white font-semibold rounded-full shadow-lg hover:bg-amber-700 transition duration-300"
            >
              Learn More
            </motion.button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md aspect-square">
              <Image
                src="/14.jpg"
                alt="Team collaborating"
                layout="fill"
                objectFit="cover"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/20 to-transparent rounded-2xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default Aboutus
