import { DataTable } from '@/components/globalcomponents/data-table'
import React, { Suspense } from 'react'
import { columns } from './columns'
import { getproperties, getpropertyfeatures } from '@/actions/property'
import { Loader } from 'lucide-react'
import PageView from '@/components/admin/property/Manageproperty'

const page = async () => {
    const properties = await getproperties()
    const features = await getpropertyfeatures()
    console.log(features, "test")
    return (
        <div className="col-span-3 md:container">
            <PageView properties={properties} features={features} />

        </div>
    )
}

export default page