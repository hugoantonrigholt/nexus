<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['ticker', 'company_name', 'sector_id', 'theme', 'status', 'thesis_state', 'conviction', 'quality', 'edge', 'watch', 'entry', 'catalyst', 'order'])]
class ThesisCard extends Model
{
    public function sector()
    {
        return $this->belongsTo(Sector::class);
    }
}
