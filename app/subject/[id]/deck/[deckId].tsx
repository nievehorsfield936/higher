import { router, useLocalSearchParams } from 'expo-router';
import React, { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import Button from '@/components/Button';
import Card from '@/components/Card';
import Header from '@/components/Header';
import Screen from '@/components/Screen';
import { Colours } from '@/constants/colors';
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
          subtitle={`${cards.length} card${cards.length === 1 ? '' : 's'}`}
        />

        <View style={styles.buttonWrap}>
         <Button
  title="Study deck"
  onPress={() =>
    router.push(`/subject/${id}/deck/${deckId}/study` as never)
  }
/>
  
        </View>

        <View style={styles.buttonWrap}>
          <Button
            title="New card"
            onPress={() =>
              router.push({
                pathname: '/subject/[id]/deck/[deckId]/new-card',
                params: {
                  id,
                  deckId,
                },
              } as never)
            }
          />
        </View>

        {cards.length === 0 ? (
          <Card>
            <Text style={styles.label}>NO CARDS YET</Text>
            <Text style={styles.title}>Add your first card.</Text>
            <Text style={styles.body}>
              Create question and answer cards for active recall.
            </Text>
          </Card>
        ) : (
          cards.map((card) => (
            <View key={card.id} style={styles.cardWrap}>
              <Card>
                <Text style={styles.label}>QUESTION</Text>
                <Text style={styles.title}>{card.question}</Text>

                <Text style={styles.label}>ANSWER</Text>
                <Text style={styles.body}>{card.answer}</Text>
              </Card>
            </View>
          ))
        )}
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
  buttonWrap: {
    marginBottom: 14,
  },
  label: {
    fontSize: 11,
    letterSpacing: 2,
    color: Colours.STONE,
    marginBottom: 10,
    marginTop: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: Colours.INK,
    marginBottom: 16,
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    color: Colours.STONE,
  },
  cardWrap: {
    marginBottom: 14,
  },
});