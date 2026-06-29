import { Head, Link, usePage, router } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { Button } from '@/components/ui/button'
import { formatDistanceToNow } from 'date-fns'

export default function Show({ post }: { post: any }) {
  const { auth } = usePage().props as any

  const isAuthor = auth.user?.id === post.user_id
  const isPublished = !!post.published_at

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this post?')) {
      router.delete(`/posts/${post.slug}`)
    }
  }

  return (
    <>
      <Head title={post.title} />
      <AppLayout>
        <article className="max-w-2xl mx-auto py-8">
          <header className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <span>By {post.author.name}</span>
                  {post.published_at && (
                    <span>
                      {formatDistanceToNow(new Date(post.published_at), { addSuffix: true })}
                    </span>
                  )}
                  {!isPublished && <span className="text-amber-600 font-medium">Draft</span>}
                </div>
              </div>

              {isAuthor && (
                <div className="flex gap-2">
                  <Link href={`/posts/${post.slug}/edit`}>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </Link>
                  <Button size="sm" variant="destructive" onClick={handleDelete}>
                    Delete
                  </Button>
                </div>
              )}
            </div>

            <div className="flex gap-2 flex-wrap">
              {post.ticker && (
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm font-medium">
                  {post.ticker}
                </span>
              )}
              {post.sector && (
                <Link href={`/sectors/${post.sector.slug}`}>
                  <span className="inline-block px-3 py-1 bg-slate-200 text-slate-800 rounded text-sm font-medium hover:bg-slate-300">
                    {post.sector.name}
                  </span>
                </Link>
              )}
              <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 rounded text-sm">
                {post.visibility === 'public' ? 'Public' : 'Members only'}
              </span>
            </div>
          </header>

          <div
            className="prose prose-lg max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />

          {auth.user && (
            <section className="border-t pt-8">
              <h2 className="text-2xl font-bold mb-4">Comments</h2>
              {/* Comments section will be implemented in Phase 4 */}
              <p className="text-slate-600">Comments coming soon...</p>
            </section>
          )}
        </article>
      </AppLayout>
    </>
  )
}
