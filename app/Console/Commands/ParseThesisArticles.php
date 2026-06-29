<?php

namespace App\Console\Commands;

use App\Models\Post;
use App\Models\ThesisCard;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;

#[Signature('thesis:parse-articles')]
#[Description('Parse thesis articles to extract macro framework and consensus thesis')]
class ParseThesisArticles extends Command
{
    public function handle()
    {
        $updated = 0;

        foreach (Post::whereNotNull('ticker')->get() as $post) {
            $card = ThesisCard::where('ticker', $post->ticker)->first();

            if ($card) {
                $post->stance = $card->stance;
            }

            $macro = $this->extractSection($post->body, 'Macro & Framework Connections');
            $consensus = $this->extractSection($post->body, 'Consensus Thesis');

            $post->macro_framework = $macro;
            $post->consensus_thesis = $consensus;
            $post->save();

            $updated++;
            $this->line("✓ Parsed: {$post->ticker}");
        }

        $this->info("Updated: $updated articles");
    }

    private function extractSection($content, $sectionName)
    {
        if ($sectionName === 'Consensus Thesis') {
            $pattern = '/##\s+\d+\.\s+' . preg_quote($sectionName) . '\s*\n(.*?)(?=##\s+|\z)/s';
        } else {
            $pattern = '/##\s+' . preg_quote($sectionName) . '\s*\n(.*?)(?=##\s+|\z)/s';
        }
        if (preg_match($pattern, $content, $matches)) {
            return trim($matches[1]);
        }
        return null;
    }
}
