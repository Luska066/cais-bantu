export default function AppLogo() {
    return (
        <div className="flex items-center gap-3">
            <div className="flex aspect-square size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 p-1 shadow-sm ring-1 ring-white/15 overflow-hidden">
                <img
                    src="/logo.png"
                    alt="Logo Instituto Bantu"
                    className="size-full object-contain rounded-lg"
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.parentElement?.querySelector('.fallback-ib');
                        if (fallback) (fallback as HTMLElement).style.display = 'flex';
                    }}
                />
                <div className="fallback-ib hidden size-full items-center justify-center rounded-lg bg-[#FFBE00] font-display text-sm font-bold text-[#0D1640]">
                    IB
                </div>
            </div>
            <div className="flex flex-col text-left truncate">
                <span className="font-display text-sm font-bold tracking-tight text-white leading-tight">
                    Instituto Bantu
                </span>
                <span className="text-[11px] font-medium text-[#8C98B6] leading-tight mt-0.5">
                    Gestão Comunitária
                </span>
            </div>
        </div>
    );
}
