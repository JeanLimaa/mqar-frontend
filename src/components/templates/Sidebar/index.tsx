import Logo from "@/components/Logo/Logo"
import NavItens from "@/components/templates/Sidebar/NavItens"

export default function SideBar() {
    return(
        <aside className="fixed top-0 left-0 flex flex-col h-screen justify-between w-20 bg-slate-700 p-3 z-10 max-md:h-14 max-md:min-w-full max-md:flex-row max-md:p-2 max-md:shadow-lg">
            <Logo />
            <nav className='flex items-center justify-center max-md:items-center max-md:justify-end'>
                <NavItens />
            </nav>
        </aside>
    )
}