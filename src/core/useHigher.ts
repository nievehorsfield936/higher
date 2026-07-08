import { useMemo } from 'react';

import { buildHigherCore } from './HigherCore';
import { useAppStore } from '@/src/store';

export function useHigher() {
  const subjects = useAppStore((s) => s.subjects);
  const notes = useAppStore((s) => s.notes);
  const flashcards = useAppStore((s) => s.flashcards);
  const assessments = useAppStore((s) => s.assessments);
  const completedSessions = useAppStore(
    (s) => s.completedSessions
  );

  return useMemo(
    () =>
      buildHigherCore({
        subjects,
        notes,
        flashcards,
        assessments,
        completedSessions,
      }),
    [
      subjects,
      notes,
      flashcards,
      assessments,
      completedSessions,
    ]
  );
}