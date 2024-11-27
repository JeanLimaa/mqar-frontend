import Link from 'next/link'
import { ROOT_ROUTE } from '@/lib/routes' 
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className='w-full h-screen flex flex-col gap-3 text-center justify-center items-center'>
      <h2>Página não encontrada.</h2>
      <Button>
        <Link href={ROOT_ROUTE}>Retornar ao inicio</Link>
      </Button>
    </div>
  )
}