import { Loader } from 'lucide-react';
import { Metadata } from 'next';
import React, { Suspense } from 'react'


export const metadata: Metadata = {
    title: "Auth- Intime Homes",
    description: "The better way to buy real estate",
};


const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='h-screen bg-white overflow-y-scroll'>
            <Suspense fallback={<Loader className='animate animate-spin text-secondary400' />}>

                {children}
            </Suspense>

        </div>
    )
}

export default layout