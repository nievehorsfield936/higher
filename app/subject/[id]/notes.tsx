import { router, useLocalSearchParams } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import Button from '@/components/Button';
import Card from '@/components/Card';
import Screen from '@/components/Screen';
import EmptyState from '@/src/components/ui/EmptyState';
import SectionHeader from '@/src/components/ui/SectionHeader';
import StatGrid from '@/src/components/ui/StatGrid';
import SubjectHero from '@/src/components/ui/SubjectHero';
import { Colours } from '@/constants/colours';
import NoteCard from '@/src/components/notes/NoteCard';
import { useStudyBrain } from '@/src/hooks/useStudyBrain';
import { useAppStore } from '@/src/store';
import { spacing, typography } from '@/src/theme';

export default function SubjectNotesScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [search, setSearch] = useState('');

  const brain = useStudyBrain();

  const subjects = useAppStore((state) => state.subjects);
  const allNotes = useAppStore((state) => state.notes);

  const subject = subjects.find((item) => item.id === id);

  const subjectNotes = useMemo(
    () => allNotes.filter((note) => note.subjectId === id),
    [allNotes, id]
  );

  const notes = useMemo(() => {
    const searchTerm = search.toLowerCase();

    return subjectNotes.filter((note) => {
      return (
        note.title.toLowerCase().includes(searchTerm) ||
        note.content.toLowerCase().includes(searchTerm)
      );
    });
  }, [subjectNotes, search]);

  if (!subject) {
    return (
      <Screen>
        <EmptyState
          title="Subject not found"
          body="This notes workspace could not be loaded."
        />
      </Screen>
    );
  }

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backText}>← {subject.code}</Text>
        </Pressable>

        <SubjectHero
          code={subject.code}
          name="Notes"
          preparation={brain.notesScore}
          meta={`${subjectNotes.length} note${
            subjectNotes.length === 1 ? '' : 's'
          } in ${subject.name}`}
        />

        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search notes..."
          placeholderTextColor={Colours.STONE}
          style={styles.search}
        />

        <SectionHeader title="Notes Library" />

        {notes.length === 0 ? (
          <EmptyState
            title={search ? 'No matching notes.' : 'Start your first note.'}
            body={
              search
                ? 'Try another search term.'
                : 'Create lecture notes, summaries, essay plans or revision notes.'
            }
          />
        ) : (
          notes.map((note) => (
            <View key={note.id} style={styles.noteWrap}>
              <NoteCard
                note={note}
                onPress={() =>
                  router.push({
                    pathname: '/subject/[id]/note/[noteId]',
                    params: {
                      id,
                      noteId: note.id,
                    },
                  } as never)
                }
              />
            </View>
          ))
        )}

        <SectionHeader title="Notes Stats" />

        <StatGrid
          stats={[
            {
              label: 'Notes',
              value: subjectNotes.length,
            },
            {
              label: 'Shown',
              value: notes.length,
            },
            {
              label: 'Score',
              value: `${brain.notesScore}%`,
            },
          ]}
        />

        <View style={styles.buttonWrap}>
          <Button
            title="New note"
            onPress={() =>
              router.push({
                pathname: '/subject/[id]/new-note',
                params: { id },
              } as never)
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
    marginTop: spacing.md,
    marginBottom: spacing.md,
    fontSize: typography.body,
    fontWeight: '700',
    color: Colours.SAGE,
  },
  search: {
    borderWidth: 1,
    borderColor: Colours.RULE,
    borderRadius: 18,
    padding: spacing.md,
    fontSize: typography.body,
    backgroundColor: Colours.OFF,
    color: Colours.INK,
    marginBottom: spacing.lg,
  },
  noteWrap: {
    marginBottom: spacing.md,
  },
  buttonWrap: {
    marginTop: spacing.xl,
  },
  bottomSpace: {
    height: spacing.xxl,
  },
});