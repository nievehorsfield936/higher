import { StateCreator } from 'zustand';

export interface SettingsSlice {
  hasCompletedOnboarding: boolean;
  completeOnboarding: () => void;
}

export const createSettingsSlice: StateCreator<
  SettingsSlice,
  [],
  [],
  SettingsSlice
> = (set) => ({
  hasCompletedOnboarding: false,
  completeOnboarding: () => set({ hasCompletedOnboarding: true }),
});