import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Card from '@/components/Card';
import { Colours } from '@/constants/colours';
import { spacing, typography } from '@/src/theme';

type Goal = {
  label: string;
  done: boolean;
};

type Props = {
  goals: Goal[];
};

export default function GoalCard({ goals }: Props) {
  return (
    <Card>
      <Text style={styles.label}>GOALS</Text>

      {goals.map((goal) => (
        <View key={goal.label} style={styles.row}>
          <Text style={styles.check}>{goal.done ? '✓' : '○'}</Text>
          <Text style={styles.text}>{goal.label}</Text>
        </View>
      ))}
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
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  check: {
    fontSize: typography.body,
    color: Colours.SAGE,
    fontWeight: '700',
  },
  text: {
    fontSize: typography.body,
    color: Colours.INK,
  },
});