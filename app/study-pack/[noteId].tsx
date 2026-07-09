import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Button from '@/components/Button';
import Card from '@/components/Card';
import Header from '@/components/Header';
import Screen from '@/components/Screen';

import { buildStudyPack } from '@/src/studyPack';
import { useAppStore } from '@/src/store';

import { Colours } from '@/constants/colours';
import { spacing, typography } from '@/src/theme';

export default function StudyPackScreen() {
  const { noteId } = useLocalSearchParams<{ noteId: string }>();

  const note = useAppStore((s) =>
    s.notes.find((n) => n.id === noteId)
  );

  if (!note) {
    return (
      <Screen>
        <Header title="Study Pack" subtitle="Note not found." />
      </Screen>
    );
  }

  const pack = buildStudyPack(note);

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.back}>← Back</Text>
        </Pressable>

        <Header
          title="Study Pack"
          subtitle="Everything you need from one note."
        />

        <Card style={styles.card}>
          <Text style={styles.section}>SUMMARY</Text>

          <Text style={styles.summary}>
            {pack.summary}
          </Text>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.section}>KEY CONCEPTS</Text>

          {pack.concepts.map((concept) => (
            <Text
              key={concept}
              style={styles.concept}
            >
              • {concept}
            </Text>
          ))}
        </Card>

        <View style={styles.stats}>
          <Card style={styles.stat}>
            <Text style={styles.number}>
              {pack.flashcards}
            </Text>

            <Text style={styles.label}>
              Flashcards
            </Text>
          </Card>

          <Card style={styles.stat}>
            <Text style={styles.number}>
              {pack.quizQuestions}
            </Text>

            <Text style={styles.label}>
              Quiz
            </Text>
          </Card>
        </View>

        <Card style={styles.card}>
          <Text style={styles.section}>
            PREPARATION
          </Text>

          <Text style={styles.preparation}>
            {pack.preparation}%
          </Text>

          <Text style={styles.time}>
            Estimated study time:
            {' '}
            {pack.estimatedStudyTime} mins
          </Text>
        </Card>

        <Button
          title="Start Focus Session"
          onPress={() => router.push('/session/focus')}
        />

        <View style={{ height: 50 }} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  back: {
    marginVertical: spacing.md,
    color: Colours.SAGE,
    fontWeight: '700',
    fontSize: typography.body,
  },

  card: {
    marginBottom: spacing.lg,
  },

  section: {
    fontSize: typography.overline,
    letterSpacing: 2,
    color: Colours.STONE,
    marginBottom: spacing.sm,
  },

  summary: {
    fontSize: typography.body,
    lineHeight: 24,
    color: Colours.INK,
  },

  concept: {
    fontSize: typography.body,
    color: Colours.INK,
    marginBottom: spacing.sm,
  },

  stats: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },

  stat: {
    flex: 1,
    alignItems: 'center',
  },

  number: {
    fontSize: 34,
    fontWeight: '700',
    color: Colours.SAGE,
  },

  label: {
    marginTop: spacing.sm,
    color: Colours.STONE,
  },

  preparation: {
    fontSize: 42,
    fontWeight: '700',
    color: Colours.INK,
    marginBottom: spacing.sm,
  },

  time: {
    color: Colours.STONE,
    fontSize: typography.body,
  },
});