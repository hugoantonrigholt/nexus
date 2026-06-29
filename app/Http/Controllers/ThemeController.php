<?php

namespace App\Http\Controllers;

use App\Models\Theme;
use Inertia\Inertia;

class ThemeController extends Controller
{
    public function show(Theme $theme)
    {
        $cards = $theme->cards()
            ->with('sector')
            ->orderBy('order')
            ->orderBy('ticker')
            ->get();

        return Inertia::render('Themes/Show', [
            'theme' => $theme,
            'cards' => $cards,
        ]);
    }
}
