<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CaisTeamMember;
use Illuminate\Http\Request;
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
            'photo' => 'nullable|string',
            'order' => 'required|integer',
            'active' => 'required|boolean',
        ]);

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
            'photo' => 'nullable|string',
            'order' => 'required|integer',
            'active' => 'required|boolean',
        ]);

        $team->update($validated);

        return redirect()->route('admin.team.index')
            ->with('message', 'Membro da equipe atualizado com sucesso.');
    }

    /**
     * Delete a team member.
     */
    public function destroy(CaisTeamMember $team)
    {
        $team->delete();

        return redirect()->route('admin.team.index')
            ->with('message', 'Membro da equipe excluído com sucesso.');
    }
}
?>
