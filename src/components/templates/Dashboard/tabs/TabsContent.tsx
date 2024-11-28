import { BaseTable } from "../pages/table"
import { headers } from "next/headers"
import api from "@/services/protectedServerApiService";
import { Suspense } from "react";
import { Charts } from "../pages/charts";
import {
    TabsContent,
} from "@/components/ui/tabs"
import { SensorData } from "@/interfaces/sensor.interface";
import { getUrlParams } from "@/functions/getUrlParams";

interface apiReadingsFilteredData {
    items: SensorData[];
    totalPages: number;
    currentPage: number;
}

export async function TabsContentComponent(){
    const { page, days } = getUrlParams();
    const apiReadingsFilteredResponse = await api.get('/readings-filtered', {
        params: { page, days, limit: 5 },
    })
    
    const sensorsData: apiReadingsFilteredData = apiReadingsFilteredResponse.data;
/*     const sensorsData: apiReadingsFilteredData = {items: [
        {
            _id: "1",
            userId: "1",
            deviceId: "1",
            createdAt: "2022-01-01",
            timestamp: "2022-01-01",
            deviceName: "deviceName",
            temperature: 1,
            humidity: 1,
            gasLevel: 1,
        },
        {
            _id: "2",
            userId: "2",
            deviceId: "2",
            createdAt: "2022-02-02",
            timestamp: "2022-02-02",
            deviceName: "deviceName",
            temperature: 2,
            humidity: 2,
            gasLevel: 2,
        }
    ], currentPage: 1, totalPages: 1} */

    return(
        <>
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
        </>
    )
}