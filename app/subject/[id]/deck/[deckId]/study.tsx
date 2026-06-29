import { router, useLocalSearchParams } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import Button from '@/components/Button';
import Card from '@/components/Card';
import Header from '@/components/Header';
import Screen from '@/components/Screen';
import { Colours } from '@/constants/colors';
import { useAppStore } from '@/src/store';

type ReviewRating = 'again' | 'hard' | 'good' | 'easy';

export default function StudyDeckScreen() {
  const { deckId } = useLocalSearchParams<{ id: string; deckId: string }>();

  const flashcards = useAppStore((state) => state.flashcards);
  const decks = useAppStore((state) => state.decks);
  const updateFlashcard = useAppStore((state) => state.updateFlashcard);

  const deck = decks.find((item) => item.id === deckId);

  const cards = useMemo(
    () => flashcards.filter((card) => card.deckId === deckId),
    [flashcards, deckId]
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const currentCard = cards[currentIndex];

  function getNextReviewDate(rating: ReviewRating) {
    const date = new Date();

    if (rating === 'again') date.setDate(date.getDate());
    if (rating === 'hard') date.setDate(date.getDate() + 1);
    if (rating === 'good') date.setDate(date.getDate() + 3);
    if (rating === 'easy') date.setDate(date.getDate() + 7);

    return date.toISOString();
  }

  function handleReview(rating: ReviewRating) {
    if (!currentCard) return;

    const isCorrect = rating === 'good' || rating === 'easy';

    updateFlashcard(currentCard.id, {
      timesSeen: currentCard.timesSeen + 1,
      timesCorrect: currentCard.timesCorrect + (isCorrect ? 1 : 0),
      lastReviewed: new Date().toISOString(),
      nextReview: getNextReviewDate(rating),
      updatedAt: new Date().toISOString(),
    });

    setShowAnswer(false);

    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      router.back();
    }
  }

  if (!deck || cards.length === 0 || !currentCard) {
    return (
      <Screen>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backText}>← Deck</Text>
        </Pressable>

        <Header
          title="Study deck"
          subtitle="Add cards before starting a study session."
        />
      </Screen>
    );
  }

  return (
    <Screen>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.backText}>← Deck</Text>
      </Pressable>

      <Header
        title={deck.name}
        subtitle={`Card ${currentIndex + 1} of ${cards.length}`}
      />

      <Pressable onPress={() => setShowAnswer((prev) => !prev)}>
        <Card>
          <Text style={styles.label}>
            {showAnswer ? 'ANSWER' : 'QUESTION'}
          </Text>

          <Text style={styles.cardText}>
            {showAnswer ? currentCard.answer : currentCard.question}
          </Text>

          <Text style={styles.tapHint}>
            Tap to {showAnswer ? 'show question' : 'reveal answer'}
          </Text>
        </Card>
      </Pressable>

      {showAnswer ? (
        <View style={styles.ratingGrid}>
          <View style={styles.ratingButton}>
            <Button title="Again" onPress={() => handleReview('again')} />
          </View>

          <View style={styles.ratingButton}>
            <Button title="Hard" onPress={() => handleReview('hard')} />
          </View>

          <View style={styles.ratingButton}>
            <Button title="Good" onPress={() => handleReview('good')} />
          </View>

          <View style={styles.ratingButton}>
            <Button title="Easy" onPress={() => handleReview('easy')} />
          </View>
        </View>
      ) : (
        <Text style={styles.revealHint}>
          Reveal the answer before rating yourself.
        </Text>
      )}
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
    marginBottom: 14,
  },
  cardText: {
    fontSize: 28,
    lineHeight: 38,
    fontWeight: '600',
    color: Colours.INK,
    marginBottom: 24,
  },
  tapHint: {
    fontSize: 13,
    color: Colours.STONE,
  },
  revealHint: {
    marginTop: 18,
    fontSize: 14,
    color: Colours.STONE,
    textAlign: 'center',
  },
  ratingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 22,
  },
  ratingButton: {
    width: '48%',
  },
});