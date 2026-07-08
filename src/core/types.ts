import type { FocusSession } from '@/src/session';
import type { StudyBrain } from '@/src/brain';
import type { Note, Subject } from '@/src/types';

export interface HigherState {
  study: StudyBrain;
  focus: FocusSession;
  notes: Note[];
  subjects: Subject[];
}