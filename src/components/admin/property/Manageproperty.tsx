"use client"
import { columns } from '@/app/intime-admin/managelisting/columns'
import { DataTable } from '@/components/globalcomponents/data-table'
import { Button } from '@/components/ui/button'
import { RootState } from '@/store/store'
import { Loader } from 'lucide-react'
import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import AddProperty from './AddProperty'
import { useAppDispatch } from '@/store/hooks'
import { clearEditData, setIsAdd } from '@/store/slices/PropertySlice'
import EditProperty from './EditProperty'

const PageView = ({ properties, features }: { properties: any; features:any }) => {
    const editdata = useSelector((state: RootState) => state.property.editdata)
    const isedit = useSelector((state: RootState) => state.property.isedit)
    const isadd = useSelector((state: RootState) => state.property.isadd)

    const dispatch = useAppDispatch()
    return (
        <div className='flex flex-col w-full'>
            <div className='flex justify-between my-4'>
                <h1 className="text-2xl font-bold mb-5">Manage Properties</h1>
                <Button onClick={() => {
                    if (isedit) {
                        dispatch(clearEditData())
                    } else {
                        dispatch(setIsAdd())

                    }
                }} className='bg-primary300 text-white rounded-none' >
                    {isadd || isedit ? "back" : "add property"}
                </Button>
            </div>

            <Suspense fallback={<Loader className='animate animate-spin text-secondary300' />}>

                {isadd ? (
                    <AddProperty features={features} />
                ) : isedit ? (<EditProperty features={features} />) : (
                    <div className='overflow-hidden'>
                        <DataTable columns={columns} data={properties ?? []} searchColumn="title" />
                    </div>
                )}



            </Suspense>

        </div>
    )
}

export default PageView