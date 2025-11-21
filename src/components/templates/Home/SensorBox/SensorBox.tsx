'use client'

import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconWithText from "@/components/IconWithText/IconWithText";
import { use, useEffect, useMemo, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreHoriz';
import { DropdownSensorOptions } from '@/components/Modal/DropdownSensorOptions';
import { Sensor } from '@/interfaces/sensor.interface';

export function SensorBox({ sensors, orderBy }: { sensors: Promise<Sensor[]>, orderBy: string | null | undefined}) {
    const sensores = use(sensors).sort((a,b): any => {
        if(orderBy && a && b){
            if(orderBy === "asc-alf"){
                return a.deviceName.localeCompare(b.deviceName);
            }
            if(orderBy === "desc-alf"){
                return b.deviceName.localeCompare(a.deviceName);
            }
            if(orderBy === "asc-created"){
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            }
            if(orderBy === "desc-created"){
                console.log("Ordenando por data de criação decrescente");
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }
        }
    });

    const [moreOptions, setSeeMoreOptions] = useState(false);
    const [sensorData, setSensorData] = useState<Sensor[]>(sensores);

    useEffect(() => {
        let timeout: NodeJS.Timeout | undefined = undefined;

        const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL as string);
        
        ws.onopen = () => {
            console.log('Conectado ao servidor WebSocket');
        };

        ws.onmessage = (event) => {
            clearTimeout(timeout);
            
            let receivedData = {
                temperature: '',
                humidity: '',
                gasLevel: '',
                deviceId: null
            };

            if (event.data.includes("deviceId")) {
                try {
                    receivedData = JSON.parse(event.data);

                    setSensorData((prevData) => {
                        if (!prevData) return [];
                        
                        const interpretDigitalGasLevel = (gasLevel: string): string => {
                            const level = parseInt(gasLevel, 10);
                            if (isNaN(level)) return '';

                            if(level >= 1) return "Bom";
                            if(level === 0) return "Gás em nível de alerta!";

                            return '';
                        }

                        return prevData.map((sensor) =>
                            sensor.deviceId === receivedData.deviceId
                                ? {
                                    ...sensor,
                                    temperature: receivedData.temperature || '',
                                    humidity: receivedData.humidity || '',
                                    gasLevel: interpretDigitalGasLevel(receivedData.gasLevel) || '',
                                }
                                : sensor
                        );
                    });

                    timeout = setTimeout(() => {
                        setSensorData((prevData) =>
                            prevData.map((sensor) => ({
                                ...sensor,
                                temperature: '',
                                humidity: '',
                                gasLevel: '',
                            }))
                        );
                    }, 30000);
                } catch (parseError) {
                    console.error('Erro ao parsear dados do WebSocket:', parseError);
                }
            }
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

    useEffect(() => {
        async function fetchSensorData() {
            const data: Sensor[] = await (sensors);
            setSensorData(data);
        }

        fetchSensorData();
    }, [sensors]);

    if (!sensorData || sensorData.length === 0) {
        return <p>Nenhum sensor encontrado</p>
    }

    function handleSeeMoreOptions() {
        setSeeMoreOptions(!moreOptions);
    }

    return (
        sensorData.map((sensor, index) => (
            <div key={index} className="bg-slate-600 w-64 h-72 rounded-3xl text-white max-xl:w-60 max-sm:w-56 max-[490px]:w-72">
                <div className="flex justify-between w-full mb-5 bg-slate-700 rounded-t-3xl py-3 px-5">
                    <h1 className="text-base">{sensor?.deviceName || "Dispositivo sem nome"}</h1>
                    <DropdownSensorOptions tooltipText={'Opções'} sensor={sensor}>
                        <MoreVertIcon sx={{ width: '24px' }} className="hover:cursor-pointer" onClick={handleSeeMoreOptions} />
                    </DropdownSensorOptions>
                </div>
                <div className="flex flex-col gap-6 px-6 max-xl:px-4 max-sm:px-2 max-[490px]:justify-center max-[490px]:px-6">
                    <IconWithText icon={DeviceThermostatIcon} title="Temperatura" unit={'°C'} value={sensor?.temperature} />
                    <IconWithText icon={WaterDropOutlinedIcon} title="Umidade" unit='%' value={sensor?.humidity} />
                    <IconWithText icon={FavoriteBorderIcon} title="Qualidade do ar" value={sensor?.gasLevel} />
                </div>
            </div>
        ))
    )
}
