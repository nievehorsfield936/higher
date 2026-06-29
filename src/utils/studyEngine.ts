export type Subject = {
  id: string;
  name: string;
  code: string;
};

export type Note = {
  subjectId: string;
};

export type Flashcard = {
  subjectId: string;
  timesSeen: number;
  timesCorrect: number;
  nextReview?: string;
};

export interface SubjectInsight {
  subject: Subject;
  notesCount: number;
  cardsCount: number;
  dueCardsCount: number;
  studiedCards: number;
  accuracy: number;
  mastery: number;
  estimatedMinutes: number;
  priority: number;
}

export function getDueCards(cards: Flashcard[]) {
  return cards.filter((card) => {
    if (!card.nextReview) return true;
    return new Date(card.nextReview) <= new Date();
  });
}

export function getAccuracy(cards: Flashcard[]) {
  const seen = cards.reduce((s, c) => s + c.timesSeen, 0);
  const correct = cards.reduce((s, c) => s + c.timesCorrect, 0);

  if (seen === 0) return 0;

  return Math.round((correct / seen) * 100);
}

export function getSubjectInsights(
  subjects: Subject[],
  notes: Note[],
  flashcards: Flashcard[]
): SubjectInsight[] {
  const dueCards = getDueCards(flashcards);

  return subjects
    .map((subject) => {
      const subjectNotes = notes.filter(
        (n) => n.subjectId === subject.id
      );

      const subjectCards = flashcards.filter(
        (c) => c.subjectId === subject.id
      );

      const subjectDue = dueCards.filter(
        (c) => c.subjectId === subject.id
      );

      const studiedCards = subjectCards.filter(
        (c) => c.timesSeen > 0
      );

      const accuracy = getAccuracy(subjectCards);

      const mastery =
        subjectCards.length === 0
          ? 0
          : Math.round(
              (studiedCards.length / subjectCards.length) * 100
            );

      const estimatedMinutes = Math.max(
        subjectDue.length * 2,
        5
      );

      const priority =
        subjectDue.length * 5 +
        (100 - accuracy) +
        (subjectNotes.length === 0 ? 20 : 0);

      return {
        subject,
        notesCount: subjectNotes.length,
        cardsCount: subjectCards.length,
        dueCardsCount: subjectDue.length,
        studiedCards: studiedCards.length,
        accuracy,
        mastery,
        estimatedMinutes,
        priority,
      };
    })
    .sort((a, b) => b.priority - a.priority);
}

export function getTodaysRecommendation(
  subjects: Subject[],
  notes: Note[],
  flashcards: Flashcard[]
) {
  const insights = getSubjectInsights(
    subjects,
    notes,
    flashcards
  );

  return insights[0] ?? null;
}