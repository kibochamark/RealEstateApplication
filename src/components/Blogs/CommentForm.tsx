import { useState } from 'react'
import { motion } from 'framer-motion'

interface CommentFormProps {
  onSubmit: (comment: { author: string; content: string }) => void
}

export function CommentForm({ onSubmit }: CommentFormProps) {
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (author && content) {
      onSubmit({ author, content })
      setAuthor('')
      setContent('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="mb-4">
        <label htmlFor="author" className="block mb-2 font-semibold">Name</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="content" className="block mb-2 font-semibold">Comment</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
          rows={4}
          required
        ></textarea>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="px-4 py-2 bg-primary300 text-white  hover:bg-primary400 transition-colors"
      >
        Submit Comment
      </motion.button>
    </form>
  )
}

