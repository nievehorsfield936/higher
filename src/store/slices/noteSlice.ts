import { StateCreator } from 'zustand';

import { Note } from '@/src/types/note';

export interface NoteSlice {
  notes: Note[];

  addNote: (note: Note) => void;

  updateNote: (id: string, updates: Partial<Note>) => void;

  deleteNote: (id: string) => void;
}

export const createNoteSlice: StateCreator<
  NoteSlice,
  [],
  [],
  NoteSlice
> = (set) => ({
  notes: [],

  addNote: (note) =>
    set((state) => ({
      notes: [...state.notes, note],
    })),

  updateNote: (id, updates) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, ...updates } : note
      ),
    })),

  deleteNote: (id) =>
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== id),
    })),
});