import { Head, Link } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'

const thesisStateColors = {
  INTACT: { bg: 'bg-green-100', text: 'text-green-800' },
  STRESSED: { bg: 'bg-amber-100', text: 'text-amber-800' },
  BROKEN: { bg: 'bg-red-100', text: 'text-red-800' },
  STRENGTHENING: { bg: 'bg-blue-100', text: 'text-blue-800' },
  CATALYST: { bg: 'bg-purple-100', text: 'text-purple-800' },
}

export default function Show({ theme, cards }: { theme: any; cards: any[] }) {
  return (
    <>
      <Head title={theme.name} />
      <AppLayout
        breadcrumbs={[
          { title: 'Feed', href: { url: '/feed' } },
          { title: 'Thesis Cards', href: { url: '/thesis-cards' } },
          { title: theme.name, href: { url: `/themes/${theme.slug}` } },
        ]}
      >
        <div className="max-w-6xl mx-auto py-8 px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">{theme.name}</h1>
            {theme.description && (
              <p className="text-slate-600">{theme.description}</p>
            )}
            <div className="text-sm text-slate-500 mt-4">
              {cards.length} thesis card{cards.length !== 1 ? 's' : ''}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards && cards.length > 0 ? (
              cards.map((card: any) => (
                <Link key={card.id} href={`/company/${card.ticker.toLowerCase()}`} className="border rounded-lg p-6 hover:shadow-lg transition relative bg-white">
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="font-mono text-2xl font-bold text-blue-600">{card.ticker}</span>
                    <span className="text-sm text-slate-600">{card.company_name}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
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
                        onClick={(e) => e.preventDefault()}
                      >
                        {card.sector.name}
                      </Link>
                    )}
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

                  <p className="text-sm text-slate-600 line-clamp-3">{card.edge}</p>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-slate-600">No thesis cards for this theme.</p>
              </div>
            )}
          </div>

          <div className="mt-8 pt-8 border-t">
            <Link href="/thesis-cards" className="text-blue-600 hover:text-blue-800">
              ← Back to Thesis Cards
            </Link>
          </div>
        </div>
      </AppLayout>
    </>
  )
}
