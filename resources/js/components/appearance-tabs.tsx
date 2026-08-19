import type { LucideIcon } from 'lucide-react';
import { Monitor, Moon, Sun } from 'lucide-react';
import type { HTMLAttributes } from 'react';
import type { Appearance } from '@/hooks/use-appearance';
import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';

export default function AppearanceToggleTab({
    className = '',
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    const { appearance, updateAppearance } = useAppearance();

    const tabs: { value: Appearance; icon: LucideIcon; label: string }[] = [
        { value: 'light', icon: Sun, label: 'Claro (Light)' },
        { value: 'dark', icon: Moon, label: 'Escuro (Dark)' },
        { value: 'system', icon: Monitor, label: 'Sistema' },
    ];

    return (
        <div
            className={cn(
                'inline-flex gap-1.5 rounded-xl bg-muted p-1.5 border border-border/60',
                className,
            )}
            {...props}
        >
            {tabs.map(({ value, icon: Icon, label }) => (
                <button
                    key={value}
                    onClick={() => updateAppearance(value)}
                    className={cn(
                        'flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-all cursor-pointer',
                        appearance === value
                            ? 'bg-card text-foreground font-bold shadow-xs border border-border/80'
                            : 'text-muted-foreground hover:bg-card/50 hover:text-foreground',
                    )}
                >
                    <Icon className="-ml-0.5 h-4 w-4 mr-2" />
                    <span>{label}</span>
                </button>
            ))}
        </div>
    );
}
