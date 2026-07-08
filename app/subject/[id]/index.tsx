import { router, useLocalSearchParams } from 'expo-router';
import {
  BookOpen,
  Brain,
  CalendarDays,
  ChartColumn,
  ClipboardList,
  FolderOpen,
  Sparkles,
} from 'lucide-react-native';
import React, { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import Button from '@/components/Button';
import Card from '@/components/Card';
import Screen from '@/components/Screen';
import { Colours } from '@/constants/colours';
import ContinueStudyCard from '@/src/components/ui/ContinueStudyCard';
import InsightCard from '@/src/components/ui/InsightCard';
import SectionHeader from '@/src/components/ui/SectionHeader';
import StatGrid from '@/src/components/ui/StatGrid';
import SubjectHealthCard from '@/src/components/ui/SubjectHealthCard';
import SubjectHero from '@/src/components/ui/SubjectHero';
import WorkspaceActionGrid from '@/src/components/ui/WorkspaceActionGrid';
import { useStudyBrain } from '@/src/hooks/useStudyBrain';
import { useAppStore } from '@/src/store';
import { spacing, typography } from '@/src/theme';
import { getDueCards, getTodaysRecommendation } from '@/src/utils/studyEngine';

export default function SubjectWorkspaceScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const subjects = useAppStore((state) => state.subjects);
  const notes = useAppStore((state) => state.notes);
  const decks = useAppStore((state) => state.decks);
  const flashcards = useAppStore((state) => state.flashcards);
  const assessments = useAppStore((state) => state.assessments);

  const brain = useStudyBrain();

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

  if (!subject) {
    return (
      <Screen>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>

        <Card>
          <Text style={styles.title}>Subject not found</Text>
          <Text style={styles.body}>This workspace could not be loaded.</Text>
        </Card>
      </Screen>
    );
  }

  const preparation = recommendation?.mastery ?? subject.progress;

  const continueTitle =
    dueCards.length > 0
      ? `${dueCards.length} flashcards due`
      : recentNote
        ? recentNote.title
        : 'Start building this subject';

  const continueMeta =
    dueCards.length > 0
      ? `${Math.max(dueCards.length * 2, 5)} min review`
      : 'Continue studying';

  const actions = [
    {
      id: 'notes',
      title: 'Notes',
      count: subjectNotes.length,
      icon: BookOpen,
    },
    {
      id: 'cards',
      title: 'Cards',
      count: subjectDecks.length,
      icon: Brain,
    },
    {
      id: 'assessments',
      title: 'Assessments',
      count: subjectAssessments.length,
      icon: ClipboardList,
    },
    {
      id: 'planner',
      title: 'Planner',
      icon: CalendarDays,
    },
    {
      id: 'files',
      title: 'Files',
      icon: FolderOpen,
    },
    {
      id: 'Higher',
      title: 'Higher',
      icon: Sparkles,
    },
    {
      id: 'progress',
      title: 'Progress',
      icon: ChartColumn,
    },
  ];

  function handleActionPress(actionId: string) {
    switch (actionId) {
      case 'notes':
        router.push(`/subject/${subject.id}/notes`);
        break;

      case 'cards':
        router.push(`/subject/${subject.id}/flashcards`);
        break;

      case 'assessments':
        router.push(`/subject/${subject.id}/assessments`);
        break;

      case 'progress':
        router.push('/tracker');
        break;

      default:
        console.log(`${actionId} coming soon`);
    }
  }

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backText}>← Subjects</Text>
        </Pressable>

        <SubjectHero
          code={subject.code}
          name={subject.name}
          preparation={preparation}
          meta={`${subjectAssessments.length} assessment${
            subjectAssessments.length === 1 ? '' : 's'
          } · ${dueCards.length} card${dueCards.length === 1 ? '' : 's'} due`}
        />

        <ContinueStudyCard
          subject={subject.name}
          title={continueTitle}
          meta={continueMeta}
          onPress={() => router.push('/session')}
        />

        <SectionHeader title="Subject Stats" />

        <StatGrid
          stats={[
            {
              label: 'Notes',
              value: subjectNotes.length,
            },
            {
              label: 'Decks',
              value: subjectDecks.length,
            },
            {
              label: 'Due',
              value: dueCards.length,
            },
          ]}
        />

        <SectionHeader title="Workspace" />

        <WorkspaceActionGrid
          actions={actions}
          onPress={handleActionPress}
        />

        <SectionHeader title="Subject Health" />

        <SubjectHealthCard
          notesScore={brain.notesScore}
          flashcardsScore={brain.flashcardsScore}
          assessmentScore={brain.assessmentScore}
          consistencyScore={brain.consistencyScore}
        />

        <SectionHeader title="Higher" />

        <InsightCard
          title={`${subject.name} is taking shape.`}
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

        <View style={styles.buttonWrap}>
          <Button
            title="Start today’s session"
            onPress={() => router.push('/session')}
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
  buttonWrap: {
    marginTop: spacing.xl,
  },
  bottomSpace: {
    height: spacing.xxl,
  },
});