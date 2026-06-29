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

const stanceColors = {
  LONG: { bg: 'bg-green-100', text: 'text-green-800' },
  HOLD: { bg: 'bg-blue-100', text: 'text-blue-800' },
  BUILD: { bg: 'bg-purple-100', text: 'text-purple-800' },
  TRIM: { bg: 'bg-orange-100', text: 'text-orange-800' },
  EXIT: { bg: 'bg-red-100', text: 'text-red-800' },
  WATCH: { bg: 'bg-slate-100', text: 'text-slate-700' },
  AVOID: { bg: 'bg-red-50', text: 'text-red-700' },
  RESEARCH: { bg: 'bg-indigo-100', text: 'text-indigo-800' },
}

export default function Show({ card, sectors }: { card: any; sectors: any[] }) {
  const { auth } = usePage().props as any
  const isAdmin = auth.user?.role === 'admin'

  const [editing, setEditing] = useState<any | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleEditOpen = () => {
    setEditing({ ...card })
    setIsOpen(true)
  }

  const handleSave = () => {
    router.patch(`/thesis/${card.ticker.toLowerCase()}`, editing, {
      onSuccess: () => setIsOpen(false),
    })
  }

  const handleDelete = () => {
    if (confirm('Delete this card?')) {
      router.delete(`/thesis/${card.ticker.toLowerCase()}`)
    }
  }

  return (
    <>
      <Head title={`${card.ticker} - Thesis Card`} />
      <AppLayout
        breadcrumbs={[
          { title: 'Feed', href: { url: '/feed' } },
          { title: 'Thesis Cards', href: { url: '/thesis-cards' } },
          { title: card.ticker, href: { url: `/thesis/${card.ticker.toLowerCase()}` } },
        ]}
      >
        <article className="max-w-4xl mx-auto py-8 px-4">
          <header className="mb-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Link href={`/company/${card.ticker.toLowerCase()}`} className="text-4xl font-bold font-mono text-blue-600 hover:text-blue-800">
                    {card.ticker}
                  </Link>
                  {isAdmin && (
                    <button onClick={handleEditOpen} className="text-slate-600 hover:text-blue-600 p-1 text-2xl">
                      ✏️
                    </button>
                  )}
                </div>
                {card.company_name && (
                  <Link href={`/company/${card.ticker.toLowerCase()}`} className="text-xl text-slate-700 mt-2 hover:text-blue-600">
                    {card.company_name}
                  </Link>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <span
                className={`text-sm font-medium px-3 py-1 rounded ${
                  thesisStateColors[card.thesis_state as keyof typeof thesisStateColors]?.bg || 'bg-slate-100'
                } ${
                  thesisStateColors[card.thesis_state as keyof typeof thesisStateColors]?.text || 'text-slate-700'
                }`}
              >
                {card.thesis_state}
              </span>
              {card.stance && (
                <span
                  className={`text-sm font-medium px-3 py-1 rounded ${
                    stanceColors[card.stance as keyof typeof stanceColors]?.bg || 'bg-slate-100'
                  } ${
                    stanceColors[card.stance as keyof typeof stanceColors]?.text || 'text-slate-700'
                  }`}
                >
                  {card.stance}
                </span>
              )}
              {card.themeRelation && (
                <Link
                  href={`/themes/${card.themeRelation.slug}`}
                  className="text-sm font-medium px-3 py-1 rounded bg-purple-100 text-purple-700 hover:bg-purple-200"
                >
                  {card.themeRelation.name}
                </Link>
              )}
              {card.sector && (
                <Link
                  href={`/sectors/${card.sector.slug}`}
                  className="text-sm font-medium px-3 py-1 rounded bg-slate-200 text-slate-700 hover:bg-slate-300"
                >
                  {card.sector.name}
                </Link>
              )}
              {card.trend_state && (
                <span className="text-sm font-medium px-3 py-1 rounded bg-slate-100 text-slate-700">
                  {card.trend_state}
                </span>
              )}
              {card.tier && (
                <span className="text-sm font-medium px-3 py-1 rounded bg-amber-100 text-amber-800">
                  Tier {card.tier}
                </span>
              )}
            </div>
          </header>

          <section className="grid grid-cols-3 gap-6 mb-8">
            <div className="border rounded-lg p-4">
              <div className="text-slate-600 text-sm">Conviction</div>
              <div className="text-3xl font-bold text-blue-600">{card.conviction}/5</div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="text-slate-600 text-sm">Quality</div>
              <div className="text-3xl font-bold text-blue-600">{card.quality}/10</div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="text-slate-600 text-sm">Last Updated</div>
              <div className="text-lg font-bold text-slate-900">
                {card.last_updated ? new Date(card.last_updated).toLocaleDateString() : 'Not set'}
              </div>
            </div>
          </section>

          <div className="space-y-6">
            {card.edge && (
              <section>
                <h2 className="text-lg font-bold mb-3">Edge</h2>
                <p className="text-slate-700 whitespace-pre-wrap">{card.edge}</p>
              </section>
            )}

            {card.watch && (
              <section>
                <h2 className="text-lg font-bold mb-3">Watch</h2>
                <p className="text-slate-700 whitespace-pre-wrap">{card.watch}</p>
              </section>
            )}

            {card.entry && (
              <section>
                <h2 className="text-lg font-bold mb-3">Entry</h2>
                <p className="text-slate-700 whitespace-pre-wrap">{card.entry}</p>
              </section>
            )}

            {card.catalyst && (
              <section>
                <h2 className="text-lg font-bold mb-3">Catalyst</h2>
                <p className="text-slate-700 whitespace-pre-wrap">{card.catalyst}</p>
              </section>
            )}

            {card.upside && (
              <section>
                <h2 className="text-lg font-bold mb-3">Upside</h2>
                <p className="text-slate-700 whitespace-pre-wrap">{card.upside}</p>
              </section>
            )}

            {card.content && (
              <section className="border-t pt-6 mt-8">
                <h2 className="text-2xl font-bold mb-4">Full Research Notes</h2>
                <div className="prose prose-sm max-w-none text-slate-700 whitespace-pre-wrap">
                  {card.content}
                </div>
              </section>
            )}
          </div>

          {isAdmin && (
            <div className="mt-8 flex gap-2 pt-8 border-t">
              <Button onClick={handleDelete} variant="destructive">
                Delete Card
              </Button>
            </div>
          )}

          <div className="mt-8 pt-8 border-t">
            <Link href="/thesis-cards" className="text-blue-600 hover:text-blue-800">
              ← Back to Thesis Cards
            </Link>
          </div>
        </article>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Card</DialogTitle>
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
                <label className="block text-sm font-medium mb-1">Sector</label>
                <select
                  value={editing?.sector_id || ''}
                  onChange={(e) => setEditing({ ...editing, sector_id: e.target.value ? Number(e.target.value) : null })}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="">None</option>
                  {sectors.map((s: any) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Theme</label>
                <input
                  type="text"
                  value={editing?.theme || ''}
                  onChange={(e) => setEditing({ ...editing, theme: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Stance</label>
                <select
                  value={editing?.stance || ''}
                  onChange={(e) => setEditing({ ...editing, stance: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="">—</option>
                  <option>LONG</option>
                  <option>HOLD</option>
                  <option>BUILD</option>
                  <option>TRIM</option>
                  <option>EXIT</option>
                  <option>WATCH</option>
                  <option>AVOID</option>
                  <option>RESEARCH</option>
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Conviction (1-5)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={editing?.conviction || 3}
                    onChange={(e) => setEditing({ ...editing, conviction: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Quality (1-10)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={editing?.quality || 5}
                    onChange={(e) => setEditing({ ...editing, quality: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
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
      </AppLayout>
    </>
  )
}
