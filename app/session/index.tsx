import { router } from 'expo-router';
import React, { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import Button from '@/components/Button';
import Card from '@/components/Card';
import Screen from '@/components/Screen';
import ProgressScoreCard from '@/src/components/ui/ProgressScoreCard';
import SectionHeader from '@/src/components/ui/SectionHeader';
import { Colours } from '@/constants/colours';
import { buildSmartStudySession } from '@/src/session';
import { useStudyBrain } from '@/src/hooks/useStudyBrain';
import { useAppStore } from '@/src/store';
import { spacing, typography } from '@/src/theme';

export default function SessionScreen() {
  const notes = useAppStore((state) => state.notes);
  const flashcards = useAppStore((state) => state.flashcards);
  const assessments = useAppStore((state) => state.assessments);

  const brain = useStudyBrain();

  const session = useMemo(
    () =>
      buildSmartStudySession({
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

        <Text style={styles.label}>TODAY’S SESSION</Text>

        <Text style={styles.heading}>
          Higher has built your study plan.
        </Text>

        <ProgressScoreCard
          score={brain.preparation}
          subtitle={`${session.totalMinutes} minutes planned from your notes, flashcards and assessments.`}
        />

        <SectionHeader title="Session Flow" />

        {session.steps.map((step, index) => (
          <View key={`${step.id}-${index}`} style={styles.stepWrap}>
            <Card>
              <Text style={styles.stepNumber}>STEP {index + 1}</Text>

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
    marginBottom: spacing.lg,
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
  heading: {
    fontFamily: 'PlayfairDisplay_500Medium',
    fontSize: 34,
    lineHeight: 40,
    color: Colours.INK,
    marginBottom: spacing.xl,
  },
  stepWrap: {
    marginBottom: spacing.md,
  },
  stepNumber: {
    fontSize: typography.overline,
    letterSpacing: 2,
    color: Colours.STONE,
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: typography.h2,
    fontWeight: '700',
    color: Colours.INK,
    marginBottom: spacing.sm,
  },
  body: {
    fontSize: typography.body,
    lineHeight: 24,
    color: Colours.STONE,
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