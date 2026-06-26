import { StateCreator } from 'zustand';

export type SubjectLevel =
  | 'university'
  | 'highschool'
  | 'other';

export interface Subject {
  id: string;
  name: string;
  code: string;
  colour: string;
  level: SubjectLevel;
  progress: number;
}

export interface SubjectSlice {
  subjects: Subject[];

  addSubject: (subject: Subject) => void;

  updateSubject: (
    id: string,
    updates: Partial<Subject>
  ) => void;

  deleteSubject: (id: string) => void;
}

export const createSubjectSlice: StateCreator<
  SubjectSlice,
  [],
  [],
  SubjectSlice
> = (set) => ({
  subjects: [],

  addSubject: (subject) =>
    set((state) => ({
      subjects: [...state.subjects, subject],
    })),

  updateSubject: (id, updates) =>
    set((state) => ({
      subjects: state.subjects.map((subject) =>
        subject.id === id
          ? { ...subject, ...updates }
          : subject
      ),
    })),

  deleteSubject: (id) =>
    set((state) => ({
      subjects: state.subjects.filter(
        (subject) => subject.id !== id
      ),
    })),
});