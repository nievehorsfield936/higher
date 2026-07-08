import { useMemo } from 'react';

import { analyseNote } from '@/src/brain/analyseNote';
import { buildGeneratedFlashcards } from '@/src/brain/flashcards/buildGeneratedFlashcards';

export function useLiveNoteAnalysis(
  title: string,
  content: string
) {
  return useMemo(() => {
    const analysis = analyseNote(title, content);

    const flashcards = buildGeneratedFlashcards(
      title,
      content
    );

    return {
      analysis,
      flashcards,
    };
  }, [title, content]);
}