"use client"
import { useRouter } from 'next/navigation'
import { BlogCard } from './BlogCard'
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

// This would typically come from an API or database
interface BlogCardProps {
    id: string
    name: string
    shortDescription: string
    imageUrl: string
    createdAt: string
    user:{
      firstname: string
      lastname: string
    }
  }

export function RecentBlogs({blogs}:{blogs:BlogCardProps[]}) {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    })

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    }

    const router = useRouter()

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    }

    return (
        <section className="py-12 bg-gray-100">
            <div className="container mx-auto px-4">
                <div className='flex justify-start items-start flex-col'>
                    <motion.div variants={itemVariants} className="w-20 h-1 bg-secondary300 text-start my-6" />

                    <h2 className="text-3xl font-bold mb-8 text-start">Recent Blog Posts</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.length > 0 ? blogs.map((blog) => (
                        <BlogCard  key={blog.id} {...blog} />
                    )):   <p className='text-gray-400 tracking-wide text-balance text-2xl'>No Blogs posted </p>}
                </div>
            </div>
        </section>
    )
}

