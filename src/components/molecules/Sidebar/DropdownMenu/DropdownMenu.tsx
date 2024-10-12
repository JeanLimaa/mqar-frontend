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
import Link from "next/link";
import Tooltip from "@/components/atoms/Tooltip/Tooltip";

interface DropdownMenuBaseProps {
    children: ReactNode
    tooltipText: string
}

export function DropdownMenuBase({ children, tooltipText }: DropdownMenuBaseProps) {
    const handleLogout = () => {
        console.log("Logout")
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
