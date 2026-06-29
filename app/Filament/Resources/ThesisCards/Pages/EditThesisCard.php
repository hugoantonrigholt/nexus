<?php

namespace App\Filament\Resources\ThesisCards\Pages;

use App\Filament\Resources\ThesisCards\ThesisCardResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditThesisCard extends EditRecord
{
    protected static string $resource = ThesisCardResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
