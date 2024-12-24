import { getAllBlogs } from '@/actions/Blog';
import ManageBlogs from '@/components/Blogs/ManageBlogs'
import React, { Suspense } from 'react'

export const dynamic = "force-dynamic"

const page = async () => {
  const blogs = await getAllBlogs() ?? [];
  
  return (
    <div className="col-span-3 md:container">
      <Suspense>
        <ManageBlogs blogs={blogs} features={undefined} propertytypes={undefined} />
      </Suspense>
    </div>
  )
}

export default page