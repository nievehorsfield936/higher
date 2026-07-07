import { getDashboardAnalytics } from '@/src/analytics';

import { StudyBrain } from './types';

import { getStudyStreak } from '@/src/analytics';

type Subject = {
  id: string;
};

export function buildStudyBrain({
  subject,
  notes,
  flashcards,
  assessments,
  completedSessions,
}: {
  subject: Subject | null;

  notes: any[];

  flashcards: any[];

  assessments: any[];

  completedSessions: any[];
}): StudyBrain {
  const analytics = getDashboardAnalytics({
    subject,
    notes,
    flashcards,
    assessments,
    completedSessions,
  });

  const streak = getStudyStreak(completedSessions);

  return {
    preparation: analytics.preparation,

    notesScore: Math.min(notes.length * 20, 100),

    flashcardsScore: analytics.dueCardsCount === 0 ? 100 : 70,

    assessmentScore: assessments.length > 0 ? 80 : 60,

    consistencyScore: Math.min(
      analytics.sessionsThisWeekCount * 25,
      100
    ),

    dueCards: analytics.dueCardsCount,

    studyMinutes: analytics.totalStudyMinutes,

    sessionsThisWeek: analytics.sessionsThisWeekCount,

    streak,

    nextAction:
      analytics.dueCardsCount > 0
        ? {
            type: 'flashcards',
            title: 'Review due flashcards',
            duration: 10,
          }
        : {
            type: 'notes',
            title: 'Continue lecture notes',
            duration: 15,
          },

    insight:
  streak >= 7
    ? `🔥 Amazing! You're on a ${streak}-day study streak.`
    : analytics.dueCardsCount > 10
    ? `You have ${analytics.dueCardsCount} overdue flashcards waiting.`
    : analytics.preparation >= 80
    ? 'You are well prepared this week.'
    : 'Complete today’s study session to improve your readiness.',
  };
}