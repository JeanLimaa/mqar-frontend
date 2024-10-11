import LogoImage from "@/assets/logo/logo-ecosense.png"
import Image from 'next/image';

export default function Logo(){
    return (
        <div className='flex flex-col items-center gap-1'>
            <Image src={LogoImage} alt="Logo" width={48} height={48} />
            <p className='text-xs select-none text-slate-300'>EcoSense</p>
        </div>
    )
}