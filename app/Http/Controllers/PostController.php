<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Sector;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $posts = Post::whereNotNull('published_at')
            ->with('author', 'sector')
            ->when($request->sector_id, fn($q, $v) => $q->where('sector_id', $v))
            ->when($request->ticker, fn($q, $v) => $q->where('ticker', strtoupper($v)))
            ->latest('published_at')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Posts/Index', [
            'posts' => $posts,
            'sectors' => Sector::all(),
            'filters' => $request->only(['sector_id', 'ticker']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Posts/Create', [
            'sectors' => Sector::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'ticker' => 'nullable|string|max:10',
            'sector_id' => 'nullable|exists:sectors,id',
            'visibility' => 'required|in:public,members_only',
            'publish' => 'boolean',
        ]);

        $post = $request->user()->posts()->create([
            'title' => $validated['title'],
            'slug' => $this->generateSlug($validated['title']),
            'body' => $validated['body'],
            'ticker' => $validated['ticker'],
            'sector_id' => $validated['sector_id'],
            'visibility' => $validated['visibility'],
            'published_at' => $validated['publish'] ? now() : null,
        ]);

        return redirect()->route('posts.show', $post->slug)
            ->with('message', $validated['publish'] ? 'Post published!' : 'Draft saved!');
    }

    public function show(Post $post)
    {
        $post->load('author', 'sector', 'comments.author');

        return Inertia::render('Posts/Show', [
            'post' => $post,
        ]);
    }

    public function edit(Post $post)
    {
        $this->authorize('update', $post);

        return Inertia::render('Posts/Edit', [
            'post' => $post->load('sector'),
            'sectors' => Sector::all(),
        ]);
    }

    public function update(Request $request, Post $post)
    {
        $this->authorize('update', $post);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'ticker' => 'nullable|string|max:10',
            'sector_id' => 'nullable|exists:sectors,id',
            'visibility' => 'required|in:public,members_only',
            'publish' => 'boolean',
        ]);

        $post->update([
            'title' => $validated['title'],
            'slug' => $this->generateSlug($validated['title'], $post->id),
            'body' => $validated['body'],
            'ticker' => $validated['ticker'],
            'sector_id' => $validated['sector_id'],
            'visibility' => $validated['visibility'],
            'published_at' => $validated['publish'] && !$post->isPublished() ? now() : $post->published_at,
        ]);

        return redirect()->route('posts.show', $post->slug)
            ->with('message', 'Post updated!');
    }

    public function destroy(Post $post)
    {
        $this->authorize('delete', $post);
        $post->delete();

        return redirect()->route('posts.index')
            ->with('message', 'Post deleted!');
    }

    private function generateSlug(string $title, ?int $postId = null): string
    {
        $slug = \Str::slug($title);
        $count = Post::where('slug', 'like', $slug . '%')
            ->where('id', '!=', $postId)
            ->count();

        return $count > 0 ? $slug . '-' . ($count + 1) : $slug;
    }
}
