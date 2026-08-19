import { Head } from '@inertiajs/react';
import AppearanceTabs from '@/components/appearance-tabs';
import Heading from '@/components/heading';
import { edit as editAppearance } from '@/routes/appearance';

export default function Appearance() {
    return (
        <>
            <Head title="Aparência e Tema" />

            <h1 className="sr-only">Aparência e Tema</h1>

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Aparência e Tema"
                    description="Escolha entre o tema Claro (com Azul Gelo e Azul Real), Escuro (Deep Navy #0D1640) ou sincronizado com o sistema."
                />
                <AppearanceTabs />
            </div>
        </>
    );
}

Appearance.layout = {
    breadcrumbs: [
        {
            title: 'Aparência',
            href: editAppearance(),
        },
    ],
};
