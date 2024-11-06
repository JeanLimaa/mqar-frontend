import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { formatCreatedAt } from "@/functions/formatCreatedAt";
import api from "@/services/protectedServerApiService";

interface SensorData {
    createdAt: string;
    deviceName: string;
    temperature: string;
    humidity: string;
    gasLevel: string;
}

/* const getSensorsDatas = unstable_cache(async () => {
    const response = await api.get('/readings');
    return response.data;
}, [], {
    revalidate: false,
    tags: ['readings'],
}); */

export async function BaseTable() {
    const response = await api.get('/readings');
    const sensorDatas: SensorData[] = response.data;

    return (
        <Table className="text-white">
            <TableCaption>Uma lista com os dados históricos dos seus sensores.</TableCaption>
            <TableHeader className="bg-slate-700" >
                <TableRow>
                    <TableHead className="w-[200px]" style={{ color: "white" }}>Data de Refêrencia</TableHead>
                    <TableHead style={{ color: "white" }}>Sensor de Refêrencia</TableHead>
                    <TableHead style={{ color: "white" }}>Temperatura</TableHead>
                    <TableHead style={{ color: "white" }}>Umidade do ar</TableHead>
                    <TableHead className="text-right" style={{ color: "white" }}>Qualidade do ar</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="bg-slate-600">
                {sensorDatas.length > 0 ? (
                    sensorDatas.map((sensorData, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{formatCreatedAt(sensorData.createdAt)}</TableCell>
                            <TableCell>{sensorData?.deviceName}</TableCell>
                            <TableCell>{sensorData.temperature} °C</TableCell>
                            <TableCell>{sensorData.humidity}%</TableCell>
                            <TableCell className="text-right">{sensorData.gasLevel} ppm</TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow key={"nothing"}>
                        <TableCell className="font-medium">Sem dados</TableCell>
                        <TableCell>Sem dados</TableCell>
                        <TableCell>Sem dados</TableCell>
                        <TableCell>Sem dados</TableCell>
                        <TableCell className="text-right">Sem dados</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
