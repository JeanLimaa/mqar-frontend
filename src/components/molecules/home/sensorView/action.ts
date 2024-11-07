"use server";
import { Sensor } from "@/interfaces/sensor.interface";
import api from "@/services/protectedServerApiService";
import { cache } from "react";

export const getDevices = cache(async () => {
    try {
        const response = await api.get('/devices');
        const data: Sensor[] = response.data;
        return data;
        //setSensors(data);
    } catch (error) {
        console.error('Erro ao carregar sensores:', error);
        return null
        //setError('Erro ao carregar sensores. Tente novamente mais tarde.'); // Set error message
    }
})