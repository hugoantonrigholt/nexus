<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['name', 'slug', 'description', 'order'])]
class Theme extends Model
{
    public function cards()
    {
        return $this->hasMany(ThesisCard::class);
    }
}
