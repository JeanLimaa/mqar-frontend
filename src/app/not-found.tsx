import Link from 'next/link'
import { ROOT_ROUTE } from '@/lib/routes' 

export default function NotFound() {
  return (
    <div>
      <h2>Página não encontrada</h2>
      <Link href={ROOT_ROUTE}>Retornar ao inicio</Link>
    </div>
  )
}