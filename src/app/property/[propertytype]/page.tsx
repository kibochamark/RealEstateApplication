import ViewListing from '@/components/viewlisting'
import React, { Suspense } from 'react'
import type { Metadata } from "next";
import { getproperties } from '@/actions/property';
import { Loader } from 'lucide-react';
import { getpropertytypebyname } from '@/actions/propertytype';




const metadata: Metadata = {
    title: "Listings - Intime Homes",
    description: "The better way to buy real estate",
};

export const dynamic = "force-dynamic"


const page = async (props: {
    params: {
        propertytype: string;
    }
    searchParams?: Promise<{
        limit?: string;
        page?: string;

    }>;
}, params: {
    propertytype: string;
}) => {
    const searchParams = await props.searchParams;
    const limit = searchParams?.limit || '';
    const currentPage = Number(searchParams?.page) || 1;
    const propertytypes = props.params?.propertytype.split("For")

    // create filters object
    let filters = {

    }

    if (propertytypes.length > 0) {
        console.log(propertytypes[0].split("%")[0])
        const fetchedpropertytype = await getpropertytypebyname(propertytypes[0].split("%")[0])
        console.log(Array.isArray(fetchedpropertytype[0]), "fet")
        if (fetchedpropertytype) {
            filters = {
                ...filters,
                propertyTypeId: fetchedpropertytype[0].id
            }
        }

    }




    const properties = Object.keys(filters).length > 0 ? await getproperties(parseInt(limit), currentPage, JSON.stringify(filters)) ?? [] :[]

    
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