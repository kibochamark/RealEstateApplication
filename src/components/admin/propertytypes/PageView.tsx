"use client"
import { DataTable } from '@/components/globalcomponents/data-table'
import { Button } from '@/components/ui/button'
import React, { Suspense } from 'react'
import { Loader } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { clearEditData } from '@/store/slices/PropertySlice'
import AddPropertyType from './AddPropertyType'
import { columns } from './columns'
import EditPropertyType from './EditPropertyType'


const PageView = ({ propertytypes }: { propertytypes: any }) => {
    const page = useAppSelector((state) => state.property.page)
    const isedit = useAppSelector((state) => state.property.isedit)
    const dispatch = useAppDispatch()

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex justify-between my-4'>
                <h1 className="text-2xl font-bold mb-5">Manage Property Types</h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button onClick={() => {
                            // if (isedit) {
                            //     dispatch(clearEditData())
                            // } else {
                            //     dispatch(setIsAdd())

                            // }
                        }} className='bg-primary500 text-white rounded-none' >
                            {/* {isadd || isedit ? "back" : "add property"} */}
                            Add Property Type
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Propety Types Listing</DialogTitle>
                            <DialogDescription>
                                <AddPropertyType />
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>


                <Dialog open={page == "propertytypes" && isedit} onOpenChange={() => {
                    dispatch(clearEditData())
                }}>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Update Property Type Listing</DialogTitle>
                            <DialogDescription>
                                <EditPropertyType />
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>


            </div>


            <div className='w-full'>
                <Suspense fallback={<Loader className='animate animate-spin text-secondary300' />}>
                    <DataTable columns={columns} data={propertytypes[0]} />
                </Suspense>

            </div>


        </div>
    )
}

export default PageView