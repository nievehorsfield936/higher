import { StateCreator } from 'zustand';

export interface Flashcard {
  id: string;
  subjectId: string;
  deckId: string;

  question: string;
  answer: string;

  timesSeen: number;
  timesCorrect: number;

  lastReviewed?: string;
  nextReview?: string;

  createdAt: string;
  updatedAt: string;
}

export interface FlashcardDeck {
  id: string;
  subjectId: string;
  name: string;
  createdAt: string;
}

export interface FlashcardSlice {
  flashcards: Flashcard[];
  decks: FlashcardDeck[];

  addDeck: (deck: FlashcardDeck) => void;
  deleteDeck: (id: string) => void;

  addFlashcard: (card: Flashcard) => void;
  updateFlashcard: (id: string, updates: Partial<Flashcard>) => void;
  deleteFlashcard: (id: string) => void;
}

export const createFlashcardSlice: StateCreator<
  FlashcardSlice,
  [],
  [],
  FlashcardSlice
> = (set) => ({
  flashcards: [],

  decks: [],

  addDeck: (deck) =>
    set((state) => ({
      decks: [...state.decks, deck],
    })),

  deleteDeck: (id) =>
    set((state) => ({
      decks: state.decks.filter((deck) => deck.id !== id),
      flashcards: state.flashcards.filter((card) => card.deckId !== id),
    })),

  addFlashcard: (card) =>
    set((state) => ({
      flashcards: [...state.flashcards, card],
    })),

  updateFlashcard: (id, updates) =>
    set((state) => ({
      flashcards: state.flashcards.map((card) =>
        card.id === id ? { ...card, ...updates } : card
      ),
    })),

  deleteFlashcard: (id) =>
    set((state) => ({
      flashcards: state.flashcards.filter((card) => card.id !== id),
    })),
});