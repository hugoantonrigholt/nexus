<?php

namespace App\Filament\Resources\ValueChains;

use App\Filament\Resources\ValueChains\Pages\CreateValueChain;
use App\Filament\Resources\ValueChains\Pages\EditValueChain;
use App\Filament\Resources\ValueChains\Pages\ListValueChains;
use App\Filament\Resources\ValueChains\Schemas\ValueChainForm;
use App\Filament\Resources\ValueChains\Tables\ValueChainsTable;
use App\Models\ValueChain;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class ValueChainResource extends Resource
{
    protected static ?string $model = ValueChain::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return ValueChainForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ValueChainsTable::configure($table);
    }

    public static function getPages(): array
    {
        return [
            'index' => ListValueChains::route('/'),
            'create' => CreateValueChain::route('/create'),
            'edit' => EditValueChain::route('/{record}/edit'),
        ];
    }
}
