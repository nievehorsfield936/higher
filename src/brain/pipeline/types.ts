import type { Note } from '@/src/types';

export interface ProcessedNote {
  note: Note;

  score: number;

  concepts: string[];

  flashcards: number;

  quizQuestions: number;

  preparation: number;
}