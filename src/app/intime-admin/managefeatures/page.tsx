import { getpropertyfeatures } from '@/actions/property'
import PageView from '@/components/admin/features/PageView'
import React from 'react'

const page = async () => {
    const features = await getpropertyfeatures() ?? []
    return (
        <div className='col-span-3 container'>

            <PageView features={features} />
        </div>
    )
}

export default page