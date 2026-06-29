<?php

namespace App\Filament\Resources\ThesisCards\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class ThesisCardsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('ticker')->badge()->sortable(),
                TextColumn::make('company_name')->searchable(),
                TextColumn::make('sector.name')->label('Sector'),
                TextColumn::make('status')->badge(),
                TextColumn::make('thesis_state')->label('Thesis State')->badge(),
                TextColumn::make('conviction')->sortable(),
                TextColumn::make('quality')->sortable(),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
