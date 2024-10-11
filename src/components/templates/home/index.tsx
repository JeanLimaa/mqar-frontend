import { Button, TextField } from "@mui/material"

import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { roboto } from "@/app/layout";
import IconWithText from "@/components/atoms/IconWithText/IconWithText";
import { NewConnection } from "@/components/organisms/Home/Modal/NewConnection";

export default function Home(){
    return(
        <main className="min-h-screen bg-white flex flex-col p-14 flex-1">
            <div className="w-full flex justify-between mb-14">
                <TextField 
                    size="small" 
                    label="Filtrar por nome" 
                    placeholder="Digite algo aqui..." 
                    variant="outlined" 
                />
{/*                 <Button 
                    size="small" 
                    variant="contained"
                    style={{textTransform: 'none'}}
                    className="bg-slate-700 px-7"
                    autoCapitalize="words"
                >
                    Nova conexão
                </Button> */}
                <NewConnection />
            </div>
            {/* container */}
            <div className={`${roboto.className} grid grid-cols-4 justify-start`}>
                {/* box */}
                <div className="bg-slate-600 w-64 h-72 rounded-3xl text-white">
                    {/* titulo com o nome do sensor */}
                    <div className="w-full mb-5 bg-slate-700 rounded-t-3xl py-3 px-6" >
                        <h1 className="text-lg">Sensor 1</h1>
                    </div>
                    {/* cada item das caracteristicas */}
                    <div className="flex flex-col gap-6 px-6">
                        {/* icon com titulo da caract */}
                        <IconWithText icon={DeviceThermostatIcon} title="Temperatura" value="20°C" />
                        <IconWithText icon={WaterDropOutlinedIcon} title="Umidade" value="50%" />
                        <IconWithText icon={FavoriteBorderIcon} title="Qualidade do ar" value="Ruim (200ppm)" />
                    </div>
                </div>
            </div>
        </main>
    )
}