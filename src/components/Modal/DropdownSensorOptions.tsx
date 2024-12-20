'use client'
import {
    Trash,
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
import Tooltip from "@/components/Tooltip/Tooltip";
import { Sensor } from "@/interfaces/sensor.interface";
import { toast } from "@/hooks/use-toast";
import { AlertDialogBase } from "@/components/Alert/Alert";
import { actionDeleteSensor } from "../../server-actions/deleteSensorAction";
import api from "@/services/protectedApiService";
import { useRouter } from "next/navigation";

interface DropdownMenuBaseProps {
    children: ReactNode
    tooltipText: string
    sensor: Sensor
}

export function DropdownSensorOptions({ children, tooltipText, sensor }: DropdownMenuBaseProps) {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false);

    function copyIdToClipboard() {
        navigator.clipboard.writeText(sensor.deviceId.toString());

        toast({description: 'ID copiado com sucesso!', variant: 'success'});
    }

    async function handleDeleteSensor(deviceId: string) {
        try {
            //await actionDeleteSensor(deviceId);
            await api.delete(`/devices/${deviceId}`);
            setIsOpen(false);
            toast({description: 'Sensor deletado com sucesso!', variant: 'success'});
        } catch (error: any) {
            toast({description: error?.message || "Ocorreu algum erro desconhecido", variant: 'error'});
        } finally {
            router.refresh();
        }
    }

    return (
        <>
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
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
                        <div className="flex min-w-full" onClick={e => e.stopPropagation()}> 
                            <Trash className="mr-2 h-4 w-4" />
                            <AlertDialogBase 
                                btnText="Excluir" 
                                title="Deletar Sensor" 
                                
                                onConfirm={() => handleDeleteSensor(sensor._id)}
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
