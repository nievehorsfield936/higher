import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import type { ReactNode } from 'react';

import GlassCard from './GlassCard';
import { Colours } from '@/constants/colours';
import { spacing, typography } from '@/src/design';

type Props = {
  title: string;
  value: string | number;
  icon?: ReactNode;
  onPress: () => void;
};

export default function ResourceCard({
  title,
  value,
  icon,
  onPress,
}: Props) {
  return (
    <Pressable onPress={onPress} style={styles.pressable}>
      <GlassCard style={styles.card}>
        {icon}

        <Text style={styles.value}>{value}</Text>
        <Text style={styles.title}>{title}</Text>
      </GlassCard>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    flex: 1,
  },
  card: {
    minHeight: 120,
    justifyContent: 'space-between',
  },
  value: {
    marginTop: spacing.md,
    fontSize: typography.h2,
    fontWeight: '700',
    color: Colours.INK,
  },
  title: {
    marginTop: spacing.xs,
    fontSize: typography.caption,
    color: Colours.STONE,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '700',
  },
});