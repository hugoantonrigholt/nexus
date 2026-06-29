<?php

namespace App\Filament\Resources\ValueChains\Schemas;

use Awcodes\Filament\Tiptap\TiptapEditor;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class ValueChainForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->schema([
                Section::make()->schema([
                    TextInput::make('name')
                        ->required()
                        ->maxLength(255),
                    Select::make('sector_id')
                        ->relationship('sector', 'name')
                        ->nullable(),
                    Select::make('stance')
                        ->options(['OVERWEIGHT' => 'Overweight', 'HOLD' => 'Hold', 'NEUTRAL' => 'Neutral', 'UNDERWEIGHT' => 'Underweight'])
                        ->required()
                        ->default('NEUTRAL'),
                    TextInput::make('order')
                        ->numeric()
                        ->default(0),
                ]),
                Section::make('Content')->schema([
                    Textarea::make('thesis')
                        ->required()
                        ->rows(3),
                    Textarea::make('binding_constraint')
                        ->rows(3)
                        ->nullable(),
                    TiptapEditor::make('body')
                        ->required(),
                ]),
            ]);
    }
}
