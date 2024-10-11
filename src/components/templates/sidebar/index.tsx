import Logo from "@/components/atoms/Logo/Logo"
import NavItens from "@/components/molecules/Sidebar/NavItens"

export default function SideBar() {
    return(
        <header className="flex flex-col min-h-screen justify-between w-20 bg-slate-700 p-3">
            <Logo />
            <nav className='flex items-center justify-center'>
                <NavItens />
            </nav>
        </header>
    )
}