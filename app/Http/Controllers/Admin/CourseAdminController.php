<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CaisCourse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CourseAdminController extends Controller
{
    /**
     * Display courses list.
     */
    public function index(): Response
    {
        $courses = CaisCourse::orderBy('order')->get();

        return Inertia::render('admin/courses/index', [
            'courses' => $courses,
        ]);
    }

    /**
     * Store new course.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:255'],
            'hours' => ['required', 'string', 'max:50'],
            'description' => ['required', 'string'],
            'opportunities' => ['nullable', 'string'],
            'badge_color' => ['nullable', 'string'],
            'topics' => ['nullable', 'array'],
        ]);

        $slug = Str::slug($validated['title']);

        CaisCourse::create([
            ...$validated,
            'slug' => $slug,
            'icon' => 'Laptop',
            'order' => CaisCourse::max('order') + 1,
            'active' => true,
        ]);

        return back()->with('success', 'Curso cadastrado com sucesso!');
    }

    /**
     * Update course.
     */
    public function update(CaisCourse $course, Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:255'],
            'hours' => ['required', 'string', 'max:50'],
            'description' => ['required', 'string'],
            'opportunities' => ['nullable', 'string'],
            'badge_color' => ['nullable', 'string'],
            'topics' => ['nullable', 'array'],
            'active' => ['nullable', 'boolean'],
        ]);

        $course->update($validated);

        return back()->with('success', 'Curso atualizado com sucesso!');
    }

    /**
     * Toggle active state.
     */
    public function toggleActive(CaisCourse $course)
    {
        $course->update(['active' => !$course->active]);

        return back()->with('success', 'Status do curso alterado!');
    }

    /**
     * Delete course.
     */
    public function destroy(CaisCourse $course)
    {
        $course->delete();

        return back()->with('success', 'Curso excluído com sucesso!');
    }
}
