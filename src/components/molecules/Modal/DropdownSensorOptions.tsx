'use client'
import {
    Trash,
    Edit,
    CopyIcon
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
import Tooltip from "@/components/atoms/Tooltip/Tooltip";
import { Sensor } from "@/interfaces/sensor.interface";
import api from "@/services/protectedApiService";
import { toast } from "@/hooks/use-toast";
import { AxiosError } from "axios";

interface DropdownMenuBaseProps {
    children: ReactNode
    tooltipText: string
    sensor: Sensor
}

export function DropdownSensorOptions({ children, tooltipText, sensor }: DropdownMenuBaseProps) {
    function copyIdToClipboard() {
        navigator.clipboard.writeText(sensor.deviceId.toString());

        toast({description: 'ID copiado com sucesso!', variant: 'success'});
    }

    async function handleDeleteSensor(){
        const sure = confirm('Tem certeza que deseja deletar este sensor?');

        if(!sure) return;

        try {
            api.delete(`/devices/${sensor._id}`);
    
            toast({description: 'Sensor deletado com sucesso!', variant: 'success'});
        } catch (error) {
            if(error instanceof AxiosError){
                toast({description: error.response?.data?.error || 'Ocorreu algum erro ao deletar sensor', variant: 'error'});
            }
        }
    }

    return (
        <DropdownMenu>
            <Tooltip text={tooltipText}>
                <DropdownMenuTrigger asChild>
                    {children}
                </DropdownMenuTrigger>
            </Tooltip>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Sensor: {sensor.deviceName}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={copyIdToClipboard}>
                        <CopyIcon className="mr-2 h-4 w-4" />
                        <span>Copiar ID</span>
                    </DropdownMenuItem>

                    {/* <DropdownMenuSeparator /> */}

                    <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Editar Nome</span>
                    </DropdownMenuItem>

                    {/* <DropdownMenuSeparator /> */}

                    <DropdownMenuItem onClick={handleDeleteSensor}>
                        <Trash className="mr-2 h-4 w-4" />
                        <span>Excluir</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
