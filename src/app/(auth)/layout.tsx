import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='max-h-full  bg-white'>
            {children}
        </div>
    )
}

export default layout