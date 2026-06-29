<?php

namespace App\Filament\Resources\Users\Schemas;

use Filament\Forms\Components\Checkbox;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class UserForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')->required(),
                TextInput::make('email')->email()->required(),
                TextInput::make('password')
                    ->password()
                    ->dehydrateStateUsing(fn ($state) => $state ? bcrypt($state) : null)
                    ->required(fn ($record) => is_null($record)),
                Select::make('role')
                    ->options(['member' => 'Member', 'admin' => 'Admin'])
                    ->default('member')
                    ->required(),
                Textarea::make('bio')->nullable(),
                TextInput::make('avatar')
                    ->label('Avatar URL')
                    ->url()
                    ->nullable(),
                Checkbox::make('is_active')
                    ->default(true),
            ]);
    }
}
