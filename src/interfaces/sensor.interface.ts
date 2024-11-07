export interface Sensor {
    _id: string;
    deviceId: number;
    userId: number;
    deviceName: string;
    temperature?: string;
    humidity?: string;
    gasLevel?: string;
}