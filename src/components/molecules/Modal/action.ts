"use server";

import { Sensor } from "@/interfaces/sensor.interface";
import api from "@/services/protectedServerApiService";
import { AxiosError } from "axios";
import { revalidatePath } from "next/cache";

export async function handleDeleteSensor(sensor: Sensor){
    //"use server";
/*         const sure = confirm('Tem certeza que deseja deletar este sensor?');

    if(!sure) return; */

    try {
        await api.delete(`/devices/${sensor._id}`);
        revalidatePath('/');
        //toast({description: 'Sensor deletado com sucesso!', variant: 'success'});
    } catch (error) {
        if(error instanceof AxiosError){
            //toast({description: error.response?.data?.error || 'Ocorreu algum erro ao deletar sensor', variant: 'error'});
        }
    }

    //revalidatePath('/admin/home')
}