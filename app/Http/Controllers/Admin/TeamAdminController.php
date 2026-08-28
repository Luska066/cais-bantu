<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CaisTeamMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class TeamAdminController extends Controller
{
    /**
     * Display the team members management page.
     */
    public function index(): Response
    {
        $team = CaisTeamMember::orderBy('order')->get();

        return Inertia::render('admin/team/index', [
            'team' => $team,
        ]);
    }

    /**
     * Store a new team member.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'description' => 'nullable|string',
            'photo' => 'nullable',
            'order' => 'required|integer',
            'active' => 'required|boolean',
        ]);

        if ($request->hasFile('photo')) {
            $request->validate([
                'photo' => 'image|mimes:jpeg,png,jpg,webp,gif,svg|max:5120',
            ]);
            $path = $request->file('photo')->store('team', 'public');
            $validated['photo'] = $path;
        } else {
            $validated['photo'] = is_string($request->photo) ? $request->photo : null;
        }

        CaisTeamMember::create($validated);

        return redirect()->route('admin.team.index')
            ->with('message', 'Membro da equipe criado com sucesso.');
    }

    /**
     * Update an existing team member.
     */
    public function update(Request $request, CaisTeamMember $team)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'description' => 'nullable|string',
            'photo' => 'nullable',
            'order' => 'required|integer',
            'active' => 'required|boolean',
        ]);

        if ($request->hasFile('photo')) {
            $request->validate([
                'photo' => 'image|mimes:jpeg,png,jpg,webp,gif,svg|max:5120',
            ]);
            // Remove previous stored photo if present
            if ($team->photo && !str_starts_with($team->photo, 'http') && Storage::disk('public')->exists($team->photo)) {
                Storage::disk('public')->delete($team->photo);
            }
            $path = $request->file('photo')->store('team', 'public');
            $validated['photo'] = $path;
        } elseif ($request->boolean('remove_photo')) {
            if ($team->photo && !str_starts_with($team->photo, 'http') && Storage::disk('public')->exists($team->photo)) {
                Storage::disk('public')->delete($team->photo);
            }
            $validated['photo'] = null;
        } else {
            // Keep existing photo if not providing a new file or removal
            unset($validated['photo']);
        }

        $team->update($validated);

        return redirect()->route('admin.team.index')
            ->with('message', 'Membro da equipe atualizado com sucesso.');
    }

    /**
     * Delete a team member.
     */
    public function destroy(CaisTeamMember $team)
    {
        if ($team->photo && !str_starts_with($team->photo, 'http') && Storage::disk('public')->exists($team->photo)) {
            Storage::disk('public')->delete($team->photo);
        }

        $team->delete();

        return redirect()->route('admin.team.index')
            ->with('message', 'Membro da equipe excluído com sucesso.');
    }
}
