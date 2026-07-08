import React from 'react';
import { StyleSheet, Text } from 'react-native';

import Button from '@/components/Button';
import Card from '@/components/Card';
import { Colours } from '@/constants/colours';
import { spacing, typography } from '@/src/theme';

type Props = {
  title: string;
  reason: string;
  priority: string;
  minutes: number;
  onPress: () => void;
};

export default function DashboardFocusCard({
  title,
  reason,
  priority,
  minutes,
  onPress,
}: Props) {
  return (
    <Card>
      <Text style={styles.label}>TODAY'S FOCUS</Text>

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.reason}>
        {reason}
      </Text>

      <Text style={styles.meta}>
        {priority} • {minutes} min
      </Text>

      <Button
        title="Start Focus Session"
        onPress={onPress}
      />
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

  reason: {
    fontSize: typography.body,
    lineHeight: 24,
    color: Colours.STONE,
    marginBottom: spacing.md,
  },

  meta: {
    color: Colours.SAGE,
    fontWeight: '700',
    marginBottom: spacing.lg,
  },
});