<?php

namespace App\Console\Commands;

use App\Models\ThesisCard;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;

#[Signature('thesis:populate-fields')]
#[Description('Extract and populate industry, market cap, and price from research files')]
class PopulateThesisCardFields extends Command
{
    public function handle()
    {
        $investingPath = '/Users/hugoantonrigholt/Claude/Projects/Investing/companies/research';
        $updated = 0;

        foreach (ThesisCard::all() as $card) {
            $file = "{$investingPath}/{$card->ticker}.md";

            if (!file_exists($file)) {
                $this->line("  ⊘ {$card->ticker} — no research file");
                continue;
            }

            $content = file_get_contents($file);
            $data = $this->extractFields($content);

            if ($data['industry'] || $data['market_cap'] || $data['price']) {
                $card->update($data);
                $this->line("  ✓ {$card->ticker}");
                $updated++;
            }
        }

        $this->info("Updated $updated thesis cards");
    }

    private function extractFields(string $content): array
    {
        $data = [
            'industry' => null,
            'market_cap' => null,
            'price' => null,
        ];

        // Extract Sector/Industry
        if (preg_match('/\*\*Sector:\*\*\s+([^\n]+)/i', $content, $matches)) {
            $data['industry'] = trim($matches[1]);
        }

        // Extract Market Cap
        if (preg_match('/\*\*Market Cap:\*\*\s+([^\n;]+)/i', $content, $matches)) {
            $data['market_cap'] = trim($matches[1]);
        }

        // Extract Price
        if (preg_match('/\*\*Price\s*\(approx\):\*\*\s+([^\n;]+)/i', $content, $matches)) {
            $data['price'] = trim($matches[1]);
        }

        return $data;
    }
}
