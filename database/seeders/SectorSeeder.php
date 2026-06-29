<?php

namespace Database\Seeders;

use App\Models\Sector;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class SectorSeeder extends Seeder
{
    public function run(): void
    {
        $sectors = [
            'Technology',
            'Healthcare',
            'Financial Services',
            'Consumer Discretionary',
            'Consumer Staples',
            'Industrials',
            'Energy',
            'Materials',
            'Real Estate',
            'Utilities',
            'Communication Services',
        ];

        foreach ($sectors as $name) {
            Sector::create([
                'name' => $name,
                'slug' => Str::slug($name),
            ]);
        }
    }
}
