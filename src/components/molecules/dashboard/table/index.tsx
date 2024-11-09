'use client'

import React, { cache, useEffect, useState } from "react";
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
import api from "@/services/protectedApiService";
import { FilterSelect } from "../select/index";
import { PaginationBase } from "@/components/pagination/Pagination";
import { useRouter } from "next/navigation";

interface SensorData {
    _id: string;
    createdAt: string;
    deviceName: string;
    temperature: number;
    humidity: number;
    gasLevel: number;
}

export function BaseTable() {
    const router = useRouter();
    const [sensorData, setSensorData] = useState<SensorData[]>([]);
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState("1");
    const [totalPages, setTotalPages] = useState(1);

    const fetchSensorData = cache(async () => {
        try {
            const response = await api.get('/readings-filtered', {
                params: { page, limit: 2, days: filter },
            });

            setSensorData(response.data.items);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Erro ao buscar dados do sensor:", error);
        }
    });

    // Atualiza os dados ao alterar a página ou o filtro
    useEffect(() => {
        fetchSensorData();
    }, [page, filter]);

    console.log(sensorData);

    return (
        <>
            <FilterSelect onChange={(value: React.SetStateAction<string>) => setFilter(value)} />
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
                    {sensorData.length > 0 ? (
                        sensorData.map((data) => (
                            <TableRow key={data._id}>
                                <TableCell className="font-medium">{formatCreatedAt(data.createdAt)}</TableCell>
                                <TableCell>{data?.deviceName}</TableCell>
                                <TableCell>{data.temperature} °C</TableCell>
                                <TableCell>{data.humidity}%</TableCell>
                                <TableCell className="text-right">{data.gasLevel} ppm</TableCell>
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
            <PaginationBase
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(newPage: React.SetStateAction<number>) => setPage(newPage)}
            />
        </>
    );
}