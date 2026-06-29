import { router, useLocalSearchParams } from 'expo-router';
import React, { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import Card from '@/components/Card';
import Screen from '@/components/Screen';
import { Colours } from '@/constants/colors';
import { QuickActionCard, WorkspaceHero } from '@/src/components/workspace';
import { useAppStore } from '@/src/store';
import { workspaceActions } from '../../../src/data/workspaceActions';

export default function SubjectWorkspaceScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const subjects = useAppStore((state) => state.subjects);
  const allNotes = useAppStore((state) => state.notes);
  const decks = useAppStore((state) => state.decks);

  const subject = subjects.find((item) => item.id === id);

  const subjectNotes = useMemo(
    () => allNotes.filter((note) => note.subjectId === id),
    [allNotes, id]
  );

  const subjectDecks = useMemo(
    () => decks.filter((deck) => deck.subjectId === id),
    [decks, id]
  );

  const recentNotes = subjectNotes.slice(-3).reverse();

  function handleActionPress(actionId: string) {
    if (!subject) return;

    switch (actionId) {
      case 'notes':
        router.push({
          pathname: '/subject/[id]/notes',
          params: { id: subject.id },
        } as never);
        break;

      case 'cards':
        router.push({
          pathname: '/subject/[id]/flashcards',
          params: { id: subject.id },
        } as never);
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

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backText}>← Subjects</Text>
        </Pressable>

        <WorkspaceHero
          code={subject.code}
          name={subject.name}
          progress={subject.progress}
          examText="Workspace ready"
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
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Tasks</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>CONTINUE STUDYING</Text>

        <Card>
          <Text style={styles.label}>NEXT STEP</Text>
          <Text style={styles.title}>
            {recentNotes[0] ? recentNotes[0].title : 'Start your first note'}
          </Text>
          <Text numberOfLines={3} style={styles.body}>
            {recentNotes[0]
              ? recentNotes[0].content || 'Continue building this note.'
              : 'Capture lecture notes, readings, tasks and ideas inside this subject.'}
          </Text>
        </Card>

        <Text style={styles.sectionLabel}>RECENT NOTES</Text>

        {recentNotes.length === 0 ? (
          <Card>
            <Text style={styles.label}>NO NOTES YET</Text>
            <Text style={styles.body}>
              Notes you create for this subject will appear here.
            </Text>
          </Card>
        ) : (
          recentNotes.map((note) => (
            <Pressable
              key={note.id}
              style={styles.noteWrap}
              onPress={() =>
                router.push({
                  pathname: '/subject/[id]/note/[noteId]',
                  params: { id: subject.id, noteId: note.id },
                } as never)
              }
            >
              <Card>
                <Text style={styles.noteTitle}>{note.title}</Text>
                <Text numberOfLines={2} style={styles.body}>
                  {note.content || 'No content yet'}
                </Text>
              </Card>
            </Pressable>
          ))
        )}

        <Text style={styles.sectionLabel}>QUICK ACCESS</Text>

        <View style={styles.actionGrid}>
          {workspaceActions.map((action) => (
            <QuickActionCard
              key={action.id}
              title={action.title}
              icon={action.icon}
              onPress={() => handleActionPress(action.id)}
            />
          ))}
        </View>

        <Text style={styles.sectionLabel}>HIGHER RECOMMENDS</Text>

        <Card>
          <Text style={styles.label}>HIGHER</Text>
          <Text style={styles.body}>
            {subjectNotes.length > 0
              ? `You have ${subjectNotes.length} note${subjectNotes.length === 1 ? '' : 's'} and ${subjectDecks.length} deck${subjectDecks.length === 1 ? '' : 's'} in this subject. Soon, Higher will use them to summarise, quiz you and generate flashcards.`
              : 'Once notes are added, Higher will recommend what to study next.'}
          </Text>
        </Card>

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
  sectionLabel: {
    marginTop: 22,
    marginBottom: 10,
    fontSize: 11,
    letterSpacing: 2,
    color: Colours.STONE,
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
  body: {
    fontSize: 15,
    lineHeight: 22,
    color: Colours.STONE,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 4,
  },
  statBox: {
    flex: 1,
    backgroundColor: Colours.OFF,
    borderWidth: 1,
    borderColor: Colours.RULE,
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '600',
    color: Colours.INK,
  },
  statLabel: {
    marginTop: 4,
    fontSize: 11,
    letterSpacing: 1,
    color: Colours.STONE,
    textTransform: 'uppercase',
  },
  noteWrap: {
    marginBottom: 12,
  },
  noteTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colours.INK,
    marginBottom: 8,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  bottomSpace: {
    height: 40,
  },
});