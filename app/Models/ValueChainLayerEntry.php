<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['ticker', 'role', 'own', 'chokepoint', 'order'])]
class ValueChainLayerEntry extends Model
{
    public function layer()
    {
        return $this->belongsTo(ValueChainLayer::class);
    }
}
