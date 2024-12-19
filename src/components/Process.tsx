"use client"
import { useInView, motion } from 'framer-motion';
import { CheckCircleIcon, CreditCard, MousePointer, Phone, ScanSearch } from 'lucide-react'
import React, { useRef } from 'react'

const Process = () => {
    const ref = useRef(null);
    const isInView = useInView(ref);
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            ref={ref}

            className='container p-10 px-4x0 flex flex-col gap-8'>
            <div
             className='flex items-center justify-center my-4'>
                <h3 className='text-4xl w-[60]'> <span className='text-secondary300 font-semibold'>Buying</span> or <span className='text-secondary300 font-semibold'>Renting</span> a property is as simple as <span className='text-6xl'>&#8229;</span> </h3>
            </div>


            <div className='grid md:grid-cols-3 gap-4 mt-4 mb-10'>

                <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className='shadow-md shadow-secondary100 rounded-md bg-white p-4 flex flex-col gap-6 items-center justify-center'>
                    <div className='rounded-full p-10 bg-gray-200'>
                        <ScanSearch className='text-black w-10 h-10' />
                    </div>

                    <CheckCircleIcon className='w-8 h-8 text-green-400' />

                    <p className='my-2 text-2xl text-balance'>Search</p>

                </motion.div>
                <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                className='shadow-md shadow-secondary100 rounded-md bg-white p-4 flex flex-col gap-6 items-center justify-center'>
                    <div className='rounded-full p-10 bg-gray-200'>
                        <Phone className='w-10 h-10 text-primary300' />
                    </div>
                    <CheckCircleIcon className='w-8 h-8 text-green-400' />


                    <p className='my-2 text-2xl text-balance'>Enquire</p>

                </motion.div>
                <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.6 }}
                className='shadow-md shadow-secondary100 rounded-md bg-white p-4 flex flex-col gap-6 items-center justify-center'>
                    <div className='rounded-full p-10 bg-gray-200'>
                        <CreditCard className='w-10 h-10 text-secondary300' />
                    </div>

                    <CheckCircleIcon className='w-8 h-8 text-green-400' />

                    <p className='my-2 text-2xl text-balance'>Pay</p>

                </motion.div>
            </div>

        </motion.div>
    )
}

export default Process