import Link from 'next/link';
import { createClient } from '@/utils/pocketbase/server';
import { redirect } from 'next/navigation';
import DashboardClient from './DashboardClient';

export default async function Dashboard() {
  const pb = await createClient();

  if (!pb.authStore.isValid) {
    redirect('/login');
  }

  const user = pb.authStore.model;

  // Fetch the user's decks from PocketBase
  let deckList: any[] = [];
  try {
    const records = await pb.collection('decks').getList(1, 50, {
      filter: `user_id = "${user?.id}"`,
      sort: '-updated',
    });
    deckList = records.items;
  } catch (err) {
    console.error("Failed to fetch decks", err);
  }

  const displayName = user?.name?.split(' ')[0] || user?.email?.split('@')[0] || 'User';

  return (
    <DashboardClient>
      <div className="p-8 md:p-12 max-w-7xl mx-auto w-full">
        <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">Welcome back, {displayName}</h1>
            <p className="text-neutral-400 text-lg">You have <span className="text-indigo-400 font-semibold">{deckList.length} decks</span> available.<br />Keep up the streak!</p>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-[0_0_20px_rgba(79,70,229,0.2)] hover:shadow-[0_0_30px_rgba(79,70,229,0.4)] hover:-translate-y-0.5 whitespace-nowrap">
            + Create Deck
          </button>
        </header>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-neutral-200 flex items-center gap-3">
              Your Decks
              <span className="bg-neutral-800/80 text-neutral-300 text-xs py-1 px-2.5 rounded-full border border-neutral-700/50">{deckList.length}</span>
            </h2>
          </div>

          {deckList.length === 0 ? (
            <div className="text-center py-20 bg-neutral-900 border border-neutral-800 rounded-2xl">
              <h3 className="text-xl text-neutral-300 font-semibold mb-2">No decks yet</h3>
              <p className="text-neutral-500 mb-6">Create your first deck to start studying.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {deckList.map((deck) => (
                <Link
                  key={deck.id}
                  href={`/decks/${deck.id}`}
                  className="group bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-indigo-500/50 hover:bg-neutral-800/80 transition-all duration-300 relative overflow-hidden flex flex-col h-[240px] shadow-lg shadow-black/20"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500/0 via-indigo-500 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-neutral-100 group-hover:text-indigo-400 transition-colors mb-3">
                      {deck.title}
                    </h3>
                    <p className="text-neutral-400 leading-relaxed line-clamp-3">
                      {deck.description || 'No description provided.'}
                    </p>
                  </div>

                  <div className="mt-auto pt-5 border-t border-neutral-800/60 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 font-medium text-neutral-300 bg-neutral-800/50 px-3 py-1.5 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)]"></div>
                      {deck.card_count || 0} cards
                    </div>
                    <div className="text-neutral-500 text-xs font-medium uppercase tracking-wider">
                      {deck.last_reviewed ? new Date(deck.last_reviewed).toLocaleDateString() : 'Never'}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </DashboardClient>
  );
}
