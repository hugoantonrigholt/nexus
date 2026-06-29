import { Head, Link } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'

const stanceColors = {
  OVERWEIGHT: { bg: 'bg-green-100', text: 'text-green-800' },
  HOLD: { bg: 'bg-blue-100', text: 'text-blue-800' },
  NEUTRAL: { bg: 'bg-slate-100', text: 'text-slate-700' },
  UNDERWEIGHT: { bg: 'bg-red-100', text: 'text-red-800' },
}

const chokepointColors = {
  monopoly: { bg: 'bg-red-100', text: 'text-red-700' },
  'sole-source': { bg: 'bg-amber-100', text: 'text-amber-700' },
  oligopoly: { bg: 'bg-blue-100', text: 'text-blue-700' },
  dominant: { bg: 'bg-green-100', text: 'text-green-700' },
  contender: { bg: 'bg-slate-100', text: 'text-slate-600' },
  commodity: { bg: 'bg-slate-100', text: 'text-slate-500' },
}

const ownColors = {
  HELD: { dot: 'bg-blue-500', chip: 'border-blue-300 bg-blue-50 text-slate-900' },
  WATCH: { dot: 'bg-slate-400', chip: 'border-slate-200 bg-slate-50 text-slate-500' },
  NONE: { dot: 'bg-amber-500', chip: 'border-amber-300 bg-amber-50 text-slate-900' },
}

export default function Show({ chain }: { chain: any }) {
  const heldCount = chain.layers.reduce((acc: number, layer: any) =>
    acc + layer.entries.filter((e: any) => e.own === 'HELD').length, 0)
  const watchCount = chain.layers.reduce((acc: number, layer: any) =>
    acc + layer.entries.filter((e: any) => e.own === 'WATCH').length, 0)
  const noneCount = chain.layers.reduce((acc: number, layer: any) =>
    acc + layer.entries.filter((e: any) => e.own === 'NONE').length, 0)
  const gapCount = chain.layers.filter((l: any) => l.gap).length

  return (
    <>
      <Head title={chain.name} />
      <AppLayout
        breadcrumbs={[
          { title: 'Feed', href: { url: '/feed' } },
          { title: 'Value Chains', href: { url: '/value-chains' } },
          { title: chain.name, href: { url: `/value-chains/${chain.id}` } },
        ]}
      >
        <article className="max-w-5xl mx-auto py-8 px-4">
          <header className="mb-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h1 className="text-4xl font-bold mb-2">{chain.name}</h1>
                {chain.sector && (
                  <p className="text-slate-600">
                    Sector: <span className="font-medium text-slate-900">{chain.sector.name}</span>
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
                <div className="text-xs text-slate-600 text-right">
                  <span className="inline-block mr-3">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-1 align-middle" /> {heldCount} held
                  </span>
                  <span className="inline-block mr-3">
                    <span className="inline-block w-2 h-2 rounded-full bg-slate-400 mr-1 align-middle" /> {watchCount} watch
                  </span>
                  <span className="inline-block mr-3">
                    <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mr-1 align-middle" /> {noneCount} leads
                  </span>
                  {gapCount > 0 && (
                    <span className="inline-block">
                      ⚠ {gapCount} gap{gapCount !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>
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
                  <div className="font-semibold text-sm mb-1 text-slate-900">{layer.title}</div>
                  {layer.note && (
                    <div className="text-xs text-slate-600 mb-3">{layer.note}</div>
                  )}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {layer.entries && layer.entries.length > 0 ? (
                      layer.entries.map((entry: any) => {
                        const own = ownColors[entry.own as keyof typeof ownColors]
                        const chokepoint = chokepointColors[entry.chokepoint as keyof typeof chokepointColors]
                        return (
                          <span
                            key={entry.id}
                            className={`inline-flex items-center gap-1.5 font-mono text-xs px-2 py-1 rounded border ${own?.chip || 'border-slate-200'}`}
                            title={entry.role}
                          >
                            <span className={`w-2 h-2 rounded-full ${own?.dot || 'bg-slate-400'}`} />
                            {entry.ticker}
                            <span
                              className={`text-[10px] font-bold uppercase tracking-wide px-1.5 py-px rounded ml-1 ${
                                chokepoint?.bg || 'bg-slate-100'
                              } ${chokepoint?.text || 'text-slate-600'}`}
                            >
                              {entry.chokepoint.replace('-', ' ')}
                            </span>
                          </span>
                        )
                      })
                    ) : (
                      <p className="text-xs text-slate-500 italic">No entries</p>
                    )}
                  </div>
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

          <div className="mt-12 pt-8 border-t">
            <Link href="/value-chains" className="text-blue-600 hover:text-blue-800">
              ← Back to Value Chains
            </Link>
          </div>
        </article>
      </AppLayout>
    </>
  )
}
