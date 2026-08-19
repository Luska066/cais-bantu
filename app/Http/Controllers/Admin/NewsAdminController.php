<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CaisNews;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class NewsAdminController extends Controller
{
    /**
     * Display news and notices list.
     */
    public function index(): Response
    {
        $news = CaisNews::latest()->get();

        return Inertia::render('admin/news/index', [
            'news' => $news,
        ]);
    }

    /**
     * Store new notice/news.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:100'],
            'date_label' => ['required', 'string', 'max:100'],
            'description' => ['required', 'string'],
            'content' => ['nullable', 'string'],
            'published' => ['nullable', 'boolean'],
        ]);

        $slug = Str::slug($validated['title']) . '-' . time();

        CaisNews::create([
            ...$validated,
            'slug' => $slug,
            'published' => $request->boolean('published', true),
        ]);

        return back()->with('success', 'Publicação criada com sucesso!');
    }

    /**
     * Update notice/news.
     */
    public function update(CaisNews $news, Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:100'],
            'date_label' => ['required', 'string', 'max:100'],
            'description' => ['required', 'string'],
            'content' => ['nullable', 'string'],
            'published' => ['nullable', 'boolean'],
        ]);

        $news->update($validated);

        return back()->with('success', 'Publicação atualizada com sucesso!');
    }

    /**
     * Toggle publication state.
     */
    public function togglePublish(CaisNews $news)
    {
        $news->update(['published' => !$news->published]);

        return back()->with('success', 'Status de publicação alterado!');
    }

    /**
     * Delete notice/news.
     */
    public function destroy(CaisNews $news)
    {
        $news->delete();

        return back()->with('success', 'Publicação excluída com sucesso!');
    }
}
