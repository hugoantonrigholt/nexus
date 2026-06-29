import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { Button } from './ui/button'

export default function RichEditor({
  value,
  onChange,
  placeholder = 'Start writing...',
}: {
  value: string
  onChange: (content: string) => void
  placeholder?: string
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Image,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  if (!editor) return null

  const toggleBold = () => editor.chain().focus().toggleBold().run()
  const toggleItalic = () => editor.chain().focus().toggleItalic().run()
  const toggleHeading1 = () => editor.chain().focus().toggleHeading({ level: 1 }).run()
  const toggleHeading2 = () => editor.chain().focus().toggleHeading({ level: 2 }).run()
  const toggleBulletList = () => editor.chain().focus().toggleBulletList().run()
  const toggleOrderedList = () => editor.chain().focus().toggleOrderedList().run()
  const toggleBlockquote = () => editor.chain().focus().toggleBlockquote().run()
  const toggleCodeBlock = () => editor.chain().focus().toggleCodeBlock().run()
  const addImage = () => {
    const url = window.prompt('Enter image URL:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }
  const addLink = () => {
    const url = window.prompt('Enter URL:')
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="border-b bg-slate-50 p-2 flex flex-wrap gap-1">
        <Button
          size="sm"
          variant={editor.isActive('bold') ? 'default' : 'outline'}
          onClick={toggleBold}
        >
          <strong>B</strong>
        </Button>
        <Button
          size="sm"
          variant={editor.isActive('italic') ? 'default' : 'outline'}
          onClick={toggleItalic}
        >
          <em>I</em>
        </Button>
        <div className="w-px bg-slate-300" />
        <Button
          size="sm"
          variant={editor.isActive('heading', { level: 1 }) ? 'default' : 'outline'}
          onClick={toggleHeading1}
        >
          H1
        </Button>
        <Button
          size="sm"
          variant={editor.isActive('heading', { level: 2 }) ? 'default' : 'outline'}
          onClick={toggleHeading2}
        >
          H2
        </Button>
        <div className="w-px bg-slate-300" />
        <Button
          size="sm"
          variant={editor.isActive('bulletList') ? 'default' : 'outline'}
          onClick={toggleBulletList}
        >
          •
        </Button>
        <Button
          size="sm"
          variant={editor.isActive('orderedList') ? 'default' : 'outline'}
          onClick={toggleOrderedList}
        >
          1.
        </Button>
        <div className="w-px bg-slate-300" />
        <Button
          size="sm"
          variant={editor.isActive('blockquote') ? 'default' : 'outline'}
          onClick={toggleBlockquote}
        >
          "
        </Button>
        <Button
          size="sm"
          variant={editor.isActive('codeBlock') ? 'default' : 'outline'}
          onClick={toggleCodeBlock}
        >
          &lt;&gt;
        </Button>
        <div className="w-px bg-slate-300" />
        <Button size="sm" variant="outline" onClick={addLink}>
          Link
        </Button>
        <Button size="sm" variant="outline" onClick={addImage}>
          Image
        </Button>
      </div>
      <EditorContent
        editor={editor}
        className="prose prose-sm max-w-none p-4 focus:outline-none min-h-96"
      />
    </div>
  )
}
