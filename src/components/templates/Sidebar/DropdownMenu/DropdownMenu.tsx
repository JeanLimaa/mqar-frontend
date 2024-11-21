'use client'
import {
    LogOut,
    Settings
} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ReactNode } from "react";
import Cookies from 'js-cookie';
import Tooltip from "@/components/Tooltip/Tooltip";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";

interface DropdownMenuBaseProps {
    children: ReactNode
    tooltipText: string
}

export function DropdownMenuBase({ children, tooltipText }: DropdownMenuBaseProps) {
    const router = useRouter();
    
    const handleLogout = () => {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        router.refresh();
        //router.push('/auth/login');
    }

    function pushToSettings() {
        router.push('/admin/account/settings');
    }

    return (
        <DropdownMenu>
            <Tooltip text={tooltipText}>
                <DropdownMenuTrigger asChild>
                    {children}
                </DropdownMenuTrigger>
            </Tooltip>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={pushToSettings}>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Configurações</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
