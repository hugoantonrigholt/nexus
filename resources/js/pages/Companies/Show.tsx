import { Head, Link } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import PostCard from '@/components/post-card'
import { Separator } from '@/components/ui/separator'

export default function Show({ ticker, card, posts, sectors }: { ticker: string; card: any; posts: any; sectors: any[] }) {
  return (
    <>
      <Head title={ticker} />
      <AppLayout
        breadcrumbs={[
          { title: 'Feed', href: '/feed' },
          { title: ticker, href: `/company/${ticker.toLowerCase()}` },
        ]}
      >
        <div className="max-w-4xl mx-auto py-8 px-4">
          <div className="mb-8">
            <h1 className="font-mono text-4xl font-bold text-blue-600">{ticker}</h1>
            <p className="text-slate-600 mt-2">{posts.total} research article{posts.total !== 1 ? 's' : ''}</p>
          </div>

          {/* Thesis Card Info */}
          {card && (
            <div className="bg-slate-50 border rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">{card.company_name}</h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {card.themeRelation && (
                  <div>
                    <span className="text-xs text-slate-600 font-medium">Theme</span>
                    <Link href={`/themes/${card.themeRelation.slug}`} className="text-sm font-semibold text-blue-600 hover:text-blue-800">
                      {card.themeRelation.name}
                    </Link>
                  </div>
                )}
                {card.sector && (
                  <div>
                    <span className="text-xs text-slate-600 font-medium">Sector</span>
                    <Link href={`/sectors/${card.sector.slug}`} className="text-sm font-semibold text-blue-600 hover:text-blue-800">
                      {card.sector.name}
                    </Link>
                  </div>
                )}
                {card.thesis_state && (
                  <div>
                    <span className="text-xs text-slate-600 font-medium">Thesis State</span>
                    <div className="text-sm font-semibold">{card.thesis_state}</div>
                  </div>
                )}
                {card.trend_state && (
                  <div>
                    <span className="text-xs text-slate-600 font-medium">Trend</span>
                    <div className="text-sm font-semibold">{card.trend_state}</div>
                  </div>
                )}
                {card.status && (
                  <div>
                    <span className="text-xs text-slate-600 font-medium">Status</span>
                    <div className="text-sm font-semibold">{card.status}</div>
                  </div>
                )}
                {card.tier && (
                  <div>
                    <span className="text-xs text-slate-600 font-medium">Tier</span>
                    <div className="text-sm font-semibold">Tier {card.tier}</div>
                  </div>
                )}
              </div>

              {/* Edge, Watch, Entry, Catalyst, Upside */}
              <div className="space-y-3">
                {card.edge && (
                  <div>
                    <span className="text-xs font-medium text-slate-600">Edge</span>
                    <p className="text-sm text-slate-700 mt-1">{card.edge}</p>
                  </div>
                )}
                {card.watch && (
                  <div>
                    <span className="text-xs font-medium text-slate-600">Watch</span>
                    <p className="text-sm text-slate-700 mt-1">{card.watch}</p>
                  </div>
                )}
                {card.entry && (
                  <div>
                    <span className="text-xs font-medium text-slate-600">Entry</span>
                    <p className="text-sm text-slate-700 mt-1">{card.entry}</p>
                  </div>
                )}
                {card.catalyst && (
                  <div>
                    <span className="text-xs font-medium text-slate-600">Catalyst</span>
                    <p className="text-sm text-slate-700 mt-1">{card.catalyst}</p>
                  </div>
                )}
                {card.upside && (
                  <div>
                    <span className="text-xs font-medium text-slate-600">Upside</span>
                    <p className="text-sm text-slate-700 mt-1">{card.upside}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Research Articles */}
          <div className="mt-12">
            <h2 className="text-2xl font-serif font-bold mb-6">Research Articles</h2>

            {posts.data.length > 0 ? (
              <div className="space-y-3">
                {posts.data.map((post: any) => (
                  <div key={post.id} className="flex items-center justify-between p-4 hover:bg-slate-50 border rounded transition">
                    <Link href={`/posts/${post.slug}`} className="flex-1">
                      <h3 className="font-semibold text-slate-900 hover:text-blue-600">{post.title}</h3>
                      <div className="flex items-center gap-3 mt-2 text-sm text-slate-600">
                        <span>{new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                        {post.stance && (
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-medium">
                            {post.stance}
                          </span>
                        )}
                        {post.type === 'imported' && (
                          <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-700 text-xs font-medium">
                            Research
                          </span>
                        )}
                      </div>
                    </Link>
                    <Link href={`/posts/${post.slug}`} className="text-slate-400 ml-4 hover:text-slate-600">→</Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-600">
                No research articles found for this ticker.
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
