import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colours } from '@/constants/colours';
import { radius, spacing, typography } from '@/src/theme';

type BadgeProps = {
  label: string;
};

export default function Badge({ label }: BadgeProps) {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: Colours.OFF,
    borderWidth: 1,
    borderColor: Colours.RULE,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  text: {
    fontSize: typography.caption,
    fontWeight: '600',
    color: Colours.STONE,
  },
});