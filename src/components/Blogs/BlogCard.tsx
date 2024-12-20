import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

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

export function BlogCard({ id, name, shortDescription, imageUrl, createdAt, user }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="border-none outline-none overflow-hidden"
    >
      <div className="relative h-64 group">
        <Image src={imageUrl?.length > 0 ? imageUrl : "/9.jpg"} alt={name} className='group-hover:scale-105 transition-transform cursor-pointer
        ' layout="fill" objectFit="cover" />
      </div>
      <div className="py-6">
        <h3 className="text-xl text-secondary500 font-semibold mb-2">{name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{shortDescription}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{new Date(createdAt).toLocaleString()}</span>
          <span className="text-sm text-secondary500">{user?.firstname} {user?.lastname}</span>
        </div>
        <Link href={`/blogs/${id}`} passHref>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block mt-4  py-2 text-primary300  italic transition-colors"
          >
            Read More
          </motion.a>
          <hr />
          <hr />
        </Link>
      </div>
    </motion.div>
  )
}

