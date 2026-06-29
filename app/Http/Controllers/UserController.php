<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;

class UserController extends Controller
{
    public function show(User $user)
    {
        $posts = $user->posts()
            ->whereNotNull('published_at')
            ->with('author', 'sector')
            ->latest('published_at')
            ->paginate(15);

        return Inertia::render('Users/Show', [
            'author' => $user,
            'posts' => $posts,
        ]);
    }
}
