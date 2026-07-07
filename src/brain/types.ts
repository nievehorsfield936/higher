export interface StudyBrain {
  preparation: number;

  notesScore: number;
  flashcardsScore: number;
  assessmentScore: number;
  consistencyScore: number;

  dueCards: number;

  studyMinutes: number;

  sessionsThisWeek: number;

  streak: number;

  nextAction: {
    type: 'notes' | 'flashcards' | 'assessment';
    title: string;
    duration: number;
  };

  insight: string;
}