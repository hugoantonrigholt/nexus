import { Head, Link, router, usePage } from '@inertiajs/react'
import { Button } from '@/components/ui/button'

export default function Welcome() {
  const { auth } = usePage().props as any

  if (auth.user) {
    router.visit('/feed')
    return null
  }

  return (
    <>
      <Head title="Welcome to Nexus" />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 px-4">
        <div className="text-center max-w-2xl">
          <h1 className="text-5xl font-bold text-white mb-4">Nexus</h1>
          <p className="text-xl text-slate-300 mb-2">
            A private investment research publication
          </p>
          <p className="text-slate-400 mb-8">
            Share insights, explore sectors, and discover companies through curated research.
          </p>

          <div className="flex gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" variant="outline">
                Log In
              </Button>
            </Link>
          </div>

          <div className="mt-16 p-8 bg-slate-800/50 rounded-lg border border-slate-700">
            <h2 className="text-lg font-semibold text-white mb-4">Features</h2>
            <ul className="text-left text-slate-300 space-y-2">
              <li className="flex gap-2">
                <span className="text-blue-400">✓</span> Write rich articles with Tiptap editor
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400">✓</span> Tag articles to companies and sectors
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400">✓</span> Browse by sector and ticker
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400">✓</span> Share your research with members
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
