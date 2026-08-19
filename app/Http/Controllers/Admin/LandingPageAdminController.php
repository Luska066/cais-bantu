<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CaisCourse;
use App\Models\CaisCriterion;
use App\Models\Enrollment;
use App\Models\LandingPageSetting;
use App\Models\LandingPageSection;
use App\Models\Unit;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LandingPageAdminController extends Controller
{
    /**
     * Display landing page settings manager.
     */
    public function index(): Response
    {
        $settings = LandingPageSetting::getAllMapped();
        $totalEnrollments = Enrollment::count();
        $newEnrollments = Enrollment::where('status', 'novo')->count();
        $totalCourses = CaisCourse::count();
        $sections = LandingPageSection::orderBy('order')->get();
        $units = Unit::orderBy('order')->get();
        $criteria = CaisCriterion::orderBy('order')->get();

        return Inertia::render('admin/landing/index', [
            'settings' => $settings,
            'stats' => [
                'total_enrollments' => $totalEnrollments,
                'new_enrollments' => $newEnrollments,
                'total_courses' => $totalCourses,
            ],
            'sections' => $sections,
            'units' => $units,
            'criteria' => $criteria,
        ]);
    }

    /**
     * Update landing page settings.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'announcement_active' => ['nullable', 'string'],
            'announcement_text' => ['nullable', 'string', 'max:500'],
            'announcement_link' => ['nullable', 'string', 'max:255'],
            'announcement_badge' => ['nullable', 'string', 'max:50'],

            'hero_badge' => ['nullable', 'string', 'max:255'],
            'hero_title' => ['required', 'string', 'max:255'],
            'hero_subtitle' => ['required', 'string', 'max:500'],
            'hero_description' => ['required', 'string'],

            'meta_beneficiaries' => ['required', 'string', 'max:50'],
            'meta_classes' => ['required', 'string', 'max:50'],
            'meta_hours' => ['required', 'string', 'max:50'],
            'meta_units' => ['required', 'string', 'max:50'],

            'contact_phone' => ['nullable', 'string', 'max:50'],
            'contact_whatsapp' => ['nullable', 'string', 'max:50'],
            'contact_email' => ['nullable', 'string', 'max:255'],
            'contact_address_salvador' => ['nullable', 'string', 'max:500'],
            'contact_address_veracruz' => ['nullable', 'string', 'max:500'],
            'social_instagram' => ['nullable', 'string', 'max:100'],
            'social_facebook' => ['nullable', 'string', 'max:100'],

            // Critérios & Acesso (#publico)
            'criteria_badge' => ['nullable', 'string', 'max:100'],
            'criteria_title' => ['nullable', 'string', 'max:255'],
            'criteria_description' => ['nullable', 'string'],
            'criteria_audiences' => ['nullable', 'string'],

            // Sobre a Iniciativa
            'about_badge' => ['nullable', 'string', 'max:100'],
            'about_title' => ['nullable', 'string', 'max:255'],
            'about_subtitle' => ['nullable', 'string', 'max:500'],
            'about_description' => ['nullable', 'string'],
            'about_pillars' => ['nullable', 'string'],
        ]);

        foreach ($validated as $key => $value) {
            LandingPageSetting::set($key, $value ?? '');
        }

        return back()->with('success', 'Configurações da Landing Page salvas com sucesso!');
    }
}
