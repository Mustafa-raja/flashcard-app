import PocketBase from 'pocketbase';

// Create a singleton instance for client-side usage
let pb: PocketBase | null = null;

export function createClient() {
    if (!pb) {
        pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090');
        // Ensure the auth store syncs with document.cookie on the client side
        pb.authStore.onChange(() => {
            document.cookie = pb?.authStore.exportToCookie({ httpOnly: false }) || '';
        }, true);
    }
    return pb;
}
