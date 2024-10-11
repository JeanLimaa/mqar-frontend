import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function FilterSelect() {
  return (
    <>
        <p className="text-xs text-slate-500">Filtrar por</p>
        <Select defaultValue="90">
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione um período" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
            <SelectLabel>Período</SelectLabel>
            <SelectItem value="90">Últimos 90 dias</SelectItem>
            <SelectItem value="30">Últimos 30 dias</SelectItem>
            <SelectItem value="15">Últimos 15 dias</SelectItem>
            <SelectItem value="7">Últimos 7 dias</SelectItem>
            <SelectItem value="1">Hoje</SelectItem>
            </SelectGroup>
        </SelectContent>
        </Select>
    </>
  )
}
