import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

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

type AppStore = SubjectSlice & SettingsSlice & NoteSlice;

export const useAppStore = create<AppStore>()(
  persist(
    (...a) => ({
      ...createSubjectSlice(...a),
      ...createSettingsSlice(...a),
      ...createNoteSlice(...a),
    }),
    {
      name: 'higher-art-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);