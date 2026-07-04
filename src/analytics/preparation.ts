type Note = {
  subjectId: string;
};

type Flashcard = {
  subjectId: string;
  timesSeen: number;
  timesCorrect: number;
  nextReview?: string;
};

type Assessment = {
  subjectId: string;
  dueDate: string;
};

type CompletedSession = {
  completedAt: string;
  totalMinutes: number;
};

type PreparationInput = {
  subjectId: string;
  notes: Note[];
  flashcards: Flashcard[];
  assessments: Assessment[];
  completedSessions: CompletedSession[];
};

function clamp(value: number) {
  return Math.min(Math.max(value, 0), 100);
}

function getDueCards(cards: Flashcard[]) {
  return cards.filter((card) => {
    if (!card.nextReview) return true;
    return new Date(card.nextReview) <= new Date();
  });
}

function getFlashcardScore(cards: Flashcard[]) {
  if (cards.length === 0) return 0;

  const totalSeen = cards.reduce(
    (sum, card) => sum + card.timesSeen,
    0
  );

  const totalCorrect = cards.reduce(
    (sum, card) => sum + card.timesCorrect,
    0
  );

  if (totalSeen === 0) return 20;

  const accuracy = (totalCorrect / totalSeen) * 100;
  const dueCards = getDueCards(cards);
  const duePenalty = (dueCards.length / cards.length) * 30;

  return clamp(accuracy - duePenalty);
}

function getNotesScore(notes: Note[]) {
  if (notes.length === 0) return 0;
  if (notes.length === 1) return 45;
  if (notes.length === 2) return 65;
  if (notes.length === 3) return 80;

  return 100;
}

function getAssessmentScore(assessments: Assessment[]) {
  if (assessments.length === 0) return 50;

  const upcoming = assessments
    .filter((assessment) => assessment.dueDate)
    .sort(
      (a, b) =>
        new Date(a.dueDate).getTime() -
        new Date(b.dueDate).getTime()
    )[0];

  if (!upcoming) return 50;

  const daysUntil = Math.ceil(
    (new Date(upcoming.dueDate).getTime() -
      new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );

  if (daysUntil < 0) return 40;
  if (daysUntil <= 3) return 35;
  if (daysUntil <= 7) return 60;
  if (daysUntil <= 14) return 75;

  return 90;
}

function getConsistencyScore(sessions: CompletedSession[]) {
  const weekAgo = new Date();
  weekAgo.setDate(new Date().getDate() - 7);

  const recentSessions = sessions.filter(
    (session) => new Date(session.completedAt) >= weekAgo
  );

  if (recentSessions.length === 0) return 0;
  if (recentSessions.length === 1) return 40;
  if (recentSessions.length === 2) return 60;
  if (recentSessions.length === 3) return 80;

  return 100;
}

export function getPreparationScore({
  subjectId,
  notes,
  flashcards,
  assessments,
  completedSessions,
}: PreparationInput) {
  const subjectNotes = notes.filter(
    (note) => note.subjectId === subjectId
  );

  const subjectCards = flashcards.filter(
    (card) => card.subjectId === subjectId
  );

  const subjectAssessments = assessments.filter(
    (assessment) => assessment.subjectId === subjectId
  );

  const notesScore = getNotesScore(subjectNotes);
  const flashcardScore = getFlashcardScore(subjectCards);
  const assessmentScore = getAssessmentScore(subjectAssessments);
  const consistencyScore = getConsistencyScore(completedSessions);

  return Math.round(
    notesScore * 0.2 +
      flashcardScore * 0.4 +
      assessmentScore * 0.25 +
      consistencyScore * 0.15
  );
}