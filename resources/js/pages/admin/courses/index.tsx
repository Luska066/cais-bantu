import { Head, router } from '@inertiajs/react';
import {
    Award,
    BookOpen,
    CheckCircle2,
    Edit,
    Laptop,
    Leaf,
    Palette,
    Plus,
    Power,
    Sun,
    Trash2,
    Video,
    X,
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import type { BreadcrumbItem } from '@/types';

type CourseItem = {
    id: number;
    slug: string;
    title: string;
    category: string;
    icon: string;
    hours: string;
    badge_color: string;
    description: string;
    topics: string[] | null;
    opportunities: string | null;
    active: boolean;
    order: number;
};

type Props = {
    courses: CourseItem[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Gerenciar Cursos',
        href: '/admin/courses',
    },
];

export default function CourseAdminIndex({ courses }: Props) {
    const [editingCourse, setEditingCourse] = useState<CourseItem | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [saving, setSaving] = useState(false);

    // Form state
    const [form, setForm] = useState({
        title: '',
        category: '',
        hours: '160 Horas',
        badge_color: 'bg-[#1A4FD6] text-white',
        description: '',
        opportunities: '',
        topicsText: '',
    });

    const openCreateModal = () => {
        setForm({
            title: '',
            category: 'Tecnologia & Inclusão',
            hours: '160 Horas',
            badge_color: 'bg-[#1A4FD6] text-white',
            description: '',
            opportunities: '',
            topicsText: 'Informática Básica\nInternet & Cidadania\nFerramentas de Escritório',
        });
        setIsCreating(true);
    };

    const openEditModal = (course: CourseItem) => {
        setEditingCourse(course);
        setForm({
            title: course.title,
            category: course.category,
            hours: course.hours,
            badge_color: course.badge_color,
            description: course.description,
            opportunities: course.opportunities ?? '',
            topicsText: (course.topics ?? []).join('\n'),
        });
    };

    const handleToggle = (id: number) => {
        router.post(`/admin/courses/${id}/toggle`, {}, { preserveScroll: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Deseja realmente excluir este curso?')) {
            router.delete(`/admin/courses/${id}`, { preserveScroll: true });
        }
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const topics = form.topicsText
            .split('\n')
            .map((t) => t.trim())
            .filter((t) => t.length > 0);

        const payload = {
            title: form.title,
            category: form.category,
            hours: form.hours,
            badge_color: form.badge_color,
            description: form.description,
            opportunities: form.opportunities,
            topics: topics,
        };

        if (isCreating) {
            router.post('/admin/courses', payload, {
                onSuccess: () => {
                    setSaving(false);
                    setIsCreating(false);
                },
                onError: () => setSaving(false),
            });
        } else if (editingCourse) {
            router.patch(`/admin/courses/${editingCourse.id}`, payload, {
                onSuccess: () => {
                    setSaving(false);
                    setEditingCourse(null);
                },
                onError: () => setSaving(false),
            });
        }
    };

    return (
        <>
            <Head title="Gerenciar Cursos — CAIS BANTU" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2.5">
                            <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                                Cursos de Qualificação Profissional
                            </h1>
                            <Badge className="bg-[#FFBE00] text-[#0D1640] font-bold">
                                {courses.length} Cursos
                            </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                            Cadastre, ative/desative e edite os cursos exibidos na Landing Page oficial.
                        </p>
                    </div>

                    <Button
                        onClick={openCreateModal}
                        className="bg-[#1A4FD6] hover:bg-[#1540B5] text-white font-bold gap-2 shadow-md"
                    >
                        <Plus className="size-4" />
                        <span>Novo Curso</span>
                    </Button>
                </div>

                {/* Courses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <Card
                            key={course.id}
                            className={`rounded-3xl border transition-all flex flex-col justify-between p-6 ${
                                course.active
                                    ? 'border-border bg-card shadow-sm hover:border-primary/50'
                                    : 'border-border/40 bg-muted/30 opacity-70'
                            }`}
                        >
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Badge className="text-xs font-semibold">
                                        {course.hours}
                                    </Badge>
                                    <div className="flex items-center gap-1.5">
                                        <button
                                            type="button"
                                            onClick={() => handleToggle(course.id)}
                                            className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
                                                course.active
                                                    ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30'
                                                    : 'bg-muted text-muted-foreground border-border'
                                            }`}
                                        >
                                            {course.active ? '● Ativo' : '○ Inativo'}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                                        {course.category}
                                    </span>
                                    <h3 className="font-display text-xl font-bold text-foreground mt-0.5">
                                        {course.title}
                                    </h3>
                                </div>

                                <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                                    {course.description}
                                </p>

                                {course.topics && course.topics.length > 0 && (
                                    <div className="pt-2">
                                        <span className="text-[11px] font-bold text-foreground block mb-1.5">
                                            Módulos / Tópicos:
                                        </span>
                                        <ul className="space-y-1 text-xs text-muted-foreground">
                                            {course.topics.slice(0, 3).map((t, idx) => (
                                                <li key={idx} className="flex items-center gap-1.5">
                                                    <CheckCircle2 className="size-3 text-emerald-500 shrink-0" />
                                                    <span className="truncate">{t}</span>
                                                </li>
                                            ))}
                                            {course.topics.length > 3 && (
                                                <span className="text-[11px] text-primary font-semibold">
                                                    +{course.topics.length - 3} outros tópicos
                                                </span>
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center justify-between pt-6 border-t border-border/80 mt-6">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => openEditModal(course)}
                                    className="gap-1.5 text-xs font-bold"
                                >
                                    <Edit className="size-3.5" />
                                    <span>Editar</span>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDelete(course.id)}
                                    className="text-rose-500 hover:bg-rose-500/10 h-8 w-8"
                                    title="Excluir curso"
                                >
                                    <Trash2 className="size-4" />
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Modal Create/Edit Course */}
                {(isCreating || editingCourse) && (
                    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                        <div className="bg-card rounded-3xl border border-border w-full max-w-lg p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between pb-4 border-b border-border">
                                <h3 className="font-display text-xl font-bold text-foreground">
                                    {isCreating ? 'Cadastrar Novo Curso' : 'Editar Curso'}
                                </h3>
                                <button
                                    onClick={() => {
                                        setIsCreating(false);
                                        setEditingCourse(null);
                                    }}
                                    className="text-muted-foreground hover:text-foreground p-1"
                                >
                                    <X className="size-5" />
                                </button>
                            </div>

                            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                                <div className="space-y-1.5">
                                    <label className="font-bold text-foreground uppercase tracking-wider">
                                        Nome do Curso *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={form.title}
                                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                                        placeholder="Ex: Letramento Digital"
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
                                            placeholder="Ex: Tecnologia & Inclusão"
                                            className="w-full rounded-xl border border-border bg-background p-2.5 text-sm focus:border-primary outline-none"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="font-bold text-foreground uppercase tracking-wider">
                                            Carga Horária *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={form.hours}
                                            onChange={(e) => setForm({ ...form, hours: e.target.value })}
                                            placeholder="Ex: 160 Horas"
                                            className="w-full rounded-xl border border-border bg-background p-2.5 text-sm focus:border-primary outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="font-bold text-foreground uppercase tracking-wider">
                                        Descrição Geral *
                                    </label>
                                    <textarea
                                        rows={3}
                                        required
                                        value={form.description}
                                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                                        placeholder="Descrição dos objetivos pedagógicos e habilidades desenvolvidas..."
                                        className="w-full rounded-xl border border-border bg-background p-2.5 text-sm focus:border-primary outline-none"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="font-bold text-foreground uppercase tracking-wider">
                                        Tópicos / Módulos (um por linha)
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={form.topicsText}
                                        onChange={(e) => setForm({ ...form, topicsText: e.target.value })}
                                        placeholder="Tópico 1&#10;Tópico 2&#10;Tópico 3"
                                        className="w-full rounded-xl border border-border bg-background p-2.5 text-sm focus:border-primary outline-none font-mono"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="font-bold text-foreground uppercase tracking-wider">
                                        Oportunidades de Mercado / Saídas
                                    </label>
                                    <input
                                        type="text"
                                        value={form.opportunities}
                                        onChange={(e) => setForm({ ...form, opportunities: e.target.value })}
                                        placeholder="Ex: Assistente administrativo, suporte operacional..."
                                        className="w-full rounded-xl border border-border bg-background p-2.5 text-sm focus:border-primary outline-none"
                                    />
                                </div>

                                <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            setIsCreating(false);
                                            setEditingCourse(null);
                                        }}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={saving}
                                        className="bg-[#1A4FD6] text-white font-bold"
                                    >
                                        {saving ? 'Salvando...' : 'Salvar Curso'}
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
