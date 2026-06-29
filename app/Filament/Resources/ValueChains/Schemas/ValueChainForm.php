<?php

namespace App\Filament\Resources\ValueChains\Schemas;

use Filament\Forms\Components\Repeater;
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
                Section::make('Chain Summary')->components([
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
                    Textarea::make('thesis')
                        ->required()
                        ->rows(3),
                    Textarea::make('binding_constraint')
                        ->rows(2)
                        ->nullable(),
                    TextInput::make('order')
                        ->numeric()
                        ->default(0),
                ]),
                Section::make('Layers')->components([
                    Repeater::make('layers')
                        ->relationship()
                        ->reorderable('order')
                        ->collapsible()
                        ->schema([
                            TextInput::make('title')
                                ->required()
                                ->label('Layer Title'),
                            Textarea::make('note')
                                ->rows(2)
                                ->nullable()
                                ->label('Layer Description'),
                            Textarea::make('gap')
                                ->rows(2)
                                ->nullable()
                                ->label('⚠ Gap Warning (if any)'),
                            TextInput::make('order')
                                ->numeric()
                                ->default(0)
                                ->hidden(),
                            Repeater::make('entries')
                                ->relationship()
                                ->reorderable('order')
                                ->collapsible()
                                ->label('Companies in this layer')
                                ->schema([
                                    TextInput::make('ticker')
                                        ->required()
                                        ->maxLength(20)
                                        ->uppercase()
                                        ->label('Ticker'),
                                    Textarea::make('role')
                                        ->required()
                                        ->rows(2)
                                        ->label('Role/Description'),
                                    Select::make('own')
                                        ->options(['HELD' => 'Held', 'WATCH' => 'Watch', 'NONE' => 'Lead (None)'])
                                        ->required()
                                        ->default('WATCH')
                                        ->label('Status'),
                                    Select::make('chokepoint')
                                        ->options([
                                            'monopoly' => 'Monopoly',
                                            'sole-source' => 'Sole-source',
                                            'oligopoly' => 'Oligopoly',
                                            'dominant' => 'Dominant',
                                            'contender' => 'Contender',
                                            'commodity' => 'Commodity',
                                        ])
                                        ->required()
                                        ->label('Chokepoint Rating'),
                                    TextInput::make('order')
                                        ->numeric()
                                        ->default(0)
                                        ->hidden(),
                                ]),
                        ]),
                ]),
            ]);
    }
}
