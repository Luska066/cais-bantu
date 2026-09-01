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

        {{-- Default fallback metadata for crawlers that don't execute JS --}}
        <meta name="description" content="CAIS BANTU — Centro de Acesso a Direitos, Inclusão Social e Cursos Gratuitos de 160h em Salvador e Vera Cruz / Ilha de Itaparica.">
        <meta name="keywords" content="CAIS BANTU, Instituto Bantu, cursos gratuitos salvador, vera cruz, inclusão social, qualificação profissional">
        <meta name="author" content="Instituto Cultural Bantu">
        <meta name="robots" content="index, follow">

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Lexend+Deca:wght@100..900&display=swap" rel="stylesheet">

        @fonts

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        <x-inertia::head>
            <title>{{ config('app.name', 'CAIS BANTU — Instituto Cultural Bantu') }}</title>
        </x-inertia::head>
    </head>
    <body class="font-sans antialiased">
        <x-inertia::app />
    </body>
</html>
