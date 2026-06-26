import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import {
    createSettingsSlice,
    SettingsSlice,
} from './slices/settingsSlice';
import {
    createSubjectSlice,
    SubjectSlice,
} from './slices/subjectSlice';

type AppStore = SubjectSlice & SettingsSlice;

export const useAppStore = create<AppStore>()(
  persist(
    (...a) => ({
      ...createSubjectSlice(...a),
      ...createSettingsSlice(...a),
    }),
    {
      name: 'higher-art-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);