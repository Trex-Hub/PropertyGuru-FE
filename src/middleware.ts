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
  return NextResponse.redirect(new URL(`/${route}`, request.url));
}

export const config = {
  matcher: '/',
};
