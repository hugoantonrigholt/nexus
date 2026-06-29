<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['ticker', 'company_name', 'sector_id', 'theme_id', 'theme', 'status', 'thesis_state', 'trend_state', 'tier', 'edge', 'watch', 'entry', 'catalyst', 'upside', 'last_updated', 'order', 'content', 'industry', 'market_cap', 'price'])]
class ThesisCard extends Model
{
    public function sector()
    {
        return $this->belongsTo(Sector::class);
    }

    public function themeRelation()
    {
        return $this->belongsTo(Theme::class, 'theme_id');
    }
}
