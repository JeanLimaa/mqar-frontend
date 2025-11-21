
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
    label: "Detecção de Gás",
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
      allData: [], 
      lastUpdateAt: "Sem dados" 
    };
  }

  // Mapeia todas as leituras sem agregação
  const allData: MappedChartDataInterface[] = chartData.map((item) => ({
    month: new Date(item.timestamp).toLocaleString('pt-BR', { month: 'long' }),
    date: new Date(item.timestamp).toLocaleDateString('pt-BR'),
    hour: new Date(item.timestamp).toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'}),
    temperature: item.temperature,
    humidity: item.humidity,
    gasLevel: item.gasLevel,
  }));

  let lastUpdateAt: string = allData[allData.length-1].hour;

  return { allData, lastUpdateAt };
}

export async function Charts() {
  const { allData, lastUpdateAt } = await getReadingsData();
  
  const XAxisDataKey = "date"; // mappedChartData.length > 90 ? "month" : "date";

  return (
    <div className="grid grid-cols-3 gap-x-10 mt-24 gap-y-5 max-md:mt-10 max-2xl:grid-cols-2 max-lg:grid-cols-1">
      <ChartBox
        title="Variação de Temperatura (°C)"
        description="Últimos 30 dias"
        footerText={`Última atualização: ${lastUpdateAt}`}
      >
        <LineChartComponent 
          chartData={allData} 
          chartConfig={chartConfig} 
          XAxisDataKey={XAxisDataKey}
          chartDataKey={"temperature"}
        />
      </ChartBox>
      <ChartBox
        title="Variação de Umidade (%)"
        description="Últimos 30 dias"
        footerText={`Última atualização: ${lastUpdateAt}`}
      >
        <BarChartComponent 
          chartData={allData}
          chartConfig={chartConfig}
          XAxisDataKey={XAxisDataKey}
          chartDataKey={"humidity"} 
        />
      </ChartBox>
      <ChartBox
        title="Detecção de Gases (Sensor Digital)"
        description="Últimos 30 dias"
        footerText={`Última atualização: ${lastUpdateAt}`}
      >
        <ScatterChartComponent 
          chartData={allData}
          chartConfig={chartConfig}
          XAxisDataKey={XAxisDataKey}
          chartDataKey="gasLevel" 
        />
      </ChartBox>
    </div>
  )
}
