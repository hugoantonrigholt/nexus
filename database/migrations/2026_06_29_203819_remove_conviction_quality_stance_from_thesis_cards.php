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
        Schema::table('thesis_cards', function (Blueprint $table) {
            $table->dropColumn(['conviction', 'quality', 'stance']);
        });
    }

    public function down(): void
    {
        Schema::table('thesis_cards', function (Blueprint $table) {
            $table->integer('conviction')->default(3)->after('trend_state');
            $table->integer('quality')->default(5)->after('conviction');
            $table->string('stance')->nullable()->after('quality');
        });
    }
};
