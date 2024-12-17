import { getpropertyfeatures } from '@/actions/property'
import { getpropertytypes } from '@/actions/propertytype'
import PageView from '@/components/admin/propertytypes/PageView'
import React from 'react'

const page = async () => {
    const propertytypes = await getpropertytypes() ?? []
    console.log(propertytypes, 'the property types')
    return (
        <div className='col-span-3 container'>
propertyt
            <PageView propertytypes={propertytypes} />
        </div>
    )
}

export default page