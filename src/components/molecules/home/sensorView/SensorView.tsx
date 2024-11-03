'use client'


import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import IconWithText from "@/components/atoms/IconWithText/IconWithText";
import { useEffect, useState } from 'react';

interface Sensor {
    deviceId: number;
    userId: number;
    deviceName: string;
    temperature?: string;
    humidity?: string;
    gasLevel?: string;
}

interface SensorData {
    temperature: string;
    humidity: string;
    gasLevel: string;
}

export function SensorBox() {
    
    const [sensors, setSensors] = useState<Sensor[]>([
        {
                deviceId: 1,
                userId: 1,
                deviceName: "Sensor 1",
                
            },
            {
                deviceId: 2,
                userId: 1,
                deviceName: "Sensor 2"
            }
        ]);

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
                    gasLevel: 'Desconhecido'
                };
                if(event.data.includes("deviceId")){
                    data = JSON.parse(event.data);
                    console.log('Dados recebidos:', data);
                }
        
              // Atualize os sensores com os novos dados recebidos do ESP32
              setSensors((prevSensors) =>
                prevSensors.map((sensor) =>
                  sensor.deviceId === 1 // Você pode ajustar essa lógica conforme o deviceId do ESP32
                    ? {
                        ...sensor,
                        temperature: data.temperature,
                        humidity: data.humidity,
                        gasLevel: data.gasLevel || 'Desconhecido', // Se não houver gasLevel, exiba "Desconhecido"
                      }
                    : sensor
                )
              );
            };
        
            ws.onclose = () => {
              console.log('Conexão fechada');
            };
        
            ws.onerror = (error) => {
              console.log('Erro na conexão WebSocket:', error);
            };
        
            return () => {
              ws.close(); // Feche a conexão quando o componente for desmontado
            };
          }, []);
    
    return (
        sensors.map((sensor, index) => (
            <div key={index} className="bg-slate-600 w-64 h-72 rounded-3xl text-white">
                <div className="w-full mb-5 bg-slate-700 rounded-t-3xl py-3 px-6" >
                    <h1 className="text-lg">{sensor.deviceName}</h1>
                </div>
                <div className="flex flex-col gap-6 px-6">
                    <IconWithText icon={DeviceThermostatIcon} title="Temperatura" value={sensor.temperature || "Nao está recebendo dados"} />
                    <IconWithText icon={WaterDropOutlinedIcon} title="Umidade" value={sensor.humidity || "Nao está recebendo dados"} />
                    <IconWithText icon={FavoriteBorderIcon} title="Qualidade do ar" value={sensor.gasLevel || "Nao está recebendo dados"} />
                </div>
            </div>
        ))
    )
}