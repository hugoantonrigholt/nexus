import { Head, Link, usePage, router } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { Button } from '@/components/ui/button'
import { formatDistanceToNow } from 'date-fns'
import { useState } from 'react'

export default function Show({ post }: { post: any }) {
  const { auth } = usePage().props as any
  const [commentBody, setCommentBody] = useState('')

  const isAuthor = auth.user?.id === post.user_id
  const isPublished = !!post.published_at

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this post?')) {
      router.delete(`/posts/${post.slug}`)
    }
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentBody.trim()) return

    router.post(`/posts/${post.slug}/comments`, { body: commentBody }, {
      onSuccess: () => setCommentBody(''),
    })
  }

  const handleCommentDelete = (commentId: number) => {
    if (confirm('Delete this comment?')) {
      router.delete(`/posts/${post.slug}/comments/${commentId}`)
    }
  }

  const canDeleteComment = (comment: any) => {
    return auth.user.id === comment.author.id || auth.user.role === 'admin'
  }

  return (
    <>
      <Head title={post.title} />
      <AppLayout
        breadcrumbs={[
          { title: 'Feed', href: '/feed' },
          { title: post.title, href: `/posts/${post.slug}` },
        ]}
      >
        <article className="max-w-3xl mx-auto py-12 px-4">
          <header className="mb-12">
            <h1 className="text-5xl font-serif font-bold mb-6 text-slate-900">{post.title}</h1>

            <div className="flex items-center gap-6 mb-6 text-sm text-slate-600 border-b pb-6">
              <Link href={`/users/${post.author.id}`} className="font-medium hover:text-blue-600">
                {post.author.name}
              </Link>
              {post.published_at && (
                <span>
                  {new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              )}
              {!isPublished && <span className="text-amber-600 font-medium">Draft</span>}
              {post.stance && (
                <span className="font-medium px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                  {post.stance}
                </span>
              )}
            </div>

            <div className="flex gap-2 flex-wrap">
              {post.type === 'imported' && (
                <span className="inline-block px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                  Research
                </span>
              )}
              {post.ticker && (
                <Link
                  href={`/company/${post.ticker.toLowerCase()}`}
                  className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition"
                >
                  {post.ticker}
                </Link>
              )}
              {post.sector && (
                <Link
                  href={`/feed?sector_id=${post.sector.id}`}
                  className="inline-block px-4 py-2 bg-slate-200 text-slate-800 rounded-full text-sm font-medium hover:bg-slate-300 transition"
                >
                  {post.sector.name}
                </Link>
              )}
              <span className="inline-block px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm">
                {post.visibility === 'public' ? '🔓 Public' : '🔒 Members only'}
              </span>
            </div>

            {isAuthor && (
              <div className="flex gap-2 mt-6">
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
          </header>

          {/* Extracted Sections (Imported Articles Only) */}
          {post.type === 'imported' && (
            <>
              {post.macro_framework && (
                <div className="mb-8 border-l-4 border-blue-500 bg-blue-50 px-6 py-5 rounded-r-lg">
                  <h3 className="font-bold text-sm text-blue-900 mb-4 uppercase tracking-wide">📊 Macro & Framework</h3>
                  <div className="text-slate-800 leading-7 whitespace-pre-wrap font-serif text-base">
                    {post.macro_framework}
                  </div>
                </div>
              )}

              {post.consensus_thesis && (
                <div className="mb-8 border-l-4 border-green-500 bg-green-50 px-6 py-5 rounded-r-lg">
                  <h3 className="font-bold text-sm text-green-900 mb-4 uppercase tracking-wide">✅ Consensus Thesis</h3>
                  <div className="text-slate-800 leading-7 whitespace-pre-wrap font-serif text-base">
                    {post.consensus_thesis}
                  </div>
                </div>
              )}
            </>
          )}

          <div className="mb-12 max-w-2xl">
            {post.type === 'imported' ? (
              <div className="text-slate-800 leading-8 font-serif text-base whitespace-pre-wrap">
                {post.body}
              </div>
            ) : (
              <div
                className="prose prose-lg max-w-none text-slate-800"
                dangerouslySetInnerHTML={{ __html: post.body }}
              />
            )}
          </div>

          {auth.user && (
            <section className="border-t pt-8">
              <h2 className="text-2xl font-bold mb-6">Comments</h2>

              <div className="mb-8 p-4 bg-slate-50 rounded-lg">
                <form onSubmit={handleCommentSubmit}>
                  <textarea
                    value={commentBody}
                    onChange={(e) => setCommentBody(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full p-3 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                  <div className="mt-3 flex justify-end">
                    <Button type="submit" disabled={!commentBody.trim()}>
                      Post Comment
                    </Button>
                  </div>
                </form>
              </div>

              <div className="space-y-4">
                {post.comments && post.comments.length > 0 ? (
                  post.comments.map((comment: any) => (
                    <div key={comment.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <Link
                            href={`/users/${comment.author.id}`}
                            className="font-semibold hover:text-blue-600"
                          >
                            {comment.author.name}
                          </Link>
                          <span className="text-slate-600 text-sm ml-2">
                            {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                          </span>
                        </div>
                        {canDeleteComment(comment) && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleCommentDelete(comment.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            Delete
                          </Button>
                        )}
                      </div>
                      <p className="text-slate-700 whitespace-pre-wrap">{comment.body}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-600">No comments yet. Be the first to comment!</p>
                )}
              </div>
            </section>
          )}
        </article>
      </AppLayout>
    </>
  )
}
