import ViewListing from '@/components/viewlisting'
import React from 'react'
import type { Metadata } from "next";
import { getproperties } from '@/actions/property';




const metadata: Metadata = {
    title: "Listings - Intime Homes",
    description: "The better way to buy real estate",
};

const page = async (props: {
    searchParams?: Promise<{
        limit?: string;
        page?: string;
    }>;
}) => {
    const searchParams = await props.searchParams;
    const limit = searchParams?.limit || '';
    const currentPage = Number(searchParams?.page) || 1;
    const properties = await getproperties(parseInt(limit), currentPage) ?? []
    return (
        <div className='w-full bg-primary50'>
            <div className='py-24'>
                <ViewListing properties={properties["properties"] || []} numberofpages={properties["totalpages"] || 0} />
            </div>
        </div>
    )
}

export default page