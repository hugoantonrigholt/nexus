<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('value_chains', function (Blueprint $table) {
            $table->string('chain_group')->nullable();
            $table->string('region')->nullable();
            $table->integer('alpha')->default(0);
            $table->json('connects')->nullable();
            $table->date('last_updated')->nullable();
        });

        Schema::table('value_chain_layer_entries', function (Blueprint $table) {
            $table->string('region')->nullable();
            $table->string('tech')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('value_chains', function (Blueprint $table) {
            $table->dropColumn(['chain_group', 'region', 'alpha', 'connects', 'last_updated']);
        });

        Schema::table('value_chain_layer_entries', function (Blueprint $table) {
            $table->dropColumn(['region', 'tech']);
        });
    }
};
