<?php

namespace App\Http\Controllers;

use App\Models\ThesisCard;
use Inertia\Inertia;

class ThesisCardController extends Controller
{
    public function index()
    {
        $cards = ThesisCard::with('sector')->orderBy('order')->orderBy('ticker')->get();

        return Inertia::render('ThesisCards/Index', [
            'cards' => $cards,
        ]);
    }
}
