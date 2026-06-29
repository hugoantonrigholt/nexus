import { Head, Link } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import PostCard from '@/components/post-card'
import { UserInfo } from '@/components/user-info'

export default function Show({ author, posts }: { author: any; posts: any }) {
  return (
    <>
      <Head title={author.name} />
      <AppLayout
        breadcrumbs={[
          { title: 'Feed', href: '/feed' },
          { title: author.name, href: `/users/${author.id}` },
        ]}
      >
        <div className="max-w-4xl mx-auto py-8">
          <div className="mb-8">
            <UserInfo user={author} />
            <p className="text-slate-600 mt-4">{posts.total} articles published</p>
          </div>

          <h2 className="text-2xl font-bold mb-6">Articles</h2>
          <div className="space-y-4">
            {posts.data.length > 0 ? (
              posts.data.map((post: any) => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-600">No articles published yet.</p>
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
