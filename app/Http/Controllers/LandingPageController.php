<?php

namespace App\Http\Controllers;

use App\Models\CaisCourse;
use App\Models\CaisCriterion;
use App\Models\CaisNews;
use App\Models\CaisTeamMember;
use App\Models\Enrollment;
use App\Models\LandingPageSetting;
use App\Models\Unit;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LandingPageController extends Controller
{
    /**
     * Display the public landing page.
     */
    public function index(): Response
    {
        $settings = LandingPageSetting::getAllMapped();
        $courses = CaisCourse::where('active', true)->orderBy('order')->get();
        $news = CaisNews::where('published', true)->latest()->get();
        $team = CaisTeamMember::where('active', true)->orderBy('order')->get();
        $units = Unit::where('active', true)->orderBy('order')->get();
        $criteria = CaisCriterion::where('active', true)->orderBy('order')->get();

        return Inertia::render('welcome', [
            'settings' => $settings,
            'courses' => $courses,
            'news' => $news,
            'team' => $team,
            'units' => $units,
            'criteria' => $criteria,
        ]);
    }

    /**
     * Handle new enrollment submission from the landing page.
     */
    public function storeEnrollment(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:50'],
            'unit' => ['required', 'string', 'max:100'],
            'course' => ['required', 'string', 'max:255'],
            'audience' => ['required', 'string', 'max:100'],
        ]);

        $enrollment = Enrollment::create([
            ...$validated,
            'status' => 'novo',
        ]);

        return back()->with('success', 'Sua pré-inscrição foi realizada com sucesso! Nossa equipe entrará em contato.');
    }
}
