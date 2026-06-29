<?php

namespace App\Filament\Resources\Sectors\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class SectorForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')->required(),
                TextInput::make('slug')->required(),
                Select::make('overview_post_id')
                    ->label('Overview Article')
                    ->relationship('overviewPost', 'title')
                    ->nullable(),
            ]);
    }
}
