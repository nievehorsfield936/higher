import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import { Colours } from '@/constants/colours';
import { spacing, typography } from '@/src/theme';

type Props = {
  onSummarise?: () => void;
  onFlashcards?: () => void;
  onQuiz?: () => void;
  onExplain?: () => void;
};

export default function AIActionBar({
  onSummarise,
  onFlashcards,
  onQuiz,
  onExplain,
}: Props) {
  const actions = [
    { label: '✨ Summarise', onPress: onSummarise },
    { label: '🃏 Flashcards', onPress: onFlashcards },
    { label: '❓ Quiz', onPress: onQuiz },
    { label: '💡 Explain', onPress: onExplain },
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {actions.map((action) => (
        <Pressable
          key={action.label}
          style={styles.chip}
          onPress={action.onPress ?? (() => console.log(`${action.label} coming soon`))}
        >
          <Text style={styles.text}>{action.label}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  chip: {
    backgroundColor: Colours.OFF,
    borderWidth: 1,
    borderColor: Colours.RULE,
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  text: {
    fontSize: typography.caption,
    fontWeight: '700',
    color: Colours.INK,
  },
});