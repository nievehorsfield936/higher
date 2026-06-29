import { router } from 'expo-router';
import React, { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import Button from '@/components/Button';
import Card from '@/components/Card';
import Header from '@/components/Header';
import Screen from '@/components/Screen';
import ProgressBar from '@/components/common/ProgressBar';
import { Colours } from '@/constants/colours';
import { buildStudySession } from '@/src/session';
import { useAppStore } from '@/src/store';
import { spacing, typography } from '@/src/theme';

export default function SessionScreen() {
  const notes = useAppStore((state) => state.notes);
  const flashcards = useAppStore((state) => state.flashcards);
  const assessments = useAppStore((state) => state.assessments);

  const session = useMemo(
    () =>
      buildStudySession({
        notes,
        flashcards,
        assessments,
      }),
    [notes, flashcards, assessments]
  );

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>

        <Header
          title="Today’s Session"
          subtitle={`${session.totalMinutes} minutes planned`}
        />

        <Card>
          <Text style={styles.label}>PREPARATION</Text>
          <Text style={styles.prepText}>{session.preparation}% ready</Text>

          <ProgressBar progress={session.preparation} />

          <Text style={styles.body}>
            Higher has built this session from your notes, flashcards and assessments.
          </Text>
        </Card>

        <Text style={styles.sectionLabel}>SESSION STEPS</Text>

        {session.steps.map((step, index) => (
          <View key={step.id} style={styles.stepWrap}>
            <Card>
              <Text style={styles.label}>STEP {index + 1}</Text>
              <Text style={styles.title}>{step.title}</Text>
              <Text style={styles.body}>{step.subtitle}</Text>
              <Text style={styles.meta}>
                Estimated {step.estimatedMinutes} min
              </Text>
            </Card>
          </View>
        ))}

        <View style={styles.buttonWrap}>
         <Button
  title="Start Session"
  onPress={() => router.push('/session/active')}
/>
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  backText: {
    marginTop: spacing.md,
    marginBottom: spacing.md,
    fontSize: typography.body,
    fontWeight: '700',
    color: Colours.SAGE,
  },
  label: {
    fontSize: typography.overline,
    letterSpacing: 2,
    color: Colours.STONE,
    marginBottom: spacing.sm,
  },
  prepText: {
    fontSize: typography.h1,
    fontWeight: '700',
    color: Colours.INK,
    marginBottom: spacing.md,
  },
  body: {
    marginTop: spacing.md,
    fontSize: typography.body,
    lineHeight: 24,
    color: Colours.STONE,
  },
  sectionLabel: {
    marginTop: spacing.xl,
    marginBottom: spacing.md,
    fontSize: typography.overline,
    letterSpacing: 2,
    fontWeight: '700',
    color: Colours.STONE,
  },
  stepWrap: {
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.h2,
    fontWeight: '700',
    color: Colours.INK,
    marginBottom: spacing.sm,
  },
  meta: {
    marginTop: spacing.md,
    fontSize: typography.caption,
    color: Colours.STONE,
  },
  buttonWrap: {
    marginTop: spacing.lg,
  },
  bottomSpace: {
    height: spacing.xxl,
  },
});