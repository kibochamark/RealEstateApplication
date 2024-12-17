import { DataTable } from '@/components/globalcomponents/data-table'
import React, { Suspense } from 'react'
import { columns } from './columns'
import { getproperties, getpropertyfeatures } from '@/actions/property'
import { Loader } from 'lucide-react'
import PageView from '@/components/admin/property/Manageproperty'
import { getpropertytypes } from '@/actions/propertytype'

const page = async () => {
    const properties = await getproperties() ?? []
    const features = await getpropertyfeatures() ?? []
    const propertytypes = await getpropertytypes() ?? []
    console.log(propertytypes, "propertypes,,,,,,,");
    console.log(properties, "properties222,,,,,,,");
    console.log(features, "features 333,,,,,,,");


    
    return (
        <div className="col-span-3 md:container">
            <PageView properties={properties} propertytypes={propertytypes[0]} features={features} />

        </div>
    )
}

export default page