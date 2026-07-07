import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Card from '@/components/Card';
import { Colours } from '@/constants/colours';
import { spacing, typography } from '@/src/theme';

type Stat = {
  label: string;
  value: string | number;
};

type Props = {
  stats: Stat[];
};

export default function StatGrid({ stats }: Props) {
  return (
    <View style={styles.grid}>
      {stats.map((stat) => (
        <View key={stat.label} style={styles.item}>
          <Card>
            <Text style={styles.value}>{stat.value}</Text>
            <Text style={styles.label}>{stat.label}</Text>
          </Card>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  item: {
    flex: 1,
  },
  value: {
    fontSize: typography.h2,
    fontWeight: '700',
    color: Colours.INK,
  },
  label: {
    marginTop: spacing.xs,
    fontSize: typography.overline,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: Colours.STONE,
  },
});