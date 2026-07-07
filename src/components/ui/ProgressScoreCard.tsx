import React from 'react';
import { StyleSheet, Text } from 'react-native';

import Card from '@/components/Card';
import ProgressBar from '@/components/common/ProgressBar';
import { Colours } from '@/constants/colours';
import { spacing, typography } from '@/src/theme';

type Props = {
  score: number;
  subtitle: string;
};

export default function ProgressScoreCard({ score, subtitle }: Props) {
  return (
    <Card>
      <Text style={styles.label}>OVERALL READINESS</Text>

      <Text style={styles.score}>{score}%</Text>

      <ProgressBar progress={score} />

      <Text style={styles.subtitle}>{subtitle}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: typography.overline,
    letterSpacing: 2,
    color: Colours.STONE,
    marginBottom: spacing.sm,
  },
  score: {
    fontFamily: 'PlayfairDisplay_500Medium',
    fontSize: 64,
    color: Colours.INK,
    marginBottom: spacing.md,
  },
  subtitle: {
    marginTop: spacing.md,
    fontSize: typography.body,
    lineHeight: 24,
    color: Colours.STONE,
  },
});