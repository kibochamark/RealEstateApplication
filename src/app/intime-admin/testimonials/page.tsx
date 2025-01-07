import { getTestimonials } from '@/actions/Testimonial'
import ManageTestimonials from '@/components/admin/testimonials/ManageTestimonials'
import React, { Suspense } from 'react'

export const dynamic = "force-dynamic"

const page = async() => {
  const testimonial = await getTestimonials() || []
  // console.log(testimonial), "testimonials";
  
  return (
    <div className="col-span-3 md:container">
      <Suspense>
        <ManageTestimonials testimonial={testimonial} features={undefined} propertytypes={undefined} />
      </Suspense>
    </div>
  )
}

export default page