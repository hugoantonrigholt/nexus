<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('value_chains', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('sector_id')->nullable()->constrained('sectors')->nullOnDelete();
            $table->enum('stance', ['OVERWEIGHT', 'HOLD', 'NEUTRAL', 'UNDERWEIGHT'])->default('NEUTRAL');
            $table->text('thesis');
            $table->text('binding_constraint')->nullable();
            $table->longText('body');
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('value_chains');
    }
};
