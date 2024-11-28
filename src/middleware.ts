import { DEFAULT_REDIRECT, PUBLIC_ROUTES, ROOT_ROUTE } from '@/lib/routes';
import { type NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest): NextResponse | undefined {
  const { nextUrl } = req;

  const isAuthenticated = !!req.cookies.get('accessToken')?.value && !!req.cookies.get('refreshToken')?.value;
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

  if (nextUrl.pathname === "/" && isAuthenticated) {
    return NextResponse.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
  }

  if (nextUrl.pathname === "/" && !isAuthenticated) {
    return NextResponse.redirect(new URL(ROOT_ROUTE, nextUrl));
  }

  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
  }

  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL(ROOT_ROUTE, nextUrl));
  }

  const requestHeaders = new Headers(req.headers);

  const hasDashBoardParams = nextUrl.searchParams.has('page') && nextUrl.searchParams.has('days');
  const isDashBoardPage = nextUrl.pathname.includes('dashboard');

  const pageParams = nextUrl.searchParams.get('page');
  const daysParams = nextUrl.searchParams.get('days');
  const viewParams = nextUrl.searchParams.get('view');

  const isValidParams =
    Number.isInteger(Number(pageParams))
    && (Number.isInteger(Number(daysParams)) || daysParams === '*')
    && (viewParams && viewParams == "history" || viewParams == "charts");

  // Se os parâmetros `page` e `days` existirem, apenas adicionar o header `x-url`
/*   if (hasDashBoardParams && isDashBoardPage && isValidParams && viewParams) {
    requestHeaders.set('x-url', req.url); // atualizar o header `x-url`
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  } */

  if (
    !hasDashBoardParams && isDashBoardPage ||
    !isValidParams && isDashBoardPage ||
    !viewParams && isDashBoardPage
  ) {
    // Adicionar parâmetros `page=1&days=1&view=history` à URL e reescrever
    const modifiedUrl = new URL(req.url);

    modifiedUrl.searchParams.set('page', '1');
    modifiedUrl.searchParams.set('days', '1');
    modifiedUrl.searchParams.set('view', 'history');

    return NextResponse.redirect(modifiedUrl);
  }

  requestHeaders.set('x-url', req.url);
  return NextResponse.next({
      request: { headers: requestHeaders },
  });
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};