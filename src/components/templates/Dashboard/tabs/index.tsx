import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { BaseTable } from "../pages/table"
import { headers } from "next/headers"
import api from "@/services/protectedServerApiService";
import { SensorData } from "@/interfaces/sensor.interface";
import { Suspense } from "react";
import { Charts } from "../pages/charts";

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
    //const view = url?.searchParams.get("view") || "history";

    const apiReadingsFilteredResponse = await api.get('/readings-filtered', {
        params: { page, days, limit: 5 },
    })
    
    const sensorsData: apiReadingsFilteredData = apiReadingsFilteredResponse.data;

    return (
        <Tabs defaultValue="historico" > {/* className="w-[200px]" */}
            <TabsList className="grid w-full grid-cols-2 mb-9">
                <TabsTrigger 
                    value="historico" 
                    newView={"history"}
                    className="bg-white text-slate-700 data-[state=active]:bg-slate-400 data-[state=active]:text-white rounded-sm py-2"
                >
                    Historico
                </TabsTrigger>
                <TabsTrigger 
                    value="graficos"
                    newView={"charts"}
                    className="bg-white text-slate-700 data-[state=active]:bg-slate-400 data-[state=active]:text-white rounded-sm py-2"
                >
                    Gráficos
                </TabsTrigger>
            </TabsList>
            <TabsContent className="min-w-full" value="historico">
                <div className="flex flex-col gap-5">
                <Suspense fallback={<div>Loading...</div>}>
                        <BaseTable 
                            page={sensorsData.currentPage || 1} 
                            sensorData={sensorsData.items} 
                            totalPages={sensorsData.totalPages}
                            days={days || "1"}
                        />
                </Suspense>
                </div>
            </TabsContent>
            <TabsContent value="graficos">
                <Suspense fallback={<div>Loading...</div>}>
                    <Charts />
                </Suspense>
            </TabsContent>
        </Tabs>
    )
}