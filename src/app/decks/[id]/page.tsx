'use client';

import { useState, use } from 'react';
import Link from 'next/link';

const MOCK_FLASHCARDS = [
    { id: '1', question: 'What is the powerhouse of the cell?', answer: 'The mitochondria, which generates most of the chemical energy needed to power the cell.' },
    { id: '2', question: 'What is the process by which plants make their own food?', answer: 'Photosynthesis, using sunlight to synthesize foods from carbon dioxide and water.' },
    { id: '3', question: 'What principle states that allele frequencies remain constant in a population?', answer: 'Hardy-Weinberg Principle, assuming no mutation, migration, or selection.' },
];

export default function ReviewPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    const currentCard = MOCK_FLASHCARDS[currentIndex];

    const handleReveal = () => {
        setIsFlipped(true);
    };

    const handleNext = (rating: 'again' | 'hard' | 'good' | 'easy') => {
        console.log(`Card ${currentCard.id} rated: ${rating}`);
        setIsFlipped(false);

        // Slight delay for animation reset
        setTimeout(() => {
            if (currentIndex < MOCK_FLASHCARDS.length - 1) {
                setCurrentIndex((prev) => prev + 1);
            } else {
                setIsFinished(true);
            }
        }, 150);
    };

    if (isFinished) {
        return (
            <div className="p-8 md:p-12 max-w-4xl mx-auto w-full flex flex-col items-center justify-center min-h-[60vh]">
                <div className="w-24 h-24 bg-gradient-to-tr from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(52,211,153,0.4)]">
                    <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h1 className="text-4xl font-bold text-white mb-4">Deck Completed!</h1>
                <p className="text-neutral-400 text-lg mb-8 text-center max-w-md">
                    Great job! You have reviewed all {MOCK_FLASHCARDS.length} cards in this deck. Come back tomorrow to keep your streak alive.
                </p>
                <Link href="/" className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg hover:shadow-indigo-500/25">
                    Return to Dashboard
                </Link>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-10 max-w-4xl mx-auto w-full flex flex-col h-full">
            <header className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-white transition-colors">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                    </Link>
                    <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">AP Biology Review</h1>
                </div>
                <div className="text-sm font-medium text-neutral-400 bg-neutral-800/60 px-4 py-2 rounded-full border border-neutral-700/50">
                    Card {currentIndex + 1} of {MOCK_FLASHCARDS.length}
                </div>
            </header>

            <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full gap-8">

                {/* Flashcard Container */}
                <div
                    className="w-full min-h-[400px] relative"
                    onClick={!isFlipped ? handleReveal : undefined}
                >
                    <div className={`w-full h-full min-h-[400px] transition-all duration-500 relative ${!isFlipped ? 'cursor-pointer hover:scale-[1.02] shadow-2xl shadow-black/40' : 'shadow-[0_0_50px_rgba(99,102,241,0.15)] ring-1 ring-indigo-500/30'} bg-neutral-900 border border-neutral-800 rounded-3xl p-8 md:p-12 flex flex-col text-center`}>

                        <div className={`flex-1 flex flex-col items-center flex-grow ${!isFlipped ? 'justify-center' : 'justify-start mt-4'}`}>
                            <span className="text-indigo-400 font-bold tracking-widest uppercase text-xs mb-6">Question</span>
                            <h2 className="text-3xl md:text-4xl font-semibold text-white leading-tight">
                                {currentCard.question}
                            </h2>
                        </div>

                        {isFlipped && (
                            <>
                                <div className="w-full h-px bg-neutral-800/80 my-8"></div>
                                <div className="flex-1 flex flex-col items-center justify-center animate-[fadeIn_0.5s_ease-out_forwards]">
                                    <span className="text-emerald-400 font-bold tracking-widest uppercase text-xs mb-6">Answer</span>
                                    <p className="text-2xl text-neutral-200 leading-relaxed font-medium">
                                        {currentCard.answer}
                                    </p>
                                </div>
                            </>
                        )}

                        {!isFlipped && (
                            <div className="mt-auto pt-8 text-neutral-500 font-medium text-sm animate-pulse">
                                Click anywhere to reveal answer
                            </div>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className={`w-full max-w-md grid grid-cols-4 gap-3 transition-opacity duration-500 ${isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <button onClick={() => handleNext('again')} className="group flex flex-col items-center justify-center p-3 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 transition-all font-semibold">
                        <span className="text-[10px] opacity-70 group-hover:opacity-100 mb-0.5 uppercase tracking-wider">Again</span>
                        <span className="text-sm">&lt; 1m</span>
                    </button>
                    <button onClick={() => handleNext('hard')} className="group flex flex-col items-center justify-center p-3 rounded-xl bg-orange-500/10 hover:bg-orange-500 text-orange-400 hover:text-white border border-orange-500/20 transition-all font-semibold">
                        <span className="text-[10px] opacity-70 group-hover:opacity-100 mb-0.5 uppercase tracking-wider">Hard</span>
                        <span className="text-sm">6m</span>
                    </button>
                    <button onClick={() => handleNext('good')} className="group flex flex-col items-center justify-center p-3 rounded-xl bg-indigo-500/10 hover:bg-indigo-500 text-indigo-400 hover:text-white border border-indigo-500/20 transition-all font-semibold shadow-[0_0_15px_rgba(99,102,241,0.15)] group-hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                        <span className="text-[10px] opacity-70 group-hover:opacity-100 mb-0.5 uppercase tracking-wider">Good</span>
                        <span className="text-sm">10m</span>
                    </button>
                    <button onClick={() => handleNext('easy')} className="group flex flex-col items-center justify-center p-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-emerald-500/20 transition-all font-semibold">
                        <span className="text-[10px] opacity-70 group-hover:opacity-100 mb-0.5 uppercase tracking-wider">Easy</span>
                        <span className="text-sm">4d</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
