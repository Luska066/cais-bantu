<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'light') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Inline script to apply theme immediately, defaulting to light/white --}}
        <script>
            (function() {
                let appearance = '{{ $appearance ?? "light" }}';
                try {
                    const stored = localStorage.getItem('appearance');
                    if (stored) {
                        appearance = stored;
                    }
                } catch (e) {}

                if (appearance === 'dark' || (appearance === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.style.colorScheme = 'dark';
                } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.colorScheme = 'light';
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: #F2F5FF;
            }

            html.dark {
                background-color: #0D1640;
            }
        </style>

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">
        <meta name="theme-color" content="#0D1640">

        {{-- Primary SEO metadata for Search Engines & Social Crawlers --}}
        <meta name="title" content="CAIS BANTU — Centro de Acesso a Direitos, Inclusão Social e Cursos Gratuitos | Salvador e Vera Cruz">
        <meta name="description" content="CAIS BANTU: 300 vagas gratuitas em cursos profissionalizantes de 160h com certificação oficial e acolhimento psicossocial em Salvador e Vera Cruz / Ilha de Itaparica - BA.">
        <meta name="keywords" content="CAIS BANTU, Instituto Cultural Bantu, Instituto Bantu, cais bantu, cursos gratuitos salvador, cursos gratuitos vera cruz, ilha de itaparica, inclusão social, qualificação profissional 160h, senad mjsp">
        <meta name="author" content="Instituto Cultural Bantu">
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
        <meta name="language" content="Portuguese">
        
        {{-- Open Graph / Facebook / WhatsApp --}}
        <meta property="og:type" content="website">
        <meta property="og:locale" content="pt_BR">
        <meta property="og:site_name" content="CAIS BANTU — Instituto Cultural Bantu">
        <meta property="og:title" content="CAIS BANTU — Centro de Acesso a Direitos, Inclusão Social e Cursos Gratuitos">
        <meta property="og:description" content="Inscrições abertas para 300 vagas gratuitas em formação profissional de 160h e suporte psicossocial nos polos Salvador e Vera Cruz.">
        <meta property="og:image" content="/apple-touch-icon.png">
        <meta property="og:url" content="{{ url()->current() }}">

        {{-- Twitter --}}
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="CAIS BANTU — Cursos Gratuitos e Inclusão Social">
        <meta name="twitter:description" content="Centro de Acesso a Direitos e Inclusão Social Afrocentrado: 300 vagas em Salvador e Vera Cruz / Ilha de Itaparica.">
        <meta name="twitter:image" content="/apple-touch-icon.png">

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Lexend+Deca:wght@100..900&display=swap" rel="stylesheet">

        @fonts

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        <x-inertia::head>
            <title>{{ config('app.name', 'CAIS BANTU — Instituto Cultural Bantu') }}</title>
        </x-inertia::head>

        {{-- JSON-LD Schema.org for Search Engines and AI Crawlers --}}
        <script type="application/ld+json">
        {!! json_encode([
            '@context' => 'https://schema.org',
            '@graph' => [
                [
                    '@type' => 'WebSite',
                    '@id' => 'https://caisbantu.com.br/#website',
                    'url' => 'https://caisbantu.com.br',
                    'name' => 'CAIS BANTU',
                    'alternateName' => ['Cais Bantu', 'Projeto CAIS BANTU', 'Instituto Cultural Bantu'],
                    'description' => 'Centro de Acesso a Direitos e Inclusão Social na Política sobre Drogas. Formação profissional gratuita de 160h em Salvador e Vera Cruz / Ilha de Itaparica.',
                    'inLanguage' => 'pt-BR'
                ],
                [
                    '@type' => 'NGO',
                    '@id' => 'https://caisbantu.com.br/#organization',
                    'name' => 'CAIS BANTU — Instituto Cultural Bantu',
                    'alternateName' => ['CAIS BANTU', 'Instituto Bantu'],
                    'url' => 'https://caisbantu.com.br',
                    'logo' => 'https://caisbantu.com.br/apple-touch-icon.png',
                    'telephone' => '+55-71-99225-4706',
                    'email' => 'bantu-contato@institutobantu.org',
                    'address' => [
                        [
                            '@type' => 'PostalAddress',
                            'name' => 'Polo Salvador (Núcleo SSA)',
                            'streetAddress' => 'Rua Mello Moraes Filho, nº 392 – Fazenda Grande do Retiro',
                            'addressLocality' => 'Salvador',
                            'addressRegion' => 'BA',
                            'addressCountry' => 'BR'
                        ],
                        [
                            '@type' => 'PostalAddress',
                            'name' => 'Polo Vera Cruz (Casa Bantu Vila Rosa)',
                            'streetAddress' => 'Rua do Congo, nº 25 – Loteamento Parque das Mangueiras',
                            'addressLocality' => 'Vera Cruz',
                            'postalCode' => '44470-000',
                            'addressRegion' => 'BA',
                            'addressCountry' => 'BR'
                        ]
                    ]
                ]
            ]
        ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) !!}
        </script>
    </head>
    <body class="font-sans antialiased">
        <noscript>
            <div style="padding: 24px; font-family: sans-serif; max-width: 800px; margin: 0 auto; line-height: 1.6;">
                <h1>CAIS BANTU — Centro de Acesso a Direitos e Inclusão Social</h1>
                <p><strong>Uma iniciativa do Instituto Cultural Bantu em parceria com a SENAD/MJSP.</strong></p>
                <p>O CAIS BANTU oferece 300 vagas gratuitas em cursos de qualificação profissional de 160 horas com certificação oficial, lanche no local e acolhimento psicossocial nos polos Salvador e Vera Cruz (Ilha de Itaparica) na Bahia.</p>
                <h2>Cursos Oferecidos:</h2>
                <ul>
                    <li><strong>Letramento Digital (160h):</strong> Informática básica, produtividade, internet segura e ferramentas digitais.</li>
                    <li><strong>Empreendedorismo e Artesanato (160h):</strong> Economia criativa, gestão de microempreendimentos e precificação.</li>
                    <li><strong>Produção Audiovisual (160h):</strong> Fotografia, captação e edição de vídeo para mídias digitais.</li>
                    <li><strong>Instrutor(a) de Ioga (160h):</strong> Práticas integrativas, respiração e bem-estar comunitário.</li>
                    <li><strong>Agente Ambiental (160h):</strong> Sustentabilidade, reciclagem e conservação ecológica.</li>
                </ul>
                <h2>Polos de Atendimento:</h2>
                <p><strong>Salvador (Núcleo SSA):</strong> Rua Mello Moraes Filho, nº 392 – Fazenda Grande do Retiro, Salvador – BA | Tel: (71) 99642-8078</p>
                <p><strong>Vera Cruz (Casa Bantu Vila Rosa):</strong> Rua do Congo, nº 25 – Loteamento Parque das Mangueiras, Vera Cruz – BA | Tel: (71) 99225-4706</p>
                <p>E-mail: bantu-contato@institutobantu.org</p>
            </div>
        </noscript>
        <x-inertia::app />
    </body>
</html>
