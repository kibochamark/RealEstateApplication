import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface BlogCardProps {
  id: string
  title: string
  description: string
  image: string
  date: string
  author: string
}

export function BlogCard({ id, title, description, image, date, author }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white border-none outline-none overflow-hidden"
    >
      <div className="relative h-48">
        <Image src={image} alt={title} layout="fill" objectFit="cover" />
      </div>
      <div className="p-6">
        <h3 className="text-xl text-secondary500 font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{date}</span>
          <span className="text-sm text-secondary500">{author}</span>
        </div>
        <Link href={`/blogs/${id}`} passHref>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block mt-4 px-4 py-2 bg-primary300 text-white  hover:bg-primary400 transition-colors"
          >
            Read More
          </motion.a>
        </Link>
      </div>
    </motion.div>
  )
}

