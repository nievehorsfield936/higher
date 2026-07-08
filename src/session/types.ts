export type FocusTaskType =
  | 'notes'
  | 'flashcards'
  | 'quiz'
  | 'assessment'
  | 'break';

export interface FocusTask {
  id: string;
  type: FocusTaskType;
  title: string;
  description: string;
  estimatedMinutes: number;
  completed: boolean;
}

export interface FocusSession {
  preparation: number;
  totalMinutes: number;
  tasks: FocusTask[];
}