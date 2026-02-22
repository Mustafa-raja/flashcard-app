import { createClient } from '@/utils/pocketbase/server'
import { redirect } from 'next/navigation'
import LoginForm from './LoginForm'

export default async function LoginPage() {
    const pb = await createClient()

    if (pb.authStore.isValid) {
        redirect('/')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-950 p-6 relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 p-8 rounded-2xl shadow-2xl relative z-10">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-black bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight mb-2">
                        Memora.
                    </h1>
                    <p className="text-neutral-400 font-medium">Sign in to your account</p>
                </div>

                <LoginForm />
            </div>
        </div>
    )
}
