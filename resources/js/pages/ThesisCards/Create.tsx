import { Head, Link, router } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function Create({ themes }: { themes: any[] }) {
  const [data, setData] = useState({
    ticker: '',
    company_name: '',
    industry: '',
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
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (field: string, value: any) => {
    setData({ ...data, [field]: value })
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    router.post('/thesis-cards', data, {
      onFinish: () => setIsSubmitting(false),
    })
  }

  return (
    <>
      <Head title="New Thesis Card" />
      <AppLayout
        breadcrumbs={[
          { title: 'Thesis Cards', href: '/thesis-cards' },
          { title: 'New Card', href: '/thesis-cards/create' },
        ]}
      >
        <div className="max-w-2xl mx-auto py-8 px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Create Thesis Card</h1>
            <p className="text-slate-600 mt-2">Add a new company to track</p>
          </div>

          <div className="bg-white border rounded-lg p-8 space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Ticker *</label>
                <input
                  type="text"
                  value={data.ticker}
                  onChange={(e) => handleChange('ticker', e.target.value.toUpperCase())}
                  placeholder="e.g. NVDA"
                  className="w-full px-3 py-2 border rounded-md"
                  disabled={isSubmitting}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Company Name *</label>
                <input
                  type="text"
                  value={data.company_name}
                  onChange={(e) => handleChange('company_name', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  disabled={isSubmitting}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Industry</label>
              <input
                type="text"
                value={data.industry}
                onChange={(e) => handleChange('industry', e.target.value)}
                placeholder="e.g. Semiconductors"
                className="w-full px-3 py-2 border rounded-md"
                disabled={isSubmitting}
              />
            </div>

            {/* Theme & Status */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Theme</label>
                <select
                  value={data.theme_id || ''}
                  onChange={(e) => handleChange('theme_id', e.target.value ? Number(e.target.value) : null)}
                  className="w-full px-3 py-2 border rounded-md"
                  disabled={isSubmitting}
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
                  value={data.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  disabled={isSubmitting}
                >
                  <option value="">—</option>
                  <option>HELD</option>
                  <option>WATCH</option>
                  <option>NONE</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tier</label>
                <input
                  type="number"
                  min="1"
                  max="4"
                  value={data.tier || ''}
                  onChange={(e) => handleChange('tier', e.target.value ? Number(e.target.value) : null)}
                  className="w-full px-3 py-2 border rounded-md"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Thesis State & Trend */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Thesis State</label>
                <select
                  value={data.thesis_state}
                  onChange={(e) => handleChange('thesis_state', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  disabled={isSubmitting}
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
                  value={data.trend_state}
                  onChange={(e) => handleChange('trend_state', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  disabled={isSubmitting}
                >
                  <option value="">—</option>
                  <option>UPTREND</option>
                  <option>EXTENDED</option>
                  <option>BREAKING</option>
                  <option>BROKEN</option>
                </select>
              </div>
            </div>

            {/* Thesis Content */}
            <div>
              <label className="block text-sm font-medium mb-1">Edge *</label>
              <textarea
                value={data.edge}
                onChange={(e) => handleChange('edge', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border rounded-md"
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Watch</label>
                <textarea
                  value={data.watch}
                  onChange={(e) => handleChange('watch', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border rounded-md"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Entry</label>
                <textarea
                  value={data.entry}
                  onChange={(e) => handleChange('entry', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border rounded-md"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Catalyst</label>
                <textarea
                  value={data.catalyst}
                  onChange={(e) => handleChange('catalyst', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border rounded-md"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Upside</label>
                <textarea
                  value={data.upside}
                  onChange={(e) => handleChange('upside', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border rounded-md"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Last Updated</label>
              <input
                type="date"
                value={data.last_updated}
                onChange={(e) => handleChange('last_updated', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                disabled={isSubmitting}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-6 border-t">
              <Link href="/thesis-cards">
                <Button variant="outline" disabled={isSubmitting}>
                  Cancel
                </Button>
              </Link>
              <Button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700"
                disabled={isSubmitting}
              >
                Create Card
              </Button>
            </div>
          </div>
        </div>
      </AppLayout>
    </>
  )
}
