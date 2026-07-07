import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ProgressBar from '@/components/common/ProgressBar';
import { Colours } from '@/constants/colours';
import { spacing, typography } from '@/src/theme';

type Props = {
  greeting: string;
  streak: number;
  preparation: number;
  progressLabel?: string;
};

export default function DashboardHero({
  greeting,
  streak,
  preparation,
  progressLabel = 'Ready for today',
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.date}>TODAY</Text>

      <Text style={styles.greeting}>{greeting}</Text>

      <View style={styles.metricRow}>
        <View>
          <Text style={styles.score}>
            {preparation}
            <Text style={styles.percent}>%</Text>
          </Text>

          <Text style={styles.label}>{progressLabel}</Text>
        </View>

        <View style={styles.progressSide}>
          <Text style={styles.streak}>🔥 {streak} day streak</Text>
          <ProgressBar progress={preparation} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  date: {
    fontSize: typography.overline,
    letterSpacing: 2,
    color: Colours.STONE,
    marginBottom: spacing.sm,
  },
  greeting: {
    fontFamily: 'PlayfairDisplay_500Medium',
    fontSize: 34,
    lineHeight: 40,
    color: Colours.INK,
    marginBottom: spacing.xxl,
  },
  metricRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.lg,
  },
  score: {
    fontFamily: 'PlayfairDisplay_500Medium',
    fontSize: 88,
    lineHeight: 88,
    color: Colours.INK,
    letterSpacing: -4,
  },
  percent: {
    fontSize: 30,
    color: Colours.SAGE,
    letterSpacing: -1,
  },
  label: {
    marginTop: spacing.sm,
    fontSize: typography.overline,
    letterSpacing: 2,
    color: Colours.STONE,
    textTransform: 'uppercase',
  },
  progressSide: {
    flex: 1,
    paddingBottom: spacing.md,
  },
  streak: {
    marginBottom: spacing.sm,
    fontSize: typography.caption,
    fontWeight: '700',
    color: Colours.SAGE,
  },
});