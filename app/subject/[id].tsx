import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Card from '@/components/Card';
import Header from '@/components/Header';
import Screen from '@/components/Screen';
import { Colours } from '@/constants/colors';
import { subjects } from '@/data/subjects';

export default function SubjectWorkspaceScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const subject = subjects.find((item) => item.id === id);

  if (!subject) {
    return (
      <Screen>
        <Header title="Subject not found" subtitle="This subject could not be loaded." />
      </Screen>
    );
  }

  return (
    <Screen>
      <Header title={subject.code} subtitle={subject.name} />

      <Card>
        <Text style={styles.label}>NEXT STEP</Text>
        <Text style={styles.title}>{subject.nextTask}</Text>
        <Text style={styles.body}>
          This subject workspace will hold notes, tasks, flashcards, progress and Higher AI context.
        </Text>
      </Card>

      <View style={styles.grid}>
        <View style={styles.tile}>
          <Text style={styles.tileTitle}>Notes</Text>
          <Text style={styles.tileBody}>Lecture notes and summaries</Text>
        </View>

        <View style={styles.tile}>
          <Text style={styles.tileTitle}>Tasks</Text>
          <Text style={styles.tileBody}>Deadlines and planning</Text>
        </View>

        <View style={styles.tile}>
          <Text style={styles.tileTitle}>Cards</Text>
          <Text style={styles.tileBody}>Flashcards and review</Text>
        </View>

        <View style={styles.tile}>
          <Text style={styles.tileTitle}>Higher</Text>
          <Text style={styles.tileBody}>Subject-aware AI support</Text>
        </View>
      </View>
    </Screen>
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 16,
  },
  tile: {
    width: '48%',
    backgroundColor: Colours.OFF,
    borderWidth: 1,
    borderColor: Colours.RULE,
    borderRadius: 18,
    padding: 18,
  },
  tileTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colours.INK,
    marginBottom: 8,
  },
  tileBody: {
    fontSize: 13,
    lineHeight: 19,
    color: Colours.STONE,
  },
});