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

import { ReactNode, useState } from "react";
import Tooltip from "@/components/atoms/Tooltip/Tooltip";
import { Sensor } from "@/interfaces/sensor.interface";
import api from "@/services/protectedApiService";
import { toast } from "@/hooks/use-toast";
import { AxiosError } from "axios";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AlertDialogBase } from "@/components/alert/Alert";
//import { handleDeleteSensor } from "./action";

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

    async function handleDeleteSensor(sensor: Sensor){
        //const sure = confirm('Tem certeza que deseja deletar este sensor?');

        //if(!sure) return;

        try {
            await api.delete(`/devices/${sensor._id}`);
            
            toast({description: 'Sensor deletado com sucesso!', variant: 'success'});
        } catch (error) {
            if(error instanceof AxiosError){
                toast({description: error.response?.data?.error || 'Ocorreu algum erro ao deletar sensor', variant: 'error'});
            }
        }
    }

    return (
        <>
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

{/*                         <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            <button onClick={() => setOpen(true)}>Editar nome</button>
                        </DropdownMenuItem> */}

                    <DropdownMenuItem >
                        <div className="flex min-w-full" onClick={(e) => e.stopPropagation()}>
                            <Trash className="mr-2 h-4 w-4" />
                            <AlertDialogBase 
                                btnText="Excluir" 
                                title="Deletar Sensor" 
                                
                                onConfirm={() => handleDeleteSensor(sensor)}
                            >
                                Tem certeza que deseja deletar o sensor: {sensor.deviceName}?
                            </AlertDialogBase>
                        </div>
                    </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}
