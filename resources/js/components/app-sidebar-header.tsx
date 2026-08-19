import { Sparkles } from 'lucide-react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { SidebarTrigger } from '@/components/ui/sidebar';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    return (
        <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border/80 bg-card/60 px-6 backdrop-blur-md transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-14 md:px-6">
            <div className="flex items-center gap-3">
                <SidebarTrigger className="-ml-1 rounded-lg border border-border/60 hover:bg-muted text-foreground" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>

            <div className="hidden sm:flex items-center gap-3">
                <Badge variant="outline" className="border-[#1A4FD6]/20 bg-[#1A4FD6]/5 text-[#1A4FD6] dark:text-[#9AA5C4] dark:border-white/10 dark:bg-white/5 gap-1.5 py-1 px-3">
                    <Sparkles className="size-3 text-[#FFBE00]" />
                    <span className="font-medium text-xs">Instituto Bantu v2.0</span>
                </Badge>
            </div>
        </header>
    );
}
