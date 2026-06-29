<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('themes', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        Schema::table('thesis_cards', function (Blueprint $table) {
            $table->unsignedBigInteger('theme_id')->nullable()->after('sector_id');
            $table->foreign('theme_id')->references('id')->on('themes')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('thesis_cards', function (Blueprint $table) {
            $table->dropForeignIdFor('Theme');
            $table->dropColumn('theme_id');
        });
        Schema::dropIfExists('themes');
    }
};
