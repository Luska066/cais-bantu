import type { HTMLAttributes } from 'react';

export default function AppLogoIcon({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={`flex aspect-square size-8 items-center justify-center rounded-full bg-white/10 p-0.5 shadow-sm overflow-hidden select-none ${className}`}
            {...props}
        >
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
                CB
            </div>
        </div>
    );
}
