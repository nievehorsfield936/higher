export type NoteAnalysis = {
  score: number;
  wordCount: number;
  headingCount: number;
  bulletCount: number;
  definitionCount: number;
  exampleCount: number;
  questionCount: number;
  concepts: string[];
  suggestedFlashcards: number;
  estimatedQuizQuestions: number;
};

function getWordCount(text: string) {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

function extractConcepts(title: string, content: string) {
  const text = `${title} ${content}`;

  const matches =
    text.match(/\b[A-Z][a-z]+(?:\s[A-Z][a-z]+){0,3}\b/g) ?? [];

  return Array.from(new Set(matches)).slice(0, 8);
}

export function analyseNote(title: string, content: string): NoteAnalysis {
  const wordCount = getWordCount(content);

  const headingCount = (content.match(/^#/gm) ?? []).length;
  const bulletCount = (content.match(/^[-•]/gm) ?? []).length;
  const definitionCount =
    (content.match(/\b(is|means|refers to|defined as)\b/gi) ?? []).length;
  const exampleCount = (content.match(/\bexample\b/gi) ?? []).length;
  const questionCount = (content.match(/\?/g) ?? []).length;

  let score = 0;

  if (title.trim()) score += 15;
  if (wordCount >= 50) score += 15;
  if (wordCount >= 150) score += 20;
  if (headingCount > 0) score += 15;
  if (bulletCount > 0) score += 10;
  if (definitionCount > 0) score += 10;
  if (exampleCount > 0) score += 10;
  if (questionCount > 0) score += 5;

  return {
    score: Math.min(score, 100),
    wordCount,
    headingCount,
    bulletCount,
    definitionCount,
    exampleCount,
    questionCount,
    concepts: extractConcepts(title, content),
    suggestedFlashcards: Math.min(
      Math.max(definitionCount + headingCount + bulletCount, 3),
      20
    ),
    estimatedQuizQuestions: Math.min(
      Math.max(questionCount + headingCount, 3),
      12
    ),
  };
}