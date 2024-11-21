import Link from 'next/link'

// This would typically come from an API or database
const relatedPosts = [
  { id: '2', title: 'The Future of Smart Homes' },
  { id: '3', title: "Investing in Real Estate: A Beginner's Guide" },
  { id: '4', title: '5 Tips for Selling Your Home Fast' },
]

export function RelatedPosts() {
  return (
    <div className="bg-white p-6 rounded-lg shadow mb-8">
      <h3 className="text-xl font-semibold mb-4">Related Posts</h3>
      <ul className="space-y-2">
        {relatedPosts.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.id}`} className="text-blue-500 hover:underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

