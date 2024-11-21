"use client"
import { useRouter } from 'next/navigation'
import { BlogCard } from './BlogCard'
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

// This would typically come from an API or database
const recentBlogs = [
    {
        id: '1',
        title: 'Top 10 Home Buying Tips',
        description: 'Discover the essential tips every home buyer should know before making their purchase. From financial preparation to property inspection, we cover it all.',
        image: '/6.jpg?height=192&width=384',
        date: '2023-05-15',
        author: 'Jane Doe'
    },
    {
        id: '2',
        title: 'The Future of Smart Homes',
        description: "Explore the latest trends in smart home technology and how they're shaping the future of real estate. Learn about the most sought-after smart home features",
        image: '/6.jpg?height=192&width=384',
        date: '2023-05-10',
        author: 'John Smith'
    },
    {
        id: '3',
        title: "Investing in Real Estate: A Beginner's Guide",
        description: 'Learn the basics of real estate investment and discover strategies to build long-term wealth through property ownership. Perfect for first-time investors.',
        image: '/6.jpg?height=192&width=384',
        date: '2023-05-05',
        author: 'Alice Johnson'
    }
]

export function RecentBlogs() {
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
                    {recentBlogs.map((blog) => (
                        <BlogCard key={blog.id} {...blog} />
                    ))}
                </div>
            </div>
        </section>
    )
}

