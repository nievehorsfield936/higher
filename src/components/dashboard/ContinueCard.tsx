import React from 'react';
import { StyleSheet, Text } from 'react-native';

import Card from '@/components/Card';
import { Colours } from '@/constants/colors';

interface ContinueCardProps {
  title: string;
  body: string;
}

export default function ContinueCard({
  title,
  body,
}: ContinueCardProps) {
  return (
    <Card>
      <Text style={styles.label}>CONTINUE</Text>

      <Text style={styles.title}>
        {title}
      </Text>

      <Text
        numberOfLines={3}
        style={styles.body}
      >
        {body}
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

  body: {
    fontSize: 15,
    lineHeight: 22,
    color: Colours.STONE,
  },
});