"use client"
import React from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { BlogCard } from '@/components/Blogs/BlogCard'


// This would typically come from an API or database
const allBlogs = Array.from({ length: 20 }, (_, i) => ({
    id: String(i + 1),
    title: `Blog Post ${i + 1}`,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: '/5.jpg',
    date: new Date(Date.now() - i * 86400000).toISOString().split('T')[0],
    author: 'John Doe'
}))

const ITEMS_PER_PAGE = 9


const BlogComponent = () => {
    const [visibleBlogs, setVisibleBlogs] = useState(allBlogs.slice(0, ITEMS_PER_PAGE))
    const [page, setPage] = useState(1)

    const loadMore = () => {
        const nextPage = page + 1
        const startIndex = (nextPage - 1) * ITEMS_PER_PAGE
        const endIndex = startIndex + ITEMS_PER_PAGE
        setVisibleBlogs([...visibleBlogs, ...allBlogs.slice(startIndex, endIndex)])
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
                {visibleBlogs.map((blog, index) => (
                    <motion.div
                        key={blog.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <BlogCard {...blog} />
                    </motion.div>
                ))}
            </motion.div>
            {visibleBlogs.length < allBlogs.length && (
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