import React from 'react';
import { StyleSheet, Text } from 'react-native';

import Card from '@/components/Card';
import { Colours } from '@/constants/colours';
import { spacing, typography } from '@/src/theme';

type Props = {
  title: string;
  body: string;
};

export default function InsightCard({ title, body }: Props) {
  return (
    <Card>
      <Text style={styles.label}>HIGHER INSIGHT</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
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
    fontSize: typography.h2,
    fontWeight: '700',
    color: Colours.INK,
    marginBottom: spacing.sm,
  },
  body: {
    fontSize: typography.body,
    lineHeight: 24,
    color: Colours.STONE,
  },
});