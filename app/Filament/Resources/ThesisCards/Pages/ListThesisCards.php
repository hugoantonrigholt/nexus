<?php

namespace App\Filament\Resources\ThesisCards\Pages;

use App\Filament\Resources\ThesisCards\ThesisCardResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListThesisCards extends ListRecords
{
    protected static string $resource = ThesisCardResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
