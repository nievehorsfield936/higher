import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ProgressBar from '@/components/common/ProgressBar';
import { Colours } from '@/constants/colours';
import { spacing, typography } from '@/src/theme';

type Props = {
  code: string;
  name: string;
  preparation: number;
  meta?: string;
};

export default function SubjectHero({
  code,
  name,
  preparation,
  meta,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.code}>{code}</Text>

      <Text style={styles.name}>{name}</Text>

      <View style={styles.row}>
        <Text style={styles.score}>{preparation}%</Text>

        <View style={styles.progressWrap}>
          <Text style={styles.label}>Prepared</Text>
          <ProgressBar progress={preparation} />
        </View>
      </View>

      {meta ? <Text style={styles.meta}>{meta}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
  code: {
    fontSize: typography.overline,
    letterSpacing: 2,
    color: Colours.STONE,
    marginBottom: spacing.sm,
  },
  name: {
    fontFamily: 'PlayfairDisplay_500Medium',
    fontSize: 36,
    lineHeight: 42,
    color: Colours.INK,
    marginBottom: spacing.xl,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.lg,
  },
  score: {
    fontFamily: 'PlayfairDisplay_500Medium',
    fontSize: 64,
    lineHeight: 66,
    color: Colours.INK,
  },
  progressWrap: {
    flex: 1,
    paddingBottom: spacing.sm,
  },
  label: {
    marginBottom: spacing.sm,
    fontSize: typography.overline,
    letterSpacing: 2,
    color: Colours.STONE,
    textTransform: 'uppercase',
  },
  meta: {
    marginTop: spacing.lg,
    fontSize: typography.body,
    lineHeight: 24,
    color: Colours.STONE,
  },
});