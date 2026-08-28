<?php

namespace Database\Seeders;

use App\Models\CaisCourse;
use App\Models\CaisNews;
use App\Models\CaisTeamMember;
use App\Models\Enrollment;
use App\Models\LandingPageSetting;
use App\Models\LandingPageSection;
use Illuminate\Database\Seeder;

class LandingPageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Configurações da Landing Page
        $settings = [
            // Top Announcement
            'announcement_active' => '1',
            'announcement_text' => 'Inscrições Abertas 2026 • 300 Vagas Gratuitas em Salvador e Vera Cruz / Itaparica',
            'announcement_link' => '#inscricoes',
            'announcement_badge' => 'NOVO',

            // Hero Section
            'hero_badge' => 'Centro de Acesso a Direitos e Inclusão Social Afrocentrado',
            'hero_title' => 'CAIS BANTU',
            'hero_subtitle' => 'Acolher, qualificar e gerar oportunidades para fortalecer a autonomia, a cidadania e a inclusão social.',
            'hero_description' => 'Uma iniciativa do Instituto Cultural Bantu, realizada em parceria com a SENAD/MJSP, voltada à promoção do acesso a direitos, da inclusão social e produtiva e da autonomia. Formação profissional gratuita, acolhimento psicossocial e tecnologia social afrocentrada.',

            // Metas de Impacto
            'meta_beneficiaries' => '300',
            'meta_classes' => '10',
            'meta_hours' => '160h',
            'meta_units' => '2 Polos',

            // Contato e Rodapé
            'contact_phone' => '(71) 99225-4706',
            'contact_whatsapp' => '(71) 99225-4706',
            'contact_email' => 'bantu-contato@institutobantu.org',
            'contact_address_salvador' => 'Rua Mello Moraes Filho, nº 392 – Fazenda Grande do Retiro, Salvador – BA',
            'contact_address_veracruz' => 'Rua do Congo, nº 25 – Loteamento Parque das Mangueiras, Vera Cruz – BA | CEP: 44470-000',
            'social_instagram' => '@institutobantu',
            'social_facebook' => 'institutobantuoficial',
        ];

        foreach ($settings as $key => $value) {
            LandingPageSetting::updateOrCreate(['key' => $key], ['value' => $value, 'group' => 'general']);
        }

        // 2. Cursos
        $courses = [
            [
                'slug' => 'letramento-digital',
                'title' => 'Letramento Digital',
                'category' => 'Tecnologia & Inclusão',
                'icon' => 'Laptop',
                'hours' => '160 Horas',
                'badge_color' => 'bg-[#1A4FD6] text-white',
                'description' => 'Capacitação prática em ferramentas digitais, navegação segura, criação de currículos online, rotinas de escritório e cidadania digital para inserção no mercado de trabalho moderno.',
                'topics' => [
                    'Informática Básica & Produtividade',
                    'Internet, Segurança & Cidadania Digital',
                    'Ferramentas Google & Aplicativos em Nuvem',
                    'Elaboração de Portfólios Digitais',
                ],
                'opportunities' => 'Assistente administrativo, atendimento ao cliente, suporte operacional e autonomia digital.',
                'active' => true,
                'order' => 1,
            ],
            [
                'slug' => 'empreendedorismo-artesanato',
                'title' => 'Empreendedorismo e Artesanato',
                'category' => 'Economia Criativa',
                'icon' => 'Palette',
                'hours' => '160 Horas',
                'badge_color' => 'bg-[#FFBE00] text-[#0D1640]',
                'description' => 'Desenvolvimento de negócios solidários, técnicas artesanais afro-brasileiras, precificação justa, marketing para redes sociais e fortalecimento da economia comunitária.',
                'topics' => [
                    'Produção Artesanal & Identidade Cultural',
                    'Gestão Financeira & Precificação',
                    'Canais de Venda & Feiras Criativas',
                    'Planejamento de Microempreendimentos',
                ],
                'opportunities' => 'Artesão(ã) autônomo(a), gestor(a) de marca comunitária e geração de renda domiciliar.',
                'active' => true,
                'order' => 2,
            ],
            [
                'slug' => 'produtor-audiovisual',
                'title' => 'Produção Audiovisual',
                'category' => 'Comunicação & Mídias',
                'icon' => 'Video',
                'hours' => '160 Horas',
                'badge_color' => 'bg-[#1A4FD6] text-white',
                'description' => 'Formação em captação de imagem e som com celulares e câmeras, edição de vídeo, criação de conteúdo para mídias sociais e valorização das narrativas periféricas e afrocentradas.',
                'topics' => [
                    'Roteiro, Captação & Iluminação Básica',
                    'Edição em Smartphones & Computadores',
                    'Mídias Sociais & Storytelling Periférico',
                    'Produção de Documentários & Videoclipes',
                ],
                'opportunities' => 'Criador(a) de conteúdo, assistente de edição, videorrepórter comunitário(a) e mídias sociais.',
                'active' => true,
                'order' => 3,
            ],
            [
                'slug' => 'instrutor-ioga',
                'title' => 'Instrutor(a) de Ioga',
                'category' => 'Saúde Integral & Bem-Estar',
                'icon' => 'Sun',
                'hours' => '160 Horas',
                'badge_color' => 'bg-emerald-600 text-white',
                'description' => 'Práticas corporais ancestrais, respiração consciente, meditação e promoção da saúde mental e física, qualificando instrutores comunitários para atuação em coletivos e escolas.',
                'topics' => [
                    'Fundamentos das Posturas (Asanas) & Respiração',
                    'Anatomia Básica & Saúde Mental',
                    'Metodologia de Ensino Comunitário',
                    'Autocuidado & Terapias Integrativas',
                ],
                'opportunities' => 'Instrutor(a) de práticas integrativas em ONGs, centros comunitários e aulas particulares.',
                'active' => true,
                'order' => 4,
            ],
            [
                'slug' => 'agente-ambiental',
                'title' => 'Agente Ambiental',
                'category' => 'Sustentabilidade & Meio Ambiente',
                'icon' => 'Leaf',
                'hours' => '160 Horas',
                'badge_color' => 'bg-emerald-700 text-white',
                'description' => 'Educação ambiental prática, conservação de ecossistemas costeiros em Salvador e Vera Cruz, gestão de resíduos sólidos, compostagem e agroecologia urbana comunitária.',
                'topics' => [
                    'Preservação Marinha & Manguezais',
                    'Manejo de Resíduos & Reciclagem Popular',
                    'Hortas Comunitárias & Agroecologia',
                    'Políticas Públicas de Meio Ambiente',
                ],
                'opportunities' => 'Educador(a) ambiental, consultor(a) de projetos de sustentabilidade e cooperativas verdes.',
                'active' => true,
                'order' => 5,
            ],
        ];

        foreach ($courses as $c) {
            CaisCourse::updateOrCreate(['slug' => $c['slug']], $c);
        }

        // 3. Notícias
        // $news = [
        //     [
        //         'slug' => 'edital-2026-aberto-300-vagas-gratuitas-cais-bantu',
        //         'title' => 'Edital 2026 Aberto: 300 Vagas Gratuitas no CAIS BANTU',
        //         'category' => 'Inscrições',
        //         'date_label' => '15 de Agosto de 2026',
        //         'description' => 'Inscrições abertas para as unidades Salvador e Vera Cruz. Conheça os critérios e garanta sua participação.',
        //         'content' => 'O Instituto Cultural Bantu torna público o edital de seleção para as 10 turmas de qualificação profissional...',
        //         'published' => true,
        //     ],
        //     [
        //         'slug' => 'capoeira-angola-e-saude-mental',
        //         'title' => 'Capoeira Angola e Saúde Mental: O Papel da Ancestralidade',
        //         'category' => 'Metodologia',
        //         'date_label' => '08 de Agosto de 2026',
        //         'description' => 'Artigo sobre como as rodas de Capoeira Angola funcionam como espaço de escuta, corpo e tecnologia social.',
        //         'content' => 'A Capoeira Angola transcende a arte marcial tornando-se uma rica tecnologia social comunitária...',
        //         'published' => true,
        //     ],
        //     [
        //         'slug' => 'inauguracao-polo-inclusao-digital-itaparica',
        //         'title' => 'Inauguração do Polo de Inclusão Digital na Ilha de Itaparica',
        //         'category' => 'Unidades',
        //         'date_label' => '28 de Julho de 2026',
        //         'description' => 'Nova sala multimídia atenderá jovens e pescadores artesanais no município de Vera Cruz.',
        //         'content' => 'Com equipamentos de última geração e internet de alta velocidade, a nova unidade atenderá dezenas de famílias...',
        //         'published' => true,
        //     ],
        // ];

        foreach ($news as $n) {
            CaisNews::updateOrCreate(['slug' => $n['slug']], $n);
        }

        // 4. Equipe Oficial
        CaisTeamMember::truncate();
        $team = [
            [
                'name' => 'Edielson Miranda (Mestre Roxinho)',
                'role' => 'Diretor Geral & Fundador',
                'description' => 'Educador social, gestor social, mestre de Capoeira Angola e ativista dos direitos humanos.',
                'order' => 1,
                'active' => true,
            ],
            [
                'name' => 'Simone Paixão',
                'role' => 'Coordenação Psicossocial',
                'description' => 'Psicóloga responsável pelo acompanhamento e acolhimento psicossocial dos participantes.',
                'order' => 2,
                'active' => true,
            ],
            [
                'name' => 'David Assunção',
                'role' => 'Coordenação Pedagógica',
                'description' => 'Responsável pelo acompanhamento e desenvolvimento pedagógico das atividades e participantes.',
                'order' => 3,
                'active' => true,
            ],
            [
                'name' => 'Monique Marques',
                'role' => 'Coordenação de Inclusão Produtiva',
                'description' => 'Responsável pelas ações voltadas à inclusão produtiva e geração de oportunidades.',
                'order' => 4,
                'active' => true,
            ],
            [
                'name' => 'Elisângela Araújo',
                'role' => 'Assistente Social',
                'description' => 'Responsável pelo acompanhamento e orientação social dos participantes e famílias.',
                'order' => 5,
                'active' => true,
            ],
        ];

        foreach ($team as $member) {
            CaisTeamMember::create($member);
        }

        // 5. Inscrições de Demonstração
        $enrollments = [
            [
                'name' => 'Adriele Conceição dos Santos',
                'email' => 'adriele.santos@exemplo.com',
                'phone' => '(71) 98711-2233',
                'unit' => 'salvador',
                'course' => 'Letramento Digital',
                'audience' => 'mulher',
                'status' => 'novo',
                'notes' => 'Interessada no turno matutino para conciliar com os cuidados da família.',
            ],
            [
                'name' => 'Mateus Oliveira de Jesus',
                'email' => 'mateus.jesus@exemplo.com',
                'phone' => '(71) 99122-3344',
                'unit' => 'veracruz',
                'course' => 'Agente Ambiental',
                'audience' => 'jovem',
                'status' => 'contatado',
                'notes' => 'Contatado via WhatsApp em 16/08. Documentos solicitados.',
            ],
            [
                'name' => 'Crislane da Silva Ferreira',
                'email' => 'crislane.silva@exemplo.com',
                'phone' => '(71) 98344-5566',
                'unit' => 'salvador',
                'course' => 'Produção Audiovisual',
                'audience' => 'jovem',
                'status' => 'matriculado',
                'notes' => 'Matrícula confirmada na Turma 01 - Noturno.',
            ],
            [
                'name' => 'Benedito Valdomiro',
                'email' => 'benedito.valdomiro@exemplo.com',
                'phone' => '(71) 99755-6677',
                'unit' => 'veracruz',
                'course' => 'Empreendedorismo e Artesanato',
                'audience' => 'negra',
                'status' => 'novo',
                'notes' => 'Membro da comunidade quilombola local.',
            ],
        ];

        foreach ($enrollments as $e) {
            Enrollment::updateOrCreate(['email' => $e['email']], $e);
        }

        // 6. Unidades (Polos)
        $units = [
            [
                'slug' => 'salvador',
                'name' => 'UNIDADE SALVADOR',
                'subtitle' => 'ICBANTU – Núcleo SSA · Polo Capital · Centro Histórico & Periferias',
                'badge' => 'Polo Salvador',
                'description' => 'Foco em Letramento Digital, Produção Audiovisual, Instrutor de Ioga e Empreendedorismo e Artesanato.',
                'address' => 'Rua Mello Moraes Filho, nº 392 – Fazenda Grande do Retiro, Salvador – BA',
                'maps_url' => 'https://www.google.com/maps/search/?api=1&query=Rua+Mello+Moraes+Filho+392+Fazenda+Grande+do+Retiro+Salvador+BA',
                'shifts' => 'Turnos: Matutino, Vespertino e Noturno',
                'phone' => '(71) 99642-8078',
                'email' => 'bantu-contato@institutobantu.org',
                'icon' => 'Building2',
                'color_theme' => 'blue',
                'active' => true,
                'order' => 1,
            ],
            [
                'slug' => 'veracruz',
                'name' => 'UNIDADE VERA CRUZ',
                'subtitle' => 'Casa Bantu Vila Rosa · Polo Ilha de Itaparica · Litoral & Comunidades',
                'badge' => 'Polo Vera Cruz',
                'description' => 'Foco em Agente Ambiental, Artesanato Sustentável, Letramento Digital e turismo de base comunitária.',
                'address' => 'Rua do Congo, nº 25 – Loteamento Parque das Mangueiras, Vera Cruz – BA | CEP: 44470-000',
                'maps_url' => 'https://www.google.com/maps/search/?api=1&query=Rua+do+Congo+25+Loteamento+Parque+das+Mangueiras+Vera+Cruz+BA',
                'shifts' => 'Turnos: Matutino e Vespertino',
                'phone' => '(71) 99225-4706',
                'email' => 'bantu-contato@institutobantu.org',
                'icon' => 'Trees',
                'color_theme' => 'amber',
                'active' => true,
                'order' => 2,
            ],
        ];

        foreach ($units as $u) {
            \App\Models\Unit::updateOrCreate(['slug' => $u['slug']], $u);
        }

        // 7. Critérios de Acesso & Público-Alvo (#publico)
        $criteria = [
            [
                'title' => 'Mulheres & Mães Chefes de Família',
                'description' => 'Prioridade para quem busca autonomia financeira, geração de renda domiciliar e apoio mútuo.',
                'icon' => 'Users',
                'badge' => 'Prioritário',
                'active' => true,
                'order' => 1,
            ],
            [
                'title' => 'Jovens da Periferia (16 a 29 anos)',
                'description' => 'Primeiro emprego, capacitação tecnológica, inovação digital e fortalecimento de projetos de vida.',
                'icon' => 'GraduationCap',
                'badge' => 'Juventude',
                'active' => true,
                'order' => 2,
            ],
            [
                'title' => 'População Negra & Povos Tradicionais',
                'description' => 'Valorização da identidade afrodescendente e de comunidades quilombolas, ribeirinhas e de terreiro.',
                'icon' => 'Sparkles',
                'badge' => 'Afrocentrado',
                'active' => true,
                'order' => 3,
            ],
            [
                'title' => 'Egressos do Sistema Prisional',
                'description' => 'Acolhimento humanizado, novas oportunidades de qualificação profissional e reintegração social plena.',
                'icon' => 'Shield',
                'badge' => 'Inclusão',
                'active' => true,
                'order' => 4,
            ],
            [
                'title' => 'Pessoas em Situação de Rua',
                'description' => 'Resgate da cidadania, escuta atenta, emissão de documentos e formação profissional digna.',
                'icon' => 'HeartHandshake',
                'badge' => 'Acolhimento',
                'active' => true,
                'order' => 5,
            ],
            [
                'title' => 'Imigrantes & Refugiados',
                'description' => 'Acolhimento cultural, superação de barreiras de linguagem e inclusão produtiva na economia local.',
                'icon' => 'Compass',
                'badge' => 'Diversidade',
                'active' => true,
                'order' => 6,
            ],
            [
                'title' => 'População LGBTQIAPN+',
                'description' => 'Espaço seguro, livre de preconceito e com foco em oportunidades concretas de empregabilidade e direitos.',
                'icon' => 'Award',
                'badge' => 'Direitos',
                'active' => true,
                'order' => 7,
            ],
            [
                'title' => 'Pessoas em Recuperação (SPA)',
                'description' => 'Apoio psicossocial contínuo para pessoas em superação do uso abusivo de substâncias psicoativas.',
                'icon' => 'Lightbulb',
                'badge' => 'Saúde Mental',
                'active' => true,
                'order' => 8,
            ],
        ];

        foreach ($criteria as $c) {
            \App\Models\CaisCriterion::updateOrCreate(['title' => $c['title']], $c);
        }
    }
}
