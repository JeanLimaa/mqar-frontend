'use client'

import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconWithText from "@/components/atoms/IconWithText/IconWithText";
import { useEffect, useState } from 'react';
import api from '@/services/protectedApiService';

interface Sensor {
    deviceId: number;
    userId: number;
    deviceName: string;
    temperature?: string;
    humidity?: string;
    gasLevel?: string;
}

export function SensorBox() {
    const [sensors, setSensors] = useState<Sensor[]>([]);
    const [error, setError] = useState<string | null>(null); // State for error handling

    async function getDevices() {
        try {
            const response = await api.get('/devices');
            const data: Sensor[] = response.data;
            setSensors(data);
        } catch (error) {
            console.error('Erro ao carregar sensores:', error);
            setError('Erro ao carregar sensores. Tente novamente mais tarde.'); // Set error message
        }
    }

    useEffect(() => {
        getDevices();

        const ws = new WebSocket('wss://websockets-gerenciamento-residuos.onrender.com/ws');

        ws.onopen = () => {
            console.log('Conectado ao servidor WebSocket');
            ws.send(JSON.stringify({ message: 'Hello from the browser!' }));
        };

        ws.onmessage = (event) => {
            let data = {
                temperature: 'Desconhecido',
                humidity: 'Desconhecido',
                gasLevel: 'Desconhecido',
                deviceId: null
            };

            if (event.data.includes("deviceId")) {
                try {
                    data = JSON.parse(event.data);
                    console.log('Dados recebidos:', data);
                } catch (parseError) {
                    console.error('Erro ao parsear dados do WebSocket:', parseError);
                }
            }

            setSensors((prevSensors) =>
                prevSensors.map((sensor) =>
                    sensor.deviceId === data.deviceId // Assumes deviceId is always sent from the WebSocket
                        ? {
                            ...sensor,
                            temperature: data.temperature || 'Desconhecido',
                            humidity: data.humidity || 'Desconhecido',
                            gasLevel: data.gasLevel || 'Desconhecido',
                        }
                        : sensor
                )
            );
        };

        ws.onclose = () => {
            console.log('Conexão fechada');
        };

        ws.onerror = (error) => {
            console.error('Erro na conexão WebSocket:', error);
        };

        return () => {
            ws.close(); // Fecha a conexão quando o componente for desmontado
        };
    }, []);

    return (
        <>
            {error && <p className="text-red-500">{error}</p>} {/* Display error message if exists */}
            {sensors.length > 0 ? (
                sensors.map((sensor, index) => (
                    <div key={index} className="bg-slate-600 w-64 h-72 rounded-3xl text-white">
                        <div className="w-full mb-5 bg-slate-700 rounded-t-3xl py-3 px-6">
                            <h1 className="text-lg">{sensor.deviceName || "Dispositivo sem nome"}</h1>
                        </div>
                        <div className="flex flex-col gap-6 px-6">
                            <IconWithText icon={DeviceThermostatIcon} title="Temperatura" value={sensor.temperature || "Não está recebendo dados"} />
                            <IconWithText icon={WaterDropOutlinedIcon} title="Umidade" value={sensor.humidity || "Não está recebendo dados"} />
                            <IconWithText icon={FavoriteBorderIcon} title="Qualidade do ar" value={sensor.gasLevel || "Não está recebendo dados"} />
                        </div>
                    </div>
                ))
            ) : <p>Nenhum sensor encontrado</p>}
        </>
    )
}
