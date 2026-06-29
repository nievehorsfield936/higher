import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import Button from '@/components/Button';
import Header from '@/components/Header';
import Screen from '@/components/Screen';
import { Colours } from '@/constants/colours';
import { useAppStore } from '@/src/store';
import type { AssessmentType } from '@/src/store/slices/assessmentSlice';

export default function NewAssessmentScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const addAssessment = useAppStore((state) => state.addAssessment);

  const [title, setTitle] = useState('');
  const [type, setType] = useState<AssessmentType>('exam');
  const [dueDate, setDueDate] = useState('');
  const [weight, setWeight] = useState('');
  const [notes, setNotes] = useState('');

  function handleSave() {
    if (!title.trim()) return;

    const now = new Date().toISOString();

    addAssessment({
      id: Date.now().toString(),
      subjectId: id,
      title: title.trim(),
      type,
      dueDate,
      weight: Number(weight) || 0,
      notes: notes.trim(),
      createdAt: now,
      updatedAt: now,
    });

    router.back();
  }

  return (
    <Screen>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.backText}>← Assessments</Text>
      </Pressable>

      <Header title="New assessment" subtitle="Add an exam, assignment or quiz." />

      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Assessment title"
        placeholderTextColor={Colours.STONE}
        style={styles.input}
      />

      <TextInput
        value={type}
        onChangeText={(value) => setType(value as AssessmentType)}
        placeholder="exam / assignment / quiz / other"
        placeholderTextColor={Colours.STONE}
        style={styles.input}
      />

      <TextInput
        value={dueDate}
        onChangeText={setDueDate}
        placeholder="Due date: YYYY-MM-DD"
        placeholderTextColor={Colours.STONE}
        style={styles.input}
      />

      <TextInput
        value={weight}
        onChangeText={setWeight}
        placeholder="Weight %"
        placeholderTextColor={Colours.STONE}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        value={notes}
        onChangeText={setNotes}
        placeholder="Notes"
        placeholderTextColor={Colours.STONE}
        multiline
        textAlignVertical="top"
        style={[styles.input, styles.notes]}
      />

      <View style={styles.buttonWrap}>
        <Button title="Save assessment" onPress={handleSave} />
      </View>
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
  input: {
    borderWidth: 1,
    borderColor: Colours.RULE,
    borderRadius: 18,
    padding: 18,
    fontSize: 16,
    color: Colours.INK,
    backgroundColor: Colours.WARM_WHITE,
    marginBottom: 16,
  },
  notes: {
    minHeight: 120,
  },
  buttonWrap: {
    marginTop: 8,
  },
});