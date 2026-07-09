import { processNote } from '@/src/brain/pipeline';

import type { Note } from '@/src/types';
import type { StudyPack } from './types';

export function buildStudyPack(
  note: Note
): StudyPack {

  const processed = processNote(note);

  return {

    note,

    summary:
      processed.concepts.length === 0
        ? 'Continue writing your notes.'
        : `This note mainly covers ${processed.concepts.join(', ')}.`,

    concepts: processed.concepts,

    flashcards: processed.flashcards,

    quizQuestions: processed.quizQuestions,

    preparation: processed.preparation,

    estimatedStudyTime: Math.max(
      5,
      processed.flashcards +
        processed.quizQuestions
    ),
  };
}