export interface Sensor {
    _id: string;
    deviceId: number;
    userId: number;
    deviceName: string;
    temperature?: string;
    humidity?: string;
    gasLevel?: string;
}

export interface SensorData {
    _id: string;
    createdAt: string;
    deviceName: string;
    temperature: number;
    humidity: number;
    gasLevel: number;
}