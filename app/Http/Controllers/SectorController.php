<?php

namespace App\Http\Controllers;

use App\Models\Sector;
use Inertia\Inertia;

class SectorController extends Controller
{
    public function show(Sector $sector)
    {
        $posts = $sector->posts()
            ->whereNotNull('published_at')
            ->with('author', 'sector')
            ->latest('published_at')
            ->paginate(15);

        $relatedTickers = $sector->posts()
            ->whereNotNull('published_at')
            ->whereNotNull('ticker')
            ->distinct('ticker')
            ->pluck('ticker')
            ->sort()
            ->values();

        return Inertia::render('Sectors/Show', [
            'sector' => $sector->load('overviewPost.author'),
            'posts' => $posts,
            'relatedTickers' => $relatedTickers,
        ]);
    }
}
