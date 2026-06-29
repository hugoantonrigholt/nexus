<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::dropIfExists('value_chains');

        Schema::create('value_chains', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('sector_id')->nullable()->constrained('sectors')->nullOnDelete();
            $table->enum('stance', ['OVERWEIGHT', 'HOLD', 'NEUTRAL', 'UNDERWEIGHT'])->default('NEUTRAL');
            $table->text('thesis');
            $table->text('binding_constraint')->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        Schema::create('value_chain_layers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('value_chain_id')->constrained('value_chains')->cascadeOnDelete();
            $table->string('title');
            $table->text('note')->nullable();
            $table->text('gap')->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        Schema::create('value_chain_layer_entries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('layer_id')->constrained('value_chain_layers')->cascadeOnDelete();
            $table->string('ticker', 20);
            $table->text('role');
            $table->enum('own', ['HELD', 'WATCH', 'NONE'])->default('WATCH');
            $table->enum('chokepoint', ['monopoly', 'sole-source', 'oligopoly', 'dominant', 'contender', 'commodity'])->default('contender');
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('value_chain_layer_entries');
        Schema::dropIfExists('value_chain_layers');
        Schema::dropIfExists('value_chains');
    }
};
