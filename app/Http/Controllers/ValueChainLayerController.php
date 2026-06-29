<?php

namespace App\Http\Controllers;

use App\Models\ValueChain;
use App\Models\ValueChainLayer;
use Illuminate\Http\Request;

class ValueChainLayerController extends Controller
{
    public function store(ValueChain $valueChain, Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'note' => 'nullable|string',
            'gap' => 'nullable|string',
            'order' => 'nullable|integer',
        ]);

        $valueChain->layers()->create($validated);

        return back();
    }

    public function update(ValueChain $valueChain, ValueChainLayer $layer, Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'note' => 'nullable|string',
            'gap' => 'nullable|string',
            'order' => 'nullable|integer',
        ]);

        $layer->update($validated);

        return back();
    }

    public function destroy(ValueChain $valueChain, ValueChainLayer $layer)
    {
        $layer->delete();

        return back();
    }
}
