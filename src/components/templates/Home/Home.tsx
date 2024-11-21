import { Button, TextField } from "@mui/material"

import { roboto } from "@/fonts/fonts";
import { NewConnection } from "@/components/Modal/NewConnection";
import {SensorBox} from "@/components/templates/Home/SensorBox/SensorBox";
import { Suspense } from "react";
import { get } from "http";
import { getCachedDevices, getDevices } from "@/server-actions/getDevicesAction";
import { Sensor } from "@/interfaces/sensor.interface";

export default async function Home(){
    const sensors: Sensor[] | null = await getDevices();

    return(
        <>
        {/* <main className="min-h-screen bg-white flex flex-col p-14 flex-1"> */}
            <section className="w-full flex justify-between mb-14">
                <TextField 
                    size="small" 
                    label="Filtrar por nome" 
                    placeholder="Digite algo aqui..." 
                    variant="outlined" 
                />
                <NewConnection />
            </section>
            {/* container */}
            <section className={`${roboto.className} grid grid-cols-4 gap-y-6 gap-x-1 justify-start max-xl:flex max-xl:flex-wrap`}>
                {/* box */}
                <Suspense fallback={<div>Carregando...</div>}>
                    <SensorBox sensors={sensors} />
                </Suspense>
            </section>
            {/* </main> */}
        </>
    )
}