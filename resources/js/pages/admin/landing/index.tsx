import { Head, router, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    Award,
    BookOpen,
    Building2,
    Calendar,
    Camera,
    CheckCircle2,
    Clock,
    Compass,
    Edit3,
    ExternalLink,
    Globe,
    GraduationCap,
    HeartHandshake,
    HelpCircle,
    Info,
    Laptop,
    Leaf,
    Lightbulb,
    Mail,
    MapPin,
    MessageCircle,
    MessageSquare,
    Palette,
    Phone,
    Plus,
    Save,
    Send,
    Share2,
    Shield,
    Sparkles,
    Sun,
    Trash2,
    Trees,
    Users,
    Video,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

export type Unit = {
    id: number;
    slug: string;
    name: string;
    subtitle?: string | null;
    badge?: string | null;
    description?: string | null;
    address?: string | null;
    maps_url?: string | null;
    shifts?: string | null;
    phone?: string | null;
    email?: string | null;
    icon?: string | null;
    color_theme?: string | null;
    active: boolean;
    order: number;
};

export type Criterion = {
    id: number;
    title: string;
    description?: string | null;
    icon?: string | null;
    badge?: string | null;
    active: boolean;
    order: number;
};

type Props = {
    settings: Record<string, string>;
    stats: {
        total_enrollments: number;
        new_enrollments: number;
        total_courses: number;
    };
    units?: Unit[];
    criteria?: Criterion[];
};

const iconOptions: Record<string, any> = {
    Users,
    GraduationCap,
    Sparkles,
    Shield,
    HeartHandshake,
    Compass,
    Award,
    Lightbulb,
    CheckCircle2,
    Laptop,
    Building2,
    Leaf,
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Controle da Landing Page',
        href: '/admin/landing',
    },
];

export default function LandingAdminIndex({ settings, stats, units = [], criteria = [] }: Props) {
    // Check URL params for initial active tab
    const [activeTab, setActiveTab] = useState<'hero' | 'announcement' | 'metas' | 'contact' | 'units' | 'criteria' | 'about'>('hero');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            const tabParam = urlParams.get('tab');
            if (tabParam && ['hero', 'announcement', 'metas', 'contact', 'units', 'criteria', 'about'].includes(tabParam)) {
                setActiveTab(tabParam as any);
            }
        }
    }, []);

    const [saving, setSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Main landing settings form
    const [form, setForm] = useState({
        announcement_active: settings.announcement_active ?? '1',
        announcement_text: settings.announcement_text ?? 'Inscrições Abertas 2026 • 300 Vagas Gratuitas em Salvador e Vera Cruz / Itaparica',
        announcement_link: settings.announcement_link ?? '#inscricoes',
        announcement_badge: settings.announcement_badge ?? 'NOVO',
        hero_badge: settings.hero_badge ?? 'Centro de Acesso a Direitos e Inclusão Social Afrocentrado',
        hero_title: settings.hero_title ?? 'CAIS BANTU',
        hero_subtitle: settings.hero_subtitle ?? 'Acolher, qualificar e gerar oportunidades para fortalecer a autonomia, a cidadania e a inclusão social.',
        hero_description: settings.hero_description ?? 'Uma iniciativa transformadora do Instituto Cultural Bantu voltada às populações em vulnerabilidade social em Salvador, Vera Cruz e Ilha de Itaparica. Formação profissional gratuita, acolhimento psicossocial e tecnologia social afrocentrada.',
        meta_beneficiaries: settings.meta_beneficiaries ?? '300',
        meta_classes: settings.meta_classes ?? '10',
        meta_hours: settings.meta_hours ?? '160h',
        meta_units: settings.meta_units ?? '2 Polos',
        contact_phone: settings.contact_phone ?? '(71) 98845-2006',
        contact_whatsapp: settings.contact_whatsapp ?? '(71) 98845-2006',
        contact_email: settings.contact_email ?? 'contato@institutobantu.org.br',
        contact_address_salvador: settings.contact_address_salvador ?? 'Salvador — BA (Sede do Instituto Cultural Bantu)',
        contact_address_veracruz: settings.contact_address_veracruz ?? 'Vera Cruz — Ilha de Itaparica — BA',
        social_instagram: settings.social_instagram ?? '@institutobantu',
        social_facebook: settings.social_facebook ?? 'institutobantuoficial',

        // Critérios & Acesso (#publico)
        criteria_badge: settings.criteria_badge ?? 'Critérios & Acesso',
        criteria_title: settings.criteria_title ?? 'Quem pode participar?',
        criteria_description: settings.criteria_description ?? 'O CAIS BANTU prioriza pessoas em situação de vulnerabilidade social que buscam formação gratuita e suporte acolhedor:',

        // Sobre a Iniciativa
        about_badge: settings.about_badge ?? 'Tecnologia Social & Ancestralidade',
        about_title: settings.about_title ?? 'Metodologia Afrocentrada: Corpo, Mente e Comunidade',
        about_subtitle: settings.about_subtitle ?? 'A proposta pedagógica do CAIS BANTU não se limita ao ensino técnico. Ela compreende a formação humana integral a partir de matrizes afro-brasileiras e da educação popular.',
        about_description: settings.about_description ?? 'Uma iniciativa comprometida com a transformação das periferias através da arte, cultura, tecnologia e geração de renda com dignidade.',
    });

    // Units CRUD modal state
    const [unitModalOpen, setUnitModalOpen] = useState(false);
    const [editingUnit, setEditingUnit] = useState<Unit | null>(null);
    const [unitSubmitting, setUnitSubmitting] = useState(false);
    const [unitForm, setUnitForm] = useState({
        name: '',
        slug: '',
        subtitle: '',
        badge: '5 Turmas',
        description: '',
        address: '',
        maps_url: '',
        shifts: 'Turnos: Matutino, Vespertino e Noturno',
        phone: '(71) 98845-2006',
        email: 'contato@institutobantu.org.br',
        icon: 'Building2',
        color_theme: 'blue',
        active: true,
        order: 1,
    });

    // Criteria CRUD modal state
    const [criterionModalOpen, setCriterionModalOpen] = useState(false);
    const [editingCriterion, setEditingCriterion] = useState<Criterion | null>(null);
    const [criterionSubmitting, setCriterionSubmitting] = useState(false);
    const [criterionForm, setCriterionForm] = useState({
        title: '',
        description: '',
        icon: 'Users',
        badge: 'Prioritário',
        active: true,
        order: 1,
    });

    const openCreateUnit = () => {
        setEditingUnit(null);
        setUnitForm({
            name: '',
            slug: '',
            subtitle: '',
            badge: '5 Turmas',
            description: '',
            address: '',
            maps_url: '',
            shifts: 'Turnos: Matutino e Vespertino',
            phone: form.contact_phone || '(71) 98845-2006',
            email: form.contact_email || 'contato@institutobantu.org.br',
            icon: 'Building2',
            color_theme: 'blue',
            active: true,
            order: units.length + 1,
        });
        setUnitModalOpen(true);
    };

    const openEditUnit = (unit: Unit) => {
        setEditingUnit(unit);
        setUnitForm({
            name: unit.name,
            slug: unit.slug,
            subtitle: unit.subtitle ?? '',
            badge: unit.badge ?? '5 Turmas',
            description: unit.description ?? '',
            address: unit.address ?? '',
            maps_url: unit.maps_url ?? '',
            shifts: unit.shifts ?? 'Turnos: Matutino e Vespertino',
            phone: unit.phone ?? '',
            email: unit.email ?? '',
            icon: unit.icon ?? 'Building2',
            color_theme: unit.color_theme ?? 'blue',
            active: unit.active,
            order: unit.order,
        });
        setUnitModalOpen(true);
    };

    const closeUnitModal = () => {
        setUnitModalOpen(false);
        setEditingUnit(null);
    };

    const handleUnitSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setUnitSubmitting(true);

        if (editingUnit) {
            router.patch(`/admin/units/${editingUnit.id}`, unitForm, {
                preserveScroll: true,
                onSuccess: () => {
                    setUnitSubmitting(false);
                    closeUnitModal();
                    setSuccessMessage('Unidade atualizada com sucesso!');
                    setTimeout(() => setSuccessMessage(null), 4000);
                },
                onError: () => setUnitSubmitting(false),
            });
        } else {
            router.post('/admin/units', unitForm, {
                preserveScroll: true,
                onSuccess: () => {
                    setUnitSubmitting(false);
                    closeUnitModal();
                    setSuccessMessage('Unidade cadastrada com sucesso!');
                    setTimeout(() => setSuccessMessage(null), 4000);
                },
                onError: () => setUnitSubmitting(false),
            });
        }
    };

    const handleUnitToggle = (unit: Unit) => {
        router.post(`/admin/units/${unit.id}/toggle`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                setSuccessMessage(`Status da unidade ${unit.name} atualizado!`);
                setTimeout(() => setSuccessMessage(null), 3000);
            },
        });
    };

    const handleUnitDelete = (unit: Unit) => {
        if (confirm(`Tem certeza que deseja excluir a "${unit.name}"? Esta ação removerá a unidade da landing page.`)) {
            router.delete(`/admin/units/${unit.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    setSuccessMessage('Unidade excluída com sucesso!');
                    setTimeout(() => setSuccessMessage(null), 4000);
                },
            });
        }
    };

    // Criteria CRUD handlers
    const openCreateCriterion = () => {
        setEditingCriterion(null);
        setCriterionForm({
            title: '',
            description: '',
            icon: 'Users',
            badge: 'Prioritário',
            active: true,
            order: criteria.length + 1,
        });
        setCriterionModalOpen(true);
    };

    const openEditCriterion = (item: Criterion) => {
        setEditingCriterion(item);
        setCriterionForm({
            title: item.title,
            description: item.description ?? '',
            icon: item.icon ?? 'Users',
            badge: item.badge ?? 'Prioritário',
            active: item.active,
            order: item.order,
        });
        setCriterionModalOpen(true);
    };

    const closeCriterionModal = () => {
        setCriterionModalOpen(false);
        setEditingCriterion(null);
    };

    const handleCriterionSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setCriterionSubmitting(true);

        if (editingCriterion) {
            router.patch(`/admin/criteria/${editingCriterion.id}`, criterionForm, {
                preserveScroll: true,
                onSuccess: () => {
                    setCriterionSubmitting(false);
                    closeCriterionModal();
                    setSuccessMessage('Critério atualizado com sucesso!');
                    setTimeout(() => setSuccessMessage(null), 4000);
                },
                onError: () => setCriterionSubmitting(false),
            });
        } else {
            router.post('/admin/criteria', criterionForm, {
                preserveScroll: true,
                onSuccess: () => {
                    setCriterionSubmitting(false);
                    closeCriterionModal();
                    setSuccessMessage('Critério cadastrado com sucesso!');
                    setTimeout(() => setSuccessMessage(null), 4000);
                },
                onError: () => setCriterionSubmitting(false),
            });
        }
    };

    const handleCriterionToggle = (item: Criterion) => {
        router.post(`/admin/criteria/${item.id}/toggle`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                setSuccessMessage(`Status do critério "${item.title}" atualizado!`);
                setTimeout(() => setSuccessMessage(null), 3000);
            },
        });
    };

    const handleCriterionDelete = (item: Criterion) => {
        if (confirm(`Tem certeza que deseja excluir o critério "${item.title}"?`)) {
            router.delete(`/admin/criteria/${item.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    setSuccessMessage('Critério excluído com sucesso!');
                    setTimeout(() => setSuccessMessage(null), 4000);
                },
            });
        }
    };

    // Save general settings
    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setSuccessMessage(null);

        router.post('/admin/landing', form, {
            preserveScroll: true,
            onSuccess: () => {
                setSaving(false);
                setSuccessMessage('Configurações da Landing Page salvas com sucesso!');
                setTimeout(() => setSuccessMessage(null), 4000);
            },
            onError: () => {
                setSaving(false);
            },
        });
    };

    return (
        <>
            <Head title="Controle da Landing Page — CAIS BANTU" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2.5">
                            <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                                Controle da Landing Page
                            </h1>
                            <Badge className="bg-[#FFBE00] text-[#0D1640] font-bold">
                                CAIS BANTU
                            </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                            Edite em tempo real os textos, anúncios, metas numéricas, polos e critérios de acesso (#publico).
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <a href="/" target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" className="gap-2">
                                <ExternalLink className="size-4 text-primary" />
                                <span>Ver Landing Page</span>
                            </Button>
                        </a>
                        <Button
                            type="button"
                            onClick={handleSave}
                            disabled={saving}
                            className="bg-[#1A4FD6] hover:bg-[#1540B5] text-white font-bold gap-2 shadow-md"
                        >
                            <Save className="size-4" />
                            <span>{saving ? 'Salvando...' : 'Salvar Alterações'}</span>
                        </Button>
                    </div>
                </div>

                {/* Quick stats banner */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <Card className="rounded-2xl border-border bg-card p-5 flex items-center justify-between">
                        <div>
                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                Total de Inscrições
                            </span>
                            <h3 className="font-display text-2xl font-bold text-foreground mt-0.5">
                                {stats.total_enrollments}
                            </h3>
                        </div>
                        <div className="flex size-10 items-center justify-center rounded-xl bg-secondary text-[#1A4FD6]">
                            <GraduationCap className="size-5" />
                        </div>
                    </Card>

                    <Card className="rounded-2xl border-border bg-card p-5 flex items-center justify-between">
                        <div>
                            <span className="text-xs font-semibold text-[#FFBE00] dark:text-[#FFBE00] uppercase tracking-wider font-bold">
                                Novas Inscrições (Pendentes)
                            </span>
                            <h3 className="font-display text-2xl font-bold text-foreground mt-0.5">
                                {stats.new_enrollments}
                            </h3>
                        </div>
                        <div className="flex size-10 items-center justify-center rounded-xl bg-[#FFBE00]/20 text-[#0D1640] dark:text-[#FFBE00]">
                            <Sparkles className="size-5" />
                        </div>
                    </Card>

                    <Card className="rounded-2xl border-border bg-card p-5 flex items-center justify-between">
                        <div>
                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                Unidades / Polos
                            </span>
                            <h3 className="font-display text-2xl font-bold text-foreground mt-0.5">
                                {units.length}
                            </h3>
                        </div>
                        <div className="flex size-10 items-center justify-center rounded-xl bg-secondary text-[#1A4FD6]">
                            <Building2 className="size-5" />
                        </div>
                    </Card>

                    <Card className="rounded-2xl border-border bg-card p-5 flex items-center justify-between">
                        <div>
                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                Critérios de Acesso
                            </span>
                            <h3 className="font-display text-2xl font-bold text-foreground mt-0.5">
                                {criteria.length}
                            </h3>
                        </div>
                        <div className="flex size-10 items-center justify-center rounded-xl bg-secondary text-emerald-600">
                            <Users className="size-5" />
                        </div>
                    </Card>
                </div>

                {/* Success feedback alert */}
                {successMessage && (
                    <div className="rounded-xl bg-emerald-500/15 border border-emerald-500/30 p-4 text-emerald-700 dark:text-emerald-300 text-sm font-semibold flex items-center gap-2.5">
                        <CheckCircle2 className="size-5 text-emerald-500 shrink-0" />
                        <span>{successMessage}</span>
                    </div>
                )}

                {/* Tabs Navigation */}
                <div className="flex border-b border-border/80 gap-2 overflow-x-auto pb-px">
                    <button
                        type="button"
                        onClick={() => setActiveTab('hero')}
                        className={`px-4 py-2.5 text-sm font-bold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${activeTab === 'hero'
                                ? 'border-[#1A4FD6] text-[#1A4FD6] dark:border-[#FFBE00] dark:text-[#FFBE00]'
                                : 'border-transparent text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        1. Seção Principal (Hero & Títulos)
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('announcement')}
                        className={`px-4 py-2.5 text-sm font-bold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${activeTab === 'announcement'
                                ? 'border-[#1A4FD6] text-[#1A4FD6] dark:border-[#FFBE00] dark:text-[#FFBE00]'
                                : 'border-transparent text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        2. Barra de Aviso Superior (Top Bar)
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('metas')}
                        className={`px-4 py-2.5 text-sm font-bold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${activeTab === 'metas'
                                ? 'border-[#1A4FD6] text-[#1A4FD6] dark:border-[#FFBE00] dark:text-[#FFBE00]'
                                : 'border-transparent text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        3. Metas de Impacto (Estatísticas)
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('contact')}
                        className={`px-4 py-2.5 text-sm font-bold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${activeTab === 'contact'
                                ? 'border-[#1A4FD6] text-[#1A4FD6] dark:border-[#FFBE00] dark:text-[#FFBE00]'
                                : 'border-transparent text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        4. Contato & Redes Sociais
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('units')}
                        className={`px-4 py-2.5 text-sm font-bold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${activeTab === 'units'
                                ? 'border-[#1A4FD6] text-[#1A4FD6] dark:border-[#FFBE00] dark:text-[#FFBE00]'
                                : 'border-transparent text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        5. Unidades (Polos Territoriais)
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('criteria')}
                        className={`px-4 py-2.5 text-sm font-bold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${activeTab === 'criteria'
                                ? 'border-[#1A4FD6] text-[#1A4FD6] dark:border-[#FFBE00] dark:text-[#FFBE00]'
                                : 'border-transparent text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        6. Critérios & Acesso (#publico)
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('about')}
                        className={`px-4 py-2.5 text-sm font-bold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${activeTab === 'about'
                                ? 'border-[#1A4FD6] text-[#1A4FD6] dark:border-[#FFBE00] dark:text-[#FFBE00]'
                                : 'border-transparent text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        7. Sobre a Iniciativa
                    </button>
                </div>

                {/* Form Body for settings */}
                {activeTab === 'units' ? (
                    /* TAB 5: UNITS CRUD */
                    <div className="space-y-6">
                        <Card className="rounded-3xl border-border bg-card p-6 md:p-8 space-y-6 shadow-sm">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-6">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <Building2 className="size-6 text-[#1A4FD6]" />
                                        <CardTitle className="text-xl font-bold">Unidades e Polos de Atendimento</CardTitle>
                                    </div>
                                    <CardDescription className="mt-1">
                                        Cadastre, edite, ative ou remova os polos territoriais exibidos na landing page e nas opções de inscrição.
                                    </CardDescription>
                                </div>
                                <Button
                                    type="button"
                                    onClick={openCreateUnit}
                                    className="bg-[#1A4FD6] hover:bg-[#1540B5] text-white font-bold gap-2 shadow-md shrink-0"
                                >
                                    <Plus className="size-4" />
                                    <span>Cadastrar Nova Unidade</span>
                                </Button>
                            </div>

                            {/* Units Grid */}
                            {units.length === 0 ? (
                                <div className="text-center py-12 border-2 border-dashed border-border rounded-2xl p-8 space-y-4">
                                    <Building2 className="size-12 text-muted-foreground mx-auto opacity-50" />
                                    <div>
                                        <h3 className="font-bold text-lg text-foreground">Nenhuma unidade cadastrada</h3>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Clique no botão acima para adicionar a primeira unidade de atendimento do CAIS BANTU.
                                        </p>
                                    </div>
                                    <Button onClick={openCreateUnit} className="bg-[#1A4FD6] text-white font-semibold">
                                        Cadastrar Primeira Unidade
                                    </Button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {units.map((unit) => {
                                        const isAmber = unit.color_theme === 'amber' || unit.slug.includes('veracruz');
                                        const isEmerald = unit.color_theme === 'emerald';

                                        return (
                                            <Card
                                                key={unit.id}
                                                className={`rounded-3xl border-2 transition-all flex flex-col justify-between overflow-hidden ${
                                                    unit.active
                                                        ? isAmber
                                                            ? 'border-[#FFBE00]/60 shadow-md bg-card'
                                                            : isEmerald
                                                            ? 'border-emerald-500/60 shadow-md bg-card'
                                                            : 'border-[#1A4FD6]/60 shadow-md bg-card'
                                                        : 'border-border/60 opacity-60 bg-muted/20'
                                                }`}
                                            >
                                                <CardHeader className="p-6 space-y-3 pb-4">
                                                    <div className="flex items-center justify-between gap-3">
                                                        <div className="flex items-center gap-3">
                                                            <div
                                                                className={`flex size-12 items-center justify-center rounded-2xl ${
                                                                    isAmber
                                                                        ? 'bg-[#FFBE00]/20 text-[#0D1640] dark:text-[#FFBE00]'
                                                                        : isEmerald
                                                                        ? 'bg-emerald-500/20 text-emerald-600'
                                                                        : 'bg-[#1A4FD6]/10 text-[#1A4FD6]'
                                                                }`}
                                                            >
                                                                {unit.icon === 'Trees' ? (
                                                                    <Trees className="size-6" />
                                                                ) : (
                                                                    <Building2 className="size-6" />
                                                                )}
                                                            </div>
                                                            <div>
                                                                <CardTitle className="text-xl font-bold text-foreground">
                                                                    {unit.name}
                                                                </CardTitle>
                                                                <span className="text-xs text-muted-foreground block">
                                                                    {unit.subtitle || `Polo ${unit.slug}`}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-2">
                                                            <Badge
                                                                className={`text-xs font-bold ${
                                                                    isAmber
                                                                        ? 'bg-[#FFBE00] text-[#0D1640]'
                                                                        : isEmerald
                                                                        ? 'bg-emerald-600 text-white'
                                                                        : 'bg-[#1A4FD6] text-white'
                                                                }`}
                                                            >
                                                                {unit.badge || 'Ativo'}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                </CardHeader>

                                                <CardContent className="px-6 py-2 space-y-3 text-sm flex-1">
                                                    {unit.description && (
                                                        <p className="text-muted-foreground text-xs leading-relaxed">
                                                            {unit.description}
                                                        </p>
                                                    )}

                                                    <div className="space-y-1.5 pt-2 border-t border-border/60 text-xs">
                                                        {unit.address && (
                                                            <div className="flex items-center gap-2 text-foreground">
                                                                <MapPin className="size-3.5 text-primary shrink-0" />
                                                                <span className="truncate">{unit.address}</span>
                                                            </div>
                                                        )}
                                                        {unit.maps_url && (
                                                            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                                                                <ExternalLink className="size-3.5 shrink-0" />
                                                                <a
                                                                    href={unit.maps_url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="truncate underline hover:text-emerald-500"
                                                                >
                                                                    Link do Google Maps configurado
                                                                </a>
                                                            </div>
                                                        )}
                                                        {unit.shifts && (
                                                            <div className="flex items-center gap-2 text-foreground">
                                                                <Clock className="size-3.5 text-primary shrink-0" />
                                                                <span>{unit.shifts}</span>
                                                            </div>
                                                        )}
                                                        {unit.phone && (
                                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                                <Phone className="size-3.5 text-muted-foreground shrink-0" />
                                                                <span>{unit.phone}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </CardContent>

                                                <div className="p-4 px-6 bg-muted/40 border-t border-border/80 flex items-center justify-between gap-3 mt-4">
                                                    <div className="flex items-center gap-2">
                                                        <Switch
                                                            checked={unit.active}
                                                            onCheckedChange={() => handleUnitToggle(unit)}
                                                        />
                                                        <span className="text-xs font-semibold text-muted-foreground">
                                                            {unit.active ? 'Ativa no Site' : 'Inativa'}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => openEditUnit(unit)}
                                                            className="gap-1.5 font-semibold text-xs h-8"
                                                        >
                                                            <Edit3 className="size-3.5 text-primary" />
                                                            <span>Editar</span>
                                                        </Button>
                                                        <Button
                                                            type="button"
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() => handleUnitDelete(unit)}
                                                            className="gap-1.5 font-semibold text-xs h-8"
                                                        >
                                                            <Trash2 className="size-3.5" />
                                                            <span>Excluir</span>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Card>
                                        );
                                    })}
                                </div>
                            )}
                        </Card>
                    </div>
                ) : (
                    <form onSubmit={handleSave} className="space-y-6">
                        {/* TAB 1: HERO */}
                        {activeTab === 'hero' && (
                            <Card className="rounded-3xl border-border bg-card p-6 md:p-8 space-y-6 shadow-sm">
                                <CardHeader className="p-0">
                                    <CardTitle className="text-xl">Conteúdo da Seção Hero (Topo)</CardTitle>
                                    <CardDescription>
                                        Texto de apresentação que causa a primeira impressão aos visitantes e potenciais alunos.
                                    </CardDescription>
                                </CardHeader>

                                <div className="space-y-5">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                            Badge Superior do Hero
                                        </label>
                                        <input
                                            type="text"
                                            value={form.hero_badge}
                                            onChange={(e) => setForm({ ...form, hero_badge: e.target.value })}
                                            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                                            placeholder="Ex: Centro de Acesso a Direitos e Inclusão Social Afrocentrado"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                            Título Principal (Nome do Projeto)
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={form.hero_title}
                                            onChange={(e) => setForm({ ...form, hero_title: e.target.value })}
                                            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-bold focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                                            placeholder="CAIS BANTU"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                            Subtítulo / Slogan de Impacto
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={form.hero_subtitle}
                                            onChange={(e) => setForm({ ...form, hero_subtitle: e.target.value })}
                                            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                                            placeholder="Acolher, qualificar e gerar oportunidades..."
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                            Descrição Completa do Hero
                                        </label>
                                        <textarea
                                            required
                                            rows={4}
                                            value={form.hero_description}
                                            onChange={(e) => setForm({ ...form, hero_description: e.target.value })}
                                            className="w-full rounded-xl border border-border bg-background p-4 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                                            placeholder="Uma iniciativa transformadora do Instituto Cultural Bantu..."
                                        />
                                    </div>
                                </div>
                            </Card>
                        )}

                        {/* TAB 2: ANNOUNCEMENT */}
                        {activeTab === 'announcement' && (
                            <Card className="rounded-3xl border-border bg-card p-6 md:p-8 space-y-6 shadow-sm">
                                <CardHeader className="p-0">
                                    <CardTitle className="text-xl">Barra Superior de Aviso (Top Announcement)</CardTitle>
                                    <CardDescription>
                                        Faixa de destaque fixada no topo de todo o site para chamadas de inscrição e alertas importantes.
                                    </CardDescription>
                                </CardHeader>

                                <div className="space-y-5">
                                    <div className="flex items-center justify-between rounded-2xl border border-border p-4 bg-muted/30">
                                        <div>
                                            <h4 className="text-sm font-bold text-foreground">Exibir Barra de Aviso</h4>
                                            <p className="text-xs text-muted-foreground">
                                                Ative ou oculte a faixa de anúncio do topo da landing page.
                                            </p>
                                        </div>
                                        <Switch
                                            checked={form.announcement_active === '1'}
                                            onCheckedChange={(checked) =>
                                                setForm({ ...form, announcement_active: checked ? '1' : '0' })
                                            }
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                            Texto do Anúncio
                                        </label>
                                        <input
                                            type="text"
                                            value={form.announcement_text}
                                            onChange={(e) => setForm({ ...form, announcement_text: e.target.value })}
                                            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                                            placeholder="Inscrições Abertas 2026 • 300 Vagas Gratuitas..."
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                                Link do Botão de Ação
                                            </label>
                                            <input
                                                type="text"
                                                value={form.announcement_link}
                                                onChange={(e) => setForm({ ...form, announcement_link: e.target.value })}
                                                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                                                placeholder="#inscricoes ou https://..."
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                                Badge / Etiqueta
                                            </label>
                                            <input
                                                type="text"
                                                value={form.announcement_badge}
                                                onChange={(e) => setForm({ ...form, announcement_badge: e.target.value })}
                                                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                                                placeholder="NOVO, EDITAL, ABERTO..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        )}

                        {/* TAB 3: METAS */}
                        {activeTab === 'metas' && (
                            <Card className="rounded-3xl border-border bg-card p-6 md:p-8 space-y-6 shadow-sm">
                                <CardHeader className="p-0">
                                    <CardTitle className="text-xl">Metas de Impacto (Estatísticas do Projeto)</CardTitle>
                                    <CardDescription>
                                        Números exibidos no banner escuro de metas quantitativas da iniciativa.
                                    </CardDescription>
                                </CardHeader>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                            Beneficiários Diretos
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={form.meta_beneficiaries}
                                            onChange={(e) => setForm({ ...form, meta_beneficiaries: e.target.value })}
                                            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-bold focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                                            placeholder="Ex: 300"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                            Turmas Formadas
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={form.meta_classes}
                                            onChange={(e) => setForm({ ...form, meta_classes: e.target.value })}
                                            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-bold focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                                            placeholder="Ex: 10"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                            Carga Horária por Curso
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={form.meta_hours}
                                            onChange={(e) => setForm({ ...form, meta_hours: e.target.value })}
                                            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-bold focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                                            placeholder="Ex: 160h"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                            Unidades / Polos Territoriais
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={form.meta_units}
                                            onChange={(e) => setForm({ ...form, meta_units: e.target.value })}
                                            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-bold focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                                            placeholder="Ex: 2 Polos"
                                        />
                                    </div>
                                </div>
                            </Card>
                        )}

                        {/* TAB 4: CONTACT */}
                        {activeTab === 'contact' && (
                            <Card className="rounded-3xl border-border bg-card p-6 md:p-8 space-y-6 shadow-sm">
                                <CardHeader className="p-0">
                                    <CardTitle className="text-xl">Endereços, Telefones & Redes Sociais</CardTitle>
                                    <CardDescription>
                                        Informações institucionais exibidas nas seções de unidades e no rodapé do portal.
                                    </CardDescription>
                                </CardHeader>

                                <div className="space-y-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                                Telefone Principal
                                            </label>
                                            <input
                                                type="text"
                                                value={form.contact_phone}
                                                onChange={(e) => setForm({ ...form, contact_phone: e.target.value })}
                                                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                                                placeholder="(71) 98845-2006"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                                WhatsApp Institucional
                                            </label>
                                            <input
                                                type="text"
                                                value={form.contact_whatsapp}
                                                onChange={(e) => setForm({ ...form, contact_whatsapp: e.target.value })}
                                                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                                                placeholder="(71) 98845-2006"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                                E-mail de Contato
                                            </label>
                                            <input
                                                type="email"
                                                value={form.contact_email}
                                                onChange={(e) => setForm({ ...form, contact_email: e.target.value })}
                                                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                                                placeholder="contato@institutobantu.org.br"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                                Instagram (Perfil)
                                            </label>
                                            <input
                                                type="text"
                                                value={form.social_instagram}
                                                onChange={(e) => setForm({ ...form, social_instagram: e.target.value })}
                                                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                                                placeholder="@institutobantu"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                                Facebook (Página)
                                            </label>
                                            <input
                                                type="text"
                                                value={form.social_facebook}
                                                onChange={(e) => setForm({ ...form, social_facebook: e.target.value })}
                                                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                                                placeholder="institutobantuoficial"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                            Endereço Geral — Polo Salvador
                                        </label>
                                        <input
                                            type="text"
                                            value={form.contact_address_salvador}
                                            onChange={(e) => setForm({ ...form, contact_address_salvador: e.target.value })}
                                            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                                            placeholder="Salvador — BA (Sede do Instituto Cultural Bantu)"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                            Endereço Geral — Polo Vera Cruz / Itaparica
                                        </label>
                                        <input
                                            type="text"
                                            value={form.contact_address_veracruz}
                                            onChange={(e) => setForm({ ...form, contact_address_veracruz: e.target.value })}
                                            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                                            placeholder="Vera Cruz — Ilha de Itaparica — BA"
                                        />
                                    </div>
                                </div>
                            </Card>
                        )}

                        {/* TAB 6: CRITERIA (#publico) */}
                        {activeTab === 'criteria' && (
                            <div className="space-y-6">
                                {/* Header / Settings do #publico */}
                                <Card className="rounded-3xl border-border bg-card p-6 md:p-8 space-y-6 shadow-sm">
                                    <CardHeader className="p-0">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <CardTitle className="text-xl">Textos da Seção de Critérios (#publico)</CardTitle>
                                                <CardDescription>
                                                    Personalize o cabeçalho e descrição da seção &quot;Quem pode participar?&quot; da landing page.
                                                </CardDescription>
                                            </div>
                                            <Badge className="bg-[#1A4FD6] text-white">#publico</Badge>
                                        </div>
                                    </CardHeader>

                                    <div className="space-y-5">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                                    Badge da Seção
                                                </label>
                                                <input
                                                    type="text"
                                                    value={form.criteria_badge}
                                                    onChange={(e) => setForm({ ...form, criteria_badge: e.target.value })}
                                                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                                                    placeholder="Critérios & Acesso"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                                    Título Principal da Seção
                                                </label>
                                                <input
                                                    type="text"
                                                    value={form.criteria_title}
                                                    onChange={(e) => setForm({ ...form, criteria_title: e.target.value })}
                                                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-bold focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                                                    placeholder="Quem pode participar?"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                                Descrição Explicativa
                                            </label>
                                            <textarea
                                                rows={3}
                                                value={form.criteria_description}
                                                onChange={(e) => setForm({ ...form, criteria_description: e.target.value })}
                                                className="w-full rounded-xl border border-border bg-background p-4 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                                                placeholder="O CAIS BANTU prioriza pessoas em situação de vulnerabilidade social..."
                                            />
                                        </div>
                                    </div>
                                </Card>

                                {/* Critérios CRUD List */}
                                <Card className="rounded-3xl border-border bg-card p-6 md:p-8 space-y-6 shadow-sm">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-6">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <Users className="size-6 text-[#1A4FD6]" />
                                                <CardTitle className="text-xl font-bold">Critérios & Grupos Prioritários Cadastrados</CardTitle>
                                            </div>
                                            <CardDescription className="mt-1">
                                                Gerencie os cards de critérios e públicos prioritários exibidos na seção #publico.
                                            </CardDescription>
                                        </div>
                                        <Button
                                            type="button"
                                            onClick={openCreateCriterion}
                                            className="bg-[#1A4FD6] hover:bg-[#1540B5] text-white font-bold gap-2 shadow-md shrink-0"
                                        >
                                            <Plus className="size-4" />
                                            <span>Cadastrar Novo Critério</span>
                                        </Button>
                                    </div>

                                    {criteria.length === 0 ? (
                                        <div className="text-center py-10 border-2 border-dashed border-border rounded-2xl p-6 space-y-3">
                                            <Users className="size-10 text-muted-foreground mx-auto opacity-50" />
                                            <h4 className="font-bold text-foreground">Nenhum critério cadastrado</h4>
                                            <p className="text-xs text-muted-foreground">
                                                Clique no botão acima para adicionar um novo grupo de público prioritário.
                                            </p>
                                            <Button onClick={openCreateCriterion} className="bg-[#1A4FD6] text-white">
                                                Cadastrar Primeiro Critério
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {criteria.map((item) => {
                                                const IconComp = iconOptions[item.icon ?? 'Users'] ?? Users;

                                                return (
                                                    <Card
                                                        key={item.id}
                                                        className={`rounded-2xl border transition-all flex flex-col justify-between p-5 ${
                                                            item.active
                                                                ? 'border-border bg-card shadow-xs'
                                                                : 'border-border/60 opacity-60 bg-muted/20'
                                                        }`}
                                                    >
                                                        <div className="space-y-3">
                                                            <div className="flex items-center justify-between gap-2">
                                                                <div className="flex size-10 items-center justify-center rounded-xl bg-secondary text-[#1A4FD6]">
                                                                    <IconComp className="size-5" />
                                                                </div>
                                                                {item.badge && (
                                                                    <Badge variant="outline" className="text-xs font-semibold">
                                                                        {item.badge}
                                                                    </Badge>
                                                                )}
                                                            </div>

                                                            <div>
                                                                <h4 className="font-display font-bold text-base text-foreground leading-tight">
                                                                    {item.title}
                                                                </h4>
                                                                {item.description && (
                                                                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                                                                        {item.description}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="pt-4 mt-4 border-t border-border/60 flex items-center justify-between gap-2">
                                                            <div className="flex items-center gap-1.5">
                                                                <Switch
                                                                    checked={item.active}
                                                                    onCheckedChange={() => handleCriterionToggle(item)}
                                                                />
                                                                <span className="text-[11px] font-medium text-muted-foreground">
                                                                    {item.active ? 'Ativo' : 'Inativo'}
                                                                </span>
                                                            </div>

                                                            <div className="flex items-center gap-1">
                                                                <Button
                                                                    type="button"
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => openEditCriterion(item)}
                                                                    className="h-7 px-2.5 text-xs gap-1"
                                                                >
                                                                    <Edit3 className="size-3 text-primary" />
                                                                    <span>Editar</span>
                                                                </Button>
                                                                <Button
                                                                    type="button"
                                                                    variant="destructive"
                                                                    size="sm"
                                                                    onClick={() => handleCriterionDelete(item)}
                                                                    className="h-7 px-2.5 text-xs"
                                                                >
                                                                    <Trash2 className="size-3" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </Card>
                                                );
                                            })}
                                        </div>
                                    )}
                                </Card>
                            </div>
                        )}

                        {/* TAB 7: ABOUT */}
                        {activeTab === 'about' && (
                            <Card className="rounded-3xl border-border bg-card p-6 md:p-8 space-y-6 shadow-sm">
                                <CardHeader className="p-0">
                                    <CardTitle className="text-xl">Sobre a Iniciativa & Metodologia (#sobre / #metodologia)</CardTitle>
                                    <CardDescription>
                                        Textos que explicam a tecnologia social afrocentrada, Capoeira Angola e acolhimento psicossocial.
                                    </CardDescription>
                                </CardHeader>

                                <div className="space-y-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                                Badge da Metodologia
                                            </label>
                                            <input
                                                type="text"
                                                value={form.about_badge}
                                                onChange={(e) => setForm({ ...form, about_badge: e.target.value })}
                                                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                                                placeholder="Tecnologia Social & Ancestralidade"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                                Título da Metodologia
                                            </label>
                                            <input
                                                type="text"
                                                value={form.about_title}
                                                onChange={(e) => setForm({ ...form, about_title: e.target.value })}
                                                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-bold focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                                                placeholder="Metodologia Afrocentrada: Corpo, Mente e Comunidade"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                            Subtítulo / Introdução
                                        </label>
                                        <textarea
                                            rows={2}
                                            value={form.about_subtitle}
                                            onChange={(e) => setForm({ ...form, about_subtitle: e.target.value })}
                                            className="w-full rounded-xl border border-border bg-background p-4 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                                            placeholder="A proposta pedagógica do CAIS BANTU não se limita ao ensino técnico..."
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                            Descrição Complementar
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={form.about_description}
                                            onChange={(e) => setForm({ ...form, about_description: e.target.value })}
                                            className="w-full rounded-xl border border-border bg-background p-4 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                                            placeholder="Uma iniciativa transformadora do Instituto Cultural Bantu..."
                                        />
                                    </div>
                                </div>
                            </Card>
                        )}

                        {/* Bottom Save bar */}
                        <div className="flex items-center justify-end gap-3 pt-2">
                            <Button
                                type="submit"
                                disabled={saving}
                                size="lg"
                                className="bg-[#1A4FD6] hover:bg-[#1540B5] text-white font-bold px-8 h-12 shadow-lg gap-2"
                            >
                                <Save className="size-4" />
                                <span>{saving ? 'Salvando...' : 'Salvar Todas as Configurações'}</span>
                            </Button>
                        </div>
                    </form>
                )}
            </div>

            {/* MODAL DIALOG PARA CRIAR / EDITAR UNIDADE */}
            <Dialog open={unitModalOpen} onOpenChange={closeUnitModal}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <div className="flex items-center gap-2">
                            <Building2 className="size-5 text-[#1A4FD6]" />
                            <DialogTitle className="text-xl">
                                {editingUnit ? `Editar ${editingUnit.name}` : 'Cadastrar Nova Unidade / Polo'}
                            </DialogTitle>
                        </div>
                        <DialogDescription>
                            Preencha os detalhes da unidade de atendimento. As informações serão exibidas diretamente na landing page.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleUnitSubmit} className="space-y-4 pt-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase text-muted-foreground">
                                    Nome da Unidade *
                                </label>
                                <Input
                                    required
                                    value={unitForm.name}
                                    onChange={(e) => setUnitForm({ ...unitForm, name: e.target.value })}
                                    placeholder="Ex: Unidade Salvador"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase text-muted-foreground">
                                    Identificador Único (Slug)
                                </label>
                                <Input
                                    value={unitForm.slug}
                                    onChange={(e) => setUnitForm({ ...unitForm, slug: e.target.value })}
                                    placeholder="Ex: salvador (gerado automático se vazio)"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase text-muted-foreground">
                                    Subtítulo / Território
                                </label>
                                <Input
                                    value={unitForm.subtitle}
                                    onChange={(e) => setUnitForm({ ...unitForm, subtitle: e.target.value })}
                                    placeholder="Ex: Polo Capital • Centro Histórico & Periferias"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase text-muted-foreground">
                                    Badge de Turmas / Status
                                </label>
                                <Input
                                    value={unitForm.badge}
                                    onChange={(e) => setUnitForm({ ...unitForm, badge: e.target.value })}
                                    placeholder="Ex: 5 Turmas"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase text-muted-foreground">
                                Endereço Completo (Texto)
                            </label>
                            <Input
                                value={unitForm.address}
                                onChange={(e) => setUnitForm({ ...unitForm, address: e.target.value })}
                                placeholder="Ex: Rua do Instituto, 123 - Centro Histórico, Salvador - BA"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase text-muted-foreground flex items-center justify-between">
                                <span className="flex items-center gap-1.5 text-primary font-bold">
                                    <MapPin className="size-3.5" />
                                    Link do Google Maps / Traçar Rota
                                </span>
                                <span className="text-[11px] font-normal text-muted-foreground">
                                    (opcional — URL do Google Maps)
                                </span>
                            </label>
                            <Input
                                value={unitForm.maps_url}
                                onChange={(e) => setUnitForm({ ...unitForm, maps_url: e.target.value })}
                                placeholder="Ex: https://maps.app.goo.gl/... ou https://maps.google.com/..."
                            />
                            <p className="text-[11px] text-muted-foreground">
                                Ao preencher, o botão "Traçar Rota no Mapa" da landing page abrirá exatamente este link.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase text-muted-foreground">
                                    Turnos de Funcionamento
                                </label>
                                <Input
                                    value={unitForm.shifts}
                                    onChange={(e) => setUnitForm({ ...unitForm, shifts: e.target.value })}
                                    placeholder="Ex: Turnos: Matutino, Vespertino e Noturno"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase text-muted-foreground">
                                    Telefone / WhatsApp
                                </label>
                                <Input
                                    value={unitForm.phone}
                                    onChange={(e) => setUnitForm({ ...unitForm, phone: e.target.value })}
                                    placeholder="(71) 98845-2006"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase text-muted-foreground">
                                Foco dos Cursos e Descrição da Unidade
                            </label>
                            <textarea
                                rows={3}
                                value={unitForm.description}
                                onChange={(e) => setUnitForm({ ...unitForm, description: e.target.value })}
                                className="w-full rounded-xl border border-border bg-background p-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                                placeholder="Foco em Letramento Digital, Produção Audiovisual, Instrutor de Ioga e Empreendedorismo e Artesanato."
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase text-muted-foreground">
                                    Ícone
                                </label>
                                <select
                                    value={unitForm.icon}
                                    onChange={(e) => setUnitForm({ ...unitForm, icon: e.target.value })}
                                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:border-primary outline-none"
                                >
                                    <option value="Building2">Prédio / Centro Urbano (Building2)</option>
                                    <option value="Trees">Comunidade / Litoral (Trees)</option>
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase text-muted-foreground">
                                    Tema de Cor
                                </label>
                                <select
                                    value={unitForm.color_theme}
                                    onChange={(e) => setUnitForm({ ...unitForm, color_theme: e.target.value })}
                                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:border-primary outline-none"
                                >
                                    <option value="blue">Azul Bantu (#1A4FD6)</option>
                                    <option value="amber">Âmbar Dourado (#FFBE00)</option>
                                    <option value="emerald">Esmeralda Verde</option>
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase text-muted-foreground">
                                    Ordem de Exibição
                                </label>
                                <Input
                                    type="number"
                                    value={unitForm.order}
                                    onChange={(e) => setUnitForm({ ...unitForm, order: Number(e.target.value) })}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border">
                            <Switch
                                checked={unitForm.active}
                                onCheckedChange={(checked) => setUnitForm({ ...unitForm, active: checked })}
                            />
                            <div>
                                <span className="text-sm font-semibold text-foreground block">
                                    Unidade Ativa na Landing Page
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    Se desativada, a unidade não aparecerá nos cards da página nem nas opções de pré-inscrição.
                                </span>
                            </div>
                        </div>

                        <DialogFooter className="gap-2 pt-2">
                            <Button type="button" variant="outline" onClick={closeUnitModal}>
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                disabled={unitSubmitting}
                                className="bg-[#1A4FD6] hover:bg-[#1540B5] text-white font-bold"
                            >
                                {unitSubmitting
                                    ? 'Salvando...'
                                    : editingUnit
                                    ? 'Atualizar Unidade'
                                    : 'Cadastrar Unidade'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* MODAL DIALOG PARA CRIAR / EDITAR CRITÉRIO (#publico) */}
            <Dialog open={criterionModalOpen} onOpenChange={closeCriterionModal}>
                <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <div className="flex items-center gap-2">
                            <Users className="size-5 text-[#1A4FD6]" />
                            <DialogTitle className="text-xl">
                                {editingCriterion ? `Editar Critério: ${editingCriterion.title}` : 'Cadastrar Novo Critério de Acesso'}
                            </DialogTitle>
                        </div>
                        <DialogDescription>
                            Configure o público-alvo ou critério de participação exibido na seção #publico da landing page.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleCriterionSubmit} className="space-y-4 pt-2">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase text-muted-foreground">
                                Título do Critério / Público-Alvo *
                            </label>
                            <Input
                                required
                                value={criterionForm.title}
                                onChange={(e) => setCriterionForm({ ...criterionForm, title: e.target.value })}
                                placeholder="Ex: Mulheres & Mães Chefes de Família"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase text-muted-foreground">
                                    Badge / Etiqueta
                                </label>
                                <Input
                                    value={criterionForm.badge}
                                    onChange={(e) => setCriterionForm({ ...criterionForm, badge: e.target.value })}
                                    placeholder="Ex: Prioritário, Juventude, Inclusão"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase text-muted-foreground">
                                    Ícone Representativo
                                </label>
                                <select
                                    value={criterionForm.icon}
                                    onChange={(e) => setCriterionForm({ ...criterionForm, icon: e.target.value })}
                                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:border-primary outline-none"
                                >
                                    <option value="Users">Pessoas / Famílias (Users)</option>
                                    <option value="GraduationCap">Juventude / Educação (GraduationCap)</option>
                                    <option value="Sparkles">Ancestralidade / Cultura (Sparkles)</option>
                                    <option value="Shield">Proteção / Direitos (Shield)</option>
                                    <option value="HeartHandshake">Acolhimento Comunitário (HeartHandshake)</option>
                                    <option value="Compass">Orientação / Refugiados (Compass)</option>
                                    <option value="Award">Direitos / Diversidade (Award)</option>
                                    <option value="Lightbulb">Saúde Mental / Ideias (Lightbulb)</option>
                                    <option value="CheckCircle2">Garantia de Acesso (CheckCircle2)</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase text-muted-foreground">
                                Descrição do Critério
                            </label>
                            <textarea
                                rows={3}
                                required
                                value={criterionForm.description}
                                onChange={(e) => setCriterionForm({ ...criterionForm, description: e.target.value })}
                                className="w-full rounded-xl border border-border bg-background p-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                                placeholder="Explique quem se enquadra neste critério e os benefícios de prioridade..."
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase text-muted-foreground">
                                    Ordem de Exibição
                                </label>
                                <Input
                                    type="number"
                                    value={criterionForm.order}
                                    onChange={(e) => setCriterionForm({ ...criterionForm, order: Number(e.target.value) })}
                                />
                            </div>

                            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border mt-4 sm:mt-0">
                                <Switch
                                    checked={criterionForm.active}
                                    onCheckedChange={(checked) => setCriterionForm({ ...criterionForm, active: checked })}
                                />
                                <div>
                                    <span className="text-xs font-semibold text-foreground block">
                                        Critério Ativo no Site
                                    </span>
                                </div>
                            </div>
                        </div>

                        <DialogFooter className="gap-2 pt-2">
                            <Button type="button" variant="outline" onClick={closeCriterionModal}>
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                disabled={criterionSubmitting}
                                className="bg-[#1A4FD6] hover:bg-[#1540B5] text-white font-bold"
                            >
                                {criterionSubmitting
                                    ? 'Salvando...'
                                    : editingCriterion
                                    ? 'Atualizar Critério'
                                    : 'Cadastrar Critério'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}