import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import Button from '@/components/Button';
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

  function handleSave() {
    if (!note) return;

    updateNote(note.id, {
      title: title.trim() || 'Untitled Note',
      content: content.trim(),
      updatedAt: new Date().toISOString(),
    });

    router.back();
  }

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

      <Header
        title="Edit note"
        subtitle="Update your study material."
      />

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>TITLE</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Note title"
          placeholderTextColor={Colours.STONE}
          style={styles.titleInput}
        />
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>NOTE</Text>
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

      <Button title="Save changes" onPress={handleSave} />
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
  fieldGroup: {
    marginBottom: 22,
  },
  label: {
    fontSize: 11,
    letterSpacing: 2,
    color: Colours.STONE,
    marginBottom: 10,
  },
  titleInput: {
    borderWidth: 1,
    borderColor: Colours.RULE,
    borderRadius: 18,
    padding: 18,
    fontSize: 17,
    color: Colours.INK,
    backgroundColor: Colours.WARM_WHITE,
  },
  bodyInput: {
    minHeight: 260,
    borderWidth: 1,
    borderColor: Colours.RULE,
    borderRadius: 18,
    padding: 18,
    fontSize: 16,
    lineHeight: 24,
    color: Colours.INK,
    backgroundColor: Colours.WARM_WHITE,
  },
});