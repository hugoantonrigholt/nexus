import { Head, Link, router } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import PostCard from '@/components/post-card'

export default function Index({ posts, sectors, filters = {} }: { posts: any; sectors: any[]; filters?: any }) {
  const handleSectorChange = (value: string) => {
    router.get('/feed', {
      sector_id: value || undefined,
    })
  }

  return (
    <>
      <Head title="Feed" />
      <AppLayout>
        <div className="max-w-4xl mx-auto py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Research Feed</h1>
              <p className="text-slate-600 mt-1">Latest articles from the community</p>
            </div>
            <Link href="/posts/create">
              <Button>Write Article</Button>
            </Link>
          </div>

          <div className="bg-white p-4 rounded-lg border mb-6">
            <label className="block text-sm font-medium mb-2">Filter by Sector</label>
            <Select value={filters.sector_id ? String(filters.sector_id) : ''} onValueChange={handleSectorChange}>
              <SelectTrigger>
                <SelectValue placeholder="All sectors" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All sectors</SelectItem>
                {sectors.map((sector) => (
                  <SelectItem key={sector.id} value={String(sector.id)}>
                    {sector.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {posts.data.length > 0 ? (
              posts.data.map((post: any) => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-600">No articles found.</p>
              </div>
            )}
          </div>

          {posts.links && (
            <div className="mt-8 flex justify-center gap-2">
              {posts.links.map((link: any) => (
                <Link
                  key={link.url}
                  href={link.url || ''}
                  className={`px-3 py-2 border rounded ${
                    link.active
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'hover:border-slate-400'
                  }`}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                />
              ))}
            </div>
          )}
        </div>
      </AppLayout>
    </>
  )
}
