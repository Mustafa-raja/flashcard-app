'use client'

import { useState } from 'react'
import { createClient } from '@/utils/pocketbase/client'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const pb = createClient()

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            await pb.collection('users').authWithPassword(email, password)
            router.push('/')
            router.refresh()
        } catch (err: any) {
            setError(err.message || 'Failed to sign in. Please check your credentials.')
            setIsLoading(false)
        }
    }

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email || password.length < 8) {
            setError("Email is required and password must be at least 8 characters.")
            return;
        }

        setIsLoading(true)
        setError(null)

        try {
            // Create the user
            await pb.collection('users').create({
                email,
                password,
                passwordConfirm: password,
                emailVisibility: true,
            })

            // Auto sign-in after creation
            await pb.collection('users').authWithPassword(email, password)

            router.push('/')
            router.refresh()
        } catch (err: any) {
            setError(err.message || 'Failed to create account. Email might be in use.')
            setIsLoading(false)
        }
    }

    return (
        <form className="space-y-5">
            {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-medium text-center">
                    {error}
                </div>
            )}

            <div className="space-y-1">
                <label className="text-sm font-semibold text-neutral-300">Email Address</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                    placeholder="jane@example.com"
                />
            </div>

            <div className="space-y-1">
                <label className="text-sm font-semibold text-neutral-300">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                    placeholder="••••••••"
                />
            </div>

            <div className="pt-2 flex flex-col gap-3">
                <button
                    onClick={handleSignIn}
                    disabled={isLoading}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-semibold transition-all shadow-[0_0_20px_rgba(79,70,229,0.2)] hover:shadow-[0_0_30px_rgba(79,70,229,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                </button>
                <button
                    onClick={handleSignUp}
                    disabled={isLoading}
                    className="w-full bg-neutral-800 hover:bg-neutral-700 text-neutral-200 py-3 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-neutral-700"
                >
                    Create Account
                </button>
            </div>
        </form>
    )
}
