import { useMemo } from 'react';

import { buildHigherEngine } from '@/src/brain/higherEngine';
import { useAppStore } from '@/src/store';

export function useHigherDaily() {
  const subjects = useAppStore((state) => state.subjects);
  const notes = useAppStore((state) => state.notes);
  const flashcards = useAppStore((state) => state.flashcards);
  const assessments = useAppStore((state) => state.assessments);

  return useMemo(() => {
    const higher = buildHigherEngine(notes);

    const dueCards = flashcards.filter((card) => {
      if (!card.nextReview) return true;
      return new Date(card.nextReview) <= new Date();
    });

    if (dueCards.length > 20) {
      return {
        title: 'Review Flashcards',
        reason: `${dueCards.length} cards are ready for review.`,
        priority: 'High' as const,
        estimatedMinutes: 20,
        preparation: higher.preparation,
      };
    }

    if (higher.preparation < 60) {
      return {
        title: 'Strengthen Your Notes',
        reason: 'Your study notes need more depth before revision.',
        priority: 'High' as const,
        estimatedMinutes: 25,
        preparation: higher.preparation,
      };
    }

    if (assessments.length > 0) {
      return {
        title: 'Prepare for Assessment',
        reason: assessments[0].title ?? 'Upcoming assessment',
        priority: 'Medium' as const,
        estimatedMinutes: 20,
        preparation: higher.preparation,
      };
    }

    const subject = subjects[0];

    return {
      title: `Continue ${subject?.name ?? 'Studying'}`,
      reason: 'Maintain your study streak.',
      priority: 'Low' as const,
      estimatedMinutes: 15,
      preparation: higher.preparation,
    };
  }, [subjects, notes, flashcards, assessments]);
}