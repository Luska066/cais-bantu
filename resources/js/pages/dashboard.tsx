import { Head } from '@inertiajs/react';
import {
    ArrowUpRight,
    BedDouble,
    Boxes,
    Building2,
    CalendarCheck,
    CalendarDays,
    CheckCircle2,
    Clock,
    DollarSign,
    Download,
    Eye,
    Hotel,
    Layers,
    PlusCircle,
    Receipt,
    Sparkles,
    TrendingUp,
    UserCheck,
    UserPlus,
    Users,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { dashboard } from '@/routes';

const recentReservations = [
    {
        id: 'RES-8942',
        guest: 'Manuel Domingos António',
        phone: '+244 923 456 789',
        room: 'Suíte Master Bantu #201',
        category: 'Suíte Master',
        checkIn: '17 Ago 2026',
        checkOut: '22 Ago 2026',
        nights: 5,
        total: 'Kz 350.000',
        status: 'check-in',
        statusLabel: 'Check-in Ativo',
    },
    {
        id: 'RES-8941',
        guest: 'Teresa Nzola Kiala',
        phone: '+244 912 884 120',
        room: 'Chalé Deluxe #104',
        category: 'Chalé Deluxe',
        checkIn: '18 Ago 2026',
        checkOut: '20 Ago 2026',
        nights: 2,
        total: 'Kz 180.000',
        status: 'confirmed',
        statusLabel: 'Confirmada',
    },
    {
        id: 'RES-8940',
        guest: 'Carlos Eduardo Silva',
        phone: '+244 934 112 390',
        room: 'Standard Casal #102',
        category: 'Standard',
        checkIn: '17 Ago 2026',
        checkOut: '19 Ago 2026',
        nights: 2,
        total: 'Kz 120.000',
        status: 'check-in',
        statusLabel: 'Check-in Ativo',
    },
    {
        id: 'RES-8939',
        guest: 'Esperança Makiese',
        phone: '+244 945 670 811',
        room: 'Suíte Executiva #205',
        category: 'Suíte Executiva',
        checkIn: '19 Ago 2026',
        checkOut: '24 Ago 2026',
        nights: 5,
        total: 'Kz 420.000',
        status: 'pending',
        statusLabel: 'Pendente',
    },
    {
        id: 'RES-8938',
        guest: 'João Afonso Benguela',
        phone: '+244 922 300 450',
        room: 'Bangalô Vista Mar #302',
        category: 'Bangalô',
        checkIn: '12 Ago 2026',
        checkOut: '17 Ago 2026',
        nights: 5,
        total: 'Kz 450.000',
        status: 'completed',
        statusLabel: 'Finalizada',
    },
];

const roomsMatrix = [
    { number: '101', type: 'Std', status: 'occupied', guest: 'J. Silva' },
    { number: '102', type: 'Std', status: 'occupied', guest: 'C. Eduardo' },
    { number: '103', type: 'Std', status: 'available', guest: 'Livre' },
    { number: '104', type: 'Dlx', status: 'cleaning', guest: 'Higienização' },
    { number: '105', type: 'Dlx', status: 'occupied', guest: 'A. Morais' },
    { number: '201', type: 'Mst', status: 'occupied', guest: 'M. Domingos' },
    { number: '202', type: 'Mst', status: 'available', guest: 'Livre' },
    { number: '203', type: 'Exec', status: 'maintenance', guest: 'Manutenção' },
    { number: '204', type: 'Exec', status: 'occupied', guest: 'P. Santos' },
    { number: '205', type: 'Exec', status: 'available', guest: 'Livre' },
    { number: '301', type: 'Pres', status: 'occupied', guest: 'F. Costa' },
    { number: '302', type: 'Bang', status: 'available', guest: 'Livre' },
];

const upcomingSchedules = [
    { time: '14:00', type: 'checkin', guest: 'Manuel Domingos António', room: 'Quarto 201' },
    { time: '14:30', type: 'checkin', guest: 'Carlos Eduardo Silva', room: 'Quarto 102' },
    { time: '12:00', type: 'checkout', guest: 'João Afonso Benguela', room: 'Quarto 302' },
    { time: '16:00', type: 'cleaning', guest: 'Camareira Equipe A', room: 'Quarto 104' },
];

export default function Dashboard() {
    return (
        <>
            <Head title="Painel Geral — Instituto Bantu" />

            <div className="flex flex-col gap-6 p-4 md:p-8">
                {/* 1. Header com Boas-vindas e Ações Rápidas */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                                Painel Geral
                            </span>
                            <Badge variant="accent" className="text-[11px] font-bold">
                                Instituto Bantu
                            </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground font-normal">
                            Gestão comunitária e controle operacional hoteleiro integrado.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                        <Button variant="outline" size="default" className="shadow-xs gap-2">
                            <Download className="size-4 text-muted-foreground" />
                            Relatório
                        </Button>
                        <Button variant="default" size="default" className="gap-2">
                            <UserPlus className="size-4" />
                            Novo Hóspede
                        </Button>
                        <Button variant="accent" size="default" className="gap-2 shadow-md shadow-[#FFBE00]/20">
                            <PlusCircle className="size-4 text-[#0D1640]" />
                            Nova Reserva
                        </Button>
                    </div>
                </div>

                {/* 2. Card Escuro de Saldo / Destaque Institucional (Deep Navy #0D1640) */}
                <div className="relative overflow-hidden rounded-2xl bg-[#0D1640] p-6 text-white shadow-xl ring-1 ring-white/10 md:p-8">
                    {/* Background Glows */}
                    <div className="pointer-events-none absolute -right-16 -top-16 size-80 rounded-full bg-[#1A4FD6]/30 blur-3xl" />
                    <div className="pointer-events-none absolute bottom-0 right-1/4 size-60 rounded-full bg-[#FFBE00]/15 blur-3xl" />

                    <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Badge className="bg-[#FFBE00] text-[#0D1640] font-bold text-xs hover:bg-[#FFBE00]/90">
                                    Exercício Agosto 2026
                                </Badge>
                                <span className="text-xs text-white/60">
                                    Atualizado hoje às 11:30
                                </span>
                            </div>
                            <div>
                                <span className="text-xs font-semibold uppercase tracking-wider text-[#9AA5C4]">
                                    Saldo Consolidado do Ecossistema
                                </span>
                                <div className="mt-1 flex items-baseline gap-3">
                                    <h1 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
                                        Kz 8.450.000,00
                                    </h1>
                                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-bold text-emerald-400">
                                        <TrendingUp className="size-3.5" />
                                        +14.8% este mês
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Sub-métricas dentro do card escuro */}
                        <div className="grid grid-cols-2 gap-4 sm:gap-6 border-t border-white/10 pt-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                            <div className="space-y-1">
                                <span className="text-xs font-medium text-[#9AA5C4]">
                                    Receita de Hospedagem
                                </span>
                                <p className="font-display text-xl font-bold text-white">
                                    Kz 5.820.000
                                </p>
                                <span className="text-[11px] text-white/50">
                                    142 reservas faturadas
                                </span>
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs font-medium text-[#9AA5C4]">
                                    Fundo Comunitário Bantu
                                </span>
                                <p className="font-display text-xl font-bold text-[#FFBE00]">
                                    Kz 2.630.000
                                </p>
                                <span className="text-[11px] text-white/50">
                                    Projetos sociais & infra
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Grid de KPIs Operacionais (4 Cards) */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {/* KPI 1 - Ocupação */}
                    <Card className="hover:border-primary/40 transition-colors">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                    Taxa de Ocupação
                                </span>
                                <div className="flex size-10 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                                    <BedDouble className="size-5" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="flex items-baseline gap-2">
                                    <span className="font-display text-3xl font-bold text-foreground">
                                        80.0%
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        (28/35 quartos)
                                    </span>
                                </div>
                                <div className="mt-3 flex items-center justify-between">
                                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                                        <div className="h-full bg-emerald-500 rounded-full w-[80%]" />
                                    </div>
                                </div>
                                <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                                    <Badge variant="success">Alta Demanda</Badge>
                                    <span>7 livres</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* KPI 2 - Reservas do Mês */}
                    <Card className="hover:border-primary/40 transition-colors">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                    Reservas do Mês
                                </span>
                                <div className="flex size-10 items-center justify-center rounded-xl bg-[#FFBE00]/15 text-[#0D1640] dark:text-[#FFBE00]">
                                    <CalendarDays className="size-5" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="flex items-baseline gap-2">
                                    <span className="font-display text-3xl font-bold text-foreground">
                                        142
                                    </span>
                                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                        +18 esta semana
                                    </span>
                                </div>
                                <p className="mt-2 text-xs text-muted-foreground">
                                    Média de 3.4 diárias por reserva
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* KPI 3 - Hóspedes Ativos */}
                    <Card className="hover:border-primary/40 transition-colors">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                    Hóspedes Hospedados
                                </span>
                                <div className="flex size-10 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                                    <Users className="size-5" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="flex items-baseline gap-2">
                                    <span className="font-display text-3xl font-bold text-foreground">
                                        64
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        hóspedes ativos
                                    </span>
                                </div>
                                <div className="mt-2 flex items-center gap-2">
                                    <Badge variant="outline" className="text-[11px] font-medium border-border">
                                        9 Check-ins hoje
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* KPI 4 - Estoque & Suprimentos */}
                    <Card className="hover:border-primary/40 transition-colors">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                    Estoque de Produtos
                                </span>
                                <div className="flex size-10 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
                                    <Boxes className="size-5" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="flex items-baseline gap-2">
                                    <span className="font-display text-3xl font-bold text-foreground">
                                        184
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        itens cadastrados
                                    </span>
                                </div>
                                <div className="mt-2 flex items-center gap-2">
                                    <Badge variant="warning" className="text-[11px]">
                                        3 Itens em reposição
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* 4. Conteúdo Principal (2 Colunas: Tabela de Reservas & Status Operacional) */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                    {/* Coluna Esquerda: Tabela de Reservas & Matriz de Quartos (8 colunas) */}
                    <div className="space-y-6 lg:col-span-8">
                        {/* Tabela de Reservas Recentes */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-4">
                                <div>
                                    <CardTitle className="text-lg">Reservas Recentes</CardTitle>
                                    <CardDescription>
                                        Últimas movimentações de reservas e hóspedes
                                    </CardDescription>
                                </div>
                                <Button variant="ghost" size="sm" className="gap-1 text-primary hover:text-primary font-medium text-xs">
                                    Ver todas
                                    <ArrowUpRight className="size-3.5" />
                                </Button>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm">
                                        <thead className="border-b border-border/80 bg-muted/50 text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                                            <tr>
                                                <th className="px-6 py-3">Hóspede</th>
                                                <th className="px-4 py-3">Acomodação</th>
                                                <th className="px-4 py-3">Período</th>
                                                <th className="px-4 py-3">Total</th>
                                                <th className="px-4 py-3">Status</th>
                                                <th className="px-6 py-3 text-right">Ação</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border/60">
                                            {recentReservations.map((res) => (
                                                <tr key={res.id} className="hover:bg-muted/40 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#1A4FD6] font-display text-xs font-bold text-white">
                                                                {res.guest.charAt(0)}
                                                            </div>
                                                            <div>
                                                                <span className="font-semibold text-foreground block">
                                                                    {res.guest}
                                                                </span>
                                                                <span className="text-xs text-muted-foreground">
                                                                    {res.phone}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <span className="font-medium text-foreground block text-xs">
                                                            {res.room}
                                                        </span>
                                                        <span className="text-[11px] text-muted-foreground">
                                                            {res.category}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <span className="text-xs text-foreground block">
                                                            {res.checkIn} — {res.checkOut}
                                                        </span>
                                                        <span className="text-[11px] text-muted-foreground">
                                                            {res.nights} diárias
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-4 font-semibold text-foreground text-xs">
                                                        {res.total}
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        {res.status === 'check-in' && (
                                                            <Badge variant="success">{res.statusLabel}</Badge>
                                                        )}
                                                        {res.status === 'confirmed' && (
                                                            <Badge variant="accent">{res.statusLabel}</Badge>
                                                        )}
                                                        {res.status === 'pending' && (
                                                            <Badge variant="warning">{res.statusLabel}</Badge>
                                                        )}
                                                        {res.status === 'completed' && (
                                                            <Badge variant="outline">{res.statusLabel}</Badge>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <Button variant="ghost" size="sm" className="size-8 p-0 rounded-lg">
                                                            <Eye className="size-4 text-muted-foreground" />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Matriz de Quartos em Tempo Real */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-3">
                                <div>
                                    <CardTitle className="text-lg">Mapa de Quartos & Acomodações</CardTitle>
                                    <CardDescription>
                                        Status em tempo real das unidades hoteleiras
                                    </CardDescription>
                                </div>
                                <div className="flex flex-wrap items-center gap-3 text-xs">
                                    <div className="flex items-center gap-1.5">
                                        <span className="size-2.5 rounded-full bg-emerald-500" />
                                        <span className="text-muted-foreground">Livre</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="size-2.5 rounded-full bg-[#0D1640] dark:bg-[#1A4FD6]" />
                                        <span className="text-muted-foreground">Ocupado</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="size-2.5 rounded-full bg-[#FFBE00]" />
                                        <span className="text-muted-foreground">Limpeza</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="size-2.5 rounded-full bg-amber-500" />
                                        <span className="text-muted-foreground">Manutenção</span>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
                                    {roomsMatrix.map((room) => {
                                        let bgClass = 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400';

                                        if (room.status === 'occupied') {
                                            bgClass = 'bg-[#0D1640] text-white border-[#0D1640] dark:bg-[#131F53] dark:border-white/10';
                                        } else if (room.status === 'cleaning') {
                                            bgClass = 'bg-[#FFBE00]/15 border-[#FFBE00]/40 text-[#0D1640] dark:text-[#FFBE00]';
                                        } else if (room.status === 'maintenance') {
                                            bgClass = 'bg-amber-500/15 border-amber-500/30 text-amber-700 dark:text-amber-400';
                                        }

                                        return (
                                            <div
                                                key={room.number}
                                                className={`flex flex-col justify-between rounded-xl border p-3 text-left transition-all hover:scale-[1.02] cursor-pointer shadow-xs ${bgClass}`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="font-display font-bold text-base">
                                                        #{room.number}
                                                    </span>
                                                    <span className="text-[10px] uppercase font-bold opacity-80">
                                                        {room.type}
                                                    </span>
                                                </div>
                                                <span className="mt-2 truncate text-[11px] font-medium opacity-90">
                                                    {room.guest}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Coluna Direita: Próximas Atividades, Ações e Fundo Comunitário (4 colunas) */}
                    <div className="space-y-6 lg:col-span-4">
                        {/* Próximos Horários & Check-ins */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base">Movimentações de Hoje</CardTitle>
                                <CardDescription>Chegadas e saídas programadas</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {upcomingSchedules.map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center justify-between rounded-xl border border-border/70 p-3 hover:bg-muted/40 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex size-9 items-center justify-center rounded-lg bg-secondary text-secondary-foreground font-bold text-xs">
                                                <Clock className="size-4" />
                                            </div>
                                            <div>
                                                <span className="font-semibold text-foreground text-xs block">
                                                    {item.guest}
                                                </span>
                                                <span className="text-[11px] text-muted-foreground">
                                                    {item.room}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <Badge
                                                variant={
                                                    item.type === 'checkin'
                                                        ? 'success'
                                                        : item.type === 'checkout'
                                                          ? 'outline'
                                                          : 'accent'
                                                }
                                                className="text-[10px]"
                                            >
                                                {item.time}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Card do Fundo Social Bantu */}
                        <Card className="border-[#FFBE00]/30 bg-gradient-to-br from-card to-amber-50/20 dark:to-amber-950/10">
                            <CardHeader className="pb-3">
                                <div className="flex items-center gap-2">
                                    <Sparkles className="size-4 text-[#FFBE00]" />
                                    <CardTitle className="text-base">Fundo Comunitário Bantu</CardTitle>
                                </div>
                                <CardDescription>Impacto social reinvestido</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-muted-foreground">Meta Social 2026</span>
                                        <span className="font-bold text-foreground">78% atingido</span>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                                        <div className="h-full bg-[#FFBE00] rounded-full w-[78%]" />
                                    </div>
                                </div>
                                <div className="space-y-2 text-xs text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="size-3.5 text-emerald-500" />
                                        <span>Apoio à capacitação hoteleira local</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="size-3.5 text-emerald-500" />
                                        <span>Projetos culturais & memória Bantu</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Gestão CAIS BANTU & Landing Page */}
                        <Card className="border-primary/30 shadow-md">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-base flex items-center gap-2">
                                        <Sparkles className="size-4 text-[#FFBE00]" />
                                        <span>CAIS BANTU (Landing Page)</span>
                                    </CardTitle>
                                    <Badge className="bg-[#FFBE00] text-[#0D1640] text-[10px] font-bold">
                                        300 Vagas
                                    </Badge>
                                </div>
                                <CardDescription>Gestão da página pública e inscrições</CardDescription>
                            </CardHeader>
                            <CardContent className="grid grid-cols-2 gap-2.5">
                                <a href="/admin/landing" className="block">
                                    <Button variant="outline" className="w-full h-auto flex-col items-start p-3 gap-1 rounded-xl text-left justify-start hover:border-primary/50">
                                        <span className="font-semibold text-xs text-foreground">🌐 Landing Page</span>
                                        <span className="text-[10px] text-muted-foreground">Editor de conteúdo</span>
                                    </Button>
                                </a>
                                <a href="/admin/enrollments" className="block">
                                    <Button variant="outline" className="w-full h-auto flex-col items-start p-3 gap-1 rounded-xl text-left justify-start hover:border-primary/50">
                                        <span className="font-semibold text-xs text-foreground">📋 Inscrições</span>
                                        <span className="text-[10px] text-muted-foreground">Alunos & contatos</span>
                                    </Button>
                                </a>
                                <a href="/admin/courses" className="block">
                                    <Button variant="outline" className="w-full h-auto flex-col items-start p-3 gap-1 rounded-xl text-left justify-start hover:border-primary/50">
                                        <span className="font-semibold text-xs text-foreground">🎓 Cursos</span>
                                        <span className="text-[10px] text-muted-foreground">160h de formação</span>
                                    </Button>
                                </a>
                                <a href="/admin/news" className="block">
                                    <Button variant="outline" className="w-full h-auto flex-col items-start p-3 gap-1 rounded-xl text-left justify-start hover:border-primary/50">
                                        <span className="font-semibold text-xs text-foreground">📰 Editais</span>
                                        <span className="text-[10px] text-muted-foreground">Notícias e avisos</span>
                                    </Button>
                                </a>
                            </CardContent>
                        </Card>

                        {/* Acesso Rápido a Módulos Operacionais */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base">Atalhos Operacionais</CardTitle>
                                <CardDescription>Módulos de acesso frequente</CardDescription>
                            </CardHeader>
                            <CardContent className="grid grid-cols-2 gap-2.5">
                                <Button variant="outline" className="h-auto flex-col items-start p-3 gap-1.5 rounded-xl text-left justify-start">
                                    <Layers className="size-4 text-primary" />
                                    <span className="font-semibold text-xs text-foreground">Categorias</span>
                                    <span className="text-[10px] text-muted-foreground">Quartos & tarifas</span>
                                </Button>
                                <Button variant="outline" className="h-auto flex-col items-start p-3 gap-1.5 rounded-xl text-left justify-start">
                                    <Boxes className="size-4 text-[#FFBE00]" />
                                    <span className="font-semibold text-xs text-foreground">Estoque</span>
                                    <span className="text-[10px] text-muted-foreground">Controle de insumos</span>
                                </Button>
                                <Button variant="outline" className="h-auto flex-col items-start p-3 gap-1.5 rounded-xl text-left justify-start">
                                    <UserCheck className="size-4 text-emerald-500" />
                                    <span className="font-semibold text-xs text-foreground">Hóspedes</span>
                                    <span className="text-[10px] text-muted-foreground">Fichas & histórico</span>
                                </Button>
                                <Button variant="outline" className="h-auto flex-col items-start p-3 gap-1.5 rounded-xl text-left justify-start">
                                    <Receipt className="size-4 text-primary" />
                                    <span className="font-semibold text-xs text-foreground">Financeiro</span>
                                    <span className="text-[10px] text-muted-foreground">Contas pagar/receber</span>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};

