import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colours } from '@/constants/colours';
import { spacing, typography } from '@/src/theme';

type Props = {
  title: string;
  subtitle?: string;
};

export default function SectionHeader({ title, subtitle }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.overline,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: Colours.STONE,
  },
  subtitle: {
    marginTop: spacing.xs,
    fontSize: typography.body,
    lineHeight: 24,
    color: Colours.STONE,
  },
});