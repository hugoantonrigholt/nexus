<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['title', 'note', 'gap', 'order'])]
class ValueChainLayer extends Model
{
    public function valueChain()
    {
        return $this->belongsTo(ValueChain::class);
    }

    public function entries()
    {
        return $this->hasMany(ValueChainLayerEntry::class, 'layer_id');
    }
}
