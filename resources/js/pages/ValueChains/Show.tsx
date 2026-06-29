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

const stanceColors = {
  OVERWEIGHT: { bg: 'bg-green-100', text: 'text-green-800' },
  HOLD: { bg: 'bg-blue-100', text: 'text-blue-800' },
  NEUTRAL: { bg: 'bg-slate-100', text: 'text-slate-700' },
  UNDERWEIGHT: { bg: 'bg-red-100', text: 'text-red-800' },
  'SELECTIVE OVERWEIGHT': { bg: 'bg-purple-100', text: 'text-purple-800' },
}

const chokepointColors = {
  monopoly: { bg: 'bg-red-100', text: 'text-red-700' },
  'sole-source': { bg: 'bg-amber-100', text: 'text-amber-700' },
  oligopoly: { bg: 'bg-blue-100', text: 'text-blue-700' },
  dominant: { bg: 'bg-green-100', text: 'text-green-700' },
  contender: { bg: 'bg-slate-100', text: 'text-slate-600' },
  commodity: { bg: 'bg-slate-100', text: 'text-slate-500' },
}


export default function Show({ chain, sectors }: { chain: any; sectors: any[] }) {
  const { auth } = usePage().props as any
  const isAdmin = auth.user?.role === 'admin'

  const [editingChain, setEditingChain] = useState<any | null>(null)
  const [chainModalOpen, setChainModalOpen] = useState(false)
  const [editingLayer, setEditingLayer] = useState<any | null>(null)
  const [layerModalOpen, setLayerModalOpen] = useState(false)
  const [editingEntry, setEditingEntry] = useState<any | null>(null)
  const [entryModalOpen, setEntryModalOpen] = useState(false)
  const [currentLayerId, setCurrentLayerId] = useState<number | null>(null)

  const gapCount = chain.layers.filter((l: any) => l.gap).length

  const handleEditChain = () => {
    setEditingChain({
      name: chain.name,
      sector_id: chain.sector_id,
      stance: chain.stance,
      thesis: chain.thesis,
      binding_constraint: chain.binding_constraint,
      chain_group: chain.chain_group || '',
      region: chain.region || '',
      alpha: chain.alpha || 0,
      connects: chain.connects ? JSON.stringify(chain.connects) : '',
      last_updated: chain.last_updated || '',
      order: chain.order || 0,
    })
    setChainModalOpen(true)
  }

  const handleSaveChain = () => {
    const data = { ...editingChain }
    if (data.connects) {
      try {
        data.connects = JSON.parse(data.connects)
      } catch {
        alert('Invalid JSON in connects field')
        return
      }
    }
    router.patch(`/value-chains/${chain.id}`, data, {
      onSuccess: () => setChainModalOpen(false),
    })
  }

  const handleDeleteChain = () => {
    if (confirm('Delete this chain and all its layers?')) {
      router.delete(`/value-chains/${chain.id}`)
    }
  }

  const handleEditLayer = (layer: any) => {
    setEditingLayer({ ...layer })
    setLayerModalOpen(true)
  }

  const handleSaveLayer = () => {
    if (editingLayer.id) {
      router.patch(`/value-chains/${chain.id}/layers/${editingLayer.id}`, editingLayer, {
        onSuccess: () => setLayerModalOpen(false),
      })
    }
  }

  const handleDeleteLayer = (layer: any) => {
    if (confirm('Delete this layer and all its entries?')) {
      router.delete(`/value-chains/${chain.id}/layers/${layer.id}`)
    }
  }

  const handleAddLayer = () => {
    setEditingLayer({
      title: '',
      note: '',
      gap: '',
      order: chain.layers.length,
    })
    setLayerModalOpen(true)
  }

  const handleSaveNewLayer = () => {
    if (!editingLayer.id) {
      router.post(`/value-chains/${chain.id}/layers`, editingLayer, {
        onSuccess: () => setLayerModalOpen(false),
      })
    } else {
      handleSaveLayer()
    }
  }

  const handleEditEntry = (entry: any, layerId: number) => {
    setCurrentLayerId(layerId)
    setEditingEntry({ ...entry })
    setEntryModalOpen(true)
  }

  const handleDeleteEntry = (layerId: number, entry: any) => {
    if (confirm('Delete this entry?')) {
      router.delete(`/value-chains/${chain.id}/layers/${layerId}/entries/${entry.id}`)
    }
  }

  const handleAddEntry = (layerId: number) => {
    setCurrentLayerId(layerId)
    setEditingEntry({
      ticker: '',
      role: '',
      chokepoint: 'contender',
      region: '',
      tech: '',
      order: 0,
    })
    setEntryModalOpen(true)
  }

  const handleSaveEntry = () => {
    if (editingEntry.id) {
      router.patch(`/value-chains/${chain.id}/layers/${currentLayerId}/entries/${editingEntry.id}`, editingEntry, {
        onSuccess: () => setEntryModalOpen(false),
      })
    } else {
      router.post(`/value-chains/${chain.id}/layers/${currentLayerId}/entries`, editingEntry, {
        onSuccess: () => setEntryModalOpen(false),
      })
    }
  }

  return (
    <>
      <Head title={chain.name} />
      <AppLayout
        breadcrumbs={[
          { title: 'Feed', href: '/feed' },
          { title: 'Value Chains', href: '/value-chains' },
          { title: chain.name, href: `/value-chains/${chain.id}` },
        ]}
      >
        <article className="max-w-5xl mx-auto py-8 px-4">
          <header className="mb-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-4xl font-bold mb-2">{chain.name}</h1>
                  {isAdmin && (
                    <button onClick={handleEditChain} className="text-slate-600 hover:text-blue-600 p-1 text-xl">
                      ✏️
                    </button>
                  )}
                </div>
                {chain.sector && (
                  <p className="text-slate-600">
                    Sector: <Link href={`/sectors/${chain.sector.slug}`} className="font-medium text-slate-900 hover:text-blue-600">{chain.sector.name}</Link>
                  </p>
                )}
              </div>
              <div className="flex flex-col items-end gap-2">
                <span
                  className={`text-sm font-medium px-4 py-2 rounded whitespace-nowrap ${
                    stanceColors[chain.stance as keyof typeof stanceColors]?.bg || 'bg-slate-100'
                  } ${
                    stanceColors[chain.stance as keyof typeof stanceColors]?.text || 'text-slate-700'
                  }`}
                >
                  {chain.stance}
                </span>
                {gapCount > 0 && (
                  <div className="text-xs text-slate-600 text-right">
                    ⚠ {gapCount} gap{gapCount !== 1 ? 's' : ''}
                  </div>
                )}
              </div>
            </div>
          </header>

          {chain.thesis && (
            <section className="mb-4">
              <p className="text-sm text-slate-700">{chain.thesis}</p>
            </section>
          )}

          {chain.binding_constraint && (
            <section className="mb-6 border-l-4 border-amber-400 bg-amber-50 px-4 py-3 rounded-r-lg">
              <p className="text-sm text-amber-900">
                <b>Binding constraint.</b> {chain.binding_constraint}
              </p>
            </section>
          )}

          <section className="space-y-1 border rounded-xl overflow-hidden">
            {chain.layers && chain.layers.length > 0 ? (
              chain.layers.map((layer: any, idx: number) => (
                <div key={layer.id} className={`p-4 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="font-semibold text-sm text-slate-900">{layer.title}</div>
                      {isAdmin && (
                        <>
                          <button
                            onClick={() => handleEditLayer(layer)}
                            className="text-slate-600 hover:text-blue-600 p-0.5 text-sm"
                            title="Edit layer"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDeleteLayer(layer)}
                            className="text-slate-600 hover:text-red-600 p-0.5 text-sm"
                            title="Delete layer"
                          >
                            🗑️
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {layer.note && <div className="text-xs text-slate-600 mb-3">{layer.note}</div>}

                  <div className="flex flex-wrap gap-2 mb-3">
                    {layer.entries && layer.entries.length > 0 ? (
                      layer.entries.map((entry: any) => {
                        const chokepoint = chokepointColors[entry.chokepoint as keyof typeof chokepointColors]
                        return (
                          <a
                            key={entry.id}
                            href={`/company/${entry.ticker.toLowerCase()}`}
                            className="inline-block p-2 rounded border border-slate-300 bg-white hover:bg-blue-50 hover:border-blue-400 transition cursor-pointer relative group no-underline"
                          >
                            {isAdmin && (
                              <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 flex gap-1 transition z-10">
                                <button
                                  onClick={(e) => {e.preventDefault(); e.stopPropagation(); handleEditEntry(entry, layer.id)}}
                                  className="text-xs bg-blue-500 text-white px-1.5 py-0.5 rounded hover:bg-blue-600"
                                  type="button"
                                >
                                  ✏️
                                </button>
                                <button
                                  onClick={(e) => {e.preventDefault(); e.stopPropagation(); handleDeleteEntry(layer.id, entry)}}
                                  className="text-xs bg-red-500 text-white px-1.5 py-0.5 rounded hover:bg-red-600"
                                  type="button"
                                >
                                  ✕
                                </button>
                              </div>
                            )}
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-blue-600">{entry.ticker}</span>
                              <span
                                className={`text-[10px] font-bold uppercase tracking-wide px-1.5 py-px rounded ${
                                  chokepoint?.bg || 'bg-slate-100'
                                } ${chokepoint?.text || 'text-slate-600'}`}
                              >
                                {entry.chokepoint.replace('-', ' ')}
                              </span>
                            </div>
                            {entry.company && (
                              <div className="text-xs text-slate-600 italic mt-1">
                                {entry.company.company_name}
                              </div>
                            )}
                          </a>
                        )
                      })
                    ) : (
                      <p className="text-xs text-slate-500 italic">No entries</p>
                    )}
                  </div>

                  {isAdmin && (
                    <div className="mb-3">
                      <button
                        onClick={() => handleAddEntry(layer.id)}
                        className="text-xs bg-blue-50 text-blue-600 border border-blue-200 px-2 py-1 rounded hover:bg-blue-100"
                      >
                        + Add Entry
                      </button>
                    </div>
                  )}

                  {layer.gap && (
                    <div className="text-xs text-amber-700 bg-amber-50 border-l-4 border-amber-400 px-3 py-2 rounded-r">
                      ⚠ GAP — {layer.gap}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-slate-500">No layers defined yet.</div>
            )}
          </section>

          {isAdmin && (
            <div className="mt-6 flex gap-2">
              <Button onClick={handleAddLayer} className="bg-blue-600 hover:bg-blue-700">
                + Add Layer
              </Button>
              <Button onClick={handleDeleteChain} variant="destructive">
                Delete Chain
              </Button>
            </div>
          )}

          <div className="mt-12 pt-8 border-t">
            <Link href="/value-chains" className="text-blue-600 hover:text-blue-800">
              ← Back to Value Chains
            </Link>
          </div>
        </article>

        {/* Chain edit modal */}
        <Dialog open={chainModalOpen} onOpenChange={setChainModalOpen}>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Chain</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={editingChain?.name || ''}
                  onChange={(e) => setEditingChain({ ...editingChain, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Sector</label>
                <select
                  value={editingChain?.sector_id || ''}
                  onChange={(e) => setEditingChain({ ...editingChain, sector_id: e.target.value ? Number(e.target.value) : null })}
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
                <label className="block text-sm font-medium mb-1">Stance</label>
                <select
                  value={editingChain?.stance || 'NEUTRAL'}
                  onChange={(e) => setEditingChain({ ...editingChain, stance: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option>OVERWEIGHT</option>
                  <option>HOLD</option>
                  <option>NEUTRAL</option>
                  <option>UNDERWEIGHT</option>
                  <option>SELECTIVE OVERWEIGHT</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Thesis</label>
                <textarea
                  value={editingChain?.thesis || ''}
                  onChange={(e) => setEditingChain({ ...editingChain, thesis: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Binding Constraint</label>
                <textarea
                  value={editingChain?.binding_constraint || ''}
                  onChange={(e) => setEditingChain({ ...editingChain, binding_constraint: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Group</label>
                <input
                  type="text"
                  value={editingChain?.chain_group || ''}
                  onChange={(e) => setEditingChain({ ...editingChain, chain_group: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Region</label>
                <input
                  type="text"
                  value={editingChain?.region || ''}
                  onChange={(e) => setEditingChain({ ...editingChain, region: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Alpha (rank)</label>
                <input
                  type="number"
                  value={editingChain?.alpha || 0}
                  onChange={(e) => setEditingChain({ ...editingChain, alpha: Number(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Connects (JSON)</label>
                <textarea
                  value={editingChain?.connects || ''}
                  onChange={(e) => setEditingChain({ ...editingChain, connects: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border rounded-md font-mono text-xs"
                  placeholder='[{"sid": "other-sector", "via": "connection", "note": "details"}]'
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Last Updated</label>
                <input
                  type="date"
                  value={editingChain?.last_updated || ''}
                  onChange={(e) => setEditingChain({ ...editingChain, last_updated: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Order</label>
                <input
                  type="number"
                  value={editingChain?.order || 0}
                  onChange={(e) => setEditingChain({ ...editingChain, order: Number(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div className="flex gap-2 justify-end pt-4">
                <Button variant="outline" onClick={() => setChainModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveChain} className="bg-blue-600 hover:bg-blue-700">
                  Save
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Layer edit/add modal */}
        <Dialog open={layerModalOpen} onOpenChange={setLayerModalOpen}>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingLayer?.id ? 'Edit Layer' : 'Add Layer'}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={editingLayer?.title || ''}
                  onChange={(e) => setEditingLayer({ ...editingLayer, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Note</label>
                <textarea
                  value={editingLayer?.note || ''}
                  onChange={(e) => setEditingLayer({ ...editingLayer, note: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Gap Warning (optional)</label>
                <textarea
                  value={editingLayer?.gap || ''}
                  onChange={(e) => setEditingLayer({ ...editingLayer, gap: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Order</label>
                <input
                  type="number"
                  value={editingLayer?.order || 0}
                  onChange={(e) => setEditingLayer({ ...editingLayer, order: Number(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div className="flex gap-2 justify-end pt-4">
                <Button variant="outline" onClick={() => setLayerModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveNewLayer} className="bg-blue-600 hover:bg-blue-700">
                  Save
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Entry edit/add modal */}
        <Dialog open={entryModalOpen} onOpenChange={setEntryModalOpen}>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingEntry?.id ? 'Edit Entry' : 'Add Entry'}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Ticker</label>
                <input
                  type="text"
                  value={editingEntry?.ticker || ''}
                  onChange={(e) => setEditingEntry({ ...editingEntry, ticker: e.target.value.toUpperCase() })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <textarea
                  value={editingEntry?.role || ''}
                  onChange={(e) => setEditingEntry({ ...editingEntry, role: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Chokepoint</label>
                <select
                  value={editingEntry?.chokepoint || 'contender'}
                  onChange={(e) => setEditingEntry({ ...editingEntry, chokepoint: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option>monopoly</option>
                  <option>sole-source</option>
                  <option>oligopoly</option>
                  <option>dominant</option>
                  <option>contender</option>
                  <option>commodity</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Region (optional)</label>
                <input
                  type="text"
                  value={editingEntry?.region || ''}
                  onChange={(e) => setEditingEntry({ ...editingEntry, region: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Tech (optional)</label>
                <input
                  type="text"
                  value={editingEntry?.tech || ''}
                  onChange={(e) => setEditingEntry({ ...editingEntry, tech: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Order</label>
                <input
                  type="number"
                  value={editingEntry?.order || 0}
                  onChange={(e) => setEditingEntry({ ...editingEntry, order: Number(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div className="flex gap-2 justify-end pt-4">
                <Button variant="outline" onClick={() => setEntryModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveEntry} className="bg-blue-600 hover:bg-blue-700">
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
