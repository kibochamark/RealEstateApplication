import ViewListing from '@/components/viewlisting'
import React from 'react'
import type { Metadata } from "next";




const metadata: Metadata = {
  title: "Listings - Intime Homes",
  description: "The better way to buy real estate",
};

const page = () => {
    return (
        <div className='w-full bg-primary50'>
            <div className='my-24'>
                <ViewListing />
            </div>

        </div>
    )
}

export default page