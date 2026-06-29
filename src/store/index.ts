import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import {
    AssessmentSlice,
    createAssessmentSlice,
} from './slices/assessmentSlice';

import {
    createFlashcardSlice,
    FlashcardSlice,
} from './slices/flashcardSlice';

import {
    createNoteSlice,
    NoteSlice,
} from './slices/noteSlice';

import {
    createSettingsSlice,
    SettingsSlice,
} from './slices/settingsSlice';

import {
    createSubjectSlice,
    SubjectSlice,
} from './slices/subjectSlice';

type AppStore =
  SubjectSlice &
  SettingsSlice &
  NoteSlice &
  FlashcardSlice &
  AssessmentSlice;

export const useAppStore = create<AppStore>()(
  persist(
    (...a) => ({
      ...createSubjectSlice(...a),
      ...createSettingsSlice(...a),
      ...createNoteSlice(...a),
      ...createFlashcardSlice(...a),
      ...createAssessmentSlice(...a),
    }),
    {
      name: 'higher-art-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);