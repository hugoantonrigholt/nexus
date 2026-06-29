import { Head, Link } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import PostCard from '@/components/post-card'
import { Separator } from '@/components/ui/separator'

export default function Show({ ticker, posts, sectors }: { ticker: string; posts: any; sectors: any[] }) {
  return (
    <>
      <Head title={ticker} />
      <AppLayout
        breadcrumbs={[
          { title: 'Feed', href: { url: '/feed' } },
          { title: ticker, href: { url: `/companies/${ticker}` } },
        ]}
      >
        <div className="max-w-4xl mx-auto py-8">
          <div className="mb-8">
            <h1 className="font-mono text-4xl font-bold text-blue-600">{ticker}</h1>
            <p className="text-slate-600 mt-2">{posts.total} articles</p>
          </div>

          <div className="space-y-4">
            {posts.data.length > 0 ? (
              posts.data.map((post: any) => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-600">No articles found for this ticker.</p>
              </div>
            )}
          </div>

          {sectors.length > 0 && (
            <>
              <Separator className="my-8" />
              <div>
                <h2 className="text-lg font-bold mb-4">Related Sectors</h2>
                <div className="flex flex-wrap gap-2">
                  {sectors.map((sector: any) => (
                    <Link
                      key={sector.id}
                      href={`/sectors/${sector.slug}`}
                      className="px-3 py-1 bg-slate-200 text-slate-700 text-sm rounded font-medium hover:bg-slate-300"
                    >
                      {sector.name}
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}

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
