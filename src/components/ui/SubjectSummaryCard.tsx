import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Card from '@/components/Card';
import ProgressBar from '@/components/common/ProgressBar';
import { Colours } from '@/constants/colours';
import { spacing, typography } from '@/src/theme';

type Props = {
  code: string;
  name: string;
  preparation: number;
};

export default function SubjectSummaryCard({
  code,
  name,
  preparation,
}: Props) {
  return (
    <Card>
      <Text style={styles.label}>{code}</Text>
      <Text style={styles.title}>{name}</Text>

      <View style={styles.progressWrap}>
        <ProgressBar progress={preparation} />
      </View>

      <Text style={styles.body}>{preparation}% prepared</Text>
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
  title: {
    fontSize: typography.h1,
    fontWeight: '700',
    color: Colours.INK,
  },
  progressWrap: {
    marginTop: spacing.lg,
  },
  body: {
    marginTop: spacing.md,
    fontSize: typography.body,
    color: Colours.STONE,
  },
});