<?php

namespace App\Filament\Resources\ThesisCards;

use App\Filament\Resources\ThesisCards\Pages\CreateThesisCard;
use App\Filament\Resources\ThesisCards\Pages\EditThesisCard;
use App\Filament\Resources\ThesisCards\Pages\ListThesisCards;
use App\Filament\Resources\ThesisCards\Schemas\ThesisCardForm;
use App\Filament\Resources\ThesisCards\Tables\ThesisCardsTable;
use App\Models\ThesisCard;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class ThesisCardResource extends Resource
{
    protected static ?string $model = ThesisCard::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return ThesisCardForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ThesisCardsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListThesisCards::route('/'),
            'create' => CreateThesisCard::route('/create'),
            'edit' => EditThesisCard::route('/{record}/edit'),
        ];
    }
}
