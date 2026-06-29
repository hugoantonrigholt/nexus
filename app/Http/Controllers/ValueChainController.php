<?php

namespace App\Http\Controllers;

use App\Models\Sector;
use App\Models\ValueChain;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ValueChainController extends Controller
{
    public function index()
    {
        $chains = ValueChain::with('sector', 'layers.entries.company')
            ->orderBy('order')
            ->orderBy('name')
            ->get();

        return Inertia::render('ValueChains/Index', [
            'chains' => $chains,
        ]);
    }

    public function show(ValueChain $valueChain)
    {
        $valueChain->load('sector', 'layers.entries.company');

        return Inertia::render('ValueChains/Show', [
            'chain' => $valueChain,
            'sectors' => Sector::orderBy('name')->get(['id', 'name', 'slug']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'sector_id' => 'nullable|exists:sectors,id',
            'stance' => 'required|in:OVERWEIGHT,HOLD,NEUTRAL,UNDERWEIGHT,SELECTIVE OVERWEIGHT',
            'thesis' => 'required|string',
            'binding_constraint' => 'nullable|string',
            'chain_group' => 'nullable|string',
            'region' => 'nullable|string',
            'alpha' => 'nullable|integer',
            'connects' => 'nullable|json',
            'last_updated' => 'nullable|date',
            'order' => 'nullable|integer',
        ]);

        ValueChain::create($validated);

        return back();
    }

    public function update(Request $request, ValueChain $valueChain)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'sector_id' => 'nullable|exists:sectors,id',
            'stance' => 'required|in:OVERWEIGHT,HOLD,NEUTRAL,UNDERWEIGHT,SELECTIVE OVERWEIGHT',
            'thesis' => 'required|string',
            'binding_constraint' => 'nullable|string',
            'chain_group' => 'nullable|string',
            'region' => 'nullable|string',
            'alpha' => 'nullable|integer',
            'connects' => 'nullable|json',
            'last_updated' => 'nullable|date',
            'order' => 'nullable|integer',
        ]);

        $valueChain->update($validated);

        return back();
    }

    public function destroy(ValueChain $valueChain)
    {
        $valueChain->delete();

        return redirect('/value-chains');
    }
}
