<?php

namespace App\Filament\Resources\ValueChains\Pages;

use App\Filament\Resources\ValueChains\ValueChainResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListValueChains extends ListRecords
{
    protected static string $resource = ValueChainResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
