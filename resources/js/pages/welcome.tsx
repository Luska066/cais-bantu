import { Head, Link, router, usePage } from '@inertiajs/react';
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
    GraduationCap,
    HeartHandshake,
    HelpCircle,
    Info,
    Laptop,
    Leaf,
    Lightbulb,
    Mail,
    MapPin,
    Menu,
    MessageCircle,
    Palette,
    Phone,
    PlusCircle,
    Send,
    Shield,
    Sparkles,
    Sun,
    Trees,
    Users,
    Video,
    X,
} from 'lucide-react';
import { useState } from 'react';
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
import { dashboard, login } from '@/routes';
import { ScrollReveal } from '@/components/scroll-reveal';

const iconMap: Record<string, any> = {
    Laptop,
    Palette,
    Video,
    Sun,
    Leaf,
    Users,
    GraduationCap,
    Sparkles,
    Shield,
    HeartHandshake,
    Compass,
    Award,
    Lightbulb,
    CheckCircle2,
    Building2,
    Trees,
};

const defaultCourses = [
    {
        id: 1,
        slug: 'letramento-digital',
        title: 'Letramento Digital',
        category: 'Tecnologia & Inclusão',
        icon: 'Laptop',
        hours: '160 Horas',
        badge_color: 'bg-[#1A4FD6] text-white',
        description: 'Capacitação prática em ferramentas digitais, navegação segura, criação de currículos online, rotinas de escritório e cidadania digital para inserção no mercado de trabalho moderno.',
        topics: ['Informática Básica & Produtividade', 'Internet, Segurança & Cidadania Digital', 'Ferramentas Google & Aplicativos em Nuvem', 'Elaboração de Portfólios Digitais'],
        opportunities: 'Assistente administrativo, atendimento ao cliente, suporte operacional e autonomia digital.',
    },
    {
        id: 2,
        slug: 'empreendedorismo-artesanato',
        title: 'Empreendedorismo e Artesanato',
        category: 'Economia Criativa',
        icon: 'Palette',
        hours: '160 Horas',
        badge_color: 'bg-[#FFBE00] text-[#0D1640]',
        description: 'Desenvolvimento de negócios solidários, técnicas artesanais afro-brasileiras, precificação justa, marketing para redes sociais e fortalecimento da economia comunitária.',
        topics: ['Produção Artesanal & Identidade Cultural', 'Gestão Financeira & Precificação', 'Canais de Venda & Feiras Criativas', 'Planejamento de Microempreendimentos'],
        opportunities: 'Artesão(ã) autônomo(a), gestor(a) de marca comunitária e geração de renda domiciliar.',
    },
    {
        id: 3,
        slug: 'produtor-audiovisual',
        title: 'Produção Audiovisual',
        category: 'Comunicação & Mídias',
        icon: 'Video',
        hours: '160 Horas',
        badge_color: 'bg-[#1A4FD6] text-white',
        description: 'Formação em captação de imagem e som com celulares e câmeras, edição de vídeo, criação de conteúdo para mídias sociais e valorização das narrativas periféricas e afrocentradas.',
        topics: ['Roteiro, Captação & Iluminação Básica', 'Edição em Smartphones & Computadores', 'Mídias Sociais & Storytelling Periférico', 'Produção de Documentários & Videoclipes'],
        opportunities: 'Criador(a) de conteúdo, assistente de edição, videorrepórter comunitário(a) e mídias sociais.',
    },
    {
        id: 4,
        slug: 'instrutor-ioga',
        title: 'Instrutor(a) de Ioga',
        category: 'Saúde Integral & Bem-Estar',
        icon: 'Sun',
        hours: '160 Horas',
        badge_color: 'bg-emerald-600 text-white',
        description: 'Práticas corporais ancestrais, respiração consciente, meditação e promoção da saúde mental e física, qualificando instrutores comunitários para atuação em coletivos e escolas.',
        topics: ['Fundamentos das Posturas (Asanas) & Respiração', 'Anatomia Básica & Saúde Mental', 'Metodologia de Ensino Comunitário', 'Autocuidado & Terapias Integrativas'],
        opportunities: 'Instrutor(a) de práticas integrativas em ONGs, centros comunitários e aulas particulares.',
    },
    {
        id: 5,
        slug: 'agente-ambiental',
        title: 'Agente Ambiental',
        category: 'Sustentabilidade & Meio Ambiente',
        icon: 'Leaf',
        hours: '160 Horas',
        badge_color: 'bg-emerald-700 text-white',
        description: 'Educação ambiental prática, conservação de ecossistemas costeiros em Salvador e Vera Cruz, gestão de resíduos sólidos, compostagem e agroecologia urbana comunitária.',
        topics: ['Preservação Marinha & Manguezais', 'Manejo de Resíduos & Reciclagem Popular', 'Hortas Comunitárias & Agroecologia', 'Políticas Públicas de Meio Ambiente'],
        opportunities: 'Educador(a) ambiental, consultor(a) de projetos de sustentabilidade e cooperativas verdes.',
    },
];

const targetAudiences = [
    { title: 'Mulheres & Mães Chefes de Família', desc: 'Prioridade para quem busca autonomia financeira e apoio mútuo.', icon: Users },
    { title: 'Jovens da Periferia (16 a 29 anos)', desc: 'Primeiro emprego, capacitação tecnológica e fortalecimento de projetos de vida.', icon: GraduationCap },
    { title: 'População Negra & Povos Tradicionais', desc: 'Valorização da identidade afrodescendente e de comunidades quilombolas e de terreiro.', icon: Sparkles },
    { title: 'Egressos do Sistema Prisional', desc: 'Acolhimento humanizado, novas oportunidades de trabalho e reintegração social.', icon: Shield },
    { title: 'Pessoas em Situação de Rua', desc: 'Resgate da cidadania, escuta atenta e qualificação profissional digna.', icon: HeartHandshake },
    { title: 'Imigrantes & Refugiados', desc: 'Acolhimento cultural, superação de barreiras de linguagem e inclusão produtiva.', icon: Compass },
    { title: 'População LGBTQIAPN+', desc: 'Espaço seguro, livre de preconceito e com foco em oportunidades concretas.', icon: Award },
    { title: 'Pessoas em Recuperação (SPA)', desc: 'Apoio psicossocial contínuo para pessoas em uso de álcool e outras drogas.', icon: Lightbulb },
];

const defaultNews = [
    {
        id: 1,
        title: 'Edital 2026 Aberto: 300 Vagas Gratuitas no CAIS BANTU',
        date_label: '15 de Agosto de 2026',
        category: 'Inscrições',
        description: 'Inscrições abertas para as unidades Salvador e Vera Cruz. Conheça os critérios e garanta sua participação.',
        content: `O Instituto Cultural Bantu tem a honra de anunciar a abertura oficial das inscrições para o ciclo de 2026 do CAIS BANTU — Centro de Acesso a Direitos e Inclusão Social Afrocentrado.

Com financiamento público e parcerias comunitárias, o projeto disponibiliza 300 vagas 100% gratuitas distribuídas em 10 turmas nos polos Salvador (Centro Histórico/Sede Bantu) e Vera Cruz (Ilha de Itaparica).

Os cursos de qualificação profissional abrangem Letramento Digital, Empreendedorismo & Artesanato, Produção Audiovisual, Instrutor(a) de Ioga e Agente Ambiental. Cada formação conta com 160 horas de carga horária prática, certificação oficial, lanche no local e vivências metodológicas afrocentradas com rodas de Capoeira Angola e acolhimento psicossocial contínuo.

As inscrições podem ser realizadas diretamente através do formulário nesta página ou presencialmente em nossos polos territoriais. Vagas prioritárias são destinadas a mulheres chefes de família, jovens periféricos, população negra e tradicional, egressos prisionais e pessoas em situação de vulnerabilidade.`,
    },
    {
        id: 2,
        title: 'Capoeira Angola e Saúde Mental: O Papel da Ancestralidade',
        date_label: '08 de Agosto de 2026',
        category: 'Metodologia',
        description: 'Artigo sobre como as rodas de Capoeira Angola funcionam como espaço de escuta, corpo e tecnologia social.',
        content: `A metodologia pedagógica do CAIS BANTU integra a tradição milenar da Capoeira Angola não apenas como prática corporal, mas como um poderoso dispositivo terapêutico e comunitário.

Coordenado por mestres de capoeira e psicólogas especializadas em relações étnico-raciais, o projeto utiliza a roda de capoeira como espaço seguro de acolhimento, escuta mútua, disciplina coletiva e reconstrução da auto-estima diante dos impactos do racismo estrutural.

"A capoeira nos ensina a gingar com os desafios da vida, a ter calma no jogo e a cuidar de quem está ao nosso lado", destaca Mestre Roxinho, diretor geral do instituto. Estudos e relatórios psicossociais do projeto apontam uma redução significativa nos níveis de ansiedade e isolamento social entre os educandos participantes das rodas integradas.`,
    },
    {
        id: 3,
        title: 'Inauguração do Polo de Inclusão Digital na Ilha de Itaparica',
        date_label: '28 de Julho de 2026',
        category: 'Unidades',
        description: 'Nova sala multimídia atenderá jovens e pescadores artesanais no município de Vera Cruz.',
        content: `Com grande celebração comunitária, foi inaugurado o novo laboratório de inclusão digital e tecnologias sociais da Unidade Vera Cruz, no município de Vera Cruz — Ilha de Itaparica.

O espaço conta com computadores modernos, conexão de internet de alta velocidade e monitores capacitados para orientar jovens, marisqueiras e pescadores artesanais no acesso a serviços públicos digitais, elaboração de currículos, gestão de microempreendimentos e cursos de qualificação em Letramento Digital e Gestão Ambiental.

A nova unidade representa um marco histórico para o desenvolvimento sociocultural do litoral e das comunidades tradicionais da Ilha de Itaparica, expandindo o alcance transformador do Ecossistema Bantu.`,
    },
];

const defaultTeam = [
    { id: 1, name: 'Edielson Miranda (Mestre Roxinho)', role: 'Diretor Geral & Fundador', description: 'Educador social, gestor social, mestre de Capoeira Angola e ativista dos direitos humanos.' },
    { id: 2, name: 'Simone Paixão', role: 'Coordenação Psicossocial', description: 'Psicóloga responsável pelo acompanhamento e acolhimento psicossocial dos participantes.' },
    { id: 3, name: 'David Assunção', role: 'Coordenação Pedagógica', description: 'Responsável pelo acompanhamento e desenvolvimento pedagógico das atividades e participantes.' },
    { id: 4, name: 'Monique Marques', role: 'Coordenação de Inclusão Produtiva', description: 'Responsável pelas ações voltadas à inclusão produtiva e geração de oportunidades.' },
    { id: 5, name: 'Elisângela Araújo', role: 'Assistente Social', description: 'Responsável pelo acompanhamento e orientação social dos participantes e famílias.' },
];

export type UnitItem = {
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

const defaultUnits: UnitItem[] = [
    {
        id: 1,
        slug: 'salvador',
        name: 'UNIDADE SALVADOR',
        subtitle: 'ICBANTU – Núcleo SSA · Polo Capital · Centro Histórico & Periferias',
        badge: 'Polo Salvador',
        description: 'Foco em Letramento Digital, Produção Audiovisual, Instrutor de Ioga e Empreendedorismo e Artesanato.',
        address: 'Rua Mello Moraes Filho, nº 392 – Fazenda Grande do Retiro, Salvador – BA',
        shifts: 'Turnos: Matutino, Vespertino e Noturno',
        phone: '(71) 99642-8078',
        email: 'bantu-contato@institutobantu.org',
        icon: 'Building2',
        color_theme: 'blue',
        active: true,
        order: 1,
    },
    {
        id: 2,
        slug: 'veracruz',
        name: 'UNIDADE VERA CRUZ',
        subtitle: 'Casa Bantu Vila Rosa · Polo Ilha de Itaparica · Litoral & Comunidades',
        badge: 'Polo Vera Cruz',
        description: 'Foco em Agente Ambiental, Artesanato Sustentável, Letramento Digital e turismo de base comunitária.',
        address: 'Rua do Congo, nº 25 – Loteamento Parque das Mangueiras, Vera Cruz – BA | CEP: 44470-000',
        shifts: 'Turnos: Matutino e Vespertino',
        phone: '(71) 99225-4706',
        email: 'bantu-contato@institutobantu.org',
        icon: 'Trees',
        color_theme: 'amber',
        active: true,
        order: 2,
    },
];

export type CriterionItem = {
    id: number;
    title: string;
    description?: string | null;
    icon?: string | null;
    badge?: string | null;
    active: boolean;
    order: number;
};

type Props = {
    settings?: Record<string, string>;
    courses?: typeof defaultCourses;
    news?: typeof defaultNews;
    team?: typeof defaultTeam;
    units?: UnitItem[];
    criteria?: CriterionItem[];
};

export default function Welcome({ settings = {}, courses = defaultCourses, news = defaultNews, team = defaultTeam, units = [], criteria = [] }: Props) {
    const { auth } = usePage().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const displayUnits = units.length > 0 ? units : defaultUnits;
    const displayCriteria = criteria.length > 0 ? criteria : targetAudiences;
    const [selectedUnit, setSelectedUnit] = useState<string>(displayUnits[0]?.slug ?? 'salvador');

    // News modal state
    const [selectedNews, setSelectedNews] = useState<any | null>(null);
    const [newsModalOpen, setNewsModalOpen] = useState(false);

    const handleOpenNews = (item: any) => {
        setSelectedNews(item);
        setNewsModalOpen(true);
    };

    const handleCloseNews = () => {
        setNewsModalOpen(false);
        setSelectedNews(null);
    };

    // Dynamic settings values with fallback
    const announcementActive = settings.announcement_active !== '0';
    const announcementText = settings.announcement_text || 'Inscrições Presenciais Abertas nos Polos Salvador e Vera Cruz • 300 Vagas Gratuitas';
    const announcementLink = settings.announcement_link || '#inscricoes';

    const heroBadge = settings.hero_badge || 'Centro de Acesso a Direitos e Inclusão Social Afrocentrado';
    const heroTitle = settings.hero_title || 'CAIS BANTU';
    const heroSubtitle = settings.hero_subtitle || 'Acolher, qualificar e gerar oportunidades para fortalecer a autonomia, a cidadania e a inclusão social.';
    const heroDescription = settings.hero_description || 'Uma iniciativa do Instituto Cultural Bantu, realizada em parceria com a SENAD/MJSP, voltada à promoção do acesso a direitos, da inclusão social e produtiva e da autonomia. Formação profissional gratuita, acolhimento psicossocial e tecnologia social afrocentrada.';

    const metaBeneficiaries = settings.meta_beneficiaries || '300';
    const metaClasses = settings.meta_classes || '10';
    const metaHours = settings.meta_hours || '160h';
    const metaUnits = settings.meta_units || `${displayUnits.length} Polos`;

    const contactPhone = settings.contact_phone || '(71) 99225-4706';
    const contactEmail = settings.contact_email || 'bantu-contato@institutobantu.org';
    const contactAddressSalvador = settings.contact_address_salvador || 'Rua Mello Moraes Filho, nº 392 – Fazenda Grande do Retiro, Salvador – BA';
    const contactAddressVeracruz = settings.contact_address_veracruz || 'Rua do Congo, nº 25 – Loteamento Parque das Mangueiras, Vera Cruz – BA | CEP: 44470-000';

    // Criteria (#publico)
    const criteriaBadge = settings.criteria_badge || 'Critérios & Acesso';
    const criteriaTitle = settings.criteria_title || 'Quem pode participar?';
    const criteriaDescription = settings.criteria_description || 'O CAIS BANTU prioriza pessoas em situação de vulnerabilidade social que buscam formação gratuita e suporte acolhedor:';

    // About (#metodologia / #sobre)
    const aboutBadge = settings.about_badge || 'Tecnologia Social & Ancestralidade';
    const aboutTitle = settings.about_title || 'Metodologia Afrocentrada: Corpo, Mente e Comunidade';
    const aboutSubtitle = settings.about_subtitle || 'A proposta pedagógica do CAIS BANTU não se limita ao ensino técnico. Ela compreende a formação humana integral a partir de matrizes afro-brasileiras e da educação popular:';

    return (
        <div className="min-h-screen bg-[#F2F5FF] text-[#0D1640] dark:bg-[#0D1640] dark:text-white font-sans antialiased selection:bg-[#FFBE00] selection:text-[#0D1640]">
            <Head>
                {/* 1. Primary Meta Tags */}
                <title>CAIS BANTU — Centro de Acesso a Direitos, Inclusão Social e Cursos Gratuitos | Salvador e Vera Cruz</title>
                <meta name="title" content="CAIS BANTU — Centro de Acesso a Direitos, Inclusão Social e Cursos Gratuitos | Salvador e Vera Cruz" />
                <meta
                    name="description"
                    content="O CAIS BANTU oferece 300 vagas gratuitas em cursos profissionalizantes de 160h com certificação oficial, acolhimento psicossocial e tecnologia social afrocentrada nos polos Salvador e Vera Cruz / Ilha de Itaparica - BA."
                />
                <meta
                    name="keywords"
                    content="CAIS BANTU, Instituto Cultural Bantu, cursos gratuitos salvador, cursos gratuitos vera cruz, ilha de itaparica cursos, inclusao social bahia, formacao profissional salvador, senad mjsp politica sobre drogas, tecnologia social afrocentrada, letramento digital, producao audiovisual, empreendedorismo artesanato, instrutor ioga, agente ambiental"
                />
                <meta name="author" content="Instituto Cultural Bantu" />
                <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
                <meta name="language" content="Portuguese" />
                <meta name="theme-color" content="#0D1640" />

                {/* 2. Geo Tags (Local SEO Salvador & Vera Cruz) */}
                <meta name="geo.region" content="BR-BA" />
                <meta name="geo.placename" content="Salvador, Vera Cruz, Bahia" />
                <meta name="geo.position" content="-12.9714;-38.5014" />
                <meta name="ICBM" content="-12.9714, -38.5014" />

                {/* 3. Open Graph / Facebook / WhatsApp */}
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="pt_BR" />
                <meta property="og:site_name" content="CAIS BANTU — Instituto Cultural Bantu" />
                <meta property="og:title" content="CAIS BANTU — Centro de Acesso a Direitos, Inclusão Social e Cursos Gratuitos" />
                <meta
                    property="og:description"
                    content="Inscrições abertas para 300 vagas gratuitas em formação profissional de 160h e suporte psicossocial nos polos Salvador e Vera Cruz."
                />
                <meta property="og:image" content="/apple-touch-icon.png" />
                <meta property="og:image:alt" content="Logo Oficial CAIS BANTU — Direitos, Inclusão e Cidadania" />

                {/* 4. Twitter Cards */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="CAIS BANTU — Cursos Gratuitos e Inclusão Social" />
                <meta
                    name="twitter:description"
                    content="Centro de Acesso a Direitos e Inclusão Social Afrocentrado: 300 vagas em Salvador e Vera Cruz / Ilha de Itaparica."
                />
                <meta name="twitter:image" content="/apple-touch-icon.png" />

                {/* 5. JSON-LD Structured Data (Schema.org) */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@graph': [
                            {
                                '@type': 'WebSite',
                                '@id': '#website',
                                name: 'CAIS BANTU',
                                alternateName: ['Cais Bantu', 'Projeto CAIS BANTU', 'Instituto Cultural Bantu'],
                                description: 'Portal Oficial do CAIS BANTU — Cursos Gratuitos de 160h, Inclusão Social e Acesso a Direitos em Salvador e Vera Cruz / Ilha de Itaparica.',
                                inLanguage: 'pt-BR',
                            },
                            {
                                '@type': 'NGO',
                                '@id': '#organization',
                                name: 'CAIS BANTU — Instituto Cultural Bantu',
                                alternateName: ['CAIS BANTU', 'Cais Bantu', 'Instituto Bantu', 'Instituto Cultural Bantu'],
                                description: 'Centro de Acesso a Direitos e Inclusão Social na Política sobre Drogas. Projeto realizado pelo Instituto Cultural Bantu em parceria com a SENAD/MJSP.',
                                logo: '/apple-touch-icon.png',
                                telephone: '+55-71-99225-4706',
                                email: 'bantu-contato@institutobantu.org',
                                address: [
                                    {
                                        '@type': 'PostalAddress',
                                        name: 'Polo Salvador (Núcleo SSA)',
                                        streetAddress: 'Rua Mello Moraes Filho, nº 392 – Fazenda Grande do Retiro',
                                        addressLocality: 'Salvador',
                                        addressRegion: 'BA',
                                        addressCountry: 'BR',
                                    },
                                    {
                                        '@type': 'PostalAddress',
                                        name: 'Polo Vera Cruz (Casa Bantu Vila Rosa)',
                                        streetAddress: 'Rua do Congo, nº 25 – Loteamento Parque das Mangueiras',
                                        addressLocality: 'Vera Cruz',
                                        postalCode: '44470-000',
                                        addressRegion: 'BA',
                                        addressCountry: 'BR',
                                    },
                                ],
                            },
                            {
                                '@type': 'EducationalOccupationalProgram',
                                name: 'Programa de Formação Profissional CAIS BANTU 2026',
                                description: 'Qualificação profissional gratuita de 160h com certificação oficial, material didático e acolhimento psicossocial.',
                                timeToComplete: 'PT160H',
                                educationalCredentialAwarded: 'Certificação Profissional Oficial',
                                offers: {
                                    '@type': 'Offer',
                                    price: '0.00',
                                    priceCurrency: 'BRL',
                                    availability: 'https://schema.org/InStock',
                                },
                            },
                        ],
                    })}
                </script>
            </Head>

            {/* 1. TOP ANNOUNCEMENT BAR */}
            {announcementActive && (
                <div className="bg-[#0D1640] border-b border-white/10 px-4 py-2 text-center text-xs font-medium text-white/90">
                    <span className="inline-flex items-center gap-2">
                        <span className="flex size-2 rounded-full bg-[#FFBE00] animate-pulse" />
                        <span>{announcementText}</span>
                        <a href={announcementLink} className="underline font-bold text-[#FFBE00] hover:text-amber-300 ml-1">
                            Onde se Inscrever &rarr;
                        </a>
                    </span>
                </div>
            )}

            {/* 2. NAVBAR */}
            <nav className="sticky top-0 z-50 bg-[#0D1640]/95 backdrop-blur-md border-b border-white/10 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between">
                    {/* Brand */}
                    <a href="#" className="flex items-center gap-3.5 group">
                        <div className="flex size-14 sm:size-16 shrink-0 items-center justify-center rounded-full bg-white/10 p-1 group-hover:scale-105 transition-transform overflow-hidden ring-2 ring-[#FFBE00]/40 shadow-md">
                            <img
                                src="/apple-touch-icon.png"
                                alt="Logo CAIS Bantu"
                                className="size-full object-contain rounded-full"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    const fallback = e.currentTarget.parentElement?.querySelector('.fallback-ib');
                                    if (fallback) (fallback as HTMLElement).style.display = 'flex';
                                }}
                            />
                            <div className="fallback-ib hidden size-full items-center justify-center rounded-full bg-[#FFBE00] font-display text-xs font-bold text-[#0D1640]">
                                CAIS
                            </div>
                        </div>
                        <div className="flex flex-col text-left">
                            <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-white leading-tight">
                                CAIS BANTU
                            </span>
                            <span className="text-[11px] font-semibold text-[#FFBE00] leading-tight mt-0.5">
                                Direitos • Inclusão • Cidadania
                            </span>
                        </div>
                    </a>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#9AA5C4]">
                        <a href="#projeto" className="hover:text-white transition-colors">O Projeto</a>
                        <a href="#cursos" className="hover:text-white transition-colors">Cursos</a>
                        <a href="#metodologia" className="hover:text-white transition-colors">Metodologia</a>
                        <a href="#publico" className="hover:text-white transition-colors">Quem Pode Participar</a>
                        <a href="#unidades" className="hover:text-white transition-colors">Unidades</a>
                        <a href="#equipe" className="hover:text-white transition-colors">Equipe</a>
                        <a href="#noticias" className="hover:text-white transition-colors">Notícias</a>
                        <a href="#contato" className="hover:text-white transition-colors">Contato</a>
                    </div>

                    {/* Actions */}
                    <div className="hidden sm:flex items-center gap-3">
                        <a href="#inscricoes">
                            <Button variant="accent" className="bg-[#FFBE00] text-[#0D1640] hover:bg-[#E5AB00] font-bold shadow-md shadow-[#FFBE00]/20">
                                Onde se Inscrever
                            </Button>
                        </a>
                    </div>

                    {/* Mobile menu trigger */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-2 rounded-xl border border-white/10 text-white hover:bg-white/10"
                        aria-label="Abrir menu"
                    >
                        {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
                    </button>
                </div>

                {/* Mobile Dropdown */}
                {mobileMenuOpen && (
                    <div className="lg:hidden bg-[#0D1640] border-b border-white/10 px-4 pt-2 pb-6 space-y-3">
                        <div className="flex flex-col gap-2.5 text-sm font-medium text-white/80">
                            <a href="#projeto" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-white/10">O Projeto</a>
                            <a href="#cursos" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-white/10">Cursos</a>
                            <a href="#metodologia" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-white/10">Metodologia</a>
                            <a href="#publico" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-white/10">Quem Pode Participar</a>
                            <a href="#unidades" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-white/10">Unidades</a>
                            <a href="#inscricoes" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-white/10">Como se Inscrever</a>
                            <a href="#equipe" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-white/10">Equipe</a>
                            <a href="#noticias" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-white/10">Notícias</a>
                            <a href="#contato" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-white/10">Contato</a>
                        </div>
                        <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
                            <a href="#inscricoes" onClick={() => setMobileMenuOpen(false)}>
                                <Button variant="accent" className="w-full bg-[#FFBE00] text-[#0D1640] font-bold">
                                    Onde se Inscrever Presencialmente
                                </Button>
                            </a>
                            {auth.user ? (
                                <Link href={dashboard()} className="w-full">
                                    <Button variant="outline" className="w-full border-white/20 text-white">
                                        Painel Administrativo
                                    </Button>
                                </Link>
                            ) : (
                                <Link href={login()} className="w-full">
                                    <Button variant="ghost" className="w-full text-white">
                                        Entrar no Administrativo
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {/* 3. HERO SECTION (HOME) */}
            <section className="relative overflow-hidden bg-gradient-to-b from-[#0D1640] via-[#090F2C] to-[#0D1640] text-white py-20 lg:py-28">
                {/* Visual Glow Orbs */}
                <div className="pointer-events-none absolute -top-40 -left-40 size-96 rounded-full bg-[#1A4FD6]/30 blur-3xl" />
                <div className="pointer-events-none absolute top-1/2 -right-40 size-96 rounded-full bg-[#FFBE00]/20 blur-3xl" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <ScrollReveal direction="up" delay={50} className="lg:col-span-7 space-y-6 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2.5">
                                <Badge className="bg-[#FFBE00] text-[#0D1640] font-bold py-1.5 px-3.5 text-xs hover:bg-[#FFBE00]/90 shadow-sm">
                                    <Sparkles className="size-3.5 mr-1.5" />
                                    {heroBadge}
                                </Badge>
                            </div>

                            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                                {heroTitle}
                            </h1>

                            <p className="font-display text-xl sm:text-2xl font-semibold text-[#FFBE00] leading-snug">
                                {heroSubtitle}
                            </p>

                            <p className="text-base sm:text-lg text-[#9AA5C4] leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                {heroDescription}
                            </p>

                            {/* 3 Call-to-action Buttons */}
                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                                <a href="#inscricoes">
                                    <Button size="lg" variant="accent" className="bg-[#FFBE00] text-[#0D1640] font-bold shadow-lg shadow-[#FFBE00]/25 text-base px-8 h-13 hover:bg-[#E5AB00]">
                                        Onde se Inscrever
                                        <ArrowRight className="ml-2 size-5" />
                                    </Button>
                                </a>
                                <a href="#projeto">
                                    <Button size="lg" variant="default" className="bg-[#1A4FD6] text-white font-semibold text-base px-6 h-13 hover:bg-[#1540B5]">
                                        Conheça o Projeto
                                    </Button>
                                </a>
                                <a href="#instituto">
                                    <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 text-base px-6 h-13">
                                        Conheça o Instituto
                                    </Button>
                                </a>
                            </div>
                        </ScrollReveal>

                        {/* Right Hero Card: Metas & Selo Oficial */}
                        <ScrollReveal direction="left" delay={200} className="lg:col-span-5">
                            <div className="relative rounded-3xl bg-white/5 p-6 sm:p-8 border border-white/15 backdrop-blur-xl shadow-2xl space-y-6">
                                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                    <div className="flex items-center gap-3.5">
                                        <div className="flex size-16 sm:size-20 shrink-0 items-center justify-center rounded-full bg-white/10 p-1 ring-2 ring-[#FFBE00]/40 shadow-lg overflow-hidden">
                                            <img
                                                src="/apple-touch-icon.png"
                                                alt="Selo Oficial CAIS Bantu"
                                                className="size-full object-contain rounded-full"
                                            />
                                        </div>
                                        <div>
                                            <span className="text-xs font-semibold uppercase tracking-wider text-[#FFBE00]">
                                                Edição Oficial 2026
                                            </span>
                                            <h2 className="font-display text-xl font-bold text-white">
                                                Metas & Alcance
                                            </h2>
                                        </div>
                                    </div>
                                    <Badge variant="outline" className="border-[#FFBE00]/40 text-[#FFBE00] bg-[#FFBE00]/10">
                                        100% Gratuito
                                    </Badge>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
                                        <span className="font-display text-3xl font-bold text-white">{metaBeneficiaries}</span>
                                        <p className="text-xs text-[#9AA5C4] mt-1">Vagas & Beneficiários</p>
                                    </div>
                                    <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
                                        <span className="font-display text-3xl font-bold text-[#FFBE00]">{metaClasses}</span>
                                        <p className="text-xs text-[#9AA5C4] mt-1">Turmas de Formação</p>
                                    </div>
                                    <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
                                        <span className="font-display text-3xl font-bold text-white">{metaHours}</span>
                                        <p className="text-xs text-[#9AA5C4] mt-1">Carga Horária / Turma</p>
                                    </div>
                                    <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
                                        <span className="font-display text-3xl font-bold text-emerald-400">{metaUnits}</span>
                                        <p className="text-xs text-[#9AA5C4] mt-1">Salvador e Vera Cruz</p>
                                    </div>
                                </div>

                                <div className="rounded-2xl bg-[#1A4FD6]/20 border border-[#1A4FD6]/30 p-4 flex items-center gap-3.5">
                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#1A4FD6] text-white">
                                        <Award className="size-5" />
                                    </div>
                                    <div className="text-xs text-white/90 leading-relaxed">
                                        <strong>Certificação Profissional Oficial</strong> e suporte ativo para inserção produtiva e cooperativismo.
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* 4. O PROJETO & INSTITUTO CULTURAL BANTU */}
            <section id="projeto" className="py-20 bg-[#F2F5FF] dark:bg-[#090F2C] overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <ScrollReveal direction="right" delay={100} className="lg:col-span-6 space-y-6">
                            <Badge variant="outline" className="border-[#1A4FD6]/30 bg-[#1A4FD6]/10 text-[#1A4FD6] dark:text-[#9AA5C4] dark:border-white/10">
                                Sobre a Iniciativa
                            </Badge>

                            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                                O que é o CAIS BANTU?
                            </h2>

                            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm sm:text-base">
                                <p>
                                    O <strong>CAIS BANTU</strong> é um projeto do <strong>Instituto Cultural Bantu</strong>, realizado em parceria com a <strong>Secretaria Nacional de Políticas sobre Drogas e Gestão de Ativos (SENAD)</strong>, do <strong>Ministério da Justiça e Segurança Pública (MJSP)</strong>, concebido como um centro integrador de promoção e defesa de direitos humanos, acolhimento, inclusão social e produtiva.
                                </p>
                                <p>
                                    A iniciativa implementa duas unidades dos <strong>Centros de Acesso a Direitos e Inclusão Social na Política sobre Drogas — CAIS</strong>, destinadas prioritariamente a pessoas em situação de vulnerabilidade social, especialmente aquelas com demandas relacionadas ao uso de álcool e outras drogas.
                                </p>
                                <p>
                                    Por meio do acesso a direitos, da integração à rede de serviços públicos, da qualificação profissional, do acolhimento psicossocial e da inclusão socioprodutiva, o CAIS BANTU busca promover autonomia, cidadania, reabilitação psicossocial, reinserção social e redução de danos.
                                </p>
                                <p>
                                    Em Salvador e Vera Cruz, o projeto articula essa atuação à <strong>tecnologia social afrocentrada</strong> desenvolvida pelo Instituto Cultural Bantu, baseada na Capoeira Angola, no cuidado comunitário, na promoção da autonomia e no fortalecimento das pessoas e dos territórios.
                                </p>
                            </div>

                            <div className="space-y-4 pt-2">
                                <div className="flex items-start gap-3.5">
                                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#FFBE00] text-[#0D1640] font-bold">
                                        <CheckCircle2 className="size-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-foreground text-base">Acolhimento Integral e Escuta</h3>
                                        <p className="text-sm text-muted-foreground mt-0.5">Suporte psicológico, assistência social e orientação para o acesso a direitos.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3.5">
                                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#1A4FD6] text-white font-bold">
                                        <CheckCircle2 className="size-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-foreground text-base">Capacitação Técnica & Cidadã</h3>
                                        <p className="text-sm text-muted-foreground mt-0.5">Cursos práticos voltados à qualificação profissional, à inclusão produtiva e à geração de autonomia.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3.5">
                                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#FFBE00] text-[#0D1640] font-bold">
                                        <CheckCircle2 className="size-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-foreground text-base">Tecnologia Social da Capoeira Angola</h3>
                                        <p className="text-sm text-muted-foreground mt-0.5">Ancestralidade, educação comunitária, disciplina corporal e fortalecimento da autonomia e dos vínculos sociais.</p>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Card Institucional do Instituto Cultural Bantu */}
                        <ScrollReveal direction="left" delay={200} className="lg:col-span-6">
                            <Card className="border-[#1A4FD6]/20 bg-card shadow-lg rounded-3xl p-6 sm:p-8">
                                <CardHeader className="p-0 pb-4">
                                    <div className="flex items-center bg-[#0D1640] rounded-2xl p-4 gap-4">
                                        <div className="flex size-20 sm:size-24 shrink-0 items-center justify-center rounded-full bg-white/10 p-1 shadow-md ring-2 ring-[#FFBE00]/40 overflow-hidden">
                                            <img
                                                src="/apple-touch-icon.png"
                                                alt="Logo CAIS Bantu"
                                                className="size-full object-contain rounded-full"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = 'none';
                                                    const fallback = e.currentTarget.parentElement?.querySelector('.fallback-ib');
                                                    if (fallback) (fallback as HTMLElement).style.display = 'flex';
                                                }}
                                            />
                                            <div className="fallback-ib hidden size-full items-center justify-center rounded-full bg-[#FFBE00] font-display text-sm font-bold text-[#0D1640]">
                                                CAIS
                                            </div>
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl sm:text-2xl text-white">Instituto Cultural Bantu</CardTitle>
                                            <CardDescription className="text-[#9AA5C4] mt-1">Organização da Sociedade Civil (OSC) fundada em 2006</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0 space-y-4 text-muted-foreground text-sm leading-relaxed">
                                    <p>
                                        Desde 2006, o <strong>Instituto Cultural Bantu</strong> atua na promoção e defesa dos direitos humanos, na valorização da cultura afro-brasileira, na educação popular, no empreendedorismo social e no desenvolvimento comunitário na Bahia.
                                    </p>
                                    <div className="rounded-2xl bg-muted p-4 border border-border/80 space-y-2">
                                        <span className="font-bold text-foreground text-xs uppercase tracking-wider block">
                                            Missão Institucional
                                        </span>
                                        <p className="text-xs text-muted-foreground">
                                            Desenvolver capacidades socioculturais, econômicas e educacionais a partir de uma perspectiva: afrocentrada, comunitária e transformadora, combatendo as desigualdades estruturais.
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 pt-2">
                                        <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                                            <Building2 className="size-4 text-[#1A4FD6]" />
                                            <span>20 Anos de História</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                                            <HeartHandshake className="size-4 text-[#FFBE00]" />
                                            <span>Milhares de Vidas Impactadas</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* 5. POR QUE O CAIS BANTU? (TERRITÓRIO & DIAGNÓSTICO) */}
            <section className="py-20 bg-[#0D1640] text-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollReveal direction="up" className="text-center max-w-3xl mx-auto space-y-4">
                        <Badge className="bg-[#FFBE00] text-[#0D1640] font-bold">
                            Compromisso Territorial
                        </Badge>
                        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
                            Por que o CAIS BANTU?
                        </h2>
                        <p className="text-[#9AA5C4] text-base sm:text-lg leading-relaxed">
                            O projeto nasce como uma resposta às desigualdades sociais, raciais e econômicas vivenciadas nos territórios de <strong>Salvador</strong>, <strong>Vera Cruz</strong> e <strong>Ilha de Itaparica</strong>, promovendo acesso a direitos, inclusão social e produtiva e fortalecimento da autonomia.
                        </p>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
                        <ScrollReveal direction="up" delay={100}>
                            <div className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-3 hover:bg-white/10 transition-colors h-full">
                                <div className="flex size-12 items-center justify-center rounded-xl bg-[#1A4FD6] text-white font-bold text-xl">
                                    01
                                </div>
                                <h3 className="font-display text-xl font-bold text-white">Superação de Desigualdades</h3>
                                <p className="text-sm text-[#9AA5C4] leading-relaxed">
                                    Ampliar o acesso a direitos, oportunidades e serviços para pessoas em situação de vulnerabilidade social.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal direction="up" delay={200}>
                            <div className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-3 hover:bg-white/10 transition-colors h-full">
                                <div className="flex size-12 items-center justify-center rounded-xl bg-[#FFBE00] text-[#0D1640] font-bold text-xl">
                                    02
                                </div>
                                <h3 className="font-display text-xl font-bold text-white">Inclusão Social e Produtiva</h3>
                                <p className="text-sm text-[#9AA5C4] leading-relaxed">
                                    Promover qualificação, autonomia e oportunidades de inclusão produtiva, trabalho decente e desenvolvimento socioeconômico.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal direction="up" delay={300}>
                            <div className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-3 hover:bg-white/10 transition-colors h-full">
                                <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-500 text-white font-bold text-xl">
                                    03
                                </div>
                                <h3 className="font-display text-xl font-bold text-white">Fortalecimento Comunitário</h3>
                                <p className="text-sm text-[#9AA5C4] leading-relaxed">
                                    Fortalecer vínculos comunitários, redes de cooperação, cuidado psicossocial e estratégias de autonomia nos territórios atendidos.
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* 6. QUEM PODE PARTICIPAR? (PÚBLICO-ALVO) */}
            <section id="publico" className="py-20 bg-[#F2F5FF] dark:bg-[#090F2C] overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollReveal direction="up" className="text-center max-w-3xl mx-auto space-y-4">
                        <Badge variant="outline" className="border-[#1A4FD6]/30 bg-[#1A4FD6]/10 text-[#1A4FD6] dark:text-[#9AA5C4]">
                            {criteriaBadge}
                        </Badge>
                        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                            {criteriaTitle}
                        </h2>
                        <p className="text-muted-foreground text-base sm:text-lg">
                            {criteriaDescription}
                        </p>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
                        {displayCriteria.map((aud: any, index: number) => {
                            const IconComp = typeof aud.icon === 'function'
                                ? aud.icon
                                : (iconMap[aud.icon] ?? Users);

                            return (
                                <ScrollReveal key={aud.id ?? index} direction="up" delay={index * 100}>
                                    <Card className="rounded-2xl hover:border-primary/50 transition-all hover:shadow-md flex flex-col justify-between h-full">
                                        <CardContent className="p-5 space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex size-10 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                                                    <IconComp className="size-5 text-[#1A4FD6]" />
                                                </div>
                                                {aud.badge && (
                                                    <Badge variant="outline" className="text-[10px] font-bold">
                                                        {aud.badge}
                                                    </Badge>
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="font-display font-bold text-base text-foreground leading-snug">
                                                    {aud.title}
                                                </h3>
                                                <p className="text-xs text-muted-foreground leading-relaxed mt-1.5">
                                                    {aud.description || aud.desc}
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 7. FORMAÇÃO PROFISSIONAL (CURSOS DINÂMICOS) */}
            <section id="cursos" className="py-20 bg-white dark:bg-[#0D1640] overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollReveal direction="up" className="text-center max-w-3xl mx-auto space-y-4">
                        <Badge className="bg-[#FFBE00] text-[#0D1640] font-bold">
                            Qualificação Profissional
                        </Badge>
                        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                            Cursos de Formação Profissional
                        </h2>
                        <p className="text-muted-foreground text-base sm:text-lg">
                            Cursos práticos de 160 horas com certificação oficial, material didático incluso e suporte à inserção no mercado.
                        </p>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                        {courses.map((course, idx) => {
                            const IconComponent = iconMap[course.icon] ?? Laptop;

                            return (
                                <ScrollReveal key={course.id} direction="up" delay={idx * 100}>
                                    <Card className="flex flex-col justify-between rounded-3xl border-border hover:border-primary/50 transition-all hover:shadow-lg h-full">
                                        <CardHeader className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
                                                    <IconComponent className="size-6 text-[#1A4FD6]" />
                                                </div>
                                                <Badge className={`text-xs font-semibold px-2.5 py-1 ${course.badge_color ?? 'bg-[#1A4FD6] text-white'}`}>
                                                    {course.hours}
                                                </Badge>
                                            </div>
                                            <div>
                                                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                                                    {course.category}
                                                </span>
                                                <CardTitle className="text-xl mt-1">{course.title}</CardTitle>
                                            </div>
                                            <CardDescription className="text-sm leading-relaxed">
                                                {course.description}
                                            </CardDescription>
                                        </CardHeader>

                                        <CardContent className="space-y-4 border-t border-border/60 pt-4">
                                            {course.topics && course.topics.length > 0 && (
                                                <div>
                                                    <span className="text-xs font-bold text-foreground block mb-2">
                                                        O que você vai aprender:
                                                    </span>
                                                    <ul className="space-y-1 text-xs text-muted-foreground">
                                                        {course.topics.map((t, topicIdx) => (
                                                            <li key={topicIdx} className="flex items-center gap-2">
                                                                <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                                                                <span>{t}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            <a href="#inscricoes" className="block pt-2">
                                                <Button
                                                    variant="default"
                                                    className="w-full bg-[#1A4FD6] hover:bg-[#1540B5] text-white font-semibold text-xs sm:text-sm"
                                                >
                                                    📍 Onde se Inscrever Presencialmente
                                                </Button>
                                            </a>
                                        </CardContent>
                                    </Card>
                                </ScrollReveal>
                            );
                        })}

                        {/* Card Diferencial Bantu */}
                        <ScrollReveal direction="up" delay={courses.length * 100}>
                            <div className="flex flex-col justify-between rounded-3xl bg-gradient-to-br from-[#0D1640] to-[#1A4FD6] p-8 text-white shadow-xl h-full">
                                <div className="space-y-4">
                                    <Badge className="bg-[#FFBE00] text-[#0D1640] font-bold">
                                        Diferencial Bantu
                                    </Badge>
                                    <h3 className="font-display text-2xl font-bold">
                                        Metodologia Afrocentrada & Capoeira Angola
                                    </h3>
                                    <p className="text-sm text-white/80 leading-relaxed">
                                        Todos os cursos integram vivências de Capoeira Angola, acolhimento psicossocial contínuo, ética comunitária e desenvolvimento pessoal para formar cidadãos completos.
                                    </p>
                                </div>
                                <div className="pt-6">
                                    <a href="#metodologia">
                                        <Button variant="accent" className="w-full bg-[#FFBE00] text-[#0D1640] font-bold">
                                            Conheça Nossa Metodologia
                                        </Button>
                                    </a>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* 8. METODOLOGIA AFROCENTRADA & ACOLHIMENTO PSICOSSOCIAL */}
            <section id="metodologia" className="py-20 bg-[#F2F5FF] dark:bg-[#090F2C] overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <ScrollReveal direction="right" delay={100} className="lg:col-span-6 space-y-6">
                            <Badge variant="outline" className="border-[#1A4FD6]/30 bg-[#1A4FD6]/10 text-[#1A4FD6] dark:text-[#9AA5C4]">
                                Tecnologia Social & Ancestralidade
                            </Badge>
                            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                                Metodologia Afrocentrada: Corpo, Mente e Comunidade
                            </h2>
                            <p className="text-muted-foreground text-base leading-relaxed">
                                A proposta pedagógica do CAIS BANTU não se limita ao ensino técnico. Ela compreende a formação humana integral a partir de <strong>matrizes afro-brasileiras</strong> e da <strong>educação popular</strong>:
                            </p>

                            <div className="space-y-4">
                                <div className="rounded-2xl bg-card p-5 border border-border/80 shadow-xs space-y-2">
                                    <h3 className="font-bold text-foreground text-base flex items-center gap-2">
                                        <Sparkles className="size-4 text-[#FFBE00]" />
                                        Capoeira Angola como Tecnologia Social
                                    </h3>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        A roda como espaço de respeito, disciplina, expressão corporal, memória coletiva e fortalecimento da autoestima contra o racismo estrutural.
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-card p-5 border border-border/80 shadow-xs space-y-2">
                                    <h3 className="font-bold text-foreground text-base flex items-center gap-2">
                                        <HeartHandshake className="size-4 text-[#1A4FD6]" />
                                        Acolhimento Psicossocial Contínuo
                                    </h3>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        Escuta qualificada, atendimento individual e em grupo, orientação sobre direitos, prevenção à violência e encaminhamentos às redes de proteção pública.
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-card p-5 border border-border/80 shadow-xs space-y-2">
                                    <h3 className="font-bold text-foreground text-base flex items-center gap-2">
                                        <Compass className="size-4 text-emerald-600" />
                                        Inserção Produtiva & Economia Solidária
                                    </h3>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        Incentivo ao cooperativismo comunitário, feiras de artesanato, redes de serviços e geração autônoma de renda.
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Bloco de Acolhimento em Destaque */}
                        <ScrollReveal direction="left" delay={200} className="lg:col-span-6">
                            <div className="rounded-3xl bg-[#0D1640] p-8 text-white shadow-2xl border border-white/10 space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="flex size-12 items-center justify-center rounded-2xl bg-[#FFBE00] text-[#0D1640] font-bold">
                                        <HeartHandshake className="size-6" />
                                    </div>
                                    <div>
                                        <span className="text-xs font-semibold text-[#FFBE00] uppercase tracking-wider">
                                            Eixo Fundamental
                                        </span>
                                        <h3 className="font-display text-xl font-bold text-white">
                                            Acolhimento Psicossocial
                                        </h3>
                                    </div>
                                </div>

                                <p className="text-sm text-[#9AA5C4] leading-relaxed">
                                    Sabemos que para aprender e produzir com dignidade é indispensável estar amparado psicologicamente. Nossa equipe de psicólogas e assistentes sociais atua lado a lado com os educadores:
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs text-white/90">
                                    <div className="rounded-xl bg-white/5 p-3.5 border border-white/10">
                                        <strong>✓ Escuta Qualificada</strong>
                                        <p className="text-white/60 mt-0.5">Atendimento individual sigiloso e humanizado.</p>
                                    </div>
                                    <div className="rounded-xl bg-white/5 p-3.5 border border-white/10">
                                        <strong>✓ Círculos de Conversa</strong>
                                        <p className="text-white/60 mt-0.5">Espaços de troca comunitária e fortalecimento.</p>
                                    </div>
                                    <div className="rounded-xl bg-white/5 p-3.5 border border-white/10">
                                        <strong>✓ Acesso a Direitos</strong>
                                        <p className="text-white/60 mt-0.5">Auxílio na emissão de documentos e benefícios.</p>
                                    </div>
                                    <div className="rounded-xl bg-white/5 p-3.5 border border-white/10">
                                        <strong>✓ Prevenção & Cuidado</strong>
                                        <p className="text-white/60 mt-0.5">Apoio a pessoas em sofrimento psíquico ou SPA.</p>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* 9. UNIDADES TERRITORIAIS (SALVADOR & VERA CRUZ) */}
            <section id="unidades" className="py-20 bg-white dark:bg-[#0D1640] overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollReveal direction="up" className="text-center max-w-3xl mx-auto space-y-4">
                        <Badge className="bg-[#FFBE00] text-[#0D1640] font-bold">
                            Territórios Atendidos
                        </Badge>
                        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                            Nossas Unidades de Atendimento
                        </h2>
                        <p className="text-muted-foreground text-base sm:text-lg">
                            Espaços estruturados para receber participantes com segurança, laboratórios equipados e ambiente acolhedor.
                        </p>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                        {displayUnits.map((unit, unitIdx) => {
                            const isAmber = unit.color_theme === 'amber' || unit.slug.includes('veracruz');
                            const isEmerald = unit.color_theme === 'emerald';
                            const isSelected = selectedUnit === unit.slug;

                            return (
                                <ScrollReveal key={unit.id} direction="up" delay={unitIdx * 150}>
                                    <Card
                                        className={`rounded-3xl border-2 transition-all p-6 sm:p-8 h-full ${isSelected
                                            ? isAmber
                                                ? 'border-[#FFBE00] shadow-xl'
                                                : isEmerald
                                                    ? 'border-emerald-500 shadow-xl'
                                                    : 'border-[#1A4FD6] shadow-xl'
                                            : 'border-border'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between pb-4 border-b border-border/80">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`flex size-12 items-center justify-center rounded-2xl ${isAmber
                                                        ? 'bg-[#FFBE00]/20 text-[#0D1640]'
                                                        : isEmerald
                                                            ? 'bg-emerald-500/20 text-emerald-600'
                                                            : 'bg-secondary text-secondary-foreground'
                                                        }`}
                                                >
                                                    {unit.icon === 'Trees' ? (
                                                        <Trees className={`size-6 ${isAmber ? 'text-amber-600 dark:text-[#FFBE00]' : 'text-emerald-600'}`} />
                                                    ) : (
                                                        <Building2 className="size-6 text-[#1A4FD6]" />
                                                    )}
                                                </div>
                                                <div>
                                                    <CardTitle className="text-xl">{unit.name}</CardTitle>
                                                    <CardDescription>{unit.subtitle || `Polo ${unit.slug}`}</CardDescription>
                                                </div>
                                            </div>
                                            <Badge
                                                className={
                                                    isAmber
                                                        ? 'bg-[#FFBE00] text-[#0D1640] font-bold'
                                                        : isEmerald
                                                            ? 'bg-emerald-600 text-white'
                                                            : 'bg-[#1A4FD6] text-white'
                                                }
                                            >
                                                {unit.badge || '5 Turmas'}
                                            </Badge>
                                        </div>

                                        <div className="space-y-4 pt-4 text-sm text-muted-foreground">
                                            {unit.description && (
                                                <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                                                    {unit.description}
                                                </p>
                                            )}

                                            <div className="space-y-2.5 pt-2 border-t border-border/80 text-xs">
                                                {/* Endereço */}
                                                <div className="flex items-start gap-2.5 text-foreground font-medium">
                                                    <MapPin className={`size-4 ${isAmber ? 'text-amber-600 dark:text-[#FFBE00]' : isEmerald ? 'text-emerald-600' : 'text-primary'} shrink-0 mt-0.5`} />
                                                    <span>{unit.address || (unit.slug.includes('veracruz') ? contactAddressVeracruz : contactAddressSalvador)}</span>
                                                </div>

                                                {/* Turnos */}
                                                {(unit.shifts || true) && (
                                                    <div className="flex items-center gap-2.5 text-foreground font-medium">
                                                        <Clock className={`size-4 ${isAmber ? 'text-amber-600 dark:text-[#FFBE00]' : isEmerald ? 'text-emerald-600' : 'text-primary'} shrink-0`} />
                                                        <span>{unit.shifts || 'Turnos: Matutino, Vespertino e Noturno'}</span>
                                                    </div>
                                                )}

                                                {/* Telefone / WhatsApp */}
                                                <div className="flex items-center gap-2.5 text-foreground">
                                                    <Phone className={`size-4 ${isAmber ? 'text-amber-600 dark:text-[#FFBE00]' : isEmerald ? 'text-emerald-600' : 'text-primary'} shrink-0`} />
                                                    <span>
                                                        {unit.phone || contactPhone}
                                                    </span>
                                                    <a
                                                        href={`https://wa.me/55${(unit.phone || contactPhone).replace(/\D/g, '')}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline ml-2"
                                                    >
                                                        <MessageCircle className="size-3" />
                                                        <span>WhatsApp</span>
                                                    </a>
                                                </div>

                                                {/* E-mail */}
                                                <div className="flex items-center gap-2.5 text-foreground">
                                                    <Mail className={`size-4 ${isAmber ? 'text-amber-600 dark:text-[#FFBE00]' : isEmerald ? 'text-emerald-600' : 'text-primary'} shrink-0`} />
                                                    <a
                                                        href={`mailto:${unit.email || contactEmail}`}
                                                        className="hover:underline text-muted-foreground hover:text-foreground"
                                                    >
                                                        {unit.email || contactEmail}
                                                    </a>
                                                </div>
                                            </div>

                                            <div className="pt-2">
                                                <a href="#inscricoes">
                                                    <Button
                                                        variant={isAmber ? 'accent' : 'default'}
                                                        className={`w-full ${isAmber ? 'bg-[#FFBE00] text-[#0D1640] hover:bg-[#e6ab00] font-bold' : 'bg-[#1A4FD6] hover:bg-[#1540B5] text-white font-semibold'}`}
                                                    >
                                                        📍 Ver Endereço & Horários para Inscrição Presencial
                                                    </Button>
                                                </a>
                                            </div>
                                        </div>
                                    </Card>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 10. INSCRIÇÕES PRESENCIAIS & POLOS DE ATENDIMENTO (#inscricoes) */}
            <section id="inscricoes" className="py-20 bg-gradient-to-b from-[#0D1640] to-[#121B48] text-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollReveal direction="up" className="text-center space-y-4 mb-14 max-w-3xl mx-auto">
                        <Badge className="bg-[#FFBE00] text-[#0D1640] font-bold text-xs uppercase tracking-wider py-1 px-3">
                            Inscrições 100% Presenciais & Gratuitas
                        </Badge>
                        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                            Onde e Como se Inscrever no CAIS BANTU
                        </h2>
                        <p className="text-[#9AA5C4] text-base sm:text-lg leading-relaxed">
                            As matrículas e o acolhimento são realizados <strong>diretamente nos nossos polos físicos de atendimento</strong>. Escolha a unidade mais próxima, confira os horários e compareça com seus documentos para garantir sua vaga!
                        </p>
                    </ScrollReveal>

                    {/* Guia em 3 Passos Simples */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <ScrollReveal direction="up" delay={100}>
                            <div className="rounded-3xl bg-white/5 border border-white/10 p-6 space-y-3 backdrop-blur-md h-full">
                                <div className="flex size-12 items-center justify-center rounded-2xl bg-[#FFBE00] text-[#0D1640] font-display text-xl font-bold shadow-md">
                                    1
                                </div>
                                <h3 className="font-display text-lg font-bold text-white">
                                    Escolha o Polo Territorial
                                </h3>
                                <p className="text-xs sm:text-sm text-[#9AA5C4] leading-relaxed">
                                    Escolha a unidade mais próxima: <strong>Salvador – Núcleo SSA</strong> ou <strong>Vera Cruz – Casa Bantu Vila Rosa</strong>.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal direction="up" delay={200}>
                            <div className="rounded-3xl bg-white/5 border border-white/10 p-6 space-y-3 backdrop-blur-md h-full">
                                <div className="flex size-12 items-center justify-center rounded-2xl bg-[#1A4FD6] text-white font-display text-xl font-bold shadow-md">
                                    2
                                </div>
                                <h3 className="font-display text-lg font-bold text-white">
                                    Separe seus Documentos
                                </h3>
                                <p className="text-xs sm:text-sm text-[#9AA5C4] leading-relaxed">
                                    Leve seu <strong>RG / Documento com foto</strong>, <strong>CPF</strong> e <strong>Comprovante de Residência</strong> atualizado.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal direction="up" delay={300}>
                            <div className="rounded-3xl bg-white/5 border border-white/10 p-6 space-y-3 backdrop-blur-md h-full">
                                <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-500 text-white font-display text-xl font-bold shadow-md">
                                    3
                                </div>
                                <h3 className="font-display text-lg font-bold text-white">
                                    Compareça Pessoalmente
                                </h3>
                                <p className="text-xs sm:text-sm text-[#9AA5C4] leading-relaxed">
                                    Dirija-se ao polo no horário de funcionamento. Nossa equipe de acolhimento fará sua matrícula e apresentação do curso.
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Cards dos Polos com Endereços Completos e Rotas */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {displayUnits.map((unit, unitIdx) => {
                            const isAmber = unit.color_theme === 'amber' || unit.slug.includes('veracruz');
                            const isEmerald = unit.color_theme === 'emerald';
                            const fullAddress = unit.address || (unit.slug.includes('veracruz') ? contactAddressVeracruz : contactAddressSalvador);
                            const cleanPhone = (unit.phone || contactPhone).replace(/\D/g, '');

                            return (
                                <ScrollReveal key={unit.id} direction="up" delay={unitIdx * 150}>
                                    <Card
                                        className={`rounded-3xl border-2 transition-all p-6 sm:p-8 bg-card text-card-foreground shadow-2xl flex flex-col justify-between h-full ${isAmber
                                            ? 'border-[#FFBE00]'
                                            : isEmerald
                                                ? 'border-emerald-500'
                                                : 'border-[#1A4FD6]'
                                            }`}
                                    >
                                        <div className="space-y-6">
                                            {/* Cabeçalho do Polo */}
                                            <div className="flex items-center justify-between gap-3 pb-4 border-b border-border/80">
                                                <div className="flex items-center gap-3.5">
                                                    <div
                                                        className={`flex size-14 items-center justify-center rounded-2xl ${isAmber
                                                            ? 'bg-[#FFBE00]/20 text-[#0D1640] dark:text-[#FFBE00]'
                                                            : isEmerald
                                                                ? 'bg-emerald-500/20 text-emerald-600'
                                                                : 'bg-[#1A4FD6]/15 text-[#1A4FD6]'
                                                            }`}
                                                    >
                                                        {unit.icon === 'Trees' ? (
                                                            <Trees className="size-7" />
                                                        ) : (
                                                            <Building2 className="size-7" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <Badge
                                                            className={`text-[11px] font-bold mb-1 ${isAmber
                                                                ? 'bg-[#FFBE00] text-[#0D1640]'
                                                                : isEmerald
                                                                    ? 'bg-emerald-600 text-white'
                                                                    : 'bg-[#1A4FD6] text-white'
                                                                }`}
                                                        >
                                                            {unit.badge || 'Polo Oficial'}
                                                        </Badge>
                                                        <h3 className="font-display text-2xl font-bold text-foreground">
                                                            {unit.name}
                                                        </h3>
                                                        <p className="text-xs text-muted-foreground">
                                                            {unit.subtitle || `Polo Territorial ${unit.slug}`}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Endereço em Destaque */}
                                            <div className="rounded-2xl bg-secondary/60 p-4 border border-border space-y-3">
                                                <div className="flex items-start gap-3 text-foreground font-semibold text-sm">
                                                    <MapPin className={`size-5 shrink-0 mt-0.5 ${isAmber ? 'text-amber-600 dark:text-[#FFBE00]' : 'text-[#1A4FD6]'}`} />
                                                    <div>
                                                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-0.5">
                                                            Endereço de Atendimento & Inscrição Presencial:
                                                        </span>
                                                        <span className="text-base text-foreground font-bold">
                                                            {fullAddress}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3 text-xs text-muted-foreground pt-2 border-t border-border/60">
                                                    <Clock className={`size-4 shrink-0 ${isAmber ? 'text-amber-600 dark:text-[#FFBE00]' : 'text-[#1A4FD6]'}`} />
                                                    <span className="font-medium text-foreground">
                                                        {unit.shifts || 'Turnos de Atendimento: Matutino, Vespertino e Noturno'}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Contatos do Polo */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                                <div className="flex items-center gap-2 text-muted-foreground p-3 rounded-xl bg-muted/40 border border-border/60">
                                                    <Phone className="size-4 text-primary shrink-0" />
                                                    <div>
                                                        <span className="text-[10px] uppercase font-bold text-muted-foreground block">Telefone</span>
                                                        <span className="font-bold text-foreground">{unit.phone || contactPhone}</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 text-muted-foreground p-3 rounded-xl bg-muted/40 border border-border/60">
                                                    <Mail className="size-4 text-primary shrink-0" />
                                                    <div className="truncate">
                                                        <span className="text-[10px] uppercase font-bold text-muted-foreground block">E-mail</span>
                                                        <span className="font-medium text-foreground truncate block">{unit.email || contactEmail}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {unit.description && (
                                                <p className="text-xs text-muted-foreground leading-relaxed">
                                                    {unit.description}
                                                </p>
                                            )}
                                        </div>

                                        {/* Botões de Ação para o Usuário */}
                                        <div className="pt-6 mt-6 border-t border-border/80 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <a
                                                href={unit.maps_url && unit.maps_url.trim().length > 0 ? unit.maps_url : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full"
                                            >
                                                <Button
                                                    variant="outline"
                                                    className="w-full border-primary/30 hover:bg-primary/10 text-primary font-bold text-xs sm:text-sm h-11 gap-2"
                                                >
                                                    <MapPin className="size-4" />
                                                    <span>Traçar Rota no Mapa</span>
                                                </Button>
                                            </a>

                                            <a
                                                href={`https://wa.me/55${cleanPhone}?text=${encodeURIComponent(`Olá! Gostaria de informações sobre como me inscrever presencialmente no ${unit.name} do CAIS BANTU.`)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full"
                                            >
                                                <Button
                                                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm h-11 gap-2 shadow-md"
                                                >
                                                    <MessageCircle className="size-4" />
                                                    <span>Tirar Dúvidas no WhatsApp</span>
                                                </Button>
                                            </a>
                                        </div>
                                    </Card>
                                </ScrollReveal>
                            );
                        })}
                    </div>

                    {/* Box de Documentação Necessária */}
                    <ScrollReveal direction="up" delay={200}>
                        <div className="mt-12 rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-8 backdrop-blur-md">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex size-10 items-center justify-center rounded-xl bg-[#FFBE00] text-[#0D1640] font-bold">
                                        <Shield className="size-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-display text-lg font-bold text-white">
                                            Documentação Necessária para Inscrição no Polo
                                        </h4>
                                        <p className="text-xs text-[#9AA5C4]">
                                            Apresente os documentos abaixo no momento do seu comparecimento presencial
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-white/90">
                                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                                    <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                                    <span>Documento Oficial com Foto (RG ou CNH)</span>
                                </div>
                                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                                    <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                                    <span>CPF (Cadastro de Pessoa Física)</span>
                                </div>
                                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                                    <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                                    <span>Comprovante de Residência Atualizado</span>
                                </div>
                                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                                    <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                                    <span>Menores de 18 anos com Responsável</span>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* 11. EQUIPE & DIRETORIA */}
            <section id="equipe" className="py-20 bg-[#F2F5FF] dark:bg-[#090F2C] overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollReveal direction="up" className="text-center max-w-3xl mx-auto space-y-4">
                        <Badge variant="outline" className="border-[#1A4FD6]/30 bg-[#1A4FD6]/10 text-[#1A4FD6] dark:text-[#9AA5C4]">
                            Corpo Técnico & Gestão
                        </Badge>
                        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                            Diretoria & Educadores
                        </h2>
                        <p className="text-muted-foreground text-base sm:text-lg">
                            Profissionais qualificados, psicólogas, assistentes sociais e mestres comprometidos com a emancipação e acolhimento dos participantes.
                        </p>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-12">
                        {team.map((member: any, memberIdx: number) => {
                            const photoSrc = member.photo_url || (member.photo ? (member.photo.startsWith('http') || member.photo.startsWith('/') ? member.photo : `/storage/${member.photo}`) : null);

                            return (
                                <ScrollReveal key={member.id} direction="up" delay={memberIdx * 100}>
                                    <Card className="rounded-3xl hover:border-primary/50 transition-all text-center p-6 space-y-4 flex flex-col justify-between h-full">
                                        <div className="space-y-3">
                                            <div className="flex size-16 mx-auto items-center justify-center rounded-full bg-[#1A4FD6] font-display text-xl font-bold text-white shadow-md overflow-hidden ring-2 ring-[#1A4FD6]/20">
                                                {photoSrc ? (
                                                    <img
                                                        src={photoSrc}
                                                        alt={member.name}
                                                        className="size-full object-cover rounded-full"
                                                        onError={(e) => {
                                                            e.currentTarget.style.display = 'none';
                                                            const fallback = e.currentTarget.parentElement?.querySelector('.avatar-fallback');
                                                            if (fallback) (fallback as HTMLElement).style.display = 'flex';
                                                        }}
                                                    />
                                                ) : null}
                                                <span className={`avatar-fallback ${photoSrc ? 'hidden' : 'flex'} items-center justify-center size-full`}>
                                                    {member.name.charAt(0)}
                                                </span>
                                            </div>
                                            <div>
                                                <h3 className="font-display text-base font-bold text-foreground leading-snug">
                                                    {member.name}
                                                </h3>
                                                <Badge variant="outline" className="text-[11px] mt-1 text-primary border-primary/20">
                                                    {member.role}
                                                </Badge>
                                            </div>
                                        </div>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            {member.description}
                                        </p>
                                    </Card>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 12. NOTÍCIAS, EDITAIS & HISTÓRIAS */}
            <section id="noticias" className="py-20 bg-white dark:bg-[#0D1640] overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollReveal direction="up" className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/80 pb-6">
                        <div className="space-y-2">
                            <Badge className="bg-[#FFBE00] text-[#0D1640] font-bold">
                                Informação & Transparência
                            </Badge>
                            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground">
                                Notícias e Editais
                            </h2>
                        </div>
                        <span className="text-xs text-muted-foreground">
                            Acompanhe o cronograma e eventos do CAIS BANTU
                        </span>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        {news.map((item, itemIdx) => (
                            <ScrollReveal key={item.id} direction="up" delay={itemIdx * 150}>
                                <Card className="rounded-3xl hover:border-primary/50 transition-all hover:shadow-md flex flex-col justify-between h-full">
                                    <CardHeader className="space-y-2">
                                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                                            <Badge variant="outline" className="text-[11px] font-semibold">
                                                {item.category}
                                            </Badge>
                                            <span>{item.date_label}</span>
                                        </div>
                                        <CardTitle className="text-lg leading-snug pt-2 font-bold text-foreground">
                                            {item.title}
                                        </CardTitle>
                                        <CardDescription className="text-sm leading-relaxed">
                                            {item.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <Button
                                            type="button"
                                            variant="link"
                                            onClick={() => handleOpenNews(item)}
                                            className="px-0 text-[#1A4FD6] dark:text-[#FFBE00] font-bold text-xs gap-1 hover:underline cursor-pointer"
                                        >
                                            Ler matéria completa &rarr;
                                        </Button>
                                    </CardContent>
                                </Card>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* 13. PARCEIROS & FINANCIADORES */}
            <section className="py-16 bg-[#F2F5FF] dark:bg-[#090F2C] border-y border-border/80 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    <ScrollReveal direction="up" className="text-center space-y-2">
                        <Badge variant="outline" className="border-[#1A4FD6]/30 bg-[#1A4FD6]/10 text-[#1A4FD6] dark:text-[#9AA5C4]">
                            Parcerias & Cooperação
                        </Badge>
                        <h3 className="font-display text-2xl font-bold text-foreground">
                            Rede de Apoio, Financiamento e Articulação Territorial
                        </h3>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <ScrollReveal direction="up" delay={50}>
                            <Card className="p-5 rounded-2xl bg-card border-border/80 hover:border-primary/40 transition-all text-left space-y-2 h-full">
                                <h4 className="font-display font-bold text-base text-foreground leading-snug">
                                    SENAD / Ministério da Justiça e Segurança Pública
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Órgão concedente e financiador da parceria CAIS.
                                </p>
                            </Card>
                        </ScrollReveal>

                        <ScrollReveal direction="up" delay={150}>
                            <Card className="p-5 rounded-2xl bg-card border-border/80 hover:border-primary/40 transition-all text-left space-y-2 h-full">
                                <h4 className="font-display font-bold text-base text-foreground leading-snug">
                                    Associação Comunitária de Matarandiba
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Parceria comunitária e territorial em Vera Cruz.
                                </p>
                            </Card>
                        </ScrollReveal>

                        <ScrollReveal direction="up" delay={250}>
                            <Card className="p-5 rounded-2xl bg-card border-border/80 hover:border-primary/40 transition-all text-left space-y-2 h-full">
                                <h4 className="font-display font-bold text-base text-foreground leading-snug">
                                    Maré de Março
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Rede cultural parceira no território de Itaparica.
                                </p>
                            </Card>
                        </ScrollReveal>

                        <ScrollReveal direction="up" delay={350}>
                            <Card className="p-5 rounded-2xl bg-card border-border/80 hover:border-primary/40 transition-all text-left space-y-2 h-full">
                                <h4 className="font-display font-bold text-base text-foreground leading-snug">
                                    Instituto Entre Aspas
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Instituição parceira na articulação territorial em Salvador.
                                </p>
                            </Card>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* 14. CONTATO & RODAPÉ */}
            <footer id="contato" className="bg-[#0D1640] text-white pt-20 pb-12 border-t border-white/10 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollReveal direction="up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
                        {/* Coluna 1: Logo & Sobre */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3.5">
                                <div className="flex size-16 sm:size-20 shrink-0 items-center justify-center rounded-full bg-white/10 p-1 shadow-md overflow-hidden ring-2 ring-[#FFBE00]/30">
                                    <img
                                        src="/apple-touch-icon.png"
                                        alt="Logo CAIS Bantu"
                                        className="size-full object-contain rounded-full"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                            const fallback = e.currentTarget.parentElement?.querySelector('.fallback-ib');
                                            if (fallback) (fallback as HTMLElement).style.display = 'flex';
                                        }}
                                    />
                                    <div className="fallback-ib hidden size-full items-center justify-center rounded-full bg-[#FFBE00] font-display text-sm font-bold text-[#0D1640]">
                                        CAIS
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-display font-bold text-lg sm:text-xl text-white leading-tight">
                                        CAIS BANTU
                                    </span>
                                    <span className="text-[11px] text-[#FFBE00] font-semibold mt-0.5">
                                        Direitos • Inclusão • Cidadania
                                    </span>
                                </div>
                            </div>
                            <p className="text-xs text-[#9AA5C4] leading-relaxed">
                                Centro de Acesso a Direitos e Inclusão Social Afrocentrado. Realização do Instituto Cultural Bantu (OSC fundada em 2006).
                            </p>
                            <p className="text-xs text-[#FFBE00] font-semibold">
                                Salvador • Vera Cruz • Ilha de Itaparica
                            </p>
                        </div>

                        {/* Coluna 2: Navegação Rápida */}
                        <div className="space-y-3">
                            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
                                Navegação
                            </h4>
                            <ul className="space-y-2 text-xs text-[#9AA5C4]">
                                <li><a href="#projeto" className="hover:text-white transition-colors">O Projeto</a></li>
                                <li><a href="#cursos" className="hover:text-white transition-colors">Cursos Oferecidos</a></li>
                                <li><a href="#metodologia" className="hover:text-white transition-colors">Metodologia Afrocentrada</a></li>
                                <li><a href="#publico" className="hover:text-white transition-colors">Quem Pode Participar</a></li>
                                <li><a href="#unidades" className="hover:text-white transition-colors">Unidades de Atendimento</a></li>
                            </ul>
                        </div>

                        {/* Coluna 3: Cursos */}
                        <div className="space-y-3">
                            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
                                Cursos 2026
                            </h4>
                            <ul className="space-y-2 text-xs text-[#9AA5C4]">
                                <li>Letramento Digital</li>
                                <li>Empreendedorismo e Artesanato</li>
                                <li>Produção Audiovisual</li>
                                <li>Instrutor(a) de Ioga</li>
                                <li>Agente Ambiental</li>
                            </ul>
                        </div>

                        {/* Coluna 4: Contato Direto */}
                        <div className="space-y-3">
                            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
                                Atendimento & Contato
                            </h4>
                            <div className="space-y-2 text-xs text-[#9AA5C4]">
                                <div className="flex items-center gap-2">
                                    <Phone className="size-4 text-[#FFBE00]" />
                                    <span>(71) 99225-4706 | (71) 99642-8078</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail className="size-4 text-[#FFBE00]" />
                                    <span>{contactEmail}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="size-4 text-[#FFBE00]" />
                                    <span>Salvador – BA e Vera Cruz – Ilha de Itaparica – BA</span>
                                </div>
                            </div>
                            <div className="pt-2">
                                <a href="#inscricoes">
                                    <Button variant="accent" size="sm" className="w-full bg-[#FFBE00] text-[#0D1640] font-bold hover:bg-[#e6ab00]">
                                        📍 Onde se Inscrever Presencialmente
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Bottom Bar */}
                    <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#9AA5C4] gap-4">
                        <p>© 2026 Instituto Cultural Bantu. Todos os direitos reservados.</p>
                        <div className="flex items-center gap-4">
                            <span>Acolhimento • Qualificação • Cidadania</span>
                            {auth.user ? (
                                <Link href={dashboard()} className="text-[#FFBE00] hover:underline font-semibold">
                                    Painel Administrativo
                                </Link>
                            ) : (
                                <Link href={login()} className="text-[#FFBE00] hover:underline font-semibold">
                                    Acesso Administrativo
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </footer>

            {/* MODAL DE NOTÍCIA / EDITAL COMPLETO */}
            <Dialog open={newsModalOpen} onOpenChange={handleCloseNews}>
                <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto p-6 sm:p-8 rounded-3xl border-border bg-card">
                    {selectedNews && (
                        <div className="space-y-6">
                            <DialogHeader className="space-y-3 text-left">
                                <div className="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-border/80">
                                    <Badge className="bg-[#1A4FD6] text-white font-semibold text-xs px-3 py-1">
                                        {selectedNews.category || 'Notícia'}
                                    </Badge>
                                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                                        <Calendar className="size-3.5" />
                                        <span>{selectedNews.date_label || 'Data recente'}</span>
                                    </div>
                                </div>

                                <DialogTitle className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-snug">
                                    {selectedNews.title}
                                </DialogTitle>

                                {selectedNews.description && (
                                    <DialogDescription className="text-base font-medium text-foreground/80 leading-relaxed bg-muted/40 p-4 rounded-2xl border border-border/60">
                                        {selectedNews.description}
                                    </DialogDescription>
                                )}
                            </DialogHeader>

                            {/* Conteúdo Completo */}
                            <div className="space-y-4 text-sm sm:text-base leading-relaxed text-muted-foreground border-t border-border/60 pt-4">
                                {(selectedNews.content || selectedNews.description || '')
                                    .split('\n')
                                    .filter((p: string) => p.trim().length > 0)
                                    .map((paragraph: string, idx: number) => (
                                        <p key={idx} className="text-foreground/90 leading-relaxed">
                                            {paragraph}
                                        </p>
                                    ))}
                            </div>

                            {/* Banner de Ação Comunitária */}
                            <div className="rounded-2xl bg-gradient-to-br from-[#0D1640] to-[#1A4FD6] p-6 text-white space-y-3 mt-6 shadow-md">
                                <div className="flex items-center gap-2 text-[#FFBE00] font-bold text-xs uppercase tracking-wider">
                                    <Sparkles className="size-4" />
                                    <span>Participe do Ecossistema Bantu</span>
                                </div>
                                <h4 className="font-display text-lg font-bold">
                                    Deseja se inscrever em um dos nossos cursos?
                                </h4>
                                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                                    As inscrições são 100% gratuitas e realizadas presencialmente nos polos Salvador e Vera Cruz.
                                </p>
                                <div className="pt-2 flex flex-wrap items-center gap-3">
                                    <Button
                                        onClick={() => {
                                            handleCloseNews();
                                            const elem = document.getElementById('inscricoes');
                                            if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className="bg-[#FFBE00] hover:bg-[#e6ab00] text-[#0D1640] font-bold text-xs sm:text-sm shadow-md"
                                    >
                                        📍 Ver Endereços dos Polos para Inscrição &rarr;
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={handleCloseNews}
                                        className="text-white border-white/30 hover:bg-white/10 text-xs sm:text-sm"
                                    >
                                        Fechar Matéria
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
