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
          <div className="space-y-12">
            {posts.data.length > 0 ? (
              posts.data.map((post: any) => (
                <article key={post.id} className="border-b pb-12 last:border-b-0">
                  <div className="mb-6">
                    <Link
                      href={`/posts/${post.slug}`}
                      className="group"
                    >
                      <h2 className="text-3xl font-serif font-bold mb-3 text-slate-900 group-hover:text-blue-600 transition">
                        {post.title}
                      </h2>
                    </Link>
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <span>{new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      {post.stance && (
                        <span className="font-medium px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                          {post.stance}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Macro & Framework Connections */}
                  {post.macro_framework && (
                    <div className="mb-8 border-l-4 border-blue-500 bg-blue-50 px-6 py-5 rounded-r-lg">
                      <h3 className="font-bold text-sm text-blue-900 mb-4 uppercase tracking-wide">📊 Macro & Framework</h3>
                      <div className="text-slate-800 leading-7 whitespace-pre-wrap font-serif text-base">
                        {post.macro_framework}
                      </div>
                    </div>
                  )}

                  {/* Consensus Thesis */}
                  {post.consensus_thesis && (
                    <div className="mb-8 border-l-4 border-green-500 bg-green-50 px-6 py-5 rounded-r-lg">
                      <h3 className="font-bold text-sm text-green-900 mb-4 uppercase tracking-wide">✅ Consensus Thesis</h3>
                      <div className="text-slate-800 leading-7 whitespace-pre-wrap font-serif text-base">
                        {post.consensus_thesis}
                      </div>
                    </div>
                  )}

                  {/* Full Article Preview */}
                  {post.body && (
                    <div className="mb-6">
                      <div className="text-slate-800 leading-8 whitespace-pre-wrap font-serif text-base max-w-2xl">
                        {post.body.split('\n').slice(0, 20).join('\n')}
                        {post.body.split('\n').length > 20 && (
                          <div className="mt-6">
                            <Link
                              href={`/posts/${post.slug}`}
                              className="inline-block px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
                            >
                              Read Full Article →
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </article>
              ))
            ) : (
              <div className="text-center py-16">
                <p className="text-slate-600 text-lg">No research articles found for this ticker.</p>
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
