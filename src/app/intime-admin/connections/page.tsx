import { getConnections } from '@/actions/connection'
import { getTestimonials } from '@/actions/Testimonial'
import ManageConnections from '@/components/admin/connections/ManageConnections'
import ManageTestimonials from '@/components/admin/testimonials/ManageTestimonials'
import React, { Suspense } from 'react'

export const dynamic = "force-dynamic"

const page = async() => {
  const connections = await getConnections() || []
  // console.log(connections), "connectionss";
  
  return (
    <div className="col-span-3 md:container">
      <Suspense>
        <ManageConnections connections={connections}  />
      </Suspense>
    </div>
  )
}

export default page