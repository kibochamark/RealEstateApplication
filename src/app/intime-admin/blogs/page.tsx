import { getAllBlogs } from '@/actions/Blog';
import ManageBlogs from '@/components/Blogs/ManageBlogs'
import React from 'react'

const page = async() => {
  const blogs = await getAllBlogs();
  //console.log(blogs, "Blogs");
  
  return (
    <div className="col-span-3 md:container">
        <ManageBlogs blogs={blogs} features={undefined} propertytypes={undefined}/>
    </div>
  )
}

export default page