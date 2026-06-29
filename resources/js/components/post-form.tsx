import { useState } from 'react'
import { useForm } from '@inertiajs/react'
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
  onSubmit,
}: {
  post?: any
  sectors: any[]
  onSubmit: (data: any) => void
}) {
  const [content, setContent] = useState(post?.body || '')
  const { data, setData, processing, errors } = useForm({
    title: post?.title || '',
    body: content,
    ticker: post?.ticker || '',
    sector_id: post?.sector_id || '',
    visibility: post?.visibility || 'members_only',
  })

  const handleSubmit = (e: React.FormEvent, publish: boolean) => {
    e.preventDefault()
    setData('body', content)
    setData('publish', publish)
    onSubmit({ ...data, body: content, publish })
  }

  return (
    <form className="space-y-6">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          type="text"
          value={data.title}
          onChange={(e) => setData('title', e.target.value)}
          className="mt-1"
          required
        />
        {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
      </div>

      <div>
        <Label>Content</Label>
        <RichEditor value={content} onChange={setContent} />
        {errors.body && <p className="text-red-600 text-sm mt-1">{errors.body}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="ticker">Ticker (optional)</Label>
          <Input
            id="ticker"
            type="text"
            value={data.ticker}
            onChange={(e) => setData('ticker', e.target.value.toUpperCase())}
            placeholder="NVDA"
            className="mt-1"
            maxLength={10}
          />
        </div>

        <div>
          <Label htmlFor="sector">Sector (optional)</Label>
          <Select value={data.sector_id} onValueChange={(val) => setData('sector_id', val)}>
            <SelectTrigger id="sector">
              <SelectValue placeholder="Select sector" />
            </SelectTrigger>
            <SelectContent>
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
        <Select value={data.visibility} onValueChange={(val) => setData('visibility', val)}>
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
