
import { Bar, BarChart, CartesianGrid, XAxis, LineChart, Line, ScatterChart, Scatter } from "recharts";
import React from "react";
import { ChartBox } from "./components/ChartBox";

import {
  ChartConfig
} from "@/components/ui/chart";
import { BarChartComponent, LineChartComponent, ScatterChartComponent } from "./components/ChartsModels";
import api from "@/services/protectedServerApiService";

/* const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
] */

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

export async function Charts() {
  const apiReadingsFilteredResponse = await api.get('/readings');
  const chartData = apiReadingsFilteredResponse.data;

  const mappedChartData = chartData.map((item: { timestamp: string | number | Date; temperature: any; humidity: any; gasLevel: any; }) => ({
    month: new Date(item.timestamp).toLocaleString('pt-BR', { month: 'long' }),  // Formatação do timestamp
    temperature: item.temperature,
    humidity: item.humidity,
    gasLevel: item.gasLevel,
  }));

  // Agrupar os dados por mês e calcular a média para cada mês
  const aggregatedData = mappedChartData.reduce((acc: any, curr: any) => {
    // Verificar se o mês já existe no acumulador
    const existingMonth = acc.find((item: any) => item.month === curr.month);

    if (existingMonth) {
      // Se o mês já existir, somar os valores e contar quantos itens há
      existingMonth.temperatureSum += curr.temperature;
      existingMonth.humiditySum += curr.humidity;
      existingMonth.gasLevelSum += curr.gasLevel;
      existingMonth.count += 1;
    } else {
      // Se o mês não existir, adicionar o novo mês ao acumulador
      acc.push({
        month: curr.month,
        temperatureSum: curr.temperature,
        humiditySum: curr.humidity,
        gasLevelSum: curr.gasLevel,
        count: 1,
      });
    }

    return acc;
  }, []);

  // Calcular a média para cada mês
  const averageData = aggregatedData.map((item: any) => ({
    month: item.month,
    temperature: item.temperatureSum / item.count,
    humidity: item.humiditySum / item.count,
    gasLevel: item.gasLevelSum / item.count,
  }));

  console.log(averageData);

  return (
    <div className="grid grid-cols-2 gap-x-10 mt-24 gap-y-5 max-md:mt-10 max-md:grid-cols-1">
      <ChartBox
        title="Variação da média de temperatura"
        description="Last 6 months"
        footerText="Last 6 months"
        footerSubText="Last updated 2 hours ago"
      >
        <LineChartComponent chartData={averageData} chartConfig={chartConfig} lineDataKey={"temperature"} />
      </ChartBox>
      <ChartBox
        title="Variação da média de umidade"
        description="Last 6 months"
        footerText="Last 6 months"
        footerSubText="Last updated 2 hours ago"
      >
        <BarChartComponent chartData={averageData} chartConfig={chartConfig} barDataKey={"humidity"} />
      </ChartBox>
      <ChartBox
        title="Concentração dos Gases"
        description="Last 6 months"
        footerText="Last 6 months"
        footerSubText="Last updated 2 hours ago"
      >
        <ScatterChartComponent chartData={mappedChartData} chartConfig={chartConfig} scatterDataKey="gasLevel" />
      </ChartBox>
    </div>
  )
}
