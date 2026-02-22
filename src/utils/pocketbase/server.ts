import PocketBase from 'pocketbase';
import { cookies } from 'next/headers';

export async function createClient() {
    const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090');

    // Get the cookies from the Next.js App Router context
    const cookieStore = await cookies();
    const pbCookie = cookieStore.get('pb_auth')?.value || '';

    // Load the current auth state from the cookie
    pb.authStore.loadFromCookie(`pb_auth=${pbCookie}`);

    try {
        // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
        if (pb.authStore.isValid) {
            await pb.collection('users').authRefresh();
        }
    } catch (_) {
        // clear the auth store on failed refresh
        pb.authStore.clear();
    }

    return pb;
}
