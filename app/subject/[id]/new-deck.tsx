import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import Button from '@/components/Button';
import Header from '@/components/Header';
import Screen from '@/components/Screen';
import { Colours } from '@/constants/colors';
import { useAppStore } from '@/src/store';

export default function NewDeckScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const addDeck = useAppStore((state) => state.addDeck);

  const [name, setName] = useState('');

  function handleSave() {
    if (!name.trim()) return;

    addDeck({
      id: Date.now().toString(),
      subjectId: id,
      name: name.trim(),
      createdAt: new Date().toISOString(),
    });

    router.back();
  }

  return (
    <Screen>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.backText}>← Flashcards</Text>
      </Pressable>

      <Header
        title="New deck"
        subtitle="Create a deck for a lecture, topic or exam section."
      />

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>DECK NAME</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="e.g. Lecture 8, ANOVA, Cell Biology"
          placeholderTextColor={Colours.STONE}
          style={styles.input}
        />
      </View>

      <Button title="Create deck" onPress={handleSave} />
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
    borderWidth: 1,
    borderColor: Colours.RULE,
    borderRadius: 18,
    padding: 18,
    fontSize: 17,
    color: Colours.INK,
    backgroundColor: Colours.WARM_WHITE,
  },
});