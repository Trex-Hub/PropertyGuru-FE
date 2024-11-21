import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { lang } from './utils/utilities';

const headers = { 'accept-language': 'en-US,en;q=0.5' };
const languages = new Negotiator({ headers }).languages();
const locales = ['en', 'ar'];
const defaultLocale = lang;
const route = match(languages, locales, defaultLocale);

export function middleware(request: NextRequest) {
  // Check if the request is for the root path
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL(`/${route}`, request.url));
  }
  // Check if we're trying to access the wishlist page
  if (request.nextUrl.pathname.includes('/wishlist')) {
    const token = request.cookies.get('token')?.value;

    // If no token exists, redirect to the home page with the correct language prefix
    if (!token) {
      return NextResponse.redirect(new URL(`/${route}`, request.url));
    }
  }

  // Skip middleware for auth routes completely
  if (request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.next();
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    // Match all wishlist paths in all languages
    '/en/wishlist/:path*',
    '/ar/wishlist/:path*',
    // Match all reset password paths in all languages
    '/en/reset-password',
    '/ar/reset-password',
    // Match auth routes but exclude callback
    '/auth/:path*',
  ],
};
