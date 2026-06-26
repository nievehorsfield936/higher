export type Subject = {
  id: string;
  code: string;
  name: string;
  level: 'high_school' | 'university';
  progress: number;
  nextTask: string;
};

export const subjects: Subject[] = [
  {
    id: 'psychology',
    code: 'PSYC2203',
    name: 'Statistics & Research Methods',
    level: 'university',
    progress: 42,
    nextTask: 'Lecture 8 revision and ANOVA practice',
  },
  {
    id: 'economics',
    code: 'ECON1000',
    name: 'Principles of Economics',
    level: 'university',
    progress: 65,
    nextTask: 'Practice short-answer questions',
  },
  {
    id: 'english',
    code: 'English',
    name: 'English Literature',
    level: 'high_school',
    progress: 58,
    nextTask: 'Essay plan due Friday',
  },
];