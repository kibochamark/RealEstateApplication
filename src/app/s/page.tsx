import ViewListing from '@/components/viewlisting'
import React, { Suspense } from 'react'
import type { Metadata } from "next";
import { getproperties } from '@/actions/property';
import { Loader } from 'lucide-react';




const metadata: Metadata = {
    title: "Listings - Intime Homes",
    description: "The better way to buy real estate",
};

export const dynamic = "force-dynamic"


const page = async (props: {
    searchParams?: Promise<{
        limit?: string;
        page?: string;
        filters: {
            saleType: string
            location: {
                area?:string
            },
            bedrooms: string
            budget: string
        }
    }>;
}) => {
    const searchParams = await props.searchParams;
    const limit = searchParams?.limit || '';
    const currentPage = Number(searchParams?.page) || 1;
    const properties = await getproperties(parseInt(limit), currentPage, searchParams?.filters) ?? []
    return (
        <div className='w-full bg-primary50'>
            <div className='py-24'>
                <Suspense fallback={<Loader className='animate animate-spin text-secondary400' />}>
                    
                    <ViewListing properties={properties["properties"] || []} numberofpages={properties["totalpages"] || 0} />
                </Suspense>

            </div>
        </div>
    )
}

export default page