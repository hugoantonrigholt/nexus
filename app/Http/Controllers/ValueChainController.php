<?php

namespace App\Http\Controllers;

use App\Models\ValueChain;
use Inertia\Inertia;

class ValueChainController extends Controller
{
    public function index()
    {
        $chains = ValueChain::with('sector')->orderBy('order')->orderBy('name')->get();

        return Inertia::render('ValueChains/Index', [
            'chains' => $chains,
        ]);
    }

    public function show(ValueChain $valueChain)
    {
        $valueChain->load('sector');

        return Inertia::render('ValueChains/Show', [
            'chain' => $valueChain,
        ]);
    }
}
