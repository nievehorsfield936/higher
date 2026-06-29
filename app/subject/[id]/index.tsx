import { router, useLocalSearchParams } from 'expo-router';
import React, { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import Card from '@/components/Card';
import Screen from '@/components/Screen';
import { Colours } from '@/constants/colours';
import { WorkspaceHero } from '@/src/components/workspace';
import FocusCard from '@/src/components/workspace/FocusCard';
import InsightCard from '@/src/components/workspace/InsightCard';
import WorkspaceGrid from '@/src/components/workspace/WorkspaceGrid';
import { useAppStore } from '@/src/store';
import { getDueCards, getTodaysRecommendation } from '@/src/utils/studyEngine';
import {
  BookOpen,
  Brain,
  CalendarDays,
  ChartColumn,
  ClipboardList,
  FolderOpen,
  Sparkles,
} from 'lucide-react-native';

export default function SubjectWorkspaceScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const subjects = useAppStore((state) => state.subjects);
  const notes = useAppStore((state) => state.notes);
  const decks = useAppStore((state) => state.decks);
  const flashcards = useAppStore((state) => state.flashcards);
  const assessments = useAppStore((state) => state.assessments);

  const subject = subjects.find((item) => item.id === id);

  const subjectNotes = useMemo(
    () => notes.filter((note) => note.subjectId === id),
    [notes, id]
  );

  const subjectDecks = useMemo(
    () => decks.filter((deck) => deck.subjectId === id),
    [decks, id]
  );

  const subjectCards = useMemo(
    () => flashcards.filter((card) => card.subjectId === id),
    [flashcards, id]
  );

  const subjectAssessments = useMemo(
    () => assessments.filter((assessment) => assessment.subjectId === id),
    [assessments, id]
  );

  const dueCards = useMemo(
    () => getDueCards(subjectCards),
    [subjectCards]
  );

  const recommendation = useMemo(
    () =>
      subject
        ? getTodaysRecommendation([subject], subjectNotes, subjectCards)
        : null,
    [subject, subjectNotes, subjectCards]
  );

  const recentNote = subjectNotes.slice(-1)[0];

  const workspaceSections = [
    {
      title: 'Study',
      actions: [
        { id: 'notes', title: 'Notes', icon: BookOpen },
        { id: 'cards', title: 'Cards', icon: Brain },
        { id: 'assessments', title: 'Assessments', icon: ClipboardList },
      ],
    },
    {
      title: 'Organise',
      actions: [
        { id: 'planner', title: 'Planner', icon: CalendarDays },
        { id: 'files', title: 'Files', icon: FolderOpen },
      ],
    },
    {
      title: 'Insights',
      actions: [
        { id: 'higher', title: 'Higher', icon: Sparkles },
        { id: 'progress', title: 'Progress', icon: ChartColumn },
      ],
    },
  ];

  function handleActionPress(actionId: string) {
    if (!subject) return;

    switch (actionId) {
      case 'notes':
        router.push(`/subject/${subject.id}/notes` as never);
        break;

      case 'cards':
        router.push(`/subject/${subject.id}/flashcards` as never);
        break;

      case 'assessments':
        router.push(`/subject/${subject.id}/assessments` as never);
        break;

      default:
        console.log(`${actionId} coming soon`);
    }
  }

  if (!subject) {
    return (
      <Screen>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>

        <Card>
          <Text style={styles.label}>SUBJECT NOT FOUND</Text>
          <Text style={styles.title}>This workspace could not be loaded.</Text>
        </Card>
      </Screen>
    );
  }

  const focusTitle =
    dueCards.length > 0
      ? `${dueCards.length} flashcards due`
      : recentNote
        ? recentNote.title
        : 'Start building this subject';

  const focusSubtitle =
    dueCards.length > 0
      ? `Review your due cards for ${subject.name}. Estimated time: ${
          recommendation?.estimatedMinutes ?? Math.max(dueCards.length * 2, 5)
        } minutes.`
      : recentNote
        ? recentNote.content || 'Continue your most recent note.'
        : 'Create notes, flashcards and assessments so Higher can guide your study.';

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backText}>← Subjects</Text>
        </Pressable>

        <WorkspaceHero
          code={subject.code}
          name={subject.name}
          progress={recommendation?.mastery ?? subject.progress}
          examText={`${subjectAssessments.length} assessment${
            subjectAssessments.length === 1 ? '' : 's'
          }`}
        />

        <FocusCard
          title={focusTitle}
          subtitle={focusSubtitle}
          progress={recommendation?.mastery ?? subject.progress}
          buttonTitle={dueCards.length > 0 ? 'Start studying' : 'Continue'}
         onPress={() => router.push('/session' as never)}
        />

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{subjectNotes.length}</Text>
            <Text style={styles.statLabel}>Notes</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{subjectDecks.length}</Text>
            <Text style={styles.statLabel}>Decks</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{subjectAssessments.length}</Text>
            <Text style={styles.statLabel}>Assessments</Text>
          </View>
        </View>

        <WorkspaceGrid
          sections={workspaceSections}
          onActionPress={handleActionPress}
        />

        <View style={styles.insightWrap}>
          <InsightCard
            title="Higher is learning this subject."
            body={
              subjectNotes.length > 0 || subjectCards.length > 0
                ? `You have ${subjectNotes.length} note${
                    subjectNotes.length === 1 ? '' : 's'
                  }, ${subjectCards.length} flashcard${
                    subjectCards.length === 1 ? '' : 's'
                  }, and ${dueCards.length} card${
                    dueCards.length === 1 ? '' : 's'
                  } due today.`
                : 'Add notes and flashcards so Higher can start making smarter recommendations.'
            }
          />
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  backText: {
    marginTop: 16,
    marginBottom: 16,
    fontSize: 16,
    fontWeight: '600',
    color: Colours.SAGE,
  },
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
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
  },
  statBox: {
    flex: 1,
    backgroundColor: Colours.OFF,
    borderWidth: 1,
    borderColor: Colours.RULE,
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: Colours.INK,
  },
  statLabel: {
    marginTop: 4,
    fontSize: 10,
    letterSpacing: 1,
    color: Colours.STONE,
    textTransform: 'uppercase',
  },
  insightWrap: {
    marginTop: 24,
  },
  bottomSpace: {
    height: 48,
  },
});