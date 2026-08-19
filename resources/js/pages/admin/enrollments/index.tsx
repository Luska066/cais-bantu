import { Head, router } from '@inertiajs/react';
import {
    Building2,
    Calendar,
    CheckCircle2,
    Clock,
    FileText,
    Filter,
    GraduationCap,
    Mail,
    MapPin,
    MessageCircle,
    MoreVertical,
    Phone,
    Search,
    Shield,
    Sparkles,
    Trash2,
    User,
    Users,
    X,
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type EnrollmentItem = {
    id: number;
    name: string;
    email: string | null;
    phone: string;
    unit: string;
    course: string;
    audience: string;
    status: 'novo' | 'contatado' | 'matriculado' | 'cancelado' | 'arquivado';
    notes: string | null;
    created_at: string;
};

type Props = {
    enrollments: {
        data: EnrollmentItem[];
        current_page: number;
        last_page: number;
        total: number;
        links: Array<{ url: string | null; label: string; active: boolean }>;
    };
    filters: {
        search?: string;
        status?: string;
        unit?: string;
        course?: string;
    };
    stats: {
        total: number;
        novos: number;
        contatados: number;
        matriculados: number;
        salvador: number;
        veracruz: number;
    };
    courses: string[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Inscrições & Alunos',
        href: '/admin/enrollments',
    },
];

const audienceLabels: Record<string, string> = {
    mulher: 'Mulher / Mãe Chefe',
    jovem: 'Jovem (16 a 29 anos)',
    negra: 'População Negra / Quilombola',
    egresso: 'Egresso do Sistema Prisional',
    lgbt: 'LGBTQIAPN+',
    imigrante: 'Imigrante / Refugiado',
    outro: 'Outro perfil vulnerável',
};

export default function EnrollmentAdminIndex({ enrollments, filters, stats, courses }: Props) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [selectedStatus, setSelectedStatus] = useState(filters.status ?? 'all');
    const [selectedUnit, setSelectedUnit] = useState(filters.unit ?? 'all');
    const [selectedCourse, setSelectedCourse] = useState(filters.course ?? 'all');

    // Selected item for modal details & notes
    const [activeModalItem, setActiveModalItem] = useState<EnrollmentItem | null>(null);
    const [modalNotes, setModalNotes] = useState('');
    const [updating, setUpdating] = useState(false);

    const handleFilterSubmit = (e?: React.FormEvent) => {
        if (e) {
            e.preventDefault();
        }

        router.get(
            '/admin/enrollments',
            {
                search: search || undefined,
                status: selectedStatus !== 'all' ? selectedStatus : undefined,
                unit: selectedUnit !== 'all' ? selectedUnit : undefined,
                course: selectedCourse !== 'all' ? selectedCourse : undefined,
            },
            { preserveState: true },
        );
    };

    const handleStatusChange = (id: number, newStatus: string) => {
        router.patch(
            `/admin/enrollments/${id}`,
            { status: newStatus },
            {
                preserveScroll: true,
                onSuccess: () => {
                    if (activeModalItem && activeModalItem.id === id) {
                        setActiveModalItem({ ...activeModalItem, status: newStatus as any });
                    }
                },
            },
        );
    };

    const handleSaveNotes = () => {
        if (!activeModalItem) {
            return;
        }

        setUpdating(true);
        router.patch(
            `/admin/enrollments/${activeModalItem.id}`,
            {
                status: activeModalItem.status,
                notes: modalNotes,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setUpdating(false);
                    setActiveModalItem(null);
                },
                onError: () => setUpdating(false),
            },
        );
    };

    const handleDelete = (id: number) => {
        if (confirm('Tem certeza que deseja excluir permanentemente esta inscrição?')) {
            router.delete(`/admin/enrollments/${id}`, { preserveScroll: true });
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'novo':
                return <Badge className="bg-[#FFBE00] text-[#0D1640] font-bold">Novo (Pendente)</Badge>;
            case 'contatado':
                return <Badge className="bg-[#1A4FD6] text-white font-semibold">Contatado</Badge>;
            case 'matriculado':
                return <Badge className="bg-emerald-600 text-white font-semibold">Matriculado</Badge>;
            case 'cancelado':
                return <Badge variant="outline" className="text-rose-500 border-rose-500/30">Cancelado</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <>
            <Head title="Inscrições & Matrículas — CAIS BANTU" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2.5">
                            <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                                Inscrições & Matrículas
                            </h1>
                            <Badge className="bg-[#FFBE00] text-[#0D1640] font-bold">
                                {stats.novos} Novas
                            </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                            Acompanhe em tempo real os candidatos que se inscreveram pelo formulário da Landing Page.
                        </p>
                    </div>

                    <a href="/#inscricoes" target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" className="gap-2">
                            <GraduationCap className="size-4 text-primary" />
                            <span>Testar Formulário no Site</span>
                        </Button>
                    </a>
                </div>

                {/* KPI Metrics */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
                    <Card className="rounded-2xl border-border bg-card p-4">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                            Total Recebido
                        </span>
                        <div className="font-display text-2xl font-bold text-foreground mt-1">
                            {stats.total}
                        </div>
                    </Card>

                    <Card className="rounded-2xl border-border bg-card p-4 border-l-4 border-l-[#FFBE00]">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#FFBE00]">
                            Novos / Pendentes
                        </span>
                        <div className="font-display text-2xl font-bold text-foreground mt-1">
                            {stats.novos}
                        </div>
                    </Card>

                    <Card className="rounded-2xl border-border bg-card p-4 border-l-4 border-l-[#1A4FD6]">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#1A4FD6]">
                            Contatados
                        </span>
                        <div className="font-display text-2xl font-bold text-foreground mt-1">
                            {stats.contatados}
                        </div>
                    </Card>

                    <Card className="rounded-2xl border-border bg-card p-4 border-l-4 border-l-emerald-500">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">
                            Matriculados
                        </span>
                        <div className="font-display text-2xl font-bold text-foreground mt-1">
                            {stats.matriculados}
                        </div>
                    </Card>

                    <Card className="rounded-2xl border-border bg-card p-4 col-span-2 lg:col-span-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                            Por Unidade
                        </span>
                        <div className="text-xs text-muted-foreground mt-1 font-semibold flex items-center justify-between">
                            <span>Salvador: <strong>{stats.salvador}</strong></span>
                            <span>Vera Cruz: <strong>{stats.veracruz}</strong></span>
                        </div>
                    </Card>
                </div>

                {/* Filter Bar */}
                <Card className="rounded-2xl border-border bg-card p-4 shadow-xs">
                    <form onSubmit={handleFilterSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-center">
                        {/* Search */}
                        <div className="lg:col-span-2 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Buscar por nome, WhatsApp ou e-mail..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full rounded-xl border border-border bg-background pl-9 pr-4 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                            />
                        </div>

                        {/* Status Filter */}
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="rounded-xl border border-border bg-background px-3 py-2 text-sm focus:border-primary outline-none cursor-pointer"
                        >
                            <option value="all">Todos os Status</option>
                            <option value="novo">Novos / Pendentes</option>
                            <option value="contatado">Contatados</option>
                            <option value="matriculado">Matriculados</option>
                            <option value="cancelado">Cancelados</option>
                        </select>

                        {/* Unit Filter */}
                        <select
                            value={selectedUnit}
                            onChange={(e) => setSelectedUnit(e.target.value)}
                            className="rounded-xl border border-border bg-background px-3 py-2 text-sm focus:border-primary outline-none cursor-pointer"
                        >
                            <option value="all">Todas as Unidades</option>
                            <option value="salvador">Polo Salvador</option>
                            <option value="veracruz">Polo Vera Cruz</option>
                        </select>

                        {/* Submit Button */}
                        <Button type="submit" className="bg-[#1A4FD6] hover:bg-[#1540B5] text-white font-bold h-10 gap-2">
                            <Filter className="size-4" />
                            <span>Filtrar</span>
                        </Button>
                    </form>
                </Card>

                {/* Enrollments Table */}
                <Card className="rounded-3xl border-border bg-card overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-muted/60 border-b border-border/80 text-[11px] uppercase tracking-wider text-muted-foreground">
                                <tr>
                                    <th className="py-3.5 px-4 font-bold">Candidato / Aluno</th>
                                    <th className="py-3.5 px-4 font-bold">Contato</th>
                                    <th className="py-3.5 px-4 font-bold">Curso de Interesse</th>
                                    <th className="py-3.5 px-4 font-bold">Polo Territorial</th>
                                    <th className="py-3.5 px-4 font-bold">Status</th>
                                    <th className="py-3.5 px-4 font-bold text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/60">
                                {enrollments.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="py-12 text-center text-muted-foreground">
                                            Nenhuma inscrição encontrada com os filtros selecionados.
                                        </td>
                                    </tr>
                                ) : (
                                    enrollments.data.map((item) => (
                                        <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                                            {/* Name & Audience */}
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#1A4FD6] text-white font-display font-bold text-sm">
                                                        {item.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-foreground">{item.name}</div>
                                                        <span className="text-[11px] text-muted-foreground">
                                                            {audienceLabels[item.audience] ?? item.audience}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Contact */}
                                            <td className="py-4 px-4">
                                                <div className="space-y-0.5 text-xs">
                                                    <a
                                                        href={`https://wa.me/55${item.phone.replace(/\D/g, '')}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="font-bold text-[#1A4FD6] hover:underline flex items-center gap-1.5"
                                                    >
                                                        <MessageCircle className="size-3.5 text-emerald-600" />
                                                        <span>{item.phone}</span>
                                                    </a>
                                                    {item.email && (
                                                        <span className="text-muted-foreground block text-[11px]">
                                                            {item.email}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Course */}
                                            <td className="py-4 px-4">
                                                <Badge variant="outline" className="font-medium text-xs">
                                                    {item.course}
                                                </Badge>
                                            </td>

                                            {/* Unit */}
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-1.5 text-xs font-semibold">
                                                    <MapPin className="size-3.5 text-muted-foreground" />
                                                    <span>{item.unit === 'salvador' ? 'Salvador' : 'Vera Cruz'}</span>
                                                </div>
                                            </td>

                                            {/* Status Badge */}
                                            <td className="py-4 px-4">
                                                {getStatusBadge(item.status)}
                                            </td>

                                            {/* Actions */}
                                            <td className="py-4 px-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => {
                                                            setActiveModalItem(item);
                                                            setModalNotes(item.notes ?? '');
                                                        }}
                                                        className="h-8 text-xs font-bold text-primary hover:bg-primary/10"
                                                    >
                                                        Detalhes & Notas
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleDelete(item.id)}
                                                        className="h-8 w-8 text-rose-500 hover:bg-rose-500/10"
                                                        title="Excluir inscrição"
                                                    >
                                                        <Trash2 className="size-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>

                {/* Modal for Details & Attendance Notes */}
                {activeModalItem && (
                    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                        <div className="bg-card rounded-3xl border border-border w-full max-w-lg p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95">
                            <div className="flex items-center justify-between pb-4 border-b border-border">
                                <div className="flex items-center gap-3">
                                    <div className="flex size-10 items-center justify-center rounded-full bg-[#1A4FD6] text-white font-bold">
                                        {activeModalItem.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-display text-lg font-bold text-foreground">
                                            {activeModalItem.name}
                                        </h3>
                                        <span className="text-xs text-muted-foreground">
                                            Inscrito em {new Date(activeModalItem.created_at).toLocaleDateString('pt-BR')}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setActiveModalItem(null)}
                                    className="text-muted-foreground hover:text-foreground p-1"
                                >
                                    <X className="size-5" />
                                </button>
                            </div>

                            <div className="space-y-4 text-xs">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="rounded-xl bg-muted/60 p-3">
                                        <span className="text-muted-foreground font-bold block mb-1">Curso Escolhido</span>
                                        <strong className="text-sm text-foreground">{activeModalItem.course}</strong>
                                    </div>
                                    <div className="rounded-xl bg-muted/60 p-3">
                                        <span className="text-muted-foreground font-bold block mb-1">Polo Territorial</span>
                                        <strong className="text-sm text-foreground">
                                            {activeModalItem.unit === 'salvador' ? 'Salvador (Capital)' : 'Vera Cruz (Itaparica)'}
                                        </strong>
                                    </div>
                                </div>

                                <div className="rounded-xl bg-muted/60 p-3 space-y-2">
                                    <span className="text-muted-foreground font-bold block">Contatos Rápidos</span>
                                    <div className="flex items-center gap-4">
                                        <a
                                            href={`https://wa.me/55${activeModalItem.phone.replace(/\D/g, '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-bold text-emerald-600 hover:underline flex items-center gap-1"
                                        >
                                            <MessageCircle className="size-4" />
                                            <span>Abrir no WhatsApp ({activeModalItem.phone})</span>
                                        </a>
                                    </div>
                                    {activeModalItem.email && (
                                        <div className="text-muted-foreground">
                                            E-mail: <strong>{activeModalItem.email}</strong>
                                        </div>
                                    )}
                                </div>

                                {/* Status Alteration */}
                                <div className="space-y-2">
                                    <label className="font-bold text-foreground block">
                                        Alterar Status da Inscrição:
                                    </label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {(['novo', 'contatado', 'matriculado', 'cancelado'] as const).map((st) => (
                                            <button
                                                key={st}
                                                type="button"
                                                onClick={() => handleStatusChange(activeModalItem.id, st)}
                                                className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${activeModalItem.status === st
                                                        ? 'bg-primary text-primary-foreground border-primary'
                                                        : 'border-border bg-background hover:bg-muted'
                                                    }`}
                                            >
                                                {st.charAt(0).toUpperCase() + st.slice(1)}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Internal Notes */}
                                <div className="space-y-2 pt-2">
                                    <label className="font-bold text-foreground block">
                                        Anotações da Equipe Pedagógica / Atendimento:
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={modalNotes}
                                        onChange={(e) => setModalNotes(e.target.value)}
                                        placeholder="Ex: Aluno contatado em 17/08. Apresentou comprovante e prefere o turno noturno..."
                                        className="w-full rounded-xl border border-border bg-background p-3 text-xs focus:border-primary outline-none"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                                <Button variant="outline" onClick={() => setActiveModalItem(null)}>
                                    Fechar
                                </Button>
                                <Button
                                    onClick={handleSaveNotes}
                                    disabled={updating}
                                    className="bg-[#1A4FD6] text-white font-bold"
                                >
                                    {updating ? 'Salvando...' : 'Salvar Anotações'}
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
