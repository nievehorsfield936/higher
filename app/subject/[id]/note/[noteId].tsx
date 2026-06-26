import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import Header from '@/components/Header';
import Screen from '@/components/Screen';
import { Colours } from '@/constants/colors';
import { useAppStore } from '@/src/store';

export default function NoteDetailScreen() {
  const { noteId } = useLocalSearchParams<{ id: string; noteId: string }>();

  const note = useAppStore((state) =>
    state.notes.find((item) => item.id === noteId)
  );

  const updateNote = useAppStore((state) => state.updateNote);

  const [title, setTitle] = useState(note?.title ?? '');
  const [content, setContent] = useState(note?.content ?? '');
  const [saveStatus, setSaveStatus] = useState('Saved');

  useEffect(() => {
    if (!note) return;

    setSaveStatus('Saving...');

    const timeout = setTimeout(() => {
      updateNote(note.id, {
        title: title.trim() || 'Untitled Note',
        content,
        updatedAt: new Date().toISOString(),
      });

      setSaveStatus('Saved');
    }, 700);

    return () => clearTimeout(timeout);
  }, [title, content]);

  if (!note) {
    return (
      <Screen>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>

        <Header
          title="Note not found"
          subtitle="This note could not be loaded."
        />
      </Screen>
    );
  }

  return (
    <Screen>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.backText}>← Notes</Text>
      </Pressable>

      <View style={styles.statusRow}>
        <Text style={styles.statusText}>{saveStatus}</Text>
      </View>

      <View style={styles.fieldGroup}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Untitled Note"
          placeholderTextColor={Colours.STONE}
          style={styles.titleInput}
        />
      </View>

      <View style={styles.fieldGroup}>
        <TextInput
          value={content}
          onChangeText={setContent}
          placeholder="Start writing..."
          placeholderTextColor={Colours.STONE}
          multiline
          textAlignVertical="top"
          style={styles.bodyInput}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  backText: {
    marginTop: 16,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '600',
    color: Colours.SAGE,
  },
  statusRow: {
    marginBottom: 14,
  },
  statusText: {
    fontSize: 12,
    color: Colours.STONE,
  },
  fieldGroup: {
    marginBottom: 18,
  },
  titleInput: {
    fontSize: 30,
    fontWeight: '600',
    color: Colours.INK,
    backgroundColor: Colours.WARM_WHITE,
  },
  bodyInput: {
    minHeight: 420,
    fontSize: 17,
    lineHeight: 26,
    color: Colours.INK,
    backgroundColor: Colours.WARM_WHITE,
  },
});