import { Head, Link } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'

const stanceColors = {
  OVERWEIGHT: { bg: 'bg-green-100', text: 'text-green-800' },
  HOLD: { bg: 'bg-blue-100', text: 'text-blue-800' },
  NEUTRAL: { bg: 'bg-slate-100', text: 'text-slate-700' },
  UNDERWEIGHT: { bg: 'bg-red-100', text: 'text-red-800' },
}

export default function Show({ chain }: { chain: any }) {
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
        <article className="max-w-3xl mx-auto py-8">
          <header className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-2">{chain.name}</h1>
                {chain.sector && (
                  <p className="text-slate-600">
                    Sector: <span className="font-medium text-slate-900">{chain.sector.name}</span>
                  </p>
                )}
              </div>
              <span
                className={`ml-4 text-sm font-medium px-4 py-2 rounded whitespace-nowrap ${
                  stanceColors[chain.stance as keyof typeof stanceColors]?.bg || 'bg-slate-100'
                } ${
                  stanceColors[chain.stance as keyof typeof stanceColors]?.text || 'text-slate-700'
                }`}
              >
                {chain.stance}
              </span>
            </div>
          </header>

          <section className="mb-8">
            <h2 className="text-lg font-bold mb-3 text-slate-900">Thesis</h2>
            <p className="text-slate-700 leading-relaxed">{chain.thesis}</p>
          </section>

          {chain.binding_constraint && (
            <section className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <h2 className="text-lg font-bold mb-2 text-amber-900">Binding Constraint</h2>
              <p className="text-amber-900">{chain.binding_constraint}</p>
            </section>
          )}

          <section className="prose prose-lg max-w-none">
            <div
              className="text-slate-700"
              dangerouslySetInnerHTML={{ __html: chain.body }}
            />
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
