import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import PocketBase from 'pocketbase';

export async function middleware(request: NextRequest) {
    const response = NextResponse.next();
    const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090');

    // Load the store from the request cookies
    pb.authStore.loadFromCookie(request.headers.get('cookie') || '');

    try {
        // Check if the auth token is valid by refreshing
        if (pb.authStore.isValid) {
            await pb.collection('users').authRefresh();
        }
    } catch (err) {
        pb.authStore.clear();
    }

    // Determine path protection
    const isAuthRoute = request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/auth');

    if (!pb.authStore.isValid && !isAuthRoute) {
        // User is not logged in and trying to access protected route
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (pb.authStore.isValid && isAuthRoute) {
        // User is logged in and trying to access login page
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Update the response cookies with the verified/refreshed authStore state
    const updatedCookie = pb.authStore.exportToCookie({ httpOnly: false });
    if (updatedCookie) {
        // Split the cookie string (pb.authStore.exportToCookie returns something like: "pb_auth=xxxx; Path=/; SameSite=Lax")
        response.headers.append('set-cookie', updatedCookie);
    } else {
        // Delete the cookie if the authStore is voided
        response.cookies.delete('pb_auth');
    }

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
