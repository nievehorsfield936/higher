import { router, useLocalSearchParams } from 'expo-router';
import React, { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import Button from '@/components/Button';
import Card from '@/components/Card';
import Header from '@/components/Header';
import Screen from '@/components/Screen';
import { Colours } from '@/constants/colors';
import { useAppStore } from '@/src/store';

export default function SubjectNotesScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const subjects = useAppStore((state) => state.subjects);
  const allNotes = useAppStore((state) => state.notes);

  const subject = subjects.find((item) => item.id === id);

  const notes = useMemo(
    () => allNotes.filter((note) => note.subjectId === id),
    [allNotes, id]
  );

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

        {notes.length === 0 ? (
          <Card>
            <Text style={styles.label}>NO NOTES YET</Text>
            <Text style={styles.title}>Start your first note.</Text>
            <Text style={styles.body}>
              Create lecture notes, reading summaries, essay plans or revision
              notes.
            </Text>
          </Card>
        ) : (
          notes.map((note) => (
            <Pressable
              key={note.id}
              style={styles.noteWrap}
              onPress={() =>
                router.push({
                  pathname: '/subject/[id]/note/[noteId]',
                  params: {
                    id,
                    noteId: note.id,
                  },
                } as never)
              }
            >
              <Card>
                <Text style={styles.label}>NOTE</Text>
                <Text style={styles.title}>{note.title}</Text>

                <Text numberOfLines={3} style={styles.body}>
                  {note.content || 'No content yet'}
                </Text>
              </Card>
            </Pressable>
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
  label: {
    fontSize: 11,
    letterSpacing: 2,
    color: Colours.STONE,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: Colours.INK,
    marginBottom: 8,
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    color: Colours.STONE,
  },
  noteWrap: {
    marginBottom: 14,
  },
  buttonWrap: {
    marginTop: 22,
    marginBottom: 40,
  },
});