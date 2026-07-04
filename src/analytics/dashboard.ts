import { getPreparationScore } from './preparation';
import {
  getSessionsThisWeek,
  getTotalStudyMinutes,
} from './statistics';

type Subject = {
  id: string;
};

type Note = {
  subjectId: string;
};

type Flashcard = {
  subjectId: string;
  nextReview?: string;
  timesSeen: number;
  timesCorrect: number;
};

type Assessment = {
  subjectId: string;
  dueDate: string;
};

type CompletedSession = {
  completedAt: string;
  totalMinutes: number;
};

type DashboardAnalyticsInput = {
  subject: Subject | null;
  notes: Note[];
  flashcards: Flashcard[];
  assessments: Assessment[];
  completedSessions: CompletedSession[];
};

function getDueCards(flashcards: Flashcard[]) {
  return flashcards.filter((card) => {
    if (!card.nextReview) return true;
    return new Date(card.nextReview) <= new Date();
  });
}

export function getDashboardAnalytics({
  subject,
  notes,
  flashcards,
  assessments,
  completedSessions,
}: DashboardAnalyticsInput) {
  const dueCards = getDueCards(flashcards);
  const sessionsThisWeek = getSessionsThisWeek(completedSessions);
  const totalStudyMinutes = getTotalStudyMinutes(completedSessions);

  const preparation = subject
    ? getPreparationScore({
        subjectId: subject.id,
        notes,
        flashcards,
        assessments,
        completedSessions,
      })
    : 0;

  return {
    preparation,
    dueCards,
    dueCardsCount: dueCards.length,
    sessionsThisWeek,
    sessionsThisWeekCount: sessionsThisWeek.length,
    totalStudyMinutes,
  };
}