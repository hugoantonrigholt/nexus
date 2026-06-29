import { Head, Link } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'

const stanceColors = {
  OVERWEIGHT: { bg: 'bg-green-100', text: 'text-green-800' },
  HOLD: { bg: 'bg-blue-100', text: 'text-blue-800' },
  NEUTRAL: { bg: 'bg-slate-100', text: 'text-slate-700' },
  UNDERWEIGHT: { bg: 'bg-red-100', text: 'text-red-800' },
}

export default function Index({ chains }: { chains: any[] }) {
  return (
    <>
      <Head title="Value Chains" />
      <AppLayout
        breadcrumbs={[
          { title: 'Feed', href: { url: '/feed' } },
          { title: 'Value Chains', href: { url: '/value-chains' } },
        ]}
      >
        <div className="max-w-5xl mx-auto py-8 px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Value Chains</h1>
            <p className="text-slate-600 mt-1">Sector value chain analysis — layer by layer</p>
          </div>

          <div className="space-y-4">
            {chains && chains.length > 0 ? (
              chains.map((chain: any) => {
                const entryCount = chain.layers.reduce((acc: number, layer: any) =>
                  acc + (layer.entries?.length || 0), 0)
                const gapCount = chain.layers.filter((l: any) => l.gap).length

                return (
                  <Link
                    key={chain.id}
                    href={`/value-chains/${chain.id}`}
                    className="block p-6 border rounded-lg hover:border-slate-400 hover:shadow-md transition bg-white"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h2 className="text-xl font-bold hover:text-blue-600">{chain.name}</h2>
                        {chain.sector && (
                          <p className="text-sm text-slate-600 mt-1">
                            Sector: <span className="font-medium text-slate-900">{chain.sector.name}</span>
                          </p>
                        )}
                      </div>
                      <span
                        className={`ml-4 text-xs font-medium px-3 py-1 rounded whitespace-nowrap ${
                          stanceColors[chain.stance as keyof typeof stanceColors]?.bg || 'bg-slate-100'
                        } ${
                          stanceColors[chain.stance as keyof typeof stanceColors]?.text || 'text-slate-700'
                        }`}
                      >
                        {chain.stance}
                      </span>
                    </div>

                    <p className="text-sm text-slate-700 mb-3 line-clamp-2">{chain.thesis}</p>

                    <div className="flex items-center gap-4 text-xs text-slate-600">
                      <span>{chain.layers.length} layers, {entryCount} entries</span>
                      {gapCount > 0 && (
                        <span className="text-amber-600">
                          ⚠ {gapCount} gap{gapCount !== 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                  </Link>
                )
              })
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-600">No value chains found.</p>
              </div>
            )}
          </div>
        </div>
      </AppLayout>
    </>
  )
}
