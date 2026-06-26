import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colours } from '@/constants/colors';
import ProgressBar from './ProgressBar';

type Props = {
  code: string;
  name: string;
  progress: number;
  examText?: string;
};

export default function WorkspaceHero({
  code,
  name,
  progress,
  examText,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.code}>{code}</Text>

      <Text style={styles.name}>{name}</Text>

      {examText ? (
        <Text style={styles.exam}>{examText}</Text>
      ) : null}

      <ProgressBar progress={progress} />

      <Text style={styles.progress}>
        {Math.round(progress)}% complete
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colours.SAGE,
    borderRadius: 28,
    padding: 24,
    marginBottom: 24,
  },
  code: {
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.75)',
    marginBottom: 8,
  },
  name: {
    fontSize: 32,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  exam: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.85)',
    marginBottom: 20,
  },
  progress: {
    marginTop: 10,
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});