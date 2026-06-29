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
import Header from '@/components/Header';
import Screen from '@/components/Screen';
import { Colours } from '@/constants/colours';
import NoteCard from '@/src/components/notes/NoteCard';
import { useAppStore } from '@/src/store';

export default function SubjectNotesScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [search, setSearch] = useState('');

  const subjects = useAppStore((state) => state.subjects);
  const allNotes = useAppStore((state) => state.notes);

  const subject = subjects.find((item) => item.id === id);

  const notes = useMemo(() => {
    return allNotes.filter((note) => {
      const matchesSubject = note.subjectId === id;

      const searchTerm = search.toLowerCase();

      const matchesSearch =
        note.title.toLowerCase().includes(searchTerm) ||
        note.content.toLowerCase().includes(searchTerm);

      return matchesSubject && matchesSearch;
    });
  }, [allNotes, id, search]);

  if (!subject) {
    return (
      <Screen>
        <Header title="Subject not found" />
      </Screen>
    );
  }

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backText}>← {subject.code}</Text>
        </Pressable>

        <Header
          title="Notes"
          subtitle={`Your notes for ${subject.name}.`}
        />

        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search notes..."
          placeholderTextColor={Colours.STONE}
          style={styles.search}
        />

        {notes.length === 0 ? (
          <Card>
            <Text style={styles.label}>NO NOTES FOUND</Text>

            <Text style={styles.emptyTitle}>
              {search ? 'No matching notes.' : 'Start your first note.'}
            </Text>

            <Text style={styles.emptyBody}>
              {search
                ? 'Try another search term.'
                : 'Create lecture notes, summaries, essay plans or revision notes.'}
            </Text>
          </Card>
        ) : (
          notes.map((note) => (
            <NoteCard
              key={note.id}
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
          ))
        )}

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

  search: {
    borderWidth: 1,
    borderColor: Colours.RULE,
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    backgroundColor: Colours.WARM_WHITE,
    color: Colours.INK,
    marginBottom: 20,
  },

  label: {
    fontSize: 11,
    letterSpacing: 2,
    color: Colours.STONE,
    marginBottom: 10,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: Colours.INK,
    marginBottom: 8,
  },

  emptyBody: {
    fontSize: 15,
    lineHeight: 22,
    color: Colours.STONE,
  },

  buttonWrap: {
    marginTop: 22,
    marginBottom: 40,
  },
});