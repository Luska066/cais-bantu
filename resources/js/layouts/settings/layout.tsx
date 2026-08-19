import { Link } from '@inertiajs/react';
import { Palette, ShieldCheck, User, Users, Award, Info } from 'lucide-react';
import type { PropsWithChildren } from 'react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { cn, toUrl } from '@/lib/utils';
import { edit as editAppearance } from '@/routes/appearance';
import { edit } from '@/routes/profile';
import { edit as editSecurity } from '@/routes/security';
import type { NavItem } from '@/types';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Perfil',
        href: edit(),
        icon: User,
    },
    {
        title: 'Segurança & Senha',
        href: editSecurity(),
        icon: ShieldCheck,
    },
    {
        title: 'Aparência',
        href: editAppearance(),
        icon: Palette,
    },
    // Landing page sections
    {
        title: 'Unidades',
        href: '/admin/landing?tab=units',
        icon: Users,
    },
    {
        title: 'Critérios & Acesso',
        href: '/admin/landing?tab=criteria',
        icon: Award,
    },
    {
        title: 'Sobre a Iniciativa',
        href: '/admin/landing?tab=about',
        icon: Info,
    },
];

export default function SettingsLayout({ children }: PropsWithChildren) {
    const { isCurrentOrParentUrl } = useCurrentUrl();

    return (
        <div className="px-4 py-6 md:px-8">
            <Heading
                title="Configurações"
                description="Gerencie as informações do seu perfil de administrador, segurança e preferências visuais."
            />

            <div className="flex flex-col lg:flex-row lg:space-x-12">
                <aside className="w-full max-w-xl lg:w-56">
                    <nav
                        className="flex flex-col space-y-1.5 space-x-0"
                        aria-label="Settings"
                    >
                        {sidebarNavItems.map((item, index) => {
                            const active = isCurrentOrParentUrl(item.href);

                            return (
                                <Button
                                    key={`${toUrl(item.href)}-${index}`}
                                    size="default"
                                    variant="ghost"
                                    asChild
                                    className={cn(
                                        'w-full justify-start rounded-xl px-3.5 font-medium transition-all',
                                        active
                                            ? 'bg-primary text-primary-foreground font-semibold shadow-xs hover:bg-primary/90 hover:text-primary-foreground'
                                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                    )}
                                >
                                    <Link href={item.href}>
                                        {item.icon && (
                                            <item.icon className="h-4 w-4 mr-2" />
                                        )}
                                        {item.title}
                                    </Link>
                                </Button>
                            );
                        })}
                    </nav>
                </aside>

                <Separator className="my-6 lg:hidden" />

                <div className="flex-1 md:max-w-3xl">
                    <section className="max-w-2xl space-y-10">
                        {children}
                    </section>
                </div>
            </div>
        </div>
    );
}
