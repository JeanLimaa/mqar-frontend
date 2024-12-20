
import React from "react";
import { ChartBox } from "./components/ChartBox";

import {
  ChartConfig
} from "@/components/ui/chart";
import { BarChartComponent, LineChartComponent, ScatterChartComponent } from "./components/ChartsModels";
import api from "@/services/protectedServerApiService";
import { SensorData } from "@/interfaces/sensor.interface";

const chartConfig = {
  humidity: {
    label: "Umidade",
    color: "hsl(var(--chart-2))",
  },
  temperature: {
    label: "Temperatura",
    color: "hsl(var(--chart-2))",
  },
  gasLevel: {
    label: "Concentração",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

interface MappedChartDataInterface{
  month: string;
  date: string;
  hour: string;
  temperature: number;
  humidity: number;
  gasLevel: number;
}

async function getReadingsData() {
  const apiReadingsFilteredResponse = await api.get('/readings-filtered', {
    params: { page: 1, limit: 15000, days: 30 },
  });
  
  const chartData: SensorData[] = apiReadingsFilteredResponse.data.items
    .sort((a: SensorData, b: SensorData) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

  if(chartData.length < 1){
    return { 
      averageData: [], 
      lastUpdateAt: "Sem dados" 
    };
  }

  const mappedChartData: MappedChartDataInterface[] = chartData.map((item) => ({
    month: new Date(item.timestamp).toLocaleString('pt-BR', { month: 'long' }),  // Formatação do timestamp
    date: new Date(item.timestamp).toLocaleDateString('pt-BR'),
    hour: new Date(item.timestamp).toLocaleDateString('pt-BR', {hour: '2-digit', minute: '2-digit'}),
    temperature: item.temperature,
    humidity: item.humidity,
    gasLevel: item.gasLevel,
  }));

  // Agrupar os dados por mês e calcular a média para cada mês
  const aggregatedData = mappedChartData.reduce((acc: any, curr: any) => {
    // Verificar se o mês já existe no acumulador
    const existingDate = acc.find((item: any) => item.date === curr.date);

    if (existingDate) {
      // Se o mês já existir, somar os valores e contar quantos itens há
      existingDate.temperatureSum += curr.temperature;
      existingDate.humiditySum += curr.humidity;
      existingDate.gasLevelSum += curr.gasLevel;
      existingDate.count += 1;
    } else {
      // Se o mês não existir, adicionar o novo mês ao acumulador
      acc.push({
        month: curr.month,
        date: curr.date,
        hour: curr.hour,
        temperatureSum: curr.temperature,
        humiditySum: curr.humidity,
        gasLevelSum: curr.gasLevel,
        count: 1,
      });
    }

    return acc;
  }, []);

  // Calcular a média para cada mês
  const averageData: MappedChartDataInterface[] = aggregatedData.map((item: any) => ({
    month: item.month,
    date: item.date,
    hour: item.hour,
    temperature: (item.temperatureSum / item.count),//.toFixed(2),
    humidity: (item.humiditySum / item.count),//.toFixed(2),
    gasLevel: (item.gasLevelSum / item.count),//.toFixed(2),
  }));

  let lastUpdateAt: string = averageData[averageData.length-1].hour;

  return { averageData, lastUpdateAt };
}

export async function Charts() {
  const { averageData, lastUpdateAt } = await getReadingsData();
  
  const XAxisDataKey = "date"; // mappedChartData.length > 90 ? "month" : "date";

  return (
    <div className="grid grid-cols-3 gap-x-10 mt-24 gap-y-5 max-md:mt-10 max-2xl:grid-cols-2 max-lg:grid-cols-1">
      <ChartBox
        title="Variação da Média de Temperatura (°C)"
        description="Últimos 30 dias"
        footerText={`Última atualização: ${lastUpdateAt}`}
      >
        <LineChartComponent 
          chartData={averageData} 
          chartConfig={chartConfig} 
          XAxisDataKey={XAxisDataKey}
          chartDataKey={"temperature"}
        />
      </ChartBox>
      <ChartBox
        title="Variação da Média de Umidade (%)"
        description="Últimos 30 dias"
        footerText={`Última atualização: ${lastUpdateAt}`}
      >
        <BarChartComponent 
          chartData={averageData}
          chartConfig={chartConfig}
          XAxisDataKey={XAxisDataKey}
          chartDataKey={"humidity"} 
        />
      </ChartBox>
      <ChartBox
        title="Média da Concentração dos Gases (ppm)"
        description="Últimos 30 dias"
        footerText={`Última atualização: ${lastUpdateAt}`}
      >
        <ScatterChartComponent 
          chartData={averageData}
          chartConfig={chartConfig}
          XAxisDataKey={XAxisDataKey}
          chartDataKey="gasLevel" 
        />
      </ChartBox>
    </div>
  )
}
