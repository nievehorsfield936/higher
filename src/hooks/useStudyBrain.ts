import { useMemo } from 'react';

import { buildStudyBrain } from '@/src/brain';
import { useAppStore } from '@/src/store';

export function useStudyBrain() {
  const subjects = useAppStore((state) => state.subjects);
  const notes = useAppStore((state) => state.notes);
  const flashcards = useAppStore((state) => state.flashcards);
  const assessments = useAppStore((state) => state.assessments);
  const completedSessions = useAppStore(
    (state) => state.completedSessions
  );

  const currentSubject = subjects[0] ?? null;

  return useMemo(
    () =>
      buildStudyBrain({
        subject: currentSubject,
        notes,
        flashcards,
        assessments,
        completedSessions,
      }),
    [
      currentSubject,
      notes,
      flashcards,
      assessments,
      completedSessions,
    ]
  );
}