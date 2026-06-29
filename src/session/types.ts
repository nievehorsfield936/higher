export type SessionStepType =
  | 'flashcards'
  | 'notes'
  | 'assessment';

export interface SessionStep {
  id: string;
  type: SessionStepType;

  title: string;
  subtitle: string;

  estimatedMinutes: number;

  completed: boolean;
}

export interface StudySession {
  totalMinutes: number;

  preparation: number;

  steps: SessionStep[];
}