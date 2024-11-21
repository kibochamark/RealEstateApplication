'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'
import { CommentForm } from '@/components/Blogs/CommentForm'
import { RelatedPosts } from '@/components/Blogs/RelatedPosts'
import { LatestProperties } from '@/components/Blogs/LatestProperties'
import { Comment } from '@/components/Blogs/Comment'

// Components (to be created next)


// This would typically come from an API or database
const blogPost = {
  id: '1',
  title: 'Top 10 Home Buying Tips',
  description: 'Discover the essential tips every home buyer should know before making their purchase. From financial preparation to property inspection, we cover it all.',
  content: `
    <p>Buying a home is one of the most significant investments you'll ever make. Here are our top 10 tips to help you navigate the process:</p>
    <ol>
      <li>Get your finances in order</li>
      <li>Determine your budget</li>
      <li>Get pre-approved for a mortgage</li>
      <li>Hire a real estate agent</li>
      <li>Make a list of must-haves and nice-to-haves</li>
      <li>Research neighborhoods</li>
      <li>Attend open houses and schedule viewings</li>
      <li>Get a home inspection</li>
      <li>Make an offer</li>
      <li>Close the deal</li>
    </ol>
    <p>By following these tips, you'll be well-prepared to find and purchase your dream home.</p>
  `,
  image: '/5.jpg',
  date: '2023-05-15',
  author: 'Jane Doe'
}

// This would typically come from an API or database
const comments = [
  { id: '1', author: 'Alice', content: 'Great tips! This helped me a lot when I was buying my first home.', date: '2023-05-16T10:30:00Z' },
  { id: '2', author: 'Bob', content: 'I wish I had known about tip #8 before I bought my house. So important!', date: '2023-05-17T14:45:00Z' },
]

export default function BlogPost() {
  const { id } = useParams()
  const [localComments, setLocalComments] = useState(comments)

  const addComment = (newComment: { author: string; content: string }) => {
    const comment = {
      id: String(localComments.length + 1),
      ...newComment,
      date: new Date().toISOString(),
    }
    setLocalComments([comment, ...localComments])
  }

  return (
    <div className=" mx-auto px-4 bg-gray-100 py-8 mt-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='container'
      >
        <h1 className="text-4xl font-bold mb-4 text-secondary300">{blogPost.title}</h1>
        <div className="flex items-center mb-4">
          <span className="text-gray-600 mr-4">{formatDistanceToNow(new Date(blogPost.date), { addSuffix: true })}</span>
          <span className="text-gray-600">By {blogPost.author}</span>
        </div>
        <div className="relative h-96 mb-8">
          <Image src={blogPost.image} alt={blogPost.title} layout="fill" objectFit="cover" className="rounded-lg" />
        </div>
        <div className="prose max-w-none mb-12" dangerouslySetInnerHTML={{ __html: blogPost.content }} />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 container gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Comments</h2>
          <CommentForm onSubmit={addComment} />
          {localComments.map((comment) => (
            <Comment key={comment.id} {...comment} />
          ))}
        </div>
        <div>
          <RelatedPosts />
          <LatestProperties />
        </div>
      </div>
    </div>
  )
}

