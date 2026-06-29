<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request, Post $post)
    {
        $validated = $request->validate([
            'body' => 'required|string|max:2000',
        ]);

        $post->comments()->create([
            'user_id' => $request->user()->id,
            'body' => $validated['body'],
        ]);

        return back();
    }

    public function destroy(Post $post, Comment $comment)
    {
        $this->authorize('delete', $comment);
        $comment->delete();

        return back();
    }
}
