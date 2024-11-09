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

const options = [
    { value: "1", label: "Hoje" },
    { value: "7", label: "Últimos 7 dias" },
    { value: "15", label: "Últimos 15 dias" },
    { value: "30", label: "Últimos 30 dias" },
    { value: "90", label: "Últimos 90 dias" },
    { value: "*", label: "Todos" },
];

interface FilterSelectProps {
    onChange: (value: string) => void;
}

export function FilterSelect({ onChange }: FilterSelectProps) {
    return (
        <div>
            <p className="text-xs text-slate-500">Filtrar por</p>
            <Select defaultValue="1" onValueChange={onChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Selecione um período" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Período</SelectLabel>
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
