import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from '@/components/Button';
import Card from '@/components/Card';
import { Colours } from '@/constants/colours';

type Props = {
  step: number;
  title: string;
  description: string;
  minutes: number;
  onComplete: () => void;
};

export default function FocusTaskCard({
  step,
  title,
  description,
  minutes,
  onComplete,
}: Props) {
  return (
    <Card style={styles.card}>
      <Text style={styles.step}>STEP {step}</Text>

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.body}>{description}</Text>

      <Text style={styles.time}>
        {minutes} minutes
      </Text>

      <Button
        title="Complete Task"
        onPress={onComplete}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
  },

  step: {
    fontSize: 11,
    letterSpacing: 2,
    color: Colours.STONE,
    marginBottom: 8,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colours.INK,
    marginBottom: 8,
  },

  body: {
    color: Colours.STONE,
    lineHeight: 22,
    marginBottom: 14,
  },

  time: {
    marginBottom: 18,
    color: Colours.SAGE,
    fontWeight: '700',
  },
});