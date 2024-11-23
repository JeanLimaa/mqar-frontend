'use client';

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, Scatter, ScatterChart, XAxis, YAxis } from "recharts";

interface ChartData {
    month: string;
    date: string;
    temperature: number;
    humidity: number;
    gasLevel: number;
}

interface ChartProps{
    chartData: ChartData[];
    chartConfig: ChartConfig;
    chartDataKey: "temperature" | "humidity" | "gasLevel";
    XAxisDataKey: "month" | "date";
}

function dateFormatter(value: string | Date) {
    let date: Date;

    if (typeof value === "string") {
        // Dividir o valor no formato dd/mm/yyyy
        const [day, month, year] = value.split("/").map(Number);

        // Garantir que valores válidos sejam fornecidos
        if (!day || !month || !year) {
            throw new Error("Formato de data inválido. Use dd/mm/yyyy.");
        }

        // Criar a data com base nos valores extraídos
        date = new Date(year, month - 1, day); // Mês é zero-based
    } else {
        date = value;
    }

    return date.toLocaleDateString("pt-br", {
        month: "short",
        day: "numeric",
    });
}


function ScatterChartComponent({ chartData, chartConfig, chartDataKey, XAxisDataKey }: ChartProps) {
    return (
        <ChartContainer config={chartConfig}>
            <AreaChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey={XAxisDataKey}
                    name="Concentração de Gases"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => (dateFormatter(value))}
                />
                <YAxis dataKey="gasLevel" name="Gas Level (ppm)" unit="ppm" />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <Area 
                    dataKey={chartDataKey} 
                    radius={4} 
                    fill={chartConfig[chartDataKey].color as string}
                    fillOpacity={0.4}
                    stroke={chartConfig[chartDataKey].color as string}
                />
            </AreaChart>
        </ChartContainer>
    )
}

function BarChartComponent({ chartConfig, chartData, chartDataKey, XAxisDataKey }: ChartProps) {
    return (
        <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey={XAxisDataKey}
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => dateFormatter(value)}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <Bar 
                    dataKey={chartDataKey} 
                    radius={4} 
                    fill={chartConfig[chartDataKey].color as string}
                    fillOpacity={0.7}
                />
            </BarChart>
        </ChartContainer>
    )
}

function LineChartComponent({ chartConfig, chartData, chartDataKey, XAxisDataKey }: ChartProps) {
    return (
        <ChartContainer config={chartConfig}>
            <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                    left: 12,
                    right: 12,
                }}
            >
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey={XAxisDataKey}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => dateFormatter(value)}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel  />}
                />
                <Line
                    dataKey={chartDataKey}
                    type="natural"
                    strokeWidth={2}
                    stroke={chartConfig[chartDataKey].color as string}
                    activeDot={{
                        r: 6,
                    }}
                />
            </LineChart>
        </ChartContainer>
    )
}

export { ScatterChartComponent, BarChartComponent, LineChartComponent }