import { Sensor } from "@/interfaces/sensor.interface";
import api from "@/services/protectedServerApiService";
import { cache } from "react";

export const getDevices = async () => {
    try {
        const response = await api.get('/devices');
        const data: Sensor[] = response.data;
        console.log('Sensores carregados:', data);
        return data;
    } catch (error) {
        console.error('Erro ao carregar sensores:', error);
        return [];
    }
};

export const getCachedDevices = cache(
    async () => await getDevices()
)