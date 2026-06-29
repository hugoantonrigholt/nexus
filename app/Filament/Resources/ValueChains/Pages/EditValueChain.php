<?php

namespace App\Filament\Resources\ValueChains\Pages;

use App\Filament\Resources\ValueChains\ValueChainResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditValueChain extends EditRecord
{
    protected static string $resource = ValueChainResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
