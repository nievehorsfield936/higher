import { buildHigherEngine } from '@/src/brain/higherEngine';
import { buildStudyBrain } from '@/src/brain/studyBrain';
import { buildFocusSession } from '@/src/session/buildFocusSession';

import type {
  Assessment,
  Flashcard,
  Note,
  StudySession,
  Subject,
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

  const dueCards = flashcards.filter((card) => {
    if (!card.nextReview) return true;
    return new Date(card.nextReview) <= new Date();
  });

  const today =
    dueCards.length > 20
      ? {
          title: 'Review Flashcards',
          reason: `${dueCards.length} cards are ready for review.`,
          priority: 'High' as const,
          estimatedMinutes: 20,
          preparation: higher.preparation,
        }
      : higher.preparation < 60
        ? {
            title: 'Strengthen Your Notes',
            reason: 'Your study notes need more depth before revision.',
            priority: 'High' as const,
            estimatedMinutes: 25,
            preparation: higher.preparation,
          }
        : assessments.length > 0
          ? {
              title: 'Prepare for Assessment',
              reason: assessments[0].title ?? 'Upcoming assessment',
              priority: 'Medium' as const,
              estimatedMinutes: 20,
              preparation: higher.preparation,
            }
          : {
              title: `Continue ${subject?.name ?? 'Studying'}`,
              reason: 'Maintain your study streak.',
              priority: 'Low' as const,
              estimatedMinutes: 15,
              preparation: higher.preparation,
            };

  const focus = buildFocusSession(higher.preparation);

  return {
    studyBrain,
    higher,
    today,
    focus,
  };
}