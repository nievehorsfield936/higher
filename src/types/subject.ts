export interface Subject {
  id: string;

  name: string;

  code: string;

  level: 'university' | 'highschool' | 'other';

  colour: string;

  progress: number;

  notesCount: number;

  flashcardCount: number;

  studyHours: number;

  examDate?: string;
}