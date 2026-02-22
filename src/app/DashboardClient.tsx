'use client';

import { useState } from 'react';
import CreateDeckModal from '@/components/CreateDeckModal';

export default function DashboardClient({ children }: { children: React.ReactNode }) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    return (
        <>
            <div data-testid="dashboard-container" onClick={(e) => {
                // Determine if they clicked a "Create Deck" button
                const target = e.target as HTMLElement;
                if (target.textContent?.includes('+ Create Deck')) {
                    setIsCreateModalOpen(true);
                }
            }}>
                {children}
            </div>

            {isCreateModalOpen && (
                <CreateDeckModal onClose={() => setIsCreateModalOpen(false)} />
            )}
        </>
    );
}
