import { Head, Link, router } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { Button } from '@/components/ui/button'
import { formatDistanceToNow } from 'date-fns'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function Index({ posts, sectors }: { posts: any; sectors: any[] }) {
  const [sectorFilter, setSectorFilter] = useState('')
  const [tickerFilter, setTickerFilter] = useState('')

  const handleFilter = () => {
    router.get('/feed', {
      sector_id: sectorFilter || undefined,
      ticker: tickerFilter || undefined,
    })
  }

  return (
    <>
      <Head title="Feed" />
      <AppLayout>
        <div className="max-w-4xl mx-auto py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Research Feed</h1>
              <p className="text-slate-600 mt-1">Latest articles from the community</p>
            </div>
            <Link href="/posts/create">
              <Button>Write Article</Button>
            </Link>
          </div>

          <div className="bg-white p-4 rounded-lg border mb-6 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Filter by Sector</label>
                <Select value={sectorFilter} onValueChange={setSectorFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All sectors" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All sectors</SelectItem>
                    {sectors.map((sector) => (
                      <SelectItem key={sector.id} value={String(sector.id)}>
                        {sector.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Filter by Ticker</label>
                <input
                  type="text"
                  placeholder="e.g. NVDA"
                  value={tickerFilter}
                  onChange={(e) => setTickerFilter(e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
            </div>
            <Button onClick={handleFilter} size="sm" className="w-full">
              Apply Filters
            </Button>
          </div>

          <div className="space-y-4">
            {posts.data.length > 0 ? (
              posts.data.map((post: any) => (
                <Link
                  key={post.id}
                  href={`/posts/${post.slug}`}
                  className="block p-4 border rounded-lg hover:border-slate-400 transition"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h2 className="text-xl font-bold hover:text-blue-600">{post.title}</h2>
                      <p className="text-slate-600 text-sm mt-1">
                        By {post.author.name} •{' '}
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
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-600">No articles found.</p>
              </div>
            )}
          </div>

          {posts.links && (
            <div className="mt-8 flex justify-center gap-2">
              {posts.links.map((link: any) => (
                <Link
                  key={link.url}
                  href={link.url || ''}
                  className={`px-3 py-2 border rounded ${
                    link.active
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'hover:border-slate-400'
                  }`}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                />
              ))}
            </div>
          )}
        </div>
      </AppLayout>
    </>
  )
}
