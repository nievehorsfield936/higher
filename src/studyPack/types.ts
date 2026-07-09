import type { Note } from '@/src/types';

export interface StudyPack {

  note: Note;

  summary: string;

  concepts: string[];

  flashcards: number;

  quizQuestions: number;

  preparation: number;

  estimatedStudyTime: number;
}