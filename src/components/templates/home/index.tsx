import { Button, TextField } from "@mui/material"

import { roboto } from "@/app/layout";
import { NewConnection } from "@/components/molecules/Modal/NewConnection";
import {SensorBox} from "@/components/molecules/home/sensorView/SensorView";

export default function Home(){
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
            <section className={`${roboto.className} grid grid-cols-4 justify-start`}>
                {/* box */}
                <SensorBox />
            </section>
            {/* </main> */}
        </>
    )
}