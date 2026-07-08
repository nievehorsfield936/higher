import React from 'react';

import Card from '@/components/Card';
import ScoreRow from '@/src/components/ui/ScoreRow';

type Props = {
  notesScore: number;
  flashcardsScore: number;
  assessmentScore: number;
  consistencyScore: number;
};

export default function SubjectHealthCard({
  notesScore,
  flashcardsScore,
  assessmentScore,
  consistencyScore,
}: Props) {
  return (
    <Card>
      <ScoreRow label="Notes" value={notesScore} />
      <ScoreRow label="Flashcards" value={flashcardsScore} />
      <ScoreRow label="Assessments" value={assessmentScore} />
      <ScoreRow label="Consistency" value={consistencyScore} />
    </Card>
  );
}