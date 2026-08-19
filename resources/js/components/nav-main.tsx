import { Link } from '@inertiajs/react';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { cn } from '@/lib/utils';
import type { NavGroup, NavItem } from '@/types';

type Props = {
    groups?: NavGroup[];
    items?: NavItem[];
};

export function NavMain({ groups, items }: Props) {
    const { isCurrentUrl } = useCurrentUrl();

    // Fallback if single items array passed
    const navigationGroups: NavGroup[] = groups || (items ? [{ label: 'Navegação Principal', items }] : []);

    return (
        <div className="flex flex-col gap-5 px-2 py-2">
            {navigationGroups.map((group, groupIdx) => (
                <SidebarGroup key={`${group.label}-${groupIdx}`} className="p-0">
                    <SidebarGroupLabel
                        className={cn(
                            'px-3 text-[11px] font-bold uppercase tracking-wider select-none h-7',
                            group.labelColor === 'accent'
                                ? 'text-[#FFBE00]'
                                : 'text-[#8C98B6]'
                        )}
                    >
                        {group.label}
                    </SidebarGroupLabel>
                    <SidebarMenu className="gap-1 mt-1">
                        {group.items.map((item) => {
                            const active = item.isActive !== undefined ? item.isActive : isCurrentUrl(item.href);

                            return (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={active}
                                        tooltip={{ children: item.title }}
                                        className={cn(
                                            'h-11 px-3.5 rounded-xl font-medium transition-all duration-150 group/item text-sm',
                                            active
                                                ? '!bg-[#FFBE00] !text-[#0D1640] font-bold shadow-md shadow-[#FFBE00]/20 [&>svg]:!text-[#0D1640]'
                                                : 'text-[#9AA5C4] hover:text-white hover:bg-white/10 [&>svg]:text-[#9AA5C4] hover:[&>svg]:text-white'
                                        )}
                                    >
                                        <Link href={item.href} prefetch>
                                            {item.icon && <item.icon className="size-4 shrink-0 transition-transform group-hover/item:scale-105" />}
                                            <span className="truncate">{item.title}</span>
                                            {item.badge && (
                                                <span
                                                    className={cn(
                                                        'ml-auto rounded-full px-2 py-0.5 text-[10px] font-bold',
                                                        active
                                                            ? 'bg-[#0D1640] text-white'
                                                            : 'bg-white/10 text-white'
                                                    )}
                                                >
                                                    {item.badge}
                                                </span>
                                            )}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            );
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            ))}
        </div>
    );
}
