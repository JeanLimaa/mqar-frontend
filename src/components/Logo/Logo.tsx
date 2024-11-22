import LogoImage from "@/assets/logo/logo-ecosense.png"
import Image from 'next/image';

interface LogoProps {
    logoText?: boolean;
    mobile?: boolean;
}

export default function Logo({logoText = true}: LogoProps){
    return (
        <div className='flex flex-col items-center gap-1 max-md:gap-0'>
            <Image src={LogoImage} alt="Logo" width={48} height={48} className="max-md:w-8 max-md:h-8" />
            <p 
                className={`text-xs select-none text-slate-300 max-md:text-[0.5rem]`}
                style={{ display: !logoText ? 'none' : 'block' }}
            >
                EcoSense
            </p>
        </div>
    )
}