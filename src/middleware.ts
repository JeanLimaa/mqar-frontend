import { DEFAULT_REDIRECT, PUBLIC_ROUTES, ROOT_ROUTE } from '@/lib/routes';
import { type NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest): NextResponse | undefined {
 const { nextUrl } = req;

 const isAuthenticated = !!req.cookies.get('authToken')?.value;
 const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

 if(nextUrl.pathname === "/" && isAuthenticated){
    return NextResponse.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
 }

 if(nextUrl.pathname === "/" && !isAuthenticated){
    return NextResponse.redirect(new URL(ROOT_ROUTE, nextUrl));
 }

 if (isPublicRoute && isAuthenticated){
     return NextResponse.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
 }

 if (!isAuthenticated && !isPublicRoute){
     return NextResponse.redirect(new URL(ROOT_ROUTE, nextUrl));
 }
};

export const config = {
 matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};