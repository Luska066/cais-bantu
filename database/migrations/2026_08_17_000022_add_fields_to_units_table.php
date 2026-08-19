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
        Schema::table('units', function (Blueprint $table) {
            if (!Schema::hasColumn('units', 'subtitle')) {
                $table->string('subtitle')->nullable()->after('name');
            }
            if (!Schema::hasColumn('units', 'badge')) {
                $table->string('badge')->nullable()->after('subtitle');
            }
            if (!Schema::hasColumn('units', 'description')) {
                $table->text('description')->nullable()->after('badge');
            }
            if (!Schema::hasColumn('units', 'address')) {
                $table->string('address')->nullable()->after('description');
            }
            if (!Schema::hasColumn('units', 'shifts')) {
                $table->string('shifts')->nullable()->after('address');
            }
            if (!Schema::hasColumn('units', 'phone')) {
                $table->string('phone')->nullable()->after('shifts');
            }
            if (!Schema::hasColumn('units', 'email')) {
                $table->string('email')->nullable()->after('phone');
            }
            if (!Schema::hasColumn('units', 'icon')) {
                $table->string('icon')->nullable()->default('Building2')->after('email');
            }
            if (!Schema::hasColumn('units', 'color_theme')) {
                $table->string('color_theme')->nullable()->default('blue')->after('icon');
            }
            if (!Schema::hasColumn('units', 'active')) {
                $table->boolean('active')->default(true)->after('color_theme');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('units', function (Blueprint $table) {
            $table->dropColumn([
                'subtitle',
                'badge',
                'description',
                'address',
                'shifts',
                'phone',
                'email',
                'icon',
                'color_theme',
                'active',
            ]);
        });
    }
};
