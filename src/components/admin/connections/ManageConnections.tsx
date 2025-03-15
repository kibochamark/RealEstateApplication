"use client"
import { columns } from '@/app/intime-admin/managelisting/columns'
import { DataTable } from '@/components/globalcomponents/data-table'
import { Button } from '@/components/ui/button'
import { RootState } from '@/store/store'
import { Loader } from 'lucide-react'
import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/store/hooks'
import { clearEditData, setIsAdd } from '@/store/slices/PropertySlice'

import { connectioncolumn } from './testimonialcolumn'
import EditConnection from './EditConnection'

const ManageConnections = ({ connections}: { connections:any }) => {
    const editdata = useSelector((state: RootState) => state.property.editdata)
    const isedit = useSelector((state: RootState) => state.property.isedit)
    const isadd = useSelector((state: RootState) => state.property.isadd)

    

    const dispatch = useAppDispatch()
    return (
        <div className='flex flex-col w-full'>
            <div className='flex justify-between my-4'>
                <h1 className="text-2xl font-bold mb-5">Manage Connection</h1>
             
            </div>

            <Suspense fallback={<Loader className='animate animate-spin text-secondary300' />}>

                {isedit ? (
                    
                    // <EditConnection testimonial={connections}/>
                    ""
                ) : (
                    <div className='overflow-hidden'>
                        <DataTable columns={connectioncolumn} data={connections ?? []} searchColumn="name"/>
                    </div>
                )}



            </Suspense>

        </div>
    )
}

export default ManageConnections