import { getDashboardAnalytics } from '@/src/analytics';

import { StudyBrain } from './types';

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
      analytics.preparation >= 80
        ? 'You are on track this week.'
        : analytics.dueCardsCount > 10
        ? 'Your overdue flashcards are reducing your preparation.'
        : 'Continue studying to improve your readiness.',
  };
}