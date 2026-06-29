<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;

class CompanyController extends Controller
{
    public function show(string $ticker)
    {
        $ticker = strtoupper($ticker);

        $posts = Post::whereNotNull('published_at')
            ->where('ticker', $ticker)
            ->with('author', 'sector')
            ->latest('published_at')
            ->paginate(15);

        if ($posts->isEmpty()) {
            abort(404);
        }

        $sectors = Post::whereNotNull('published_at')
            ->where('ticker', $ticker)
            ->whereNotNull('sector_id')
            ->with('sector')
            ->get()
            ->pluck('sector')
            ->unique('id')
            ->sortBy('name')
            ->values();

        return Inertia::render('Companies/Show', [
            'ticker' => $ticker,
            'posts' => $posts,
            'sectors' => $sectors,
        ]);
    }
}
