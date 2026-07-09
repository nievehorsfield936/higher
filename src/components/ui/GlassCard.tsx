import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { ViewProps } from 'react-native';

import { Colours } from '@/constants/colours';
import { radius, shadows, spacing } from '@/src/design';

export default function GlassCard({ style, children }: ViewProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colours.WARM_WHITE,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    ...shadows.card,
  },
});