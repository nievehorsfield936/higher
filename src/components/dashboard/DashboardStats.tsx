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

export default function DashboardStats({ stats }: Props) {
  return (
    <View style={styles.row}>
      {stats.map((stat) => (
        <Card key={stat.label} style={styles.card}>
          <Text style={styles.value}>
            {stat.value}
          </Text>

          <Text style={styles.label}>
            {stat.label}
          </Text>
        </Card>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },

  card: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },

  value: {
    fontSize: 28,
    fontWeight: '700',
    color: Colours.INK,
  },

  label: {
    marginTop: spacing.sm,
    fontSize: typography.caption,
    color: Colours.STONE,
    textTransform: 'uppercase',
  },
});