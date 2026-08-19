<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Unit;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class UnitAdminController extends Controller
{
    /**
     * Store a newly created unit.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:units,slug'],
            'subtitle' => ['nullable', 'string', 'max:255'],
            'badge' => ['nullable', 'string', 'max:100'],
            'description' => ['nullable', 'string'],
            'address' => ['nullable', 'string', 'max:500'],
            'maps_url' => ['nullable', 'string', 'max:1000'],
            'shifts' => ['nullable', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'email' => ['nullable', 'email', 'max:255'],
            'icon' => ['nullable', 'string', 'max:50'],
            'color_theme' => ['nullable', 'string', 'max:50'],
            'active' => ['nullable', 'boolean'],
            'order' => ['nullable', 'integer'],
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
            // Ensure unique slug
            $originalSlug = $validated['slug'];
            $count = 1;
            while (Unit::where('slug', $validated['slug'])->exists()) {
                $validated['slug'] = "{$originalSlug}-{$count}";
                $count++;
            }
        }

        $validated['active'] = $request->boolean('active', true);
        $validated['order'] = $validated['order'] ?? (Unit::max('order') + 1);

        Unit::create($validated);

        return back()->with('success', 'Unidade cadastrada com sucesso!');
    }

    /**
     * Update the specified unit.
     */
    public function update(Request $request, Unit $unit)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:units,slug,' . $unit->id],
            'subtitle' => ['nullable', 'string', 'max:255'],
            'badge' => ['nullable', 'string', 'max:100'],
            'description' => ['nullable', 'string'],
            'address' => ['nullable', 'string', 'max:500'],
            'maps_url' => ['nullable', 'string', 'max:1000'],
            'shifts' => ['nullable', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'email' => ['nullable', 'email', 'max:255'],
            'icon' => ['nullable', 'string', 'max:50'],
            'color_theme' => ['nullable', 'string', 'max:50'],
            'active' => ['nullable', 'boolean'],
            'order' => ['nullable', 'integer'],
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $validated['active'] = $request->boolean('active', true);

        $unit->update($validated);

        return back()->with('success', 'Unidade atualizada com sucesso!');
    }

    /**
     * Toggle unit active status.
     */
    public function toggleActive(Unit $unit)
    {
        $unit->update(['active' => !$unit->active]);

        return back()->with('success', 'Status da unidade atualizado com sucesso!');
    }

    /**
     * Remove the specified unit.
     */
    public function destroy(Unit $unit)
    {
        $unit->delete();

        return back()->with('success', 'Unidade removida com sucesso!');
    }
}
