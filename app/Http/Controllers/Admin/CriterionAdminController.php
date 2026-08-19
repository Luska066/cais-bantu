<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CaisCriterion;
use Illuminate\Http\Request;

class CriterionAdminController extends Controller
{
    /**
     * Store a newly created criterion.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'icon' => ['nullable', 'string', 'max:50'],
            'badge' => ['nullable', 'string', 'max:100'],
            'active' => ['nullable', 'boolean'],
            'order' => ['nullable', 'integer'],
        ]);

        $validated['active'] = $request->boolean('active', true);
        $validated['order'] = $validated['order'] ?? (CaisCriterion::max('order') + 1);

        CaisCriterion::create($validated);

        return back()->with('success', 'Critério de acesso cadastrado com sucesso!');
    }

    /**
     * Update the specified criterion.
     */
    public function update(Request $request, CaisCriterion $criterion)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'icon' => ['nullable', 'string', 'max:50'],
            'badge' => ['nullable', 'string', 'max:100'],
            'active' => ['nullable', 'boolean'],
            'order' => ['nullable', 'integer'],
        ]);

        $validated['active'] = $request->boolean('active', true);

        $criterion->update($validated);

        return back()->with('success', 'Critério de acesso atualizado com sucesso!');
    }

    /**
     * Toggle active state.
     */
    public function toggleActive(CaisCriterion $criterion)
    {
        $criterion->update(['active' => !$criterion->active]);

        return back()->with('success', 'Status do critério atualizado com sucesso!');
    }

    /**
     * Remove the specified criterion.
     */
    public function destroy(CaisCriterion $criterion)
    {
        $criterion->delete();

        return back()->with('success', 'Critério de acesso excluído com sucesso!');
    }
}
