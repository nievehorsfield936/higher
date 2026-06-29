import { router, useLocalSearchParams } from 'expo-router';
import React, { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import Button from '@/components/Button';
import Card from '@/components/Card';
import Header from '@/components/Header';
import Screen from '@/components/Screen';
import { Colours } from '@/constants/colours';
import { useAppStore } from '@/src/store';

export default function DeckScreen() {
  const { id, deckId } = useLocalSearchParams<{
    id: string;
    deckId: string;
  }>();

  const decks = useAppStore((state) => state.decks);
  const flashcards = useAppStore((state) => state.flashcards);

  const deck = decks.find((item) => item.id === deckId);

  const cards = useMemo(
    () => flashcards.filter((card) => card.deckId === deckId),
    [flashcards, deckId]
  );

  const studiedCards = cards.filter((card) => card.timesSeen > 0);

  const totalSeen = cards.reduce(
    (sum, card) => sum + card.timesSeen,
    0
  );

  const totalCorrect = cards.reduce(
    (sum, card) => sum + card.timesCorrect,
    0
  );

  const accuracy =
    totalSeen === 0
      ? 0
      : Math.round((totalCorrect / totalSeen) * 100);

  const dueToday = cards.filter((card) => {
    if (!card.nextReview) return true;

    return new Date(card.nextReview) <= new Date();
  });

  if (!deck) {
    return (
      <Screen>
        <Header title="Deck not found" />
      </Screen>
    );
  }

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backText}>← Flashcards</Text>
        </Pressable>

        <Header
          title={deck.name}
          subtitle={`${cards.length} card${
            cards.length === 1 ? '' : 's'
          }`}
        />

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {cards.length}
            </Text>

            <Text style={styles.statLabel}>
              Cards
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {studiedCards.length}
            </Text>

            <Text style={styles.statLabel}>
              Studied
            </Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {accuracy}%
            </Text>

            <Text style={styles.statLabel}>
              Accuracy
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {dueToday.length}
            </Text>

            <Text style={styles.statLabel}>
              Due Today
            </Text>
          </View>
        </View>

        <View style={styles.buttonSpacing}>
          <Button
            title="Study Deck"
            onPress={() =>
              router.push(
                `/subject/${id}/deck/${deckId}/study` as never
              )
            }
          />
        </View>

        <View style={styles.buttonSpacing}>
          <Button
            title="New Card"
            onPress={() =>
              router.push(
                `/subject/${id}/deck/${deckId}/new-card` as never
              )
            }
          />
        </View>

        <Text style={styles.sectionLabel}>
          CARDS
        </Text>

        {cards.length === 0 ? (
          <Card>
            <Text style={styles.label}>
              NO CARDS YET
            </Text>

            <Text style={styles.title}>
              Add your first flashcard.
            </Text>

            <Text style={styles.body}>
              Create question and answer pairs to
              begin studying.
            </Text>
          </Card>
        ) : (
          cards.map((card, index) => (
            <View
              key={card.id}
              style={styles.cardSpacing}
            >
              <Card>
                <Text style={styles.label}>
                  CARD {index + 1}
                </Text>

                <Text style={styles.question}>
                  {card.question}
                </Text>

                <Text style={styles.answer}>
                  {card.answer}
                </Text>

                <View style={styles.metaRow}>
                  <Text style={styles.meta}>
                    Seen {card.timesSeen}
                  </Text>

                  <Text style={styles.meta}>
                    Correct {card.timesCorrect}
                  </Text>
                </View>
              </Card>
            </View>
          ))
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
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

  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },

  statCard: {
    flex: 1,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colours.RULE,
    backgroundColor: Colours.OFF,
    paddingVertical: 20,
    alignItems: 'center',
  },

  statNumber: {
    fontSize: 30,
    fontWeight: '700',
    color: Colours.INK,
  },

  statLabel: {
    marginTop: 6,
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: Colours.STONE,
  },

  buttonSpacing: {
    marginTop: 12,
  },

  sectionLabel: {
    marginTop: 28,
    marginBottom: 12,
    fontSize: 11,
    letterSpacing: 2,
    color: Colours.STONE,
  },

  cardSpacing: {
    marginBottom: 14,
  },

  label: {
    fontSize: 11,
    letterSpacing: 2,
    color: Colours.STONE,
    marginBottom: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: '600',
    color: Colours.INK,
    marginBottom: 10,
  },

  body: {
    fontSize: 15,
    lineHeight: 22,
    color: Colours.STONE,
  },

  question: {
    fontSize: 21,
    fontWeight: '600',
    color: Colours.INK,
    marginBottom: 14,
  },

  answer: {
    fontSize: 16,
    lineHeight: 24,
    color: Colours.STONE,
    marginBottom: 18,
  },

  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  meta: {
    fontSize: 12,
    color: Colours.STONE,
  },
});