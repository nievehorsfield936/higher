import { StateCreator } from 'zustand';

export interface CompletedSession {
  id: string;
  completedAt: string;
  totalMinutes: number;
  stepsCompleted: number;
  preparation: number;
}

export interface SessionSlice {
  completedSessions: CompletedSession[];

  addCompletedSession: (session: CompletedSession) => void;
}

export const createSessionSlice: StateCreator<
  SessionSlice,
  [],
  [],
  SessionSlice
> = (set) => ({
  completedSessions: [],

  addCompletedSession: (session) =>
    set((state) => ({
      completedSessions: [
        session,
        ...state.completedSessions,
      ],
    })),
});