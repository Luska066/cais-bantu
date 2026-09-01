export default function AppLogo() {
    return (
        <div className="flex items-center gap-3">
            <div className="flex aspect-square size-11 sm:size-12 shrink-0 items-center justify-center rounded-full bg-white/10 p-0.5 shadow-sm ring-1 ring-white/20 overflow-hidden">
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
                    CAIS
                </div>
            </div>
            <div className="flex flex-col text-left truncate">
                <span className="font-display text-sm font-bold tracking-tight text-white leading-tight">
                    CAIS BANTU
                </span>
                <span className="text-[11px] font-medium text-[#8C98B6] leading-tight mt-0.5">
                    Instituto Cultural Bantu
                </span>
            </div>
        </div>
    );
}
