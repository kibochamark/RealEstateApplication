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

import EditTestimanials from './EditTestimonials'
import AddTestimonials from './AddTestimonials'
import { testimonialcolumn } from './testimonialcolumn'

const ManageTestimonials = ({ properties, features, propertytypes }: { properties: any; features:any; propertytypes:any; }) => {
    const editdata = useSelector((state: RootState) => state.property.editdata)
    const isedit = useSelector((state: RootState) => state.property.isedit)
    const isadd = useSelector((state: RootState) => state.property.isadd)

    const dispatch = useAppDispatch()
    return (
        <div className='flex flex-col w-full'>
            <div className='flex justify-between my-4'>
                <h1 className="text-2xl font-bold mb-5">Manage Testimonials</h1>
                <Button onClick={() => {
                    if (isedit) {
                        dispatch(clearEditData())
                    } else {
                        dispatch(setIsAdd())

                    }
                }} className='bg-primary500 text-white rounded-none' >
                    {isadd || isedit ? "back" : "add testimony"}
                </Button>
            </div>

            <Suspense fallback={<Loader className='animate animate-spin text-secondary300' />}>

                {isadd ? (
                    <AddTestimonials/>
                ) : isedit ? (<EditTestimanials />) : (
                    <div className='overflow-hidden'>
                        <DataTable columns={testimonialcolumn} data={properties ?? []} searchColumn="name"/>
                    </div>
                )}



            </Suspense>

        </div>
    )
}

export default ManageTestimonials