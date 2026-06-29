import { router, useLocalSearchParams } from 'expo-router';
import React, { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import Button from '@/components/Button';
import Card from '@/components/Card';
import Header from '@/components/Header';
import Screen from '@/components/Screen';
import { Colours } from '@/constants/colours';
import { useAppStore } from '@/src/store';

export default function SubjectFlashcardsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const subjects = useAppStore((state) => state.subjects);
  const decks = useAppStore((state) => state.decks);
  const flashcards = useAppStore((state) => state.flashcards);

  const subject = subjects.find((item) => item.id === id);

  const subjectDecks = useMemo(
    () => decks.filter((deck) => deck.subjectId === id),
    [decks, id]
  );

  if (!subject) {
    return (
      <Screen>
        <Header title="Subject not found" />
      </Screen>
    );
  }

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backText}>← {subject.code}</Text>
        </Pressable>

        <Header
          title="Flashcards"
          subtitle={`Active recall for ${subject.name}.`}
        />

        {subjectDecks.length === 0 ? (
          <Card>
            <Text style={styles.label}>NO DECKS YET</Text>
            <Text style={styles.title}>Create your first deck.</Text>
            <Text style={styles.body}>
              Decks help organise flashcards by lecture, topic or exam area.
            </Text>
          </Card>
        ) : (
          subjectDecks.map((deck) => {
            const count = flashcards.filter(
              (card) => card.deckId === deck.id
            ).length;

            return (
              <Pressable
                key={deck.id}
                style={styles.deckWrap}
                onPress={() =>
                  router.push(`/subject/${id}/deck/${deck.id}` as never)
                }
              >
                <Card>
                  <Text style={styles.label}>DECK</Text>
                  <Text style={styles.title}>{deck.name}</Text>
                  <Text style={styles.body}>
                    {count} card{count === 1 ? '' : 's'}
                  </Text>
                </Card>
              </Pressable>
            );
          })
        )}

        <View style={styles.buttonWrap}>
          <Button
            title="New deck"
            onPress={() =>
              router.push({
                pathname: '/subject/[id]/new-deck',
                params: { id },
              } as never)
            }
          />
        </View>
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
  deckWrap: {
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
    marginBottom: 8,
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    color: Colours.STONE,
  },
  buttonWrap: {
    marginTop: 22,
    marginBottom: 40,
  },
});