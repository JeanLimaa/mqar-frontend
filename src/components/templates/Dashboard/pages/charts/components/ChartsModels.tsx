'use client';

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, Line, LineChart, Scatter, ScatterChart, XAxis } from "recharts";

function ScatterChartComponent({ chartData, chartConfig, scatterDataKey }: any) {
    return (
        <ChartContainer config={chartConfig}>
            <ScatterChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dashed" />}
                />
                <Scatter dataKey={scatterDataKey} fill="var(--color-desktop)" radius={4} />
                <Scatter dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            </ScatterChart>
        </ChartContainer>
    )
}

function BarChartComponent({ chartConfig, chartData, barDataKey }: any) {
    return (
        <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar dataKey={barDataKey} fill="var(--color-desktop)" radius={4} />
            </BarChart>
        </ChartContainer>
    )
}

function LineChartComponent({ chartConfig, chartData, lineDataKey }: any) {
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
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <Line
                    dataKey={lineDataKey}
                    type="natural"
                    stroke="var(--color-desktop)"
                    strokeWidth={2}
                    dot={{
                        fill: "var(--color-desktop)",
                    }}
                    activeDot={{
                        r: 6,
                    }}
                />
            </LineChart>
        </ChartContainer>
    )
}

export { ScatterChartComponent, BarChartComponent, LineChartComponent }