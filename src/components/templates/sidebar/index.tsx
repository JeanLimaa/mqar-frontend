import Logo from "@/components/atoms/Logo/Logo"
import { DropdownMenuBase } from "@/components/molecules/Sidebar/DropdownMenu/DropdownMenu"
import NavItens from "@/components/molecules/Sidebar/NavItens"

export default function SideBar() {
    return(
        <aside className="fixed top-0 left-0 flex flex-col h-screen justify-between w-20 bg-slate-700 p-3 z-10">
            <Logo />
            <nav className='flex items-center justify-center'>
                <NavItens />
            </nav>
        </aside>
    )
}