import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';

const intlMiddleware = createIntlMiddleware({
    locales,
    defaultLocale,
    localePrefix: 'as-needed'
});

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // 0. Skip middleware for static files and internal next paths
    if (
        pathname.match(/\.(js|css|png|jpg|jpeg|gif|webp|svg|ico|txt)$/) ||
        pathname.includes('/_next/') ||
        pathname.startsWith('/api/')
    ) {
        return NextResponse.next();
    }

    // 1. Handle Admin Routes (Supabase Auth + No Localization)
    if (pathname.startsWith('/admin')) {
        let response = NextResponse.next({
            request: {
                headers: request.headers,
            },
        });

        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    get(name: string) {
                        return request.cookies.get(name)?.value
                    },
                    set(name: string, value: string, options: CookieOptions) {
                        request.cookies.set({ name, value, ...options })
                        response = NextResponse.next({
                            request: { headers: request.headers },
                        })
                        response.cookies.set({ name, value, ...options })
                    },
                    remove(name: string, options: CookieOptions) {
                        request.cookies.set({ name, value: '', ...options })
                        response = NextResponse.next({
                            request: { headers: request.headers },
                        })
                        response.cookies.set({ name, value: '', ...options })
                    },
                },
            }
        );

        const { data: { user } } = await supabase.auth.getUser();

        // Protect admin dashboard
        if (!pathname.startsWith('/admin/login') && !user) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        // Redirect to dashboard if already logged in
        if (pathname.startsWith('/admin/login') && user) {
            return NextResponse.redirect(new URL('/admin', request.url));
        }

        return response;
    }

    // 2. Handle Public Routes (Localization)
    return intlMiddleware(request);
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
