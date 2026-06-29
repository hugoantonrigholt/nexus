<?php

namespace App\Filament\Resources\ThesisCards\Schemas;

use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class ThesisCardForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->schema([
                Section::make()->schema([
                    TextInput::make('ticker')
                        ->required()
                        ->maxLength(10)
                        ->uppercase(),
                    TextInput::make('company_name')
                        ->required()
                        ->maxLength(255),
                    Select::make('sector_id')
                        ->relationship('sector', 'name')
                        ->nullable(),
                    TextInput::make('theme')
                        ->maxLength(255)
                        ->nullable(),
                    TextInput::make('order')
                        ->numeric()
                        ->default(0),
                ]),
                Section::make('Status')->schema([
                    Select::make('status')
                        ->options(['WATCH' => 'Watch', 'HELD' => 'Held', 'NONE' => 'None'])
                        ->required()
                        ->default('WATCH'),
                    Select::make('thesis_state')
                        ->options(['INTACT' => 'Intact', 'STRESSED' => 'Stressed', 'BROKEN' => 'Broken'])
                        ->required()
                        ->default('INTACT'),
                    TextInput::make('conviction')
                        ->numeric()
                        ->min(1)
                        ->max(5)
                        ->default(3),
                    TextInput::make('quality')
                        ->numeric()
                        ->min(1)
                        ->max(10)
                        ->default(5),
                ]),
                Section::make('Content')->schema([
                    Textarea::make('edge')
                        ->required()
                        ->rows(3),
                    Textarea::make('watch')
                        ->rows(3)
                        ->nullable(),
                    Textarea::make('entry')
                        ->rows(3)
                        ->nullable(),
                    Textarea::make('catalyst')
                        ->rows(3)
                        ->nullable(),
                ]),
            ]);
    }
}
