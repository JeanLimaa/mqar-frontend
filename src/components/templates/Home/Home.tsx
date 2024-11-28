import { roboto } from "@/fonts/fonts";
import { NewConnection } from "@/components/Modal/NewConnection";
import { SensorBox } from "@/components/templates/Home/SensorBox/SensorBox";
import { Suspense } from "react";
import { getDevices } from "@/server-actions/getDevicesAction";
import { Sensor } from "@/interfaces/sensor.interface";
import { getUrlParams } from "@/functions/getUrlParams";
import { OrderBySelect } from "./OrderBySelect";
import api from "@/services/protectedServerApiService";

export default function Home(){
    const { orderBy } = getUrlParams();
    const sensors: Promise<Sensor[]> = getDevices();

    return(
        <>
        {/* <main className="min-h-screen bg-white flex flex-col p-14 flex-1"> */}
            <section className="w-full flex justify-between mb-14 gap-3">
                <div className="flex flex-col">
                    <OrderBySelect />
                </div>
                <NewConnection />
            </section>
            {/* container */}
            <section className={`${roboto.className} grid grid-cols-4 gap-y-6 gap-x-1 justify-start max-xl:grid-cols-3 max-[960px]:grid-cols-2 max-[960px]:justify-items-center max-[490px]:grid-cols-1`}> {/* max-xl:flex max-xl:flex-wrap max-xl:justify-between */}
                {/* box */}
                <Suspense fallback={<div>Carregando...</div>}>
                    <SensorBox sensors={sensors} orderBy={orderBy} />
                </Suspense>
            </section>
            {/* </main> */}
        </>
    )
}