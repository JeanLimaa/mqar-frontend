"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, LineChart, Line, ScatterChart, Scatter } from "recharts"
import React, { ComponentType } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

function ScatterChartComponent({chartData, chartConfig}: any){
  return(
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
              <Scatter dataKey="desktop" fill="var(--color-desktop)" radius={4} />
              <Scatter dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </ScatterChart>
    </ChartContainer>
  )
}

function BarChartComponent({chartConfig, chartData}: any){
  return(
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
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
              <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}

function LineChartComponent({chartConfig, chartData}: any){
  return(
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
                dataKey="desktop"
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

interface ChartBoxProps{
  children: React.ReactNode;
  title: string;
  description: string;
  footerText: string;
  footerSubText: string;
}

export function ChartBox({ children, title, description, footerText, footerSubText }: ChartBoxProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
          {children}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {footerText} <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          {footerSubText}
        </div>
      </CardFooter>
    </Card>
  );
}



export function Charts() {
  return (
    <div className="grid grid-cols-3 gap-x-10 mt-24">
      <ChartBox
        title="Variação da média de temperatura"
        description="Last 6 months"
        footerText="Last 6 months"
        footerSubText="Last updated 2 hours ago"
      >
        <LineChartComponent chartData={chartData} chartConfig={chartConfig} />
      </ChartBox>
      <ChartBox
        title="Variação da média de umidade"
        description="Last 6 months"
        footerText="Last 6 months"
        footerSubText="Last updated 2 hours ago"
      >
        <BarChartComponent chartData={chartData} chartConfig={chartConfig} />
      </ChartBox>
      <ChartBox
        title="Concentração dos Gases"
        description="Last 6 months"
        footerText="Last 6 months"
        footerSubText="Last updated 2 hours ago"
      >
        <ScatterChartComponent chartData={chartData} chartConfig={chartConfig}  />
      </ChartBox>
    </div>
  )
}
