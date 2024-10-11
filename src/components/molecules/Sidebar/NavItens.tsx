import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconLink from '@/components/atoms/IconLink/IconLink'; 

export default function NavItens(){
    return(
        <ul className='flex flex-col gap-y-3'>
            <li>
                <IconLink href="home" icon={HomeIcon} />
            </li>
            <li>
                <IconLink href="dashboard" icon={DashboardIcon} />
            </li>
            <li>
                <IconLink href="account" icon={AccountCircleIcon} />
            </li>
        </ul>
    )
}