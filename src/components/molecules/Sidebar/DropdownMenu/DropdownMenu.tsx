'use client'
import {
    LogOut,
    Settings,
    User,
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
import Link from "next/link";
import Tooltip from "@/components/atoms/Tooltip/Tooltip";
import { useRouter } from "next/navigation";

interface DropdownMenuBaseProps {
    children: ReactNode
    tooltipText: string
}

export function DropdownMenuBase({ children, tooltipText }: DropdownMenuBaseProps) {
    const router = useRouter();
    
    const handleLogout = () => {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        router.push('/auth/login');
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
                    <Link href={"/admin/account/settings"}>
                        <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Configurações</span>
                        </DropdownMenuItem>
                    </Link>
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
