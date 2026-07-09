import React from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';

import GlassCard from './GlassCard';

import { Colours } from '@/constants/colours';
import {
  spacing,
  typography,
} from '@/src/design';

type Props = {
  value: string | number;
  label: string;
};

export default function MetricCard({
  value,
  label,
}: Props) {
  return (
    <GlassCard style={styles.card}>
      <Text style={styles.value}>
        {value}
      </Text>

      <Text style={styles.label}>
        {label}
      </Text>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: 'center',
  },

  value: {
    fontSize: typography.h2,
    fontWeight: '700',
    color: Colours.INK,
  },

  label: {
    marginTop: spacing.sm,
    color: Colours.STONE,
  },
});