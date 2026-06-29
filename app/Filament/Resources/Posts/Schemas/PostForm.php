<?php

namespace App\Filament\Resources\Posts\Schemas;

use App\Models\User;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class PostForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')->required(),
                TextInput::make('slug')->disabled(),
                Select::make('user_id')
                    ->label('Author')
                    ->options(User::pluck('name', 'id'))
                    ->required(),
                RichEditor::make('body')->required(),
                TextInput::make('ticker')->nullable(),
                Select::make('sector_id')
                    ->relationship('sector', 'name')
                    ->nullable(),
                Select::make('visibility')
                    ->options(['public' => 'Public', 'members_only' => 'Members Only'])
                    ->required(),
                DateTimePicker::make('published_at')->nullable(),
            ]);
    }
}
