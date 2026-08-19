import { Link, router } from '@inertiajs/react';
import { LogOut, Settings } from 'lucide-react';
import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { logout } from '@/routes';
import { edit } from '@/routes/profile';
import type { User } from '@/types';

type Props = {
    user: User;
};

export function UserMenuContent({ user }: Props) {
    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    return (
        <div className="p-1">
            <DropdownMenuLabel className="p-2 font-normal">
                <div className="flex items-center gap-2 text-left text-sm">
                    <UserInfo user={user} showEmail={true} />
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link
                        className="flex w-full cursor-pointer items-center rounded-lg px-2.5 py-2 font-medium text-foreground transition-colors hover:bg-muted focus:bg-muted"
                        href={edit()}
                        prefetch
                        onClick={cleanup}
                    >
                        <Settings className="mr-2.5 size-4 text-muted-foreground" />
                        Configurações
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuItem asChild>
                <Link
                    className="flex w-full cursor-pointer items-center rounded-lg px-2.5 py-2 font-medium text-rose-600 transition-colors hover:bg-rose-50 hover:text-rose-700 focus:bg-rose-500/10 focus:text-rose-500 dark:text-rose-400 dark:hover:bg-rose-500/20"
                    href={logout()}
                    as="button"
                    onClick={handleLogout}
                    data-test="logout-button"
                >
                    <LogOut className="mr-2.5 size-4" />
                    Sair da conta
                </Link>
            </DropdownMenuItem>
        </div>
    );
}
