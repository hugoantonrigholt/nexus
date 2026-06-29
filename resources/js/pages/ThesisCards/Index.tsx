import { Head, Link } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'

const statusColors = {
  HELD: { bg: 'bg-blue-100', text: 'text-blue-800' },
  WATCH: { bg: 'bg-amber-100', text: 'text-amber-800' },
  NONE: { bg: 'bg-slate-100', text: 'text-slate-700' },
}

const thesisStateColors = {
  INTACT: { bg: 'bg-green-100', text: 'text-green-800' },
  STRESSED: { bg: 'bg-amber-100', text: 'text-amber-800' },
  BROKEN: { bg: 'bg-red-100', text: 'text-red-800' },
}

export default function Index({ cards }: { cards: any[] }) {
  return (
    <>
      <Head title="Thesis Cards" />
      <AppLayout
        breadcrumbs={[
          { title: 'Feed', href: { url: '/feed' } },
          { title: 'Thesis Cards', href: { url: '/thesis-cards' } },
        ]}
      >
        <div className="max-w-6xl mx-auto py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Thesis Cards</h1>
            <p className="text-slate-600 mt-1">Research thesis breakdown by company</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards && cards.length > 0 ? (
              cards.map((card: any) => (
                <div key={card.id} className="border rounded-lg p-6 hover:shadow-lg transition">
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="font-mono text-2xl font-bold text-blue-600">{card.ticker}</span>
                    <span className="text-sm text-slate-600">{card.company_name}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded ${
                        statusColors[card.status as keyof typeof statusColors]?.bg || 'bg-slate-100'
                      } ${
                        statusColors[card.status as keyof typeof statusColors]?.text || 'text-slate-700'
                      }`}
                    >
                      {card.status}
                    </span>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded ${
                        thesisStateColors[card.thesis_state as keyof typeof thesisStateColors]?.bg ||
                        'bg-slate-100'
                      } ${
                        thesisStateColors[card.thesis_state as keyof typeof thesisStateColors]?.text ||
                        'text-slate-700'
                      }`}
                    >
                      {card.thesis_state}
                    </span>
                    {card.sector && (
                      <Link
                        href={`/sectors/${card.sector.slug}`}
                        className="text-xs font-medium px-2 py-1 rounded bg-slate-200 text-slate-700 hover:bg-slate-300"
                      >
                        {card.sector.name}
                      </Link>
                    )}
                    {card.theme && <span className="text-xs font-medium px-2 py-1 rounded bg-purple-100 text-purple-700">{card.theme}</span>}
                  </div>

                  <div className="flex gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-slate-600">Conviction</span>
                      <div className="font-bold text-lg">{card.conviction}/5</div>
                    </div>
                    <div>
                      <span className="text-slate-600">Quality</span>
                      <div className="font-bold text-lg">{card.quality}/10</div>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-semibold text-slate-900 mb-1">Edge</p>
                      <p className="text-slate-700">{card.edge}</p>
                    </div>

                    {card.watch && (
                      <div>
                        <p className="font-semibold text-slate-900 mb-1">Watch</p>
                        <p className="text-slate-700">{card.watch}</p>
                      </div>
                    )}

                    {card.entry && (
                      <div>
                        <p className="font-semibold text-slate-900 mb-1">Entry</p>
                        <p className="text-slate-700">{card.entry}</p>
                      </div>
                    )}

                    {card.catalyst && (
                      <div>
                        <p className="font-semibold text-slate-900 mb-1">Catalyst</p>
                        <p className="text-slate-700">{card.catalyst}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-slate-600">No thesis cards found.</p>
              </div>
            )}
          </div>
        </div>
      </AppLayout>
    </>
  )
}
