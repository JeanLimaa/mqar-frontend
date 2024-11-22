'use client'

import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconWithText from "@/components/IconWithText/IconWithText";
import { useEffect,  useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreHoriz';
import { DropdownSensorOptions } from '@/components/Modal/DropdownSensorOptions';
import { Sensor } from '@/interfaces/sensor.interface';

export function SensorBox({sensors}: {sensors: Sensor[] | null}) {
    const [moreOptions, setSeeMoreOptions] = useState(false);

    useEffect(() => {
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

            sensors && sensors.map((sensor) =>
                    sensor.deviceId === data.deviceId // Assumes deviceId is always sent from the WebSocket
                        ? {
                            ...sensor,
                            temperature: data.temperature || 'Desconhecido',
                            humidity: data.humidity || 'Desconhecido',
                            gasLevel: data.gasLevel || 'Desconhecido',
                        }
                        : sensor
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

    if(!sensors || sensors.length === 0){
        return <p>Nenhum sensor encontrado</p>
    }

    function handleSeeMoreOptions(){
        setSeeMoreOptions(!moreOptions);
    }

    return (
        sensors.map((sensor, index) => (
            <div key={index} className="bg-slate-600 w-64 h-72 rounded-3xl text-white max-xl:w-60 max-sm:w-56 max-[490px]:w-72">
                <div className="flex justify-between w-full mb-5 bg-slate-700 rounded-t-3xl py-3 px-5">
                    <h1 className="text-base">{sensor.deviceName || "Dispositivo sem nome"}</h1>
                    <DropdownSensorOptions tooltipText={'Opções'} sensor={sensor}>
                        <MoreVertIcon sx={{ width: '24px' }} className="hover:cursor-pointer" onClick={handleSeeMoreOptions} />
                    </DropdownSensorOptions>
                </div>
                <div className="flex flex-col gap-6 px-6 max-xl:px-4 max-sm:px-2 max-[490px]:justify-center max-[490px]:px-6">
                    <IconWithText icon={DeviceThermostatIcon} title="Temperatura" value={sensor.temperature || "Não está recebendo dados"} />
                    <IconWithText icon={WaterDropOutlinedIcon} title="Umidade" value={sensor.humidity || "Não está recebendo dados"} />
                    <IconWithText icon={FavoriteBorderIcon} title="Qualidade do ar" value={sensor.gasLevel || "Não está recebendo dados"} />
                </div>
            </div>
        ))
    )
}
