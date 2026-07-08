import { analyseNote } from '../analyseNote';

export type GeneratedStudyCard = {
  id: string;
  front: string;
  back: string;
  concept: string;
  sourceTitle: string;
};

export function buildGeneratedFlashcards(
  title: string,
  content: string
): GeneratedStudyCard[] {
  const analysis = analyseNote(title, content);

  return analysis.concepts.map((concept, index) => ({
    id: `${title}-${concept}-${index}`,
    concept,
    sourceTitle: title,
    front: `What is ${concept}?`,
    back: `Explain ${concept} using your note: "${title}".`,
  }));
}