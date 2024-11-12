'use client'

import React, { cache, ChangeEvent, useEffect, useState } from "react";
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
import { useRouter, useParams, useSearchParams, usePathname } from "next/navigation";
import { SensorData } from "@/interfaces/sensor.interface";

interface BaseTableProps {
    sensorData: SensorData[];
    page: number;
    totalPages: number;
    days: string;
}

export function BaseTable({ sensorData, page, totalPages, days }: BaseTableProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
   
    function makeQueryChange(queryName: string, value: string){
        const current = new URLSearchParams(Array.from(searchParams.entries()));

        current.set(queryName, value);

        //quando alterar o dia, é necessario retornar para a primeira pagina
        if (queryName === "days") {
            current.set("page", "1"); // Resetar a página para 1
        }
        
        const search = current.toString();

        const query = search ? `?${search}` : "";

        router.push(`${pathname}${query}`);
    }

    function handlePageChange(newPage: number) {
        makeQueryChange("page", newPage.toString());
    }

    function handleDayFilterChange(newDay: string) {
        makeQueryChange("days", newDay.toString());
    }

    return (
        <>
            {/* <FilterSelect onChange={(value: React.SetStateAction<string>) => setFilter(value)} /> */}
            <FilterSelect 
                day={days}
                onChange={handleDayFilterChange} 
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
                onPageChange={(newPage: number) => handlePageChange(newPage)}
            />
        </>
    );
}