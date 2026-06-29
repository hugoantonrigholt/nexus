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
          { title: 'Feed', href: { url: '/feed' } },
          { title: ticker, href: { url: `/company/${ticker.toLowerCase()}` } },
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
          <div className="space-y-8">
            {posts.data.length > 0 ? (
              posts.data.map((post: any) => (
                <article key={post.id} className="border rounded-lg p-6">
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                    <p className="text-xs text-slate-500">
                      Published {new Date(post.published_at).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Macro & Framework Connections */}
                  {post.macro_framework && (
                    <div className="mb-6 border-l-4 border-blue-400 bg-blue-50 p-4 rounded">
                      <h3 className="font-bold text-sm text-blue-900 mb-3">📊 Macro & Framework Connections</h3>
                      <div className="prose prose-sm max-w-none text-slate-700 whitespace-pre-wrap text-sm">
                        {post.macro_framework}
                      </div>
                    </div>
                  )}

                  {/* Consensus Thesis */}
                  {post.consensus_thesis && (
                    <div className="mb-6 border-l-4 border-green-400 bg-green-50 p-4 rounded">
                      <h3 className="font-bold text-sm text-green-900 mb-3">✅ Consensus Thesis</h3>
                      <div className="prose prose-sm max-w-none text-slate-700 whitespace-pre-wrap text-sm">
                        {post.consensus_thesis}
                      </div>
                    </div>
                  )}

                  {/* Full Article */}
                  {post.body && !post.consensus_thesis && (
                    <div className="bg-slate-50 p-4 rounded border">
                      <h3 className="font-bold text-sm text-slate-900 mb-3">Full Research</h3>
                      <div className="prose prose-sm max-w-none text-slate-700 whitespace-pre-wrap text-sm overflow-auto max-h-96">
                        {post.body}
                      </div>
                    </div>
                  )}

                  {post.stance && (
                    <div className="mt-4 pt-4 border-t">
                      <span className="text-xs font-medium px-2 py-1 rounded bg-slate-200 text-slate-700">
                        Stance: {post.stance}
                      </span>
                    </div>
                  )}
                </article>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-600">No research articles found for this ticker.</p>
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
