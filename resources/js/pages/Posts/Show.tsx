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
      <AppLayout>
        <article className="max-w-2xl mx-auto py-8">
          <header className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <Link href={`/users/${post.author.id}`} className="hover:text-blue-600">
                    By {post.author.name}
                  </Link>
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
                <span className="inline-block px-3 py-1 bg-slate-200 text-slate-800 rounded text-sm font-medium">
                  {post.sector.name}
                </span>
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
