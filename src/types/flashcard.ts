export interface Flashcard {
  id: string;
  subjectId: string;
  deckId?: string;

  front: string;
  back: string;

  nextReview?: string;

  interval?: number;
  easeFactor?: number;
}