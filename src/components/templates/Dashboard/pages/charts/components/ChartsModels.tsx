'use client';

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { dateFormatter } from "@/utils/dateFormatter";
import { gasLevelLabel } from "@/functions/gasLevel";

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

function valueFormatter(value: number, unit: string): string {
    // Verifica se o valor tem parte decimal diferente de "00"
    const hasDecimal = value % 1 !== 0;
  
    const formattedValue = new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: hasDecimal ? 1 : 0,
      maximumFractionDigits: 1,
    }).format(value);
  
    // Retorna o valor formatado com a unidade
    return `${formattedValue} ${unit}`;
  }

function ScatterChartComponent({ chartData, chartConfig, chartDataKey, XAxisDataKey }: ChartProps) {
    return (
        <ChartContainer config={chartConfig}>
            <AreaChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey={XAxisDataKey}
                    name="Detecção de Gás"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => (dateFormatter(value))}
                />
                <YAxis 
                    dataKey={chartDataKey} 
                    name={chartConfig.label as string}
                    domain={[0, 1]}
                    ticks={[0, 1]}
                    tickFormatter={(value) => gasLevelLabel(value)}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel formatter={(value) => gasLevelLabel(Number(value))} />}
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
                <YAxis dataKey={chartDataKey} name={chartConfig.label as string} unit="%" />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel unit="%" />}
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
                    left: 4,
                    right: 4,
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
                <YAxis dataKey={chartDataKey} name={chartConfig.label as string} unit="°C" />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel unit="°C" />}
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