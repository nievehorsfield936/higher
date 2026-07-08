import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Card from '@/components/Card';
import ProgressBar from '@/components/common/ProgressBar';
import { analyseNote } from '@/src/brain/analyseNote';
import { Colours } from '@/constants/colours';
import { spacing, typography } from '@/src/theme';

type Props = {
  title: string;
  content: string;
};

export default function StudyQualityCard({ title, content }: Props) {
  const analysis = analyseNote(title, content);

  return (
    <Card>
      <Text style={styles.label}>STUDY QUALITY</Text>

      <View style={styles.row}>
        <Text style={styles.score}>{analysis.score}%</Text>

        <View style={styles.progressWrap}>
          <ProgressBar progress={analysis.score} />
        </View>
      </View>

      <Text style={styles.body}>
        {analysis.score >= 80
          ? 'This note is revision-ready.'
          : analysis.score >= 50
            ? 'Good start. Add structure, examples or definitions.'
            : 'Keep building this note so Higher can learn from it.'}
      </Text>

      <Text style={styles.meta}>
        {analysis.wordCount} words · {analysis.headingCount} headings ·{' '}
        {analysis.suggestedFlashcards} possible flashcards
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: typography.overline,
    letterSpacing: 2,
    color: Colours.STONE,
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  score: {
    fontFamily: 'PlayfairDisplay_500Medium',
    fontSize: 44,
    color: Colours.INK,
  },
  progressWrap: {
    flex: 1,
  },
  body: {
    marginTop: spacing.md,
    fontSize: typography.body,
    lineHeight: 24,
    color: Colours.STONE,
  },
  meta: {
    marginTop: spacing.sm,
    fontSize: typography.caption,
    color: Colours.STONE,
  },
});