<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['ticker', 'role', 'chokepoint', 'region', 'tech', 'order'])]
class ValueChainLayerEntry extends Model
{
    public function layer()
    {
        return $this->belongsTo(ValueChainLayer::class);
    }

    public function company()
    {
        return $this->hasOne(ThesisCard::class, 'ticker', 'ticker');
    }
}
