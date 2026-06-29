import { Link } from '@inertiajs/react'
import { formatDistanceToNow } from 'date-fns'

export default function PostCard({ post }: { post: any }) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="block p-4 border rounded-lg hover:border-slate-400 transition"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h2 className="text-xl font-bold hover:text-blue-600">{post.title}</h2>
          <p className="text-slate-600 text-sm mt-1">
            <Link
              href={`/users/${post.author.id}`}
              className="hover:text-blue-600"
              onClick={(e) => e.stopPropagation()}
            >
              {post.author.name}
            </Link>
            {' '}•{' '}
            {formatDistanceToNow(new Date(post.published_at), { addSuffix: true })}
          </p>
          <div className="flex gap-2 mt-2">
            {post.ticker && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded font-medium">
                {post.ticker}
              </span>
            )}
            {post.sector && (
              <span className="px-2 py-1 bg-slate-200 text-slate-700 text-xs rounded font-medium">
                {post.sector.name}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
