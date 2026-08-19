import { Head, router } from '@inertiajs/react';
import {
    Calendar,
    CheckCircle2,
    Edit,
    Newspaper,
    Plus,
    Trash2,
    X,
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type NewsItem = {
    id: number;
    slug: string;
    title: string;
    category: string;
    date_label: string | null;
    description: string;
    content: string | null;
    published: boolean;
    created_at: string;
};

type Props = {
    news: NewsItem[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Notícias & Editais',
        href: '/admin/news',
    },
];

export default function NewsAdminIndex({ news }: Props) {
    const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [saving, setSaving] = useState(false);

    // Form state
    const [form, setForm] = useState({
        title: '',
        category: 'Inscrições',
        date_label: '17 de Agosto de 2026',
        description: '',
        content: '',
        published: true,
    });

    const openCreateModal = () => {
        setForm({
            title: '',
            category: 'Inscrições',
            date_label: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }),
            description: '',
            content: '',
            published: true,
        });
        setIsCreating(true);
    };

    const openEditModal = (item: NewsItem) => {
        setEditingNews(item);
        setForm({
            title: item.title,
            category: item.category,
            date_label: item.date_label ?? '',
            description: item.description,
            content: item.content ?? '',
            published: item.published,
        });
    };

    const handleToggle = (id: number) => {
        router.post(`/admin/news/${id}/toggle`, {}, { preserveScroll: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Deseja realmente excluir esta notícia?')) {
            router.delete(`/admin/news/${id}`, { preserveScroll: true });
        }
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        if (isCreating) {
            router.post('/admin/news', form, {
                onSuccess: () => {
                    setSaving(false);
                    setIsCreating(false);
                },
                onError: () => setSaving(false),
            });
        } else if (editingNews) {
            router.patch(`/admin/news/${editingNews.id}`, form, {
                onSuccess: () => {
                    setSaving(false);
                    setEditingNews(null);
                },
                onError: () => setSaving(false),
            });
        }
    };

    return (
        <>
            <Head title="Notícias & Editais — CAIS BANTU" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2.5">
                            <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                                Notícias & Editais
                            </h1>
                            <Badge className="bg-[#FFBE00] text-[#0D1640] font-bold">
                                {news.length} Publicações
                            </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                            Gerencie os editais, acontecimentos e comunicados oficiais exibidos na Landing Page.
                        </p>
                    </div>

                    <Button
                        onClick={openCreateModal}
                        className="bg-[#1A4FD6] hover:bg-[#1540B5] text-white font-bold gap-2 shadow-md"
                    >
                        <Plus className="size-4" />
                        <span>Nova Publicação</span>
                    </Button>
                </div>

                {/* News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {news.map((item) => (
                        <Card
                            key={item.id}
                            className={`rounded-3xl border transition-all flex flex-col justify-between p-6 ${item.published
                                    ? 'border-border bg-card shadow-sm hover:border-primary/50'
                                    : 'border-border/40 bg-muted/30 opacity-70'
                                }`}
                        >
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <Badge variant="outline" className="text-xs">
                                        {item.category}
                                    </Badge>
                                    <button
                                        type="button"
                                        onClick={() => handleToggle(item.id)}
                                        className={`px-2 py-0.5 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${item.published
                                                ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30'
                                                : 'bg-muted text-muted-foreground border-border'
                                            }`}
                                    >
                                        {item.published ? '● Publicado' : '○ Rascunho'}
                                    </button>
                                </div>

                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                    <Calendar className="size-3.5" />
                                    <span>{item.date_label}</span>
                                </div>

                                <h3 className="font-display text-lg font-bold text-foreground leading-snug">
                                    {item.title}
                                </h3>

                                <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>

                            <div className="flex items-center justify-between pt-6 border-t border-border/80 mt-6">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => openEditModal(item)}
                                    className="gap-1.5 text-xs font-bold"
                                >
                                    <Edit className="size-3.5" />
                                    <span>Editar</span>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDelete(item.id)}
                                    className="text-rose-500 hover:bg-rose-500/10 h-8 w-8"
                                    title="Excluir notícia"
                                >
                                    <Trash2 className="size-4" />
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Modal Create/Edit News */}
                {(isCreating || editingNews) && (
                    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                        <div className="bg-card rounded-3xl border border-border w-full max-w-lg p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between pb-4 border-b border-border">
                                <h3 className="font-display text-xl font-bold text-foreground">
                                    {isCreating ? 'Nova Publicação' : 'Editar Publicação'}
                                </h3>
                                <button
                                    onClick={() => {
                                        setIsCreating(false);
                                        setEditingNews(null);
                                    }}
                                    className="text-muted-foreground hover:text-foreground p-1"
                                >
                                    <X className="size-5" />
                                </button>
                            </div>

                            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                                <div className="space-y-1.5">
                                    <label className="font-bold text-foreground uppercase tracking-wider">
                                        Título da Publicação *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={form.title}
                                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                                        placeholder="Ex: Edital 2026 Aberto: 300 Vagas Gratuitas"
                                        className="w-full rounded-xl border border-border bg-background p-2.5 text-sm focus:border-primary outline-none"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1.5">
                                        <label className="font-bold text-foreground uppercase tracking-wider">
                                            Categoria *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={form.category}
                                            onChange={(e) => setForm({ ...form, category: e.target.value })}
                                            placeholder="Ex: Inscrições, Metodologia, Unidades"
                                            className="w-full rounded-xl border border-border bg-background p-2.5 text-sm focus:border-primary outline-none"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="font-bold text-foreground uppercase tracking-wider">
                                            Data Exibida *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={form.date_label}
                                            onChange={(e) => setForm({ ...form, date_label: e.target.value })}
                                            placeholder="Ex: 15 de Agosto de 2026"
                                            className="w-full rounded-xl border border-border bg-background p-2.5 text-sm focus:border-primary outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="font-bold text-foreground uppercase tracking-wider">
                                        Resumo / Descrição Curta *
                                    </label>
                                    <textarea
                                        rows={3}
                                        required
                                        value={form.description}
                                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                                        placeholder="Breve resumo da publicação que aparece no card..."
                                        className="w-full rounded-xl border border-border bg-background p-2.5 text-sm focus:border-primary outline-none"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="font-bold text-foreground uppercase tracking-wider">
                                        Conteúdo Completo (opcional)
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={form.content}
                                        onChange={(e) => setForm({ ...form, content: e.target.value })}
                                        placeholder="Texto completo do edital ou matéria..."
                                        className="w-full rounded-xl border border-border bg-background p-2.5 text-sm focus:border-primary outline-none"
                                    />
                                </div>

                                <div className="flex items-center gap-2 pt-2">
                                    <input
                                        type="checkbox"
                                        id="news_published"
                                        checked={form.published}
                                        onChange={(e) => setForm({ ...form, published: e.target.checked })}
                                        className="size-4 rounded text-primary focus:ring-primary"
                                    />
                                    <label htmlFor="news_published" className="text-sm font-bold text-foreground cursor-pointer">
                                        Publicar imediatamente na Landing Page
                                    </label>
                                </div>

                                <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            setIsCreating(false);
                                            setEditingNews(null);
                                        }}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={saving}
                                        className="bg-[#1A4FD6] text-white font-bold"
                                    >
                                        {saving ? 'Salvando...' : 'Salvar Publicação'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
