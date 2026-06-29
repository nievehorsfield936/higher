import { SessionStep, StudySession } from './types';

type Note = {
  id: string;
  title: string;
  content: string;
  subjectId: string;
  updatedAt: string;
};

type Flashcard = {
  id: string;
  subjectId: string;
  nextReview?: string;
};

type Assessment = {
  id: string;
  title: string;
  type: string;
  subjectId: string;
  dueDate: string;
};

type BuildStudySessionInput = {
  notes: Note[];
  flashcards: Flashcard[];
  assessments: Assessment[];
};

function getDueCards(flashcards: Flashcard[]) {
  return flashcards.filter((card) => {
    if (!card.nextReview) return true;
    return new Date(card.nextReview) <= new Date();
  });
}

function getRecentNote(notes: Note[]) {
  return [...notes].sort(
    (a, b) =>
      new Date(b.updatedAt).getTime() -
      new Date(a.updatedAt).getTime()
  )[0];
}

function getUpcomingAssessment(assessments: Assessment[]) {
  return [...assessments]
    .filter((assessment) => assessment.dueDate)
    .sort(
      (a, b) =>
        new Date(a.dueDate).getTime() -
        new Date(b.dueDate).getTime()
    )[0];
}

function getDaysUntil(date: string) {
  const today = new Date();
  const target = new Date(date);

  const diff = target.getTime() - today.getTime();

  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function buildStudySession({
  notes,
  flashcards,
  assessments,
}: BuildStudySessionInput): StudySession {
  const dueCards = getDueCards(flashcards);
  const recentNote = getRecentNote(notes);
  const upcomingAssessment = getUpcomingAssessment(assessments);

  const steps: SessionStep[] = [];

  if (dueCards.length > 0) {
    steps.push({
      id: 'flashcards',
      type: 'flashcards',
      title: 'Review due flashcards',
      subtitle: `${dueCards.length} card${dueCards.length === 1 ? '' : 's'} due`,
      estimatedMinutes: Math.max(dueCards.length * 2, 5),
      completed: false,
    });
  }

  if (recentNote) {
    steps.push({
      id: 'notes',
      type: 'notes',
      title: 'Continue notes',
      subtitle: recentNote.title,
      estimatedMinutes: 10,
      completed: false,
    });
  }

  if (upcomingAssessment) {
    const days = getDaysUntil(upcomingAssessment.dueDate);

    steps.push({
      id: 'assessment',
      type: 'assessment',
      title: upcomingAssessment.title,
      subtitle:
        days >= 0
          ? `${days} day${days === 1 ? '' : 's'} remaining`
          : 'Due date has passed',
      estimatedMinutes: 5,
      completed: false,
    });
  }

  if (steps.length === 0) {
    steps.push({
      id: 'starter',
      type: 'notes',
      title: 'Start your study system',
      subtitle: 'Create notes, flashcards or assessments to build smarter sessions.',
      estimatedMinutes: 5,
      completed: false,
    });
  }

  const totalMinutes = steps.reduce(
    (sum, step) => sum + step.estimatedMinutes,
    0
  );

  const preparation =
    flashcards.length === 0
      ? 0
      : Math.round(
          ((flashcards.length - dueCards.length) / flashcards.length) * 100
        );

  return {
    preparation,
    totalMinutes,
    steps,
  };
}