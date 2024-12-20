"use client"
import React, { Suspense } from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { BlogCard } from '@/components/Blogs/BlogCard'
import { Loader } from 'lucide-react'


// This would typically come from an API or database
const allBlogs = Array.from({ length: 20 }, (_, i) => ({
    id: String(i + 1),
    title: `Blog Post ${i + 1}`,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: '/5.jpg',
    date: new Date(Date.now() - i * 86400000).toISOString().split('T')[0],
    author: 'John Doe'
}))
interface Blog {
    id: string 
    name: string
    shortDescription: string
    imageUrl: string
    createdAt: string
    user:{
        firstname: string
        lastname: string
      }
    // Add any other properties your blog object might have
}

const ITEMS_PER_PAGE = 9


const BlogComponent = ({blogdetails}:{blogdetails:Blog[]}) => {
    const [visibleBlogs, setVisibleBlogs] = useState(blogdetails.slice(0, ITEMS_PER_PAGE))
    const [page, setPage] = useState(1)
    const [allBlogs, setAllBlogs] = useState<Blog[]>([]) // Define the state type as Blog[]
    // const [visibleBlogs, setVisibleBlogs] = useState<Blog[]>([]) // Define the state type as Blog[]
    // const [page, setPage] = useState(1)

    

    const loadMore = () => {
        const nextPage = page + 1
        const startIndex = (nextPage - 1) * ITEMS_PER_PAGE
        const endIndex = startIndex + ITEMS_PER_PAGE
        setVisibleBlogs([...visibleBlogs, ...blogdetails.slice(startIndex, endIndex)])
        setPage(nextPage)
    }
    return (
        <div className='container'> <h1 className="text-4xl font-bold mb-8 text-start">Our Blogs</h1>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                {visibleBlogs.length > 0 ? visibleBlogs.map((blog, index) => (
                    <motion.div
                        key={blog.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <Suspense fallback={<Loader className="animate animate-spin text-secondary400"/>}>

                        <BlogCard {...blog} />
                        </Suspense>
                    </motion.div>
                )):
                <p className='text-gray-400 tracking-wide text-balance text-2xl'>No Blogs posted </p>}
            </motion.div>
            {visibleBlogs.length < blogdetails.length && (
                <div className="text-center mt-8">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={loadMore}
                        className="px-6 py-3 bg-secondary300 text-white  hover:bg-secondary400 transition-colors"
                    >
                        Load More
                    </motion.button>
                </div>
            )}</div>
    )
}

export default BlogComponent