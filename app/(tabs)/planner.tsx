import React from 'react';
import { StyleSheet, Text } from 'react-native';

import Header from '@/components/Header';
import Screen from '@/components/Screen';
import { Colours } from '@/constants/colours';

export default function CreateScreen() {
  return (
    <Screen>
      <Header
        title="Create"
        subtitle="Quickly create notes, tasks, flashcards, subjects and imports."
      />

      <Text style={styles.label}>COMING SOON</Text>
      <Text style={styles.body}>
        This will become the create menu for Higher Art.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 11,
    letterSpacing: 2,
    color: Colours.STONE,
    marginBottom: 12,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: Colours.INK,
  },
});