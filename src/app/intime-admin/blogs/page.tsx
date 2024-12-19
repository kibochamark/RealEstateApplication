import ManageBlogs from '@/components/Blogs/ManageBlogs'
import React from 'react'

const page = () => {
  return (
    <div className="col-span-3 md:container">
        <ManageBlogs properties={undefined} features={undefined} propertytypes={undefined}/>
    </div>
  )
}

export default page