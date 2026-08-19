import { Link } from '@inertiajs/react';
import { LayoutGrid, Globe, Newspaper, Users, User, ShieldCheck, Palette, Building2, GraduationCap } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { edit as editAppearance } from '@/routes/appearance';
import { edit as editProfile } from '@/routes/profile';
import { edit as editSecurity } from '@/routes/security';
import type { NavGroup } from '@/types';

const navigationGroups: NavGroup[] = [
    {
        label: 'Navegação Principal',
        labelColor: 'default',
        items: [
            {
                title: 'Dashboard Geral',
                href: dashboard(),
                icon: LayoutGrid,
            },
        ],
    },
    {
        label: 'CAIS BANTU (LANDING PAGE)',
        labelColor: 'accent',
        items: [
            {
                title: 'Controle da Landing Page',
                href: '/admin/landing',
                icon: Globe,
            },
            {
                title: 'Unidades & Polos',
                href: '/admin/landing?tab=units',
                icon: Building2,
            },
            {
                title: 'Cursos',
                href: '/admin/courses',
                icon: GraduationCap,
            },
            {
                title: 'Educadores & Equipe',
                href: '/admin/team',
                icon: Users,
            },
            {
                title: 'Notícias & Editais',
                href: '/admin/news',
                icon: Newspaper,
            },
        ],
    },

    {
        label: 'CONFIGURAÇÕES',
        labelColor: 'muted',
        items: [
            {
                title: 'Perfil de Usuário',
                href: editProfile(),
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
        ],
    },
];

export function AppSidebar() {
    return (
        <Sidebar
            collapsible="icon"
            variant="inset"
            className="border-r border-white/10 bg-[#0D1640] text-sidebar-foreground"
        >
            <SidebarHeader className="border-b border-white/10 p-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="hover:bg-white/5 active:bg-white/5 p-0 h-auto">
                            <Link href={dashboard()} prefetch className="flex items-center gap-3">
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="py-2">
                <NavMain groups={navigationGroups} />
            </SidebarContent>

            <SidebarFooter className="border-t border-white/10 p-3">
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
