import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import Button from '@/components/Button';
import Header from '@/components/Header';
import Screen from '@/components/Screen';
import { Colours } from '@/constants/colors';
import { useAppStore } from '@/src/store';

export default function NewCardScreen() {
  const { id, deckId } = useLocalSearchParams<{
    id: string;
    deckId: string;
  }>();

  const addFlashcard = useAppStore((state) => state.addFlashcard);

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  function handleSave() {
    if (!question.trim() || !answer.trim()) return;

    const now = new Date().toISOString();

    addFlashcard({
  id: Date.now().toString(),
  subjectId: id,
  deckId,

  question: question.trim(),
  answer: answer.trim(),

  timesSeen: 0,
  timesCorrect: 0,

  lastReviewed: undefined,
  nextReview: undefined,

  createdAt: now,
  updatedAt: now,
});

    router.back();
  }

  return (
    <Screen>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.backText}>← Deck</Text>
      </Pressable>

      <Header
        title="New card"
        subtitle="Create a question and answer for active recall."
      />

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>QUESTION</Text>
        <TextInput
          value={question}
          onChangeText={setQuestion}
          placeholder="e.g. What is an action potential?"
          placeholderTextColor={Colours.STONE}
          multiline
          textAlignVertical="top"
          style={styles.input}
        />
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>ANSWER</Text>
        <TextInput
          value={answer}
          onChangeText={setAnswer}
          placeholder="e.g. A rapid electrical signal that travels along an axon."
          placeholderTextColor={Colours.STONE}
          multiline
          textAlignVertical="top"
          style={styles.input}
        />
      </View>

      <Button title="Save card" onPress={handleSave} />
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
  input: {
    minHeight: 120,
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