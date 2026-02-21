import Link from 'next/link';

// Mock Data
const DECKS = [
  { id: '1', title: 'AP Biology', description: 'Metabolism, Cells, and Genetics. High-yield flashcards for the upcoming midterms.', cardCount: 142, lastReviewed: '2 hours ago' },
  { id: '2', title: 'Spanish Vocab', description: 'Top 500 common conversational words', cardCount: 500, lastReviewed: '1 day ago' },
  { id: '3', title: 'World History', description: 'WWII and Cold War events', cardCount: 89, lastReviewed: '3 days ago' },
  { id: '4', title: 'System Design', description: 'Scaling web applications, databases, and microservices.', cardCount: 204, lastReviewed: 'Just now' },
];

export default function Dashboard() {
  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto w-full">
      <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">Welcome back, Jane</h1>
          <p className="text-neutral-400 text-lg">You have <span className="text-indigo-400 font-semibold">3 decks</span> to review today. Keep up the streak!</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-[0_0_20px_rgba(79,70,229,0.2)] hover:shadow-[0_0_30px_rgba(79,70,229,0.4)] hover:-translate-y-0.5 whitespace-nowrap">
          + Create Deck
        </button>
      </header>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-neutral-200 flex items-center gap-3">
            Your Decks
            <span className="bg-neutral-800/80 text-neutral-300 text-xs py-1 px-2.5 rounded-full border border-neutral-700/50">{DECKS.length}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DECKS.map((deck) => (
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
                  {deck.description}
                </p>
              </div>

              <div className="mt-auto pt-5 border-t border-neutral-800/60 flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 font-medium text-neutral-300 bg-neutral-800/50 px-3 py-1.5 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)]"></div>
                  {deck.cardCount} cards
                </div>
                <div className="text-neutral-500 text-xs font-medium uppercase tracking-wider">
                  {deck.lastReviewed}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
