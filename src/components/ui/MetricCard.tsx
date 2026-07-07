import React from 'react';
import { StyleSheet, Text } from 'react-native';

import Card from '@/components/Card';
import { Colours } from '@/constants/colours';
import { spacing, typography } from '@/src/theme';

type Props = {
  label: string;
  value: string;
  subtitle?: string;
};

export default function MetricCard({
  label,
  value,
  subtitle,
}: Props) {
  return (
    <Card>
      <Text style={styles.label}>{label}</Text>

      <Text style={styles.value}>{value}</Text>

      {subtitle ? (
        <Text style={styles.subtitle}>{subtitle}</Text>
      ) : null}
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
  value: {
    fontSize: 42,
    fontWeight: '700',
    color: Colours.INK,
  },
  subtitle: {
    marginTop: spacing.sm,
    fontSize: typography.body,
    color: Colours.STONE,
  },
});