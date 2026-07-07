import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Card from '@/components/Card';
import ProgressBar from '@/components/common/ProgressBar';
import { Colours } from '@/constants/colours';
import { spacing, typography } from '@/src/theme';

type Props = {
  streak: number;
  preparation: number;
  insight: string;
};

export default function HeroCard({
  streak,
  preparation,
  insight,
}: Props) {
  return (
    <Card>
      <Text style={styles.streak}>
        🔥 {streak} Day Streak
      </Text>

      <Text style={styles.score}>
        {preparation}%
      </Text>

      <Text style={styles.ready}>
        Ready for today
      </Text>

      <View style={styles.progressWrap}>
        <ProgressBar progress={preparation} />
      </View>

      <Text style={styles.insight}>
        {insight}
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  streak: {
    fontSize: typography.h2,
    fontWeight: '700',
    color: Colours.INK,
    marginBottom: spacing.md,
  },

  score: {
    fontSize: 54,
    fontWeight: '700',
    color: Colours.INK,
  },

  ready: {
    marginTop: spacing.xs,
    fontSize: typography.body,
    color: Colours.STONE,
  },

  progressWrap: {
    marginTop: spacing.lg,
  },

  insight: {
    marginTop: spacing.lg,
    fontSize: typography.body,
    lineHeight: 24,
    color: Colours.STONE,
  },
});