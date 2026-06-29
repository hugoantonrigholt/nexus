<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['name', 'sector_id', 'stance', 'thesis', 'binding_constraint', 'chain_group', 'region', 'alpha', 'connects', 'last_updated', 'order'])]
class ValueChain extends Model
{
    public function sector()
    {
        return $this->belongsTo(Sector::class);
    }

    public function layers()
    {
        return $this->hasMany(ValueChainLayer::class)->orderBy('order');
    }
}
