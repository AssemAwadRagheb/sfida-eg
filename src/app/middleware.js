// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const isDashboard = path.startsWith('/dashboard');
  const isLoginPage = path === '/dashboard/login';

  const isAuthenticated = request.cookies.get('isAuthenticated')?.value === 'true';

  if (isDashboard && !isLoginPage && !isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard/login', request.url));
  }

  if (isLoginPage && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};