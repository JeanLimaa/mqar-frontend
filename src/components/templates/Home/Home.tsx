import { roboto } from "@/fonts/fonts";
import { NewConnection } from "@/components/Modal/NewConnection";
import {SensorBox} from "@/components/templates/Home/SensorBox/SensorBox";
import { Suspense } from "react";
import { getDevices } from "@/server-actions/getDevicesAction";
import { Sensor } from "@/interfaces/sensor.interface";
import { Input } from "@/components/ui/input";

export default async function Home(){
    const sensors: Sensor[] | null = await getDevices();

    return(
        <>
        {/* <main className="min-h-screen bg-white flex flex-col p-14 flex-1"> */}
            <section className="w-full flex justify-between mb-14 gap-3">
                <div className="flex flex-col">
{/*                     <Label htmlFor="search" className="text-xs text-slate-600">
                        Filtrar por nome
                    </Label> */}
                    <Input
                        id="search"
                        type="text"
                        //placeholder="Digite aqui..."
                        placeholder="Filtrar por nome"
                    />
                </div>
                <NewConnection />
            </section>
            {/* container */}
            <section className={`${roboto.className} grid grid-cols-4 gap-y-6 gap-x-1 justify-start max-xl:grid-cols-3 max-[960px]:grid-cols-2 max-[960px]:justify-items-center max-[490px]:grid-cols-1`}> {/* max-xl:flex max-xl:flex-wrap max-xl:justify-between */}
                {/* box */}
                <Suspense fallback={<div>Carregando...</div>}>
                    <SensorBox sensors={sensors} />
                </Suspense>
            </section>
            {/* </main> */}
        </>
    )
}