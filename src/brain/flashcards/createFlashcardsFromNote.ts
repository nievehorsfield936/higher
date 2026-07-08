import { analyseNote } from '../analyseNote';

export type GeneratedFlashcard = {
  id: string;
  front: string;
  back: string;
  concept: string;
};

export function createFlashcardsFromNote(
  title: string,
  content: string
): GeneratedFlashcard[] {
  const analysis = analyseNote(title, content);

  return analysis.concepts.map((concept, index) => ({
    id: `${Date.now()}-${index}`,
    concept,
    front: `What is ${concept}?`,
    back: `Review "${title}" and explain ${concept} in your own words.`,
  }));
}