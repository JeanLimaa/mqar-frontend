import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Se a solicitação for para a raiz ("/"), redirecione para "/home"
    if (pathname === '/') {
        return NextResponse.redirect(new URL('/home', req.url));
    }

    // Permitir outras solicitações
    return NextResponse.next();
}