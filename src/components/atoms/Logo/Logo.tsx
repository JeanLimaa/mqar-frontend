import LogoImage from "@/assets/logo/logo-ecosense.png"
import Image from 'next/image';

interface LogoProps {
    logoText?: boolean;
}

export default function Logo({logoText = true}: LogoProps){
    return (
        <div className='flex flex-col items-center gap-1'>
            <Image src={LogoImage} alt="Logo" width={48} height={48} />
            {logoText && <p className='text-xs select-none text-slate-300'>EcoSense</p>}
        </div>
    )
}