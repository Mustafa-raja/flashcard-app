'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Sidebar() {
    const pathname = usePathname();

    const navItems = [
        { name: 'Dashboard', href: '/' },
        { name: 'Decks', href: '/decks' },
        { name: 'Settings', href: '/settings' },
    ];

    return (
        <aside className="w-64 h-screen bg-neutral-900 border-r border-neutral-800/60 text-white flex flex-col shrink-0">
            <div className="p-6">
                <h1 className="text-2xl font-black bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
                    Memora.
                </h1>
                <p className="text-xs text-neutral-400 mt-1.5 font-medium tracking-wide uppercase">Spaced Repetition</p>
            </div>

            <nav className="flex-1 px-4 space-y-1.5 mt-6">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                                    ? 'bg-indigo-500/15 text-indigo-300 font-semibold shadow-[0_0_15px_rgba(99,102,241,0.1)]'
                                    : 'text-neutral-400 hover:bg-neutral-800/60 hover:text-neutral-100 font-medium'
                                }`}
                        >
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-neutral-800/60">
                <div className="flex items-center gap-3 px-4 py-3 bg-neutral-800/40 rounded-xl cursor-pointer hover:bg-neutral-800/80 transition-colors border border-neutral-700/30">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-sm shadow-inner overflow-hidden">
                        <span className="drop-shadow-md">JS</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate text-neutral-200">Jane Student</p>
                        <p className="text-xs text-indigo-400 font-medium truncate">Free Plan</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
