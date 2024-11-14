import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { BaseTable } from "../table"
import { headers } from "next/headers"
import api from "@/services/protectedServerApiService";
import { SensorData } from "@/interfaces/sensor.interface";
import { Suspense } from "react";

interface apiReadingsFilteredData {
    items: SensorData[];
    totalPages: number;
    currentPage: number;
}

export async function TabsBase() {
    const header =  headers();
    const urlString = header.get('x-url');
    const url = urlString ? new URL(urlString) : null;

    const page = url?.searchParams.get("page");
    const days = url?.searchParams.get("days");

    const apiReadingsFilteredResponse = await api.get('/readings-filtered', {
        params: { page, limit: 5, days },
    })

    const sensorsData: apiReadingsFilteredData = apiReadingsFilteredResponse.data;

    return (
        <Tabs defaultValue="historico" > {/* className="w-[200px]" */}
            <TabsList className="grid w-full grid-cols-2 mb-9">
                <TabsTrigger 
                    value="historico" 
                    className="bg-white text-slate-700 data-[state=active]:bg-slate-400 data-[state=active]:text-white rounded-sm py-2"
                >
                    Historico
                </TabsTrigger>
                <TabsTrigger 
                    value="graficos" 
                    className="bg-white text-slate-700 data-[state=active]:bg-slate-400 data-[state=active]:text-white rounded-sm py-2"
                >
                    Gráficos
                </TabsTrigger>
            </TabsList>
            <TabsContent className="min-w-full" value="historico">
                <div className="flex flex-col gap-5">
                        <BaseTable 
                            page={sensorsData.currentPage || 1} 
                            sensorData={sensorsData.items} 
                            totalPages={sensorsData.totalPages}
                            days={days || "1"}
                        />
                </div>
            </TabsContent>
            <TabsContent value="graficos">
                <div>ousada</div>
            </TabsContent>
        </Tabs>
    )
}