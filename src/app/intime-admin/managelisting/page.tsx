import { DataTable } from '@/components/globalcomponents/data-table'
import React, { Suspense } from 'react'
import { columns } from './columns'
import { getAllproperties, getproperties, getpropertyfeatures } from '@/actions/property'
import { Loader } from 'lucide-react'
import PageView from '@/components/admin/property/Manageproperty'
import { getpropertytypes } from '@/actions/propertytype'

export const dynamic = "force-dynamic"


const page = async () => {
    const properties = await getAllproperties() ?? []
    const features = await getpropertyfeatures() ?? []
    const propertytypes = await getpropertytypes() ?? []
    // console.log(propertytypes, "propertypes,,,,,,,");
    // console.log(properties, "properties222,,,,,,,");
    // console.log(features, "features 333,,,,,,,");



    return (
        <div className="col-span-3 md:container">
            <Suspense fallback={<Loader className='animate animate-spin text-secondary400' />}>

                <PageView properties={properties} propertytypes={propertytypes[0]} features={features} />
            </Suspense>

        </div>
    )
}

export default page