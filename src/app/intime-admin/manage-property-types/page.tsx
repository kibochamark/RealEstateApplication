import { getpropertyfeatures } from '@/actions/property'
import { getpropertytypes } from '@/actions/propertytype'
import PageView from '@/components/admin/propertytypes/PageView'
import { Loader } from 'lucide-react'
import React, { Suspense } from 'react'

export const dynamic = "force-dynamic"

const page = async () => {
    const propertytypes = await getpropertytypes() ?? []
    return (
        <div className='col-span-3 container'>
            <Suspense fallback={<Loader className='animate animate-spin text-secondary400' />}>

                <PageView propertytypes={propertytypes} />
            </Suspense>
        </div>
    )
}

export default page