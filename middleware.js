import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname, search } = request.nextUrl;
  const hostname = request.headers.get('host');

  // Redirect www to non-www (canonical domain)
  if (hostname === 'www.arbovert.cz') {
    const url = request.nextUrl.clone();
    url.hostname = 'arbovert.cz';
    url.protocol = 'https:';
    return NextResponse.redirect(url, 301);
  }

  // Redirect HTTP to HTTPS
  if (request.nextUrl.protocol === 'http:') {
    const url = request.nextUrl.clone();
    url.protocol = 'https:';
    return NextResponse.redirect(url, 301);
  }

  // Handle .html URLs - strip .html for internal routing
  if (pathname.endsWith('.html') && pathname !== '/index.html') {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace('.html', '');
    return NextResponse.rewrite(url);
  }

  // Ensure trailing slash is handled properly
  if (pathname !== '/' && pathname.endsWith('/')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(0, -1);
    return NextResponse.redirect(url, 301);
  }

  // Redirect old inventarizace-drevin URL to new location
  if (pathname === '/inventarizace-drevin') {
    const url = request.nextUrl.clone();
    url.pathname = '/sluzby/inventarizace-drevin';
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 