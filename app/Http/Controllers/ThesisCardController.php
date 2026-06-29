<?php

namespace App\Http\Controllers;

use App\Models\Sector;
use App\Models\ThesisCard;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ThesisCardController extends Controller
{
    public function index(Request $request)
    {
        $query = ThesisCard::with('sector', 'themeRelation');

        // Search
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function($q) use ($search) {
                $q->where('ticker', 'ilike', "%{$search}%")
                  ->orWhere('company_name', 'ilike', "%{$search}%")
                  ->orWhere('industry', 'ilike', "%{$search}%")
                  ->orWhere('theme', 'ilike', "%{$search}%")
                  ->orWhere('edge', 'ilike', "%{$search}%");
            });
        }

        // Filters
        if ($request->filled('theme_id')) {
            $query->where('theme_id', $request->input('theme_id'));
        }

        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        if ($request->filled('thesis_state')) {
            $query->where('thesis_state', $request->input('thesis_state'));
        }

        if ($request->filled('trend_state')) {
            $query->where('trend_state', $request->input('trend_state'));
        }

        if ($request->filled('tier')) {
            $query->where('tier', $request->input('tier'));
        }

        if ($request->filled('sector_id')) {
            $query->where('sector_id', $request->input('sector_id'));
        }

        if ($request->filled('industry')) {
            $query->where('industry', $request->input('industry'));
        }

        // Sorting
        $sort = $request->input('sort', 'ticker');
        $direction = $request->input('direction', 'asc');

        switch ($sort) {
            case 'ticker':
                $query->orderBy('ticker', $direction);
                break;
            case 'company':
                $query->orderBy('company_name', $direction);
                break;
            case 'theme':
                $query->orderBy('theme', $direction);
                break;
            case 'status':
                $query->orderBy('status', $direction);
                break;
            case 'thesis_state':
                $query->orderBy('thesis_state', $direction);
                break;
            case 'updated':
                $query->orderBy('last_updated', $direction);
                break;
            default:
                $query->orderBy('order')->orderBy('ticker');
        }

        $cards = $query->get();
        $sectors = Sector::orderBy('name')->get(['id', 'name', 'slug']);
        $themes = \App\Models\Theme::orderBy('name')->get(['id', 'name', 'slug']);

        // Get unique values for filter dropdowns
        $statuses = ThesisCard::whereNotNull('status')->distinct()->pluck('status');
        $thesisStates = ThesisCard::whereNotNull('thesis_state')->distinct()->pluck('thesis_state');
        $trendStates = ThesisCard::whereNotNull('trend_state')->distinct()->pluck('trend_state');
        $tiers = ThesisCard::whereNotNull('tier')->distinct()->pluck('tier');
        $industries = ThesisCard::whereNotNull('industry')->distinct()->orderBy('industry')->pluck('industry');

        return Inertia::render('ThesisCards/Index', [
            'cards' => $cards,
            'sectors' => $sectors,
            'themes' => $themes,
            'filters' => [
                'statuses' => $statuses,
                'thesisStates' => $thesisStates,
                'trendStates' => $trendStates,
                'tiers' => $tiers,
                'industries' => $industries,
            ],
            'search' => $request->input('search', ''),
            'sort' => $sort,
            'direction' => $direction,
        ]);
    }

    public function create()
    {
        $themes = \App\Models\Theme::orderBy('name')->get(['id', 'name', 'slug']);
        return Inertia::render('ThesisCards/Create', [
            'themes' => $themes,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'ticker' => 'required|string|max:10',
            'company_name' => 'required|string',
            'sector_id' => 'nullable|exists:sectors,id',
            'theme' => 'nullable|string',
            'stance' => 'nullable|in:LONG,HOLD,BUILD,TRIM,EXIT,WATCH,AVOID,RESEARCH',
            'thesis_state' => 'required|in:INTACT,STRESSED,BROKEN,STRENGTHENING,CATALYST',
            'trend_state' => 'nullable|in:UPTREND,EXTENDED,BREAKING,BROKEN',
            'conviction' => 'required|integer|min:1|max:5',
            'quality' => 'required|integer|min:1|max:10',
            'tier' => 'nullable|integer|min:1|max:4',
            'edge' => 'required|string',
            'watch' => 'nullable|string',
            'entry' => 'nullable|string',
            'catalyst' => 'nullable|string',
            'upside' => 'nullable|string',
            'last_updated' => 'nullable|date',
            'order' => 'nullable|integer',
        ]);

        ThesisCard::create($validated);

        return back();
    }

    public function edit(ThesisCard $card)
    {
        $themes = \App\Models\Theme::orderBy('name')->get(['id', 'name', 'slug']);
        return Inertia::render('ThesisCards/Edit', [
            'card' => $card,
            'themes' => $themes,
        ]);
    }

    public function update(Request $request, ThesisCard $card)
    {

        $validated = $request->validate([
            'ticker' => 'required|string|max:10',
            'company_name' => 'required|string',
            'sector_id' => 'nullable|exists:sectors,id',
            'theme' => 'nullable|string',
            'stance' => 'nullable|in:LONG,HOLD,BUILD,TRIM,EXIT,WATCH,AVOID,RESEARCH',
            'thesis_state' => 'required|in:INTACT,STRESSED,BROKEN,STRENGTHENING,CATALYST',
            'trend_state' => 'nullable|in:UPTREND,EXTENDED,BREAKING,BROKEN',
            'conviction' => 'required|integer|min:1|max:5',
            'quality' => 'required|integer|min:1|max:10',
            'tier' => 'nullable|integer|min:1|max:4',
            'edge' => 'required|string',
            'watch' => 'nullable|string',
            'entry' => 'nullable|string',
            'catalyst' => 'nullable|string',
            'upside' => 'nullable|string',
            'last_updated' => 'nullable|date',
            'order' => 'nullable|integer',
        ]);

        $card->update($validated);

        return back();
    }

    public function destroy(ThesisCard $card)
    {
        $card->delete();

        return back();
    }
}
