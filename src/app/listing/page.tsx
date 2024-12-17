import ViewListing from '@/components/viewlisting'
import React from 'react'
import type { Metadata } from "next";
import { getproperties } from '@/actions/property';




const metadata: Metadata = {
  title: "Listings - Intime Homes",
  description: "The better way to buy real estate",
};

const page = async() => {
    const properties = await getproperties() ?? []
    return (
        <div className='w-full bg-primary50'>
            <div className='my-24'>
                <ViewListing  properties={properties}/>
            </div>

        </div>
    )
}

export default page