import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

import Header from '@/components/Header';
import Screen from '@/components/Screen';

import DashboardAssessmentCard from '@/src/components/dashboard/DashboardAssessmentCard';
import DashboardContinueCard from '@/src/components/dashboard/DashboardContinueCard';
import DashboardFocusCard from '@/src/components/dashboard/DashboardFocusCard';
import DashboardPreparationRing from '@/src/components/dashboard/DashboardPreparationRing';
import DashboardStats from '@/src/components/dashboard/DashboardStats';

import { useHigher } from '@/src/core';
import { useAppStore } from '@/src/store';
import { Colours } from '@/constants/colours';
import { spacing } from '@/src/theme';

export default function HomeScreen() {
  const higher = useHigher();

  const notes = useAppStore((state) => state.notes);
  const assessments = useAppStore((state) => state.assessments);

  const latestNote = notes.at(-1);

  const nextAssessment = assessments[0];

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          title="Good afternoon 👋"
          subtitle="Let's build some momentum today."
        />

        <DashboardPreparationRing
          preparation={higher.higher.preparation}
        />

        <DashboardFocusCard
          title={higher.today.title}
          reason={higher.today.reason}
          priority={higher.today.priority}
          minutes={higher.today.estimatedMinutes}
          onPress={() => router.push('/session/focus')}
        />

        <DashboardStats
          stats={[
            {
              label: 'Notes',
              value: notes.length,
            },
            {
              label: 'Flashcards',
              value: higher.higher.flashcards.length,
            },
            {
              label: 'Preparation',
              value: `${higher.higher.preparation}%`,
            },
          ]}
        />

        {nextAssessment && (
          <DashboardAssessmentCard
            title={nextAssessment.title}
            due={
              nextAssessment.dueDate
                ? `Due ${new Date(
                    nextAssessment.dueDate
                  ).toLocaleDateString()}`
                : 'No due date'
            }
          />
        )}

        {latestNote && (
          <DashboardContinueCard
            title={latestNote.title}
            subtitle="Continue where you left off."
            onPress={() =>
              router.push({
                pathname: '/subject/[id]/note/[noteId]',
                params: {
                  id: latestNote.subjectId,
                  noteId: latestNote.id,
                },
              } as never)
            }
          />
        )}

        <Text style={styles.footer}>
          Higher continuously analyses your notes,
          flashcards and study sessions to keep your
          preparation score up to date.
        </Text>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  footer: {
    marginTop: spacing.xl,
    marginBottom: spacing.xxl,
    textAlign: 'center',
    color: Colours.STONE,
    lineHeight: 22,
  },
});