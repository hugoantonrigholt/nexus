import { Head, Link, router } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { Button } from '@/components/ui/button'

const thesisStateColors = {
  INTACT: 'bg-green-100 text-green-800',
  STRESSED: 'bg-amber-100 text-amber-800',
  BROKEN: 'bg-red-100 text-red-800',
  STRENGTHENING: 'bg-blue-100 text-blue-800',
  CATALYST: 'bg-purple-100 text-purple-800',
}

export default function Index({ cards, themes, filters, search, sort, direction }: any) {
  const applyFilters = (updates: Record<string, any>) => {
    const params = new URLSearchParams()

    Object.entries({ search, ...updates }).forEach(([key, value]) => {
      if (value) params.append(key, value)
    })

    router.get('/thesis-cards?' + params.toString())
  }

  const handleDeleteCard = (id: number) => {
    if (confirm('Delete this card?')) {
      router.delete(`/thesis-cards/${id}`)
    }
  }

  return (
    <>
      <Head title="Thesis Cards" />
      <AppLayout
        breadcrumbs={[
          { title: 'Feed', href: '/feed' },
          { title: 'Thesis Cards', href: '/thesis-cards' },
        ]}
      >
        <div className="max-w-6xl mx-auto py-8 px-4">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Investment Theses</h1>
              <p className="text-slate-600 mt-1">{cards?.length || 0} companies tracked</p>
            </div>
            <Link href="/thesis-cards/create">
              <Button className="bg-blue-600 hover:bg-blue-700">+ New Thesis</Button>
            </Link>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
            {/* Search */}
            <input
              type="text"
              placeholder="Search ticker, company..."
              defaultValue={search}
              onChange={(e) => applyFilters({ search: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && applyFilters({ search: e.currentTarget.value })}
              className="col-span-2 md:col-span-1 px-3 py-2 border rounded-md text-sm"
            />

            {/* Theme */}
            <select
              defaultValue=""
              onChange={(e) => applyFilters({ theme_id: e.target.value })}
              className="px-3 py-2 border rounded-md text-sm"
            >
              <option value="">All Themes</option>
              {themes.map((t: any) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>

            {/* Thesis State */}
            <select
              defaultValue=""
              onChange={(e) => applyFilters({ thesis_state: e.target.value })}
              className="px-3 py-2 border rounded-md text-sm"
            >
              <option value="">All States</option>
              {filters?.thesisStates?.map((s: string) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            {/* Status */}
            <select
              defaultValue=""
              onChange={(e) => applyFilters({ status: e.target.value })}
              className="px-3 py-2 border rounded-md text-sm"
            >
              <option value="">All Status</option>
              {filters?.statuses?.map((s: string) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            {/* Industry */}
            <select
              defaultValue=""
              onChange={(e) => applyFilters({ industry: e.target.value })}
              className="px-3 py-2 border rounded-md text-sm"
            >
              <option value="">All Industries</option>
              {filters?.industries?.map((ind: string) => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>

            {/* Clear */}
            <button
              onClick={() => router.get('/thesis-cards')}
              className="px-3 py-2 border rounded-md text-sm text-slate-600 hover:bg-slate-50"
            >
              Clear
            </button>
          </div>

          {/* Results */}
          <div className="space-y-2">
            {cards && cards.length > 0 ? (
              cards.map((card: any) => (
                <Link
                  key={card.id}
                  href={`/company/${card.ticker.toLowerCase()}`}
                  className="flex items-center justify-between p-4 border rounded hover:bg-slate-50 transition group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono font-bold text-blue-600 text-lg w-16">{card.ticker}</span>
                      <span className="font-medium text-slate-900 truncate">{card.company_name}</span>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded ${thesisStateColors[card.thesis_state as keyof typeof thesisStateColors] || 'bg-slate-100 text-slate-700'}`}
                      >
                        {card.thesis_state}
                      </span>
                      {card.themeRelation && (
                        <span className="text-xs font-medium px-2 py-1 rounded bg-purple-100 text-purple-700">
                          {card.themeRelation.name}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 line-clamp-1">{card.edge}</p>
                    {card.industry && (
                      <p className="text-xs text-slate-500 mt-1">{card.industry}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 ml-4" onClick={(e) => e.preventDefault()}>
                    <Link
                      href={`/thesis-cards/${card.id}/edit`}
                      className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded transition"
                      title="Edit"
                    >
                      ✏️
                    </Link>
                    <button
                      onClick={() => handleDeleteCard(card.id)}
                      className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded transition"
                      title="Delete"
                    >
                      🗑️
                    </button>
                    <span className="text-slate-400 ml-2">→</span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-600">No thesis cards found.</p>
              </div>
            )}
          </div>
        </div>
      </AppLayout>
    </>
  )
}
