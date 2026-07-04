import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import Button from '../../components/Button';
import Card from '../../components/Card';
import Header from '../../components/Header';
import Screen from '../../components/Screen';
import ProgressBar from '../../components/common/ProgressBar';

import { Colours } from '../../constants/colours';

import { buildStudySession } from '../../src/session';
import {
  createSessionRunner,
  getCurrentStep,
  hasNextStep,
  nextStep,
} from '../../src/session/runner';

import { useAppStore } from '../../src/store';
import { spacing, typography } from '../../src/theme';

export default function ActiveSessionScreen() {
  const notes = useAppStore((s) => s.notes);
  const flashcards = useAppStore((s) => s.flashcards);
  const assessments = useAppStore((s) => s.assessments);
  const addCompletedSession = useAppStore((s) => s.addCompletedSession);

  const session = useMemo(
    () =>
      buildStudySession({
        notes,
        flashcards,
        assessments,
      }),
    [notes, flashcards, assessments]
  );

  const [runner, setRunner] = useState(() =>
    createSessionRunner(session)
  );

  const step = getCurrentStep(runner);

  const progress =
    ((runner.currentStep + 1) / runner.session.steps.length) * 100;

  function completeStep() {
    if (!hasNextStep(runner)) {
      addCompletedSession({
        id: Date.now().toString(),
        completedAt: new Date().toISOString(),
        totalMinutes: session.totalMinutes,
        stepsCompleted: session.steps.length,
        preparation: session.preparation,
      });

      router.replace('/session/complete' as never);
      return;
    }

    setRunner(nextStep(runner));
  }

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.back}>← Session</Text>
        </Pressable>

        <Header
          title="Study Session"
          subtitle={`Step ${runner.currentStep + 1} of ${
            runner.session.steps.length
          }`}
        />

        <Card>
          <ProgressBar progress={progress} />

          <Text style={styles.title}>{step.title}</Text>

          <Text style={styles.subtitle}>{step.subtitle}</Text>

          <Text style={styles.time}>
            Estimated {step.estimatedMinutes} minutes
          </Text>
        </Card>

        <View style={styles.buttonWrap}>
          <Button
            title={hasNextStep(runner) ? 'Complete Step' : 'Finish Session'}
            onPress={completeStep}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  back: {
    marginTop: spacing.md,
    marginBottom: spacing.md,
    color: Colours.SAGE,
    fontSize: typography.body,
    fontWeight: '700',
  },

  title: {
    marginTop: spacing.lg,
    fontSize: typography.h1,
    fontWeight: '700',
    color: Colours.INK,
  },

  subtitle: {
    marginTop: spacing.md,
    fontSize: typography.body,
    lineHeight: 24,
    color: Colours.STONE,
  },

  time: {
    marginTop: spacing.lg,
    fontSize: typography.caption,
    color: Colours.STONE,
  },

  buttonWrap: {
    marginTop: spacing.xl,
  },
});