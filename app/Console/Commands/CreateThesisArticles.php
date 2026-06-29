<?php

namespace App\Console\Commands;

use App\Models\Post;
use App\Models\ThesisCard;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

#[Signature('thesis:create-articles')]
#[Description('Create articles from thesis card research content')]
class CreateThesisArticles extends Command
{
    public function handle()
    {
        $created = 0;
        $updated = 0;

        foreach (ThesisCard::whereNotNull('content')->get() as $card) {
            $slug = Str::slug($card->ticker . '-' . Str::slug($card->company_name));

            $post = Post::updateOrCreate(
                ['slug' => $slug],
                [
                    'user_id' => 1,
                    'ticker' => $card->ticker,
                    'title' => "{$card->ticker} - {$card->company_name} Research",
                    'body' => $card->content,
                    'type' => 'imported',
                    'published_at' => now(),
                ]
            );

            if ($post->wasRecentlyCreated) {
                $created++;
                $this->line("✓ Created: {$card->ticker}");
            } else {
                $updated++;
                $this->line("✓ Updated: {$card->ticker}");
            }
        }

        $this->info("Created: $created, Updated: $updated articles");
    }
}
