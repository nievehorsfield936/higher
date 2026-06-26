export type Subject = {
  id: string;
  code: string;
  name: string;
  level: 'university' | 'highschool' | 'other';
  progress: number;
  nextTask: string;
};

export const demoSubjects: Subject[] = [];