<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $slug
 * @property string $name
 * @property int|null $overview_post_id
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property-read Post|null $overviewPost
 * @property-read Collection<int, Post> $posts
 */
#[Fillable(['slug', 'name', 'overview_post_id'])]
class Sector extends Model
{
    public function overviewPost()
    {
        return $this->belongsTo(Post::class, 'overview_post_id');
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
