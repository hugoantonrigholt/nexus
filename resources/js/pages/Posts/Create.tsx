import { Head, router } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import PostForm from '@/components/post-form'

export default function Create({ sectors }: { sectors: any[] }) {
  const handleSubmit = (data: any) => {
    router.post('/posts', data)
  }

  return (
    <>
      <Head title="New Post" />
      <AppLayout>
        <div className="max-w-2xl mx-auto py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Write a New Post</h1>
            <p className="text-slate-600 mt-2">
              Share your research and insights with the community.
            </p>
          </div>
          <PostForm sectors={sectors} onSubmit={handleSubmit} />
        </div>
      </AppLayout>
    </>
  )
}
