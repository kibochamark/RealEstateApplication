import { formatDistanceToNow } from 'date-fns'

interface CommentProps {
  author: string
  content: string
  date: string
}

export function Comment({ author, content, date }: CommentProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold">{author}</span>
        <span className="text-sm text-gray-500">{formatDistanceToNow(new Date(date), { addSuffix: true })}</span>
      </div>
      <p className="text-gray-700">{content}</p>
    </div>
  )
}

