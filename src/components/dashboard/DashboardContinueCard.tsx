import React from 'react';
import { StyleSheet, Text } from 'react-native';

import Button from '@/components/Button';
import Card from '@/components/Card';
import { Colours } from '@/constants/colours';
import { spacing, typography } from '@/src/theme';

type Props = {
  title: string;
  subtitle: string;
  onPress: () => void;
};

export default function DashboardContinueCard({
  title,
  subtitle,
  onPress,
}: Props) {
  return (
    <Card>
      <Text style={styles.label}>
        CONTINUE
      </Text>

      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.subtitle}>
        {subtitle}
      </Text>

      <Button
        title="Continue"
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
    fontSize: typography.h3,
    fontWeight: '700',
    color: Colours.INK,
    marginBottom: spacing.sm,
  },

  subtitle: {
    fontSize: typography.body,
    color: Colours.STONE,
    marginBottom: spacing.lg,
  },
});