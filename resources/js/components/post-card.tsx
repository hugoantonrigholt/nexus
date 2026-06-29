import { Link } from '@inertiajs/react'
import { formatDistanceToNow } from 'date-fns'

export default function PostCard({ post }: { post: any }) {
  return (
    <div className="p-4 border rounded-lg hover:border-slate-400 transition">
      <Link href={`/posts/${post.slug}`} className="block mb-2">
        <h2 className="text-xl font-bold hover:text-blue-600">{post.title}</h2>
      </Link>
      <p className="text-slate-600 text-sm mt-1 mb-2">
        <Link
          href={`/users/${post.author.id}`}
          className="hover:text-blue-600"
        >
          {post.author.name}
        </Link>
        {' '}•{' '}
        {formatDistanceToNow(new Date(post.published_at), { addSuffix: true })}
      </p>
      <div className="flex flex-wrap gap-2">
        {post.ticker && (
          <Link
            href={`/company/${post.ticker.toLowerCase()}`}
            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded font-medium hover:bg-blue-200"
          >
            {post.ticker}
          </Link>
        )}
        {post.sector && (
          <Link
            href={`/sectors/${post.sector.slug}`}
            className="px-2 py-1 bg-slate-200 text-slate-700 text-xs rounded font-medium hover:bg-slate-300"
          >
            {post.sector.name}
          </Link>
        )}
      </div>
    </div>
  )
}
