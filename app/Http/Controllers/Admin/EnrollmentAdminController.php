<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CaisCourse;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EnrollmentAdminController extends Controller
{
    /**
     * Display list of student enrollments / leads.
     */
    public function index(Request $request): Response
    {
        $query = Enrollment::query();

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status') && $request->input('status') !== 'all') {
            $query->where('status', $request->input('status'));
        }

        if ($request->filled('unit') && $request->input('unit') !== 'all') {
            $query->where('unit', $request->input('unit'));
        }

        if ($request->filled('course') && $request->input('course') !== 'all') {
            $query->where('course', $request->input('course'));
        }

        $enrollments = $query->latest()->paginate(15)->withQueryString();

        $stats = [
            'total' => Enrollment::count(),
            'novos' => Enrollment::where('status', 'novo')->count(),
            'contatados' => Enrollment::where('status', 'contatado')->count(),
            'matriculados' => Enrollment::where('status', 'matriculado')->count(),
            'salvador' => Enrollment::where('unit', 'salvador')->count(),
            'veracruz' => Enrollment::where('unit', 'veracruz')->count(),
        ];

        $courses = CaisCourse::pluck('title')->toArray();

        return Inertia::render('admin/enrollments/index', [
            'enrollments' => $enrollments,
            'filters' => $request->only(['search', 'status', 'unit', 'course']),
            'stats' => $stats,
            'courses' => $courses,
        ]);
    }

    /**
     * Update enrollment status or notes.
     */
    public function update(Enrollment $enrollment, Request $request)
    {
        $validated = $request->validate([
            'status' => ['required', 'string', 'in:novo,contatado,matriculado,cancelado,arquivado'],
            'notes' => ['nullable', 'string'],
        ]);

        $enrollment->update($validated);

        return back()->with('success', 'Inscrição atualizada com sucesso!');
    }

    /**
     * Delete an enrollment record.
     */
    public function destroy(Enrollment $enrollment)
    {
        $enrollment->delete();

        return back()->with('success', 'Inscrição removida com sucesso!');
    }
}
