import { analyseNote } from './analyseNote';
import { buildKnowledgeGraph } from './buildKnowledgeGraph';
import { buildGeneratedFlashcards } from './flashcards/buildGeneratedFlashcards';

type Note = {
  id: string;
  title: string;
  content: string;
};

export function buildHigherEngine(notes: Note[]) {
  const graph = buildKnowledgeGraph(notes);

  const analyses = notes.map((note) => ({
    note,
    analysis: analyseNote(note.title, note.content),
  }));

  const flashcards = notes.flatMap((note) =>
    buildGeneratedFlashcards(note.title, note.content)
  );

  const preparation =
    analyses.length === 0
      ? 0
      : Math.round(
          analyses.reduce(
            (sum, item) => sum + item.analysis.score,
            0
          ) / analyses.length
        );

  return {
    preparation,
    graph,
    flashcards,
    analyses,
  };
}