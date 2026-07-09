import { router, useLocalSearchParams } from 'expo-router';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import Button from '@/components/Button';
import Screen from '@/components/Screen';
import GlassCard from '@/src/components/ui/GlassCard';
import Section from '@/src/components/ui/Section';
import SubjectHero from '@/src/components/ui/SubjectHero';
import ResourceCard from '@/src/components/ui/ResourceCard';
import { spacing } from '@/src/design';
import { useAppStore } from '@/src/store';

export default function SubjectScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const subjects = useAppStore((s) => s.subjects);
  const allNotes = useAppStore((s) => s.notes);
  const allDecks = useAppStore((s) => s.decks);
  const allAssessments = useAppStore((s) => s.assessments);

  const subject = useMemo(
    () => subjects.find((item) => item.id === id),
    [subjects, id]
  );

  const notes = useMemo(
    () => allNotes.filter((note) => note.subjectId === id),
    [allNotes, id]
  );

  const decks = useMemo(
    () => allDecks.filter((deck) => deck.subjectId === id),
    [allDecks, id]
  );

  const assessments = useMemo(
    () => allAssessments.filter((assessment) => assessment.subjectId === id),
    [allAssessments, id]
  );

  if (!subject) {
    return <Screen />;
  }

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SubjectHero
          name={subject.name}
          code={subject.code}
          preparation={subject.progress}
          nextTask="Continue your latest lecture"
        />

        <Section title="Today's Study" />

        <GlassCard>
          <Button
            title="Continue Notes"
            onPress={() => router.push(`/subject/${id}/notes`)}
          />
        </GlassCard>

        <Section title="Resources" />

        <View style={styles.metrics}>
  <ResourceCard
    title="Notes"
    value={notes.length}
    onPress={() => router.push(`/subject/${id}/notes`)}
  />

  <ResourceCard
    title="Decks"
    value={decks.length}
    onPress={() => router.push(`/subject/${id}/flashcards`)}
  />
</View>

<View style={styles.metrics}>
  <ResourceCard
    title="Assessments"
    value={assessments.length}
    onPress={() => router.push(`/subject/${id}/assessments`)}
  />

  <ResourceCard
    title="Ready"
    value={`${subject.progress}%`}
    onPress={() => router.push('/tracker')}
  />
</View>

        <View style={styles.metrics}>
          <MetricCard value={assessments.length} label="Assessments" />
          <MetricCard value={`${subject.progress}%`} label="Ready" />
        </View>

        <Section title="Study Pack" />

        <GlassCard>
          <Button
            title="Generate Study Pack"
            onPress={() => router.push('/session/focus')}
          />
        </GlassCard>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  metrics: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  bottomSpace: {
    height: spacing.xxl,
  },
});