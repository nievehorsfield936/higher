import { router } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import Card from '@/components/Card';
import Header from '@/components/Header';
import Screen from '@/components/Screen';
import { Colours } from '@/constants/colors';
import { subjects } from '@/data/subjects';

export default function SubjectsScreen() {
  return (
    <Screen>
      <Header
        title="Your subjects"
        subtitle="Choose a subject to organise notes, tasks, flashcards and Higher."
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {subjects.map((subject) => (
          <Pressable
            key={subject.id}
            onPress={() =>
              router.push({
                pathname: '/subject/[id]',
                params: { id: subject.id },
              } as never)
            }
            style={styles.subjectWrap}
          >
            <Card>
              <Text style={styles.label}>
                {subject.level === 'university' ? 'UNIVERSITY' : 'HIGH SCHOOL'}
              </Text>

              <Text style={styles.code}>{subject.code}</Text>
              <Text style={styles.name}>{subject.name}</Text>

              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${subject.progress}%` },
                  ]}
                />
              </View>

              <Text style={styles.nextTask}>Next: {subject.nextTask}</Text>
            </Card>
          </Pressable>
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  subjectWrap: {
    marginBottom: 16,
  },
  label: {
    fontSize: 11,
    letterSpacing: 2,
    color: Colours.STONE,
    marginBottom: 10,
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
  },
  nextTask: {
    fontSize: 14,
    lineHeight: 20,
    color: Colours.INK,
  },
});