import { analyseNote } from '@/src/brain/analyseNote';

type Note = {
  title: string;
  content: string;
};

type Flashcard = {
  nextReview?: string;
};

type Assessment = {
  title?: string;
  dueDate?: string;
};

export type SmartSessionStep = {
  id: string;
  type: 'notes' | 'flashcards' | 'quiz' | 'assessment' | 'summary';
  title: string;
  subtitle: string;
  estimatedMinutes: number;
};

type Input = {
  notes: Note[];
  flashcards: Flashcard[];
  assessments: Assessment[];
};

function getDueFlashcards(flashcards: Flashcard[]) {
  return flashcards.filter((card) => {
    if (!card.nextReview) return true;
    return new Date(card.nextReview) <= new Date();
  });
}

export function buildSmartStudySession({
  notes,
  flashcards,
  assessments,
}: Input) {
  const steps: SmartSessionStep[] = [];

  const dueCards = getDueFlashcards(flashcards);
  const latestNote = notes[notes.length - 1];

  if (dueCards.length > 0) {
    steps.push({
      id: 'flashcards',
      type: 'flashcards',
      title: 'Review due flashcards',
      subtitle: `${dueCards.length} cards waiting`,
      estimatedMinutes: Math.min(Math.max(dueCards.length, 5), 15),
    });
  }

  if (latestNote) {
    const analysis = analyseNote(latestNote.title, latestNote.content);

    steps.push({
      id: 'notes',
      type: 'notes',
      title: `Review ${latestNote.title}`,
      subtitle: `${analysis.wordCount} words · ${analysis.score}% quality`,
      estimatedMinutes: Math.min(Math.max(Math.ceil(analysis.wordCount / 120), 5), 12),
    });

    if (analysis.estimatedQuizQuestions > 0) {
      steps.push({
        id: 'quiz',
        type: 'quiz',
        title: 'Self-test key ideas',
        subtitle: `${analysis.estimatedQuizQuestions} practice questions suggested`,
        estimatedMinutes: 6,
      });
    }
  }

  if (assessments.length > 0) {
    steps.push({
      id: 'assessment',
      type: 'assessment',
      title: 'Check upcoming assessment',
      subtitle: assessments[0].title ?? 'Assessment preparation',
      estimatedMinutes: 4,
    });
  }

  if (steps.length === 0) {
    steps.push({
      id: 'summary',
      type: 'summary',
      title: 'Start with a short study block',
      subtitle: 'Add notes or flashcards to make this smarter.',
      estimatedMinutes: 10,
    });
  }

  return {
    totalMinutes: steps.reduce((total, step) => total + step.estimatedMinutes, 0),
    steps,
  };
}