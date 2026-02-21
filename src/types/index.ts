export interface Deck {
  id: string;
  title: string;
  description: string;
  cardCount: number;
  lastReviewed?: string;
}

export interface Flashcard {
  id: string;
  deckId: string;
  question: string;
  answer: string;
  nextReviewDate: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}
