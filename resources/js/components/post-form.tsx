import { useState } from 'react'
import { router } from '@inertiajs/react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import RichEditor from './rich-editor'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

export default function PostForm({
  post,
  sectors,
}: {
  post?: any
  sectors: any[]
}) {
  const [title, setTitle] = useState(post?.title || '')
  const [content, setContent] = useState(post?.body || '')
  const [ticker, setTicker] = useState(post?.ticker || '')
  const [sectorId, setSectorId] = useState(post?.sector_id || '')
  const [visibility, setVisibility] = useState(post?.visibility || 'members_only')
  const [processing, setProcessing] = useState(false)

  const handleSubmit = (e: React.FormEvent, publish: boolean) => {
    e.preventDefault()
    setProcessing(true)

    const data = {
      title,
      body: content,
      ticker,
      sector_id: sectorId,
      visibility,
      publish,
    }

    if (post) {
      router.patch(`/posts/${post.slug}`, data)
    } else {
      router.post('/posts', data)
    }
  }

  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1"
          required
          disabled={processing}
        />
      </div>

      <div>
        <Label>Content</Label>
        <RichEditor value={content} onChange={setContent} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="ticker">Ticker (optional)</Label>
          <Input
            id="ticker"
            type="text"
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
            placeholder="NVDA"
            className="mt-1"
            maxLength={10}
            disabled={processing}
          />
        </div>

        <div>
          <Label htmlFor="sector">Sector (optional)</Label>
          <Select value={sectorId} onValueChange={setSectorId} disabled={processing}>
            <SelectTrigger id="sector">
              <SelectValue placeholder="Select sector" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">None</SelectItem>
              {sectors.map((sector) => (
                <SelectItem key={sector.id} value={String(sector.id)}>
                  {sector.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="visibility">Visibility</Label>
        <Select value={visibility} onValueChange={setVisibility} disabled={processing}>
          <SelectTrigger id="visibility">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="members_only">Members Only</SelectItem>
            <SelectItem value="public">Public (Anyone with link)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-3 pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={(e) => handleSubmit(e, false)}
          disabled={processing}
        >
          Save as Draft
        </Button>
        <Button
          type="button"
          onClick={(e) => handleSubmit(e, true)}
          disabled={processing}
        >
          {post ? 'Update & Publish' : 'Publish'}
        </Button>
      </div>
    </form>
  )
}
