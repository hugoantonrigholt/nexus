import { Head } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import PostForm from '@/components/post-form'

export default function Edit({ post, sectors }: { post: any; sectors: any[] }) {
  return (
    <>
      <Head title={`Edit: ${post.title}`} />
      <AppLayout>
        <div className="max-w-2xl mx-auto py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Edit Post</h1>
            <p className="text-slate-600 mt-2">{post.title}</p>
          </div>
          <PostForm post={post} sectors={sectors} />
        </div>
      </AppLayout>
    </>
  )
}
