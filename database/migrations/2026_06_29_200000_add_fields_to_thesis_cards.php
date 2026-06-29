<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('thesis_cards', function (Blueprint $table) {
            $table->enum('trend_state', ['UPTREND', 'EXTENDED', 'BREAKING', 'BROKEN'])->nullable();
            $table->enum('stance', ['LONG', 'HOLD', 'BUILD', 'TRIM', 'EXIT', 'WATCH', 'AVOID', 'RESEARCH'])->nullable();
            $table->tinyInteger('tier')->nullable();
            $table->text('upside')->nullable();
            $table->date('last_updated')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('thesis_cards', function (Blueprint $table) {
            $table->dropColumn(['trend_state', 'stance', 'tier', 'upside', 'last_updated']);
        });
    }
};
