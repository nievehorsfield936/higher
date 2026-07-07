import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ProgressBar from '@/components/common/ProgressBar';
import { Colours } from '@/constants/colours';
import { spacing, typography } from '@/src/theme';

type Props = {
  label: string;
  value: number;
};

export default function ScoreRow({
  label,
  value,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>

        <Text style={styles.value}>
          {value}%
        </Text>
      </View>

      <ProgressBar progress={value} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },

  label: {
    fontSize: typography.body,
    color: Colours.INK,
  },

  value: {
    fontSize: typography.body,
    fontWeight: '700',
    color: Colours.SAGE,
  },
});