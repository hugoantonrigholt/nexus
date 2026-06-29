<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('thesis_cards', function (Blueprint $table) {
            $table->id();
            $table->string('ticker', 10);
            $table->string('company_name');
            $table->foreignId('sector_id')->nullable()->constrained('sectors')->nullOnDelete();
            $table->string('theme')->nullable();
            $table->enum('status', ['WATCH', 'HELD', 'NONE'])->default('WATCH');
            $table->enum('thesis_state', ['INTACT', 'STRESSED', 'BROKEN'])->default('INTACT');
            $table->tinyInteger('conviction')->default(3);
            $table->tinyInteger('quality')->default(5);
            $table->text('edge');
            $table->text('watch')->nullable();
            $table->text('entry')->nullable();
            $table->text('catalyst')->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('thesis_cards');
    }
};
