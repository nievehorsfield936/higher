import React from 'react';
import { StyleSheet, Text } from 'react-native';

import Card from '@/components/Card';
import { Colours } from '@/constants/colors';

interface CoachCardProps {
  title: string;
  subtitle: string;
}

export default function CoachCard({
  title,
  subtitle,
}: CoachCardProps) {
  return (
    <Card>
      <Text style={styles.label}>HIGHER COACH</Text>

      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.subtitle}>
        {subtitle}
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 11,
    letterSpacing: 2,
    color: Colours.STONE,
    marginBottom: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: '600',
    color: Colours.INK,
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: Colours.STONE,
  },
});