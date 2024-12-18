import { Metadata } from 'next';
import React from 'react'


export const metadata: Metadata = {
    title: "Auth- Intime Homes",
    description: "The better way to buy real estate",
  };


const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='h-screen bg-white'>
            {children}
        </div>
    )
}

export default layout