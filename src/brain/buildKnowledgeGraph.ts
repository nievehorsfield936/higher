import { analyseNote } from './analyseNote';

type Note = {
  id: string;
  title: string;
  content: string;
};

export type KnowledgeNode = {
  concept: string;
  occurrences: number;
  notes: string[];
};

export type KnowledgeGraph = Record<string, KnowledgeNode>;

export function buildKnowledgeGraph(notes: Note[]): KnowledgeGraph {
  const graph: KnowledgeGraph = {};

  for (const note of notes) {
    const analysis = analyseNote(note.title, note.content);

    for (const concept of analysis.concepts) {
      if (!graph[concept]) {
        graph[concept] = {
          concept,
          occurrences: 0,
          notes: [],
        };
      }

      graph[concept].occurrences += 1;

      if (!graph[concept].notes.includes(note.title)) {
        graph[concept].notes.push(note.title);
      }
    }
  }

  return graph;
}