import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale, getLocaleFromCountry, type Locale } from './i18n/config';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip les routes API et les fichiers statiques
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/videos') ||
    pathname.includes('.') // fichiers statiques (.png, .ico, etc.)
  ) {
    return NextResponse.next();
  }

  // Vérifier si l'utilisateur a déjà une préférence de langue (cookie)
  const localeCookie = request.cookies.get('NEXT_LOCALE')?.value as Locale | undefined;

  // Si pas de cookie, détecter via géolocalisation IP
  if (!localeCookie) {
    // Vercel fournit le pays via ce header
    const country = request.headers.get('x-vercel-ip-country') ||
                    'CI'; // Défaut: Côte d'Ivoire (marché principal)

    const detectedLocale = getLocaleFromCountry(country);

    // Appliquer le middleware i18n
    const response = intlMiddleware(request);

    // Sauvegarder la préférence dans un cookie (1 an)
    response.cookies.set('NEXT_LOCALE', detectedLocale, {
      maxAge: 60 * 60 * 24 * 365, // 1 an
      path: '/',
      sameSite: 'lax',
    });

    // Si la locale détectée est différente de celle dans l'URL, rediriger
    const pathnameLocale = locales.find(
      (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (!pathnameLocale) {
      // Pas de locale dans l'URL, rediriger vers la locale détectée
      const newUrl = new URL(`/${detectedLocale}${pathname}`, request.url);
      const redirectResponse = NextResponse.redirect(newUrl);
      redirectResponse.cookies.set('NEXT_LOCALE', detectedLocale, {
        maxAge: 60 * 60 * 24 * 365,
        path: '/',
        sameSite: 'lax',
      });
      return redirectResponse;
    }

    return response;
  }

  // L'utilisateur a une préférence, utiliser le middleware standard
  return intlMiddleware(request);
}

export const config = {
  // Matcher pour toutes les routes sauf API, _next, et fichiers statiques
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
