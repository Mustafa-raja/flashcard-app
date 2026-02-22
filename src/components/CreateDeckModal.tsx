'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/pocketbase/client';

export default function CreateDeckModal({ onClose }: { onClose: () => void }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const pb = createClient();

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        setIsLoading(true);

        try {
            if (pb.authStore.model) {
                await pb.collection('decks').create({
                    title,
                    description,
                    user_id: pb.authStore.model.id,
                    card_count: 0
                });
                router.refresh();
                onClose();
            }
        } catch (err) {
            console.error('Error creating deck:', err);
            alert('Failed to create deck.');
        }

        setIsLoading(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-neutral-800">
                    <h2 className="text-2xl font-bold text-white">Create New Deck</h2>
                </div>

                <form onSubmit={handleCreate} className="p-6 space-y-5">
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-neutral-300">Deck Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            autoFocus
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                            placeholder="e.g. AP Biology, Spanish 101"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-neutral-300">Description (Optional)</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors resize-none"
                            placeholder="What is this deck about?"
                        />
                    </div>

                    <div className="pt-4 flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isLoading}
                            className="px-5 py-2.5 rounded-xl font-medium text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading || !title.trim()}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-[0_0_20px_rgba(79,70,229,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Creating...' : 'Create Deck'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
