<?php

namespace App\Http\Controllers;

use App\Models\ValueChain;
use App\Models\ValueChainLayer;
use App\Models\ValueChainLayerEntry;
use Illuminate\Http\Request;

class ValueChainLayerEntryController extends Controller
{
    public function store(ValueChain $valueChain, ValueChainLayer $layer, Request $request)
    {
        $validated = $request->validate([
            'ticker' => 'required|string|max:20',
            'role' => 'required|string',
            'chokepoint' => 'required|in:monopoly,sole-source,oligopoly,dominant,contender,commodity',
            'region' => 'nullable|string',
            'tech' => 'nullable|string',
            'order' => 'nullable|integer',
        ]);

        $layer->entries()->create($validated);

        return back();
    }

    public function update(ValueChain $valueChain, ValueChainLayer $layer, ValueChainLayerEntry $entry, Request $request)
    {
        $validated = $request->validate([
            'ticker' => 'required|string|max:20',
            'role' => 'required|string',
            'chokepoint' => 'required|in:monopoly,sole-source,oligopoly,dominant,contender,commodity',
            'region' => 'nullable|string',
            'tech' => 'nullable|string',
            'order' => 'nullable|integer',
        ]);

        $entry->update($validated);

        return back();
    }

    public function destroy(ValueChain $valueChain, ValueChainLayer $layer, ValueChainLayerEntry $entry)
    {
        $entry->delete();

        return back();
    }
}
