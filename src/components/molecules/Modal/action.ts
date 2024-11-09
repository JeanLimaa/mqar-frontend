"use server";

import api from "@/services/protectedServerApiService";
import { AxiosError } from "axios";
import { revalidatePath } from "next/cache";

export async function actionDeleteSensor(deviceId: string){
    try {
        await api.delete(`/devices/${deviceId}`);
        revalidatePath('/admin/home');
    } catch (error) {
        if(error instanceof AxiosError){
            return error.response?.data?.error || 'Ocorreu algum erro ao deletar sensor';
        }
    }
}