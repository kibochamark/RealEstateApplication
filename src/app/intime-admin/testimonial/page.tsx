import ManageTestimonials from '@/components/admin/testimonials/ManageTestimonials'
import React, { Suspense } from 'react'

export const dynamic = "force-dynamic"

const page = () => {
  return (
    <div className="col-span-3 md:container">
      <Suspense>
        <ManageTestimonials properties={undefined} features={undefined} propertytypes={undefined} />
      </Suspense>
    </div>
  )
}

export default page