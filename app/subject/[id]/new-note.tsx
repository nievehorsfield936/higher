import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import Button from '@/components/Button';
import Header from '@/components/Header';
import Screen from '@/components/Screen';
import { Colours } from '@/constants/colours';
import { useAppStore } from '@/src/store';

export default function NewNoteScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const addNote = useAppStore((state) => state.addNote);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  function handleSave() {
    if (!title.trim()) return;

    const now = new Date().toISOString();

    addNote({
      id: Date.now().toString(),
      subjectId: id,
      title: title.trim(),
      content: content.trim(),
      createdAt: now,
      updatedAt: now,
    });

    router.back();
  }

  return (
    <Screen>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.backText}>← Notes</Text>
      </Pressable>

      <Header
        title="New note"
        subtitle="Capture a lecture, reading, idea or revision summary."
      />

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>TITLE</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="e.g. Lecture 1 — Introduction"
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

      <Button title="Save note" onPress={handleSave} />
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
    minHeight: 220,
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