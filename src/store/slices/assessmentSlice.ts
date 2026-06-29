import { StateCreator } from 'zustand';

export type AssessmentType = 'exam' | 'assignment' | 'quiz' | 'other';

export interface Assessment {
  id: string;
  subjectId: string;
  title: string;
  type: AssessmentType;
  dueDate: string;
  weight: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AssessmentSlice {
  assessments: Assessment[];

  addAssessment: (assessment: Assessment) => void;
  updateAssessment: (
    id: string,
    updates: Partial<Assessment>
  ) => void;
  deleteAssessment: (id: string) => void;
}

export const createAssessmentSlice: StateCreator<
  AssessmentSlice,
  [],
  [],
  AssessmentSlice
> = (set) => ({
  assessments: [],

  addAssessment: (assessment) =>
    set((state) => ({
      assessments: [...state.assessments, assessment],
    })),

  updateAssessment: (id, updates) =>
    set((state) => ({
      assessments: state.assessments.map((assessment) =>
        assessment.id === id
          ? { ...assessment, ...updates }
          : assessment
      ),
    })),

  deleteAssessment: (id) =>
    set((state) => ({
      assessments: state.assessments.filter(
        (assessment) => assessment.id !== id
      ),
    })),
});