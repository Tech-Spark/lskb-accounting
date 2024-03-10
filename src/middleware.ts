import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// this function can be marked 'async' if using 'await' inside

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const conditionalRoutes = ['/', '/login', '/signup'];
  const protectedRoutes = [
    '/dashboard/kapelanka',
    '/dashboard/balicka',
    '/dashboard/bulwar',
    '/dashboard/profile',
    '/dashboard',
  ];
  const token = request.cookies.get('token')?.value || '';

  if (token && conditionalRoutes.includes(path)) {
    const absouluteURL = new URL('/dashboard', request.nextUrl.origin);
    return NextResponse.redirect(absouluteURL.toString());
  }
  if (!token && protectedRoutes.includes(path)) {
    const absouluteURL = new URL('/', request.nextUrl.origin);
    return NextResponse.redirect(absouluteURL.toString());
  }
}

// see "Matching parths" below to learn more

export const config = {
  matcher: [
    '/',
    '/dashboard',
    '/dashboard/kapelanka',
    '/dashboard/balicka',
    '/dashboard/bulwar',
    '/dashboard/profile',
    '/login',
    '/signup',
  ],
};
