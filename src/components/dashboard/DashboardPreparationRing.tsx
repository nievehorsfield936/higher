import React from 'react';
import { StyleSheet, Text } from 'react-native';

import Card from '@/components/Card';
import AnimatedPreparationRing from './AnimatedPreparationRing';

import { Colours } from '@/constants/colours';
import { spacing, typography } from '@/src/theme';

type Props = {
  preparation: number;
};

export default function DashboardPreparationRing({
  preparation,
}: Props) {
  const status =
    preparation >= 90
      ? 'Exam Ready'
      : preparation >= 75
      ? 'On Track'
      : preparation >= 50
      ? 'Making Progress'
      : 'Needs Attention';

  return (
    <Card style={styles.card}>
      <Text style={styles.label}>PREPARATION</Text>

      <AnimatedPreparationRing value={preparation} />

      <Text style={styles.status}>{status}</Text>

      <Text style={styles.description}>
        Your preparation score is calculated from your notes,
        flashcards, quizzes and recent study activity.
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    marginBottom: spacing.lg,
  },

  label: {
    fontSize: typography.overline,
    letterSpacing: 2,
    color: Colours.STONE,
    marginBottom: spacing.lg,
  },

  status: {
    marginTop: spacing.lg,
    fontSize: typography.h3,
    fontWeight: '700',
    color: Colours.INK,
  },

  description: {
    marginTop: spacing.sm,
    textAlign: 'center',
    fontSize: typography.body,
    lineHeight: 22,
    color: Colours.STONE,
    paddingHorizontal: spacing.lg,
  },
});