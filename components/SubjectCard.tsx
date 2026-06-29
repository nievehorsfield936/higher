import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colours } from '@/constants/colours';

type SubjectCardProps = {
  code: string;
  name: string;
  nextTask: string;
  progress: number;
};

export default function SubjectCard({
  code,
  name,
  nextTask,
  progress,
}: SubjectCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>SUBJECT</Text>

      <Text style={styles.code}>{code}</Text>
      <Text style={styles.name}>{name}</Text>

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>

      <Text style={styles.nextTask}>{nextTask}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colours.OFF,
    borderWidth: 1,
    borderColor: Colours.RULE,
    borderRadius: 22,
    padding: 22,
  },
  label: {
    fontSize: 11,
    letterSpacing: 2,
    color: Colours.STONE,
    marginBottom: 12,
  },
  code: {
    fontSize: 28,
    fontWeight: '600',
    color: Colours.INK,
    marginBottom: 4,
  },
  name: {
    fontSize: 15,
    color: Colours.STONE,
    marginBottom: 18,
  },
  progressTrack: {
    height: 7,
    backgroundColor: Colours.RULE,
    borderRadius: 999,
    overflow: 'hidden',
    marginBottom: 14,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colours.SAGE,
    borderRadius: 999,
  },
  nextTask: {
    fontSize: 14,
    lineHeight: 20,
    color: Colours.INK,
  },
});