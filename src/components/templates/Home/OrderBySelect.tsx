'use client';
import * as React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { usePagination } from "@/hooks/usePagination";
import { orderByParam } from "@/interfaces/orderByParam.types";

interface optionsInterface{
    value: orderByParam;
    label: string;
}

export const options: optionsInterface[] = [
    {value: "asc-alf", label: "Ordem Alfabetica [A-Z]"},
    {value: "desc-alf", label: "Ordem Alfabetica [Z-A]"},
    {value: "asc-created", label: "Mais antigos primeiro"},
    {value: "desc-created", label: "Mais recentes primeiro"},
]

export function OrderBySelect() {
    const { handleOrderByChange, paramValues } = usePagination();
    
    return (
        <div>
            <Select defaultValue={paramValues.orderBy || ""} onValueChange={handleOrderByChange}>
                <SelectTrigger className="w-[210px] max-[490px]:w-[150px]">
                    <SelectValue placeholder="Ordenar por..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                            <SelectLabel>Ordenar por</SelectLabel>
                            {options.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
