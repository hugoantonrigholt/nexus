import { Head, Link, usePage, router } from '@inertiajs/react'
import { useState } from 'react'
import AppLayout from '@/layouts/app-layout'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

const thesisStateColors = {
  INTACT: { bg: 'bg-green-100', text: 'text-green-800' },
  STRESSED: { bg: 'bg-amber-100', text: 'text-amber-800' },
  BROKEN: { bg: 'bg-red-100', text: 'text-red-800' },
  STRENGTHENING: { bg: 'bg-blue-100', text: 'text-blue-800' },
  CATALYST: { bg: 'bg-purple-100', text: 'text-purple-800' },
}

export default function Index({ cards, sectors, themes, filters, search, sort, direction }: any) {
  const { auth } = usePage().props as any
  const isAdmin = auth.user?.role === 'admin'
  const [editing, setEditing] = useState<any | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const [searchTerm, setSearchTerm] = useState(search)
  const [selectedTheme, setSelectedTheme] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedThesisState, setSelectedThesisState] = useState('')
  const [selectedTrendState, setSelectedTrendState] = useState('')
  const [selectedTier, setSelectedTier] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState('')
  const [sortBy, setSortBy] = useState(sort)
  const [sortDirection, setSortDirection] = useState(direction)

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchTerm) params.append('search', searchTerm)
    if (selectedTheme) params.append('theme_id', selectedTheme)
    if (selectedStatus) params.append('status', selectedStatus)
    if (selectedThesisState) params.append('thesis_state', selectedThesisState)
    if (selectedTrendState) params.append('trend_state', selectedTrendState)
    if (selectedTier) params.append('tier', selectedTier)
    if (selectedIndustry) params.append('industry', selectedIndustry)
    if (sortBy) params.append('sort', sortBy)
    if (sortDirection) params.append('direction', sortDirection)

    router.get('/thesis-cards?' + params.toString())
  }

  const handleSort = (newSort: string) => {
    if (newSort === sortBy) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(newSort)
      setSortDirection('asc')
    }
    setTimeout(handleSearch, 0)
  }

  const handleEditOpen = (card: any) => {
    setEditing({ ...card })
    setIsOpen(true)
  }

  const handleNewOpen = () => {
    setEditing({
      ticker: '',
      company_name: '',
      sector_id: null,
      theme_id: null,
      status: 'WATCH',
      thesis_state: 'INTACT',
      trend_state: '',
      tier: null,
      edge: '',
      watch: '',
      entry: '',
      catalyst: '',
      upside: '',
      last_updated: '',
      industry: '',
    })
    setIsOpen(true)
  }

  const handleSave = () => {
    if (!editing.id) {
      router.post('/thesis-cards', editing, {
        onSuccess: () => setIsOpen(false),
      })
    } else {
      router.patch(`/thesis-cards/${editing.id}`, editing, {
        onSuccess: () => setIsOpen(false),
      })
    }
  }

  const handleDelete = (id: number) => {
    if (confirm('Delete this card?')) {
      router.delete(`/thesis-cards/${id}`)
    }
  }

  return (
    <>
      <Head title="Thesis Cards" />
      <AppLayout
        breadcrumbs={[
          { title: 'Feed', href: { url: '/feed' } },
          { title: 'Thesis Cards', href: { url: '/thesis-cards' } },
        ]}
      >
        <div className="max-w-7xl mx-auto py-8 px-4">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Thesis Cards</h1>
              <p className="text-slate-600 mt-1">Research thesis breakdown by company</p>
            </div>
            {isAdmin && (
              <Button onClick={handleNewOpen} className="bg-blue-600 hover:bg-blue-700">
                + Add Card
              </Button>
            )}
          </div>

          {/* Search and Filters */}
          <div className="bg-white border rounded-lg p-6 mb-8">
            <div className="space-y-4">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium mb-2">Search</label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Search by ticker, company, industry, or theme..."
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              {/* Filter Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Theme Filter */}
                <div>
                  <label className="block text-sm font-medium mb-1">Theme</label>
                  <select
                    value={selectedTheme}
                    onChange={(e) => setSelectedTheme(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md text-sm"
                  >
                    <option value="">All Themes</option>
                    {themes.map((t: any) => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md text-sm"
                  >
                    <option value="">All Status</option>
                    {filters?.statuses?.map((s: string) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Thesis State Filter */}
                <div>
                  <label className="block text-sm font-medium mb-1">Thesis State</label>
                  <select
                    value={selectedThesisState}
                    onChange={(e) => setSelectedThesisState(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md text-sm"
                  >
                    <option value="">All States</option>
                    {filters?.thesisStates?.map((s: string) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Industry Filter */}
                <div>
                  <label className="block text-sm font-medium mb-1">Industry</label>
                  <select
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md text-sm"
                  >
                    <option value="">All Industries</option>
                    {filters?.industries?.map((ind: string) => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
                </div>

                {/* Trend State Filter */}
                <div>
                  <label className="block text-sm font-medium mb-1">Trend</label>
                  <select
                    value={selectedTrendState}
                    onChange={(e) => setSelectedTrendState(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md text-sm"
                  >
                    <option value="">All Trends</option>
                    {filters?.trendStates?.map((s: string) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Tier Filter */}
                <div>
                  <label className="block text-sm font-medium mb-1">Tier</label>
                  <select
                    value={selectedTier}
                    onChange={(e) => setSelectedTier(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md text-sm"
                  >
                    <option value="">All Tiers</option>
                    {filters?.tiers?.map((t: number) => (
                      <option key={t} value={t}>Tier {t}</option>
                    ))}
                  </select>
                </div>

                {/* Sort */}
                <div>
                  <label className="block text-sm font-medium mb-1">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md text-sm"
                  >
                    <option value="">Default</option>
                    <option value="ticker">Ticker</option>
                    <option value="company">Company</option>
                    <option value="theme">Theme</option>
                    <option value="status">Status</option>
                    <option value="thesis_state">Thesis State</option>
                    <option value="updated">Last Updated</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700">
                  Apply Filters
                </Button>
                <Button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedTheme('')
                    setSelectedStatus('')
                    setSelectedThesisState('')
                    setSelectedTrendState('')
                    setSelectedTier('')
                    setSelectedIndustry('')
                    setSortBy('')
                    router.get('/thesis-cards')
                  }}
                  variant="outline"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards && cards.length > 0 ? (
              cards.map((card: any) => (
                <Link key={card.id} href={`/company/${card.ticker.toLowerCase()}`} className="border rounded-lg p-6 hover:shadow-lg transition relative bg-white">
                  {isAdmin && (
                    <div className="absolute top-3 right-3 flex gap-2" onClick={(e) => e.preventDefault()}>
                      <button
                        onClick={() => handleEditOpen(card)}
                        className="text-slate-600 hover:text-blue-600 p-1"
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(card.id)}
                        className="text-slate-600 hover:text-red-600 p-1"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  )}

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
                    {card.themeRelation && (
                      <span className="text-xs font-medium px-2 py-1 rounded bg-purple-100 text-purple-700">
                        {card.themeRelation.name}
                      </span>
                    )}
                    {card.status && (
                      <span className="text-xs font-medium px-2 py-1 rounded bg-slate-100 text-slate-700">
                        {card.status}
                      </span>
                    )}
                  </div>

                  {card.industry && (
                    <div className="text-xs text-slate-500 mb-2">
                      <span className="font-medium">Industry:</span> {card.industry}
                    </div>
                  )}

                  <p className="text-sm text-slate-600 line-clamp-2">{card.edge}</p>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-slate-600">No thesis cards found.</p>
              </div>
            )}
          </div>

          {/* Edit Modal */}
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editing?.id ? 'Edit Card' : 'Add New Card'}</DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Ticker</label>
                  <input
                    type="text"
                    value={editing?.ticker || ''}
                    onChange={(e) => setEditing({ ...editing, ticker: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="e.g. NVDA"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Company Name</label>
                  <input
                    type="text"
                    value={editing?.company_name || ''}
                    onChange={(e) => setEditing({ ...editing, company_name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Industry</label>
                  <input
                    type="text"
                    value={editing?.industry || ''}
                    onChange={(e) => setEditing({ ...editing, industry: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="e.g. Semiconductors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Theme</label>
                  <select
                    value={editing?.theme_id || ''}
                    onChange={(e) => setEditing({ ...editing, theme_id: e.target.value ? Number(e.target.value) : null })}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="">None</option>
                    {themes.map((t: any) => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select
                    value={editing?.status || ''}
                    onChange={(e) => setEditing({ ...editing, status: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="">—</option>
                    <option>HELD</option>
                    <option>WATCH</option>
                    <option>NONE</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Thesis State</label>
                  <select
                    value={editing?.thesis_state || 'INTACT'}
                    onChange={(e) => setEditing({ ...editing, thesis_state: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option>INTACT</option>
                    <option>STRESSED</option>
                    <option>BROKEN</option>
                    <option>STRENGTHENING</option>
                    <option>CATALYST</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Trend State</label>
                  <select
                    value={editing?.trend_state || ''}
                    onChange={(e) => setEditing({ ...editing, trend_state: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="">—</option>
                    <option>UPTREND</option>
                    <option>EXTENDED</option>
                    <option>BREAKING</option>
                    <option>BROKEN</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Tier (1-4, optional)</label>
                  <input
                    type="number"
                    min="1"
                    max="4"
                    value={editing?.tier || ''}
                    onChange={(e) => setEditing({ ...editing, tier: e.target.value ? Number(e.target.value) : null })}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Edge</label>
                  <textarea
                    value={editing?.edge || ''}
                    onChange={(e) => setEditing({ ...editing, edge: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Watch</label>
                  <textarea
                    value={editing?.watch || ''}
                    onChange={(e) => setEditing({ ...editing, watch: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Entry</label>
                  <textarea
                    value={editing?.entry || ''}
                    onChange={(e) => setEditing({ ...editing, entry: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Catalyst</label>
                  <textarea
                    value={editing?.catalyst || ''}
                    onChange={(e) => setEditing({ ...editing, catalyst: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Upside</label>
                  <textarea
                    value={editing?.upside || ''}
                    onChange={(e) => setEditing({ ...editing, upside: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Last Updated</label>
                  <input
                    type="date"
                    value={editing?.last_updated || ''}
                    onChange={(e) => setEditing({ ...editing, last_updated: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div className="flex gap-2 justify-end pt-4">
                  <Button variant="outline" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                    Save
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </AppLayout>
    </>
  )
}
