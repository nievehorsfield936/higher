import React from 'react';
import { StyleSheet, Text } from 'react-native';

import Header from '@/components/Header';
import Screen from '@/components/Screen';
import { Colours } from '@/constants/colours';

export default function FlashcardsScreen() {
  return (
    <Screen>
      <Header
        title="Cards"
        subtitle="Flashcards and active recall will live here."
      />

      <Text style={styles.body}>Coming soon.</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: Colours.STONE,
  },
});