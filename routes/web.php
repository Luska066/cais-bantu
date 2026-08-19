<?php

use App\Http\Controllers\Admin\CourseAdminController;
use App\Http\Controllers\Admin\CriterionAdminController;
use App\Http\Controllers\Admin\EnrollmentAdminController;
use App\Http\Controllers\Admin\LandingPageAdminController;
use App\Http\Controllers\Admin\NewsAdminController;
use App\Http\Controllers\Admin\TeamAdminController;
use App\Http\Controllers\Admin\UnitAdminController;
use App\Http\Controllers\LandingPageController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/
Route::get('/', [LandingPageController::class, 'index'])->name('home');
Route::post('/inscricoes', [LandingPageController::class, 'storeEnrollment'])->name('enrollments.store');

/*
|--------------------------------------------------------------------------
| Authenticated Administrative Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    // CAIS BANTU & Landing Page Management
    Route::prefix('admin')->name('admin.')->group(function () {
        // Landing Page Settings
        Route::get('landing', [LandingPageAdminController::class, 'index'])->name('landing.index');
        Route::post('landing', [LandingPageAdminController::class, 'update'])->name('landing.update');

        // Unidades (Polos)
        Route::post('units', [UnitAdminController::class, 'store'])->name('units.store');
        Route::patch('units/{unit}', [UnitAdminController::class, 'update'])->name('units.update');
        Route::post('units/{unit}/toggle', [UnitAdminController::class, 'toggleActive'])->name('units.toggle');
        Route::delete('units/{unit}', [UnitAdminController::class, 'destroy'])->name('units.destroy');

        // Critérios & Acesso (#publico)
        Route::post('criteria', [CriterionAdminController::class, 'store'])->name('criteria.store');
        Route::patch('criteria/{criterion}', [CriterionAdminController::class, 'update'])->name('criteria.update');
        Route::post('criteria/{criterion}/toggle', [CriterionAdminController::class, 'toggleActive'])->name('criteria.toggle');
        Route::delete('criteria/{criterion}', [CriterionAdminController::class, 'destroy'])->name('criteria.destroy');

        // Enrollments / Inscrições
        Route::get('enrollments', [EnrollmentAdminController::class, 'index'])->name('enrollments.index');
        Route::patch('enrollments/{enrollment}', [EnrollmentAdminController::class, 'update'])->name('enrollments.update');
        Route::delete('enrollments/{enrollment}', [EnrollmentAdminController::class, 'destroy'])->name('enrollments.destroy');

        // Cursos
        Route::get('courses', [CourseAdminController::class, 'index'])->name('courses.index');
        Route::post('courses', [CourseAdminController::class, 'store'])->name('courses.store');
        Route::patch('courses/{course}', [CourseAdminController::class, 'update'])->name('courses.update');
        Route::post('courses/{course}/toggle', [CourseAdminController::class, 'toggleActive'])->name('courses.toggle');
        Route::delete('courses/{course}', [CourseAdminController::class, 'destroy'])->name('courses.destroy');

        // Notícias & Editais
        Route::get('news', [NewsAdminController::class, 'index'])->name('news.index');
        Route::get('team', [App\Http\Controllers\Admin\TeamAdminController::class, 'index'])->name('team.index');
        Route::post('team', [App\Http\Controllers\Admin\TeamAdminController::class, 'store'])->name('team.store');
        Route::patch('team/{team}', [App\Http\Controllers\Admin\TeamAdminController::class, 'update'])->name('team.update');
        Route::post('news', [NewsAdminController::class, 'store'])->name('news.store');
        Route::patch('news/{news}', [NewsAdminController::class, 'update'])->name('news.update');
        Route::post('news/{news}/toggle', [NewsAdminController::class, 'togglePublish'])->name('news.toggle');
        Route::delete('news/{news}', [NewsAdminController::class, 'destroy'])->name('news.destroy');
    });
});

require __DIR__.'/settings.php';
