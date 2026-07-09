import { analyseNote } from '../analyseNote';
import { buildGeneratedFlashcards } from '../flashcards/buildGeneratedFlashcards';

import type { Note } from '@/src/types';
import type { ProcessedNote } from './types';

export function processNote(
  note: Note
): ProcessedNote {
  const analysis = analyseNote(
    note.title,
    note.content
  );

  const flashcards =
    buildGeneratedFlashcards(
      note.title,
      note.content
    );

  return {
    note,

    score: analysis.score,

    concepts: analysis.concepts,

    flashcards: flashcards.length,

    quizQuestions:
      analysis.estimatedQuizQuestions,

    preparation: analysis.score,
  };
}