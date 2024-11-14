import React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { formatCreatedAt } from "@/functions/formatCreatedAt";
import { FilterSelect } from "../select/index";
import { PaginationBase } from "@/components/pagination/Pagination";
import { SensorData } from "@/interfaces/sensor.interface";

interface BaseTableProps {
    sensorData: SensorData[];
    page: number;
    totalPages: number;
    days: string;
}

function Rows({ sensorData }: { sensorData: SensorData[] }) {
    if(!sensorData || sensorData.length < 1){
        return (
            <TableRow key={"nothing"}>
                <TableCell className="font-medium">Sem dados</TableCell>
                <TableCell>Sem dados</TableCell>
                <TableCell>Sem dados</TableCell>
                <TableCell>Sem dados</TableCell>
                <TableCell className="text-right">Sem dados</TableCell>
            </TableRow>
        );
    }

    return (
            sensorData.map((data) => (
                <TableRow key={data._id}>
                    <TableCell className="font-medium">{formatCreatedAt(data.createdAt)}</TableCell>
                    <TableCell>{data?.deviceName}</TableCell>
                    <TableCell>{data.temperature} °C</TableCell>
                    <TableCell>{data.humidity}%</TableCell>
                    <TableCell className="text-right">{data.gasLevel} ppm</TableCell>
                </TableRow>
            ))
    );
}

export function BaseTable({ sensorData, page, totalPages, days }: BaseTableProps) {
    return (
        <>
                <FilterSelect 
                    day={days}
                />
            <Table className="text-white">
                <TableCaption>Uma lista com os dados históricos dos seus sensores.</TableCaption>
                <TableHeader className="bg-slate-700" >
                    <TableRow>
                        <TableHead className="w-[200px]" style={{ color: "white" }}>Data de Referência</TableHead>
                        <TableHead style={{ color: "white" }}>Sensor de Referência</TableHead>
                        <TableHead style={{ color: "white" }}>Temperatura</TableHead>
                        <TableHead style={{ color: "white" }}>Umidade do ar</TableHead>
                        <TableHead className="text-right" style={{ color: "white" }}>Qualidade do ar</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="bg-slate-600">
                    <Rows sensorData={sensorData} />
                </TableBody>
            </Table>
            <PaginationBase
                currentPage={page}
                totalPages={totalPages}
            />
        </>
    );
}