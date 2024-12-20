import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconLink from '@/components/IconLink/IconLink';
import Tooltip from '@/components/Tooltip/Tooltip';
import { DropdownMenuBase } from '@/components/templates/Sidebar/DropdownMenu/DropdownMenu';

export default function NavItens() {
    return (
        <ul className='flex flex-col gap-y-3 max-md:flex-row max-md:gap-y-0 max-md:gap-x-3'>
            <Tooltip text='Inicio'>
                <li>
                    <IconLink href="/admin/home" icon={HomeIcon} />
                </li>
            </Tooltip>
            <Tooltip text='Dashboard'>
                <li>
                    <IconLink href="/admin/dashboard" icon={DashboardIcon} />
                </li>
            </Tooltip>
            <DropdownMenuBase tooltipText='Conta'>
                <li>
                    <IconLink href={'/admin/account'} icon={AccountCircleIcon} />
                </li>
            </DropdownMenuBase>
        </ul>
    )
}