import { Head, Link } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import PostCard from '@/components/post-card'
import { Separator } from '@/components/ui/separator'

export default function Show({ sector, posts, relatedTickers }: { sector: any; posts: any; relatedTickers: any[] }) {
  return (
    <>
      <Head title={sector.name} />
      <AppLayout
        breadcrumbs={[
          { title: 'Feed', href: { url: '/feed' } },
          { title: sector.name, href: { url: `/sectors/${sector.slug}` } },
        ]}
      >
        <div className="max-w-4xl mx-auto py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{sector.name}</h1>
            {sector.overview_post && (
              <>
                <p className="text-slate-600 mb-6">Sector Overview</p>
                <div className="mb-8">
                  <PostCard post={sector.overview_post} />
                </div>
                <Separator className="mb-8" />
              </>
            )}
          </div>

          <h2 className="text-2xl font-bold mb-6">Recent Articles</h2>
          <div className="space-y-4">
            {posts.data.length > 0 ? (
              posts.data.map((post: any) => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-600">No articles found for this sector.</p>
              </div>
            )}
          </div>

          {relatedTickers.length > 0 && (
            <>
              <Separator className="my-8" />
              <div>
                <h2 className="text-lg font-bold mb-4">Related Companies</h2>
                <div className="flex flex-wrap gap-2">
                  {relatedTickers.map((ticker) => (
                    <Link
                      key={ticker}
                      href={`/companies/${ticker}`}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded font-medium hover:bg-blue-200"
                    >
                      {ticker}
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
