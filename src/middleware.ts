import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';
import { authKey } from './lib';

const authRoutes = ['/forgot-password', '/new-password', '/verify-otp'];

const roleConfig = {
  admin: {
    basePath: '/admin',
    allowedPaths: /^\/admin\/*/,
  },
  reviewer: {
    basePath: '/reviewer',
    allowedPaths: /^\/reviewer\/*/,
  },
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookiesStore = await cookies();
  const token = cookiesStore.get(authKey)?.value;
  const decoded: any = token && jwtDecode(token as string);
  const roleKey = decoded?.role as string;

  if (!token) {
    if (pathname.startsWith('/admin') || pathname.startsWith('/reviewer')) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  }

  if (!roleKey) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  //   role-base redirect
  const config = roleConfig[roleKey as keyof typeof roleConfig];

  if (config) {
    if (pathname === '/') {
      return NextResponse.redirect(new URL(config.basePath, request.url));
    }

    if (config.allowedPaths.test(pathname)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: [
    '/',
    '/admin/:path*',
    '/reviewer/:path*',
    '/forgot-password',
    '/new-password',
    '/verify-otp',
  ],
};
