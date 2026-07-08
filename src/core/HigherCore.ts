import { buildHigherEngine } from '@/src/brain/higherEngine';
import { buildStudyBrain } from '@/src/brain/studyBrain';
import { buildFocusSession } from '@/src/session/buildFocusSession';
import { buildHigherDaily } from '@/src/brain/higherDaily';

import type {
  Subject,
  Note,
  Flashcard,
  Assessment,
  StudySession,
} from '@/src/types';

export function buildHigherCore({
  subjects,
  notes,
  flashcards,
  assessments,
  completedSessions,
}: {
  subjects: Subject[];
  notes: Note[];
  flashcards: Flashcard[];
  assessments: Assessment[];
  completedSessions: StudySession[];
}) {
  const subject = subjects[0] ?? null;

  const studyBrain = buildStudyBrain({
    subject,
    notes,
    flashcards,
    assessments,
    completedSessions,
  });

  const higher = buildHigherEngine(notes);

  const today = buildHigherDaily({
    subjects,
    notes,
    flashcards,
    assessments,
  });

  const focus = buildFocusSession(higher.preparation);

  return {
    studyBrain,
    higher,
    today,
    focus,
  };
}