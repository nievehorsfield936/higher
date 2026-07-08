import { router, useLocalSearchParams } from 'expo-router';
import React, { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import Button from '@/components/Button';
import Card from '@/components/Card';
import Screen from '@/components/Screen';
import EmptyState from '@/src/components/ui/EmptyState';
import InsightCard from '@/src/components/ui/InsightCard';
import SectionHeader from '@/src/components/ui/SectionHeader';
import StatGrid from '@/src/components/ui/StatGrid';
import SubjectHero from '@/src/components/ui/SubjectHero';
import { Colours } from '@/constants/colours';
import { buildKnowledgeGraph } from '@/src/brain/buildKnowledgeGraph';
import { useStudyBrain } from '@/src/hooks/useStudyBrain';
import { useAppStore } from '@/src/store';
import { spacing, typography } from '@/src/theme';

function generateSuggestions(graph: ReturnType<typeof buildKnowledgeGraph>) {
  return Object.values(graph)
    .sort((a, b) => b.occurrences - a.occurrences)
    .slice(0, 12)
    .map((node) => ({
      id: node.concept,
      concept: node.concept,
      question: `What is ${node.concept}?`,
      answer: `${node.concept} is an important concept from your notes. Review the source notes to refine this answer.`,
      sourceNotes: node.notes,
    }));
}
export default function SubjectFlashcardsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const brain = useStudyBrain();

  const subjects = useAppStore((state) => state.subjects);
  const notes = useAppStore((state) => state.notes);
  const decks = useAppStore((state) => state.decks);
  const flashcards = useAppStore((state) => state.flashcards);

  const subject = subjects.find((item) => item.id === id);

  const subjectNotes = useMemo(
    () => notes.filter((note) => note.subjectId === id),
    [notes, id]
  );

  const subjectDecks = useMemo(
    () => decks.filter((deck) => deck.subjectId === id),
    [decks, id]
  );

  const subjectCards = useMemo(
    () => flashcards.filter((card) => card.subjectId === id),
    [flashcards, id]
  );

  const suggestions = useMemo(() => {
    const graph = buildKnowledgeGraph(subjectNotes);
  return generateSuggestions(graph);
  }, [subjectNotes]);

  if (!subject) {
    return (
      <Screen>
        <EmptyState
          title="Subject not found"
          body="This flashcard workspace could not be loaded."
        />
      </Screen>
    );
  }

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backText}>← {subject.code}</Text>
        </Pressable>

        <SubjectHero
          code={subject.code}
          name="Flashcards"
          preparation={brain.flashcardsScore}
          meta={`${subjectCards.length} card${
            subjectCards.length === 1 ? '' : 's'
          } across ${subjectDecks.length} deck${
            subjectDecks.length === 1 ? '' : 's'
          }`}
        />

        <StatGrid
          stats={[
            {
              label: 'Decks',
              value: subjectDecks.length,
            },
            {
              label: 'Cards',
              value: subjectCards.length,
            },
            {
              label: 'Ideas',
              value: suggestions.length,
            },
          ]}
        />

        <SectionHeader
          title="Higher Suggestions"
          subtitle="Generated from concepts found in your notes."
        />

        {suggestions.length === 0 ? (
          <EmptyState
            title="No suggestions yet"
            body="Add notes with key concepts and Higher will suggest flashcards automatically."
          />
        ) : (
          suggestions.slice(0, 4).map((suggestion) => (
            <View key={suggestion.id} style={styles.suggestionWrap}>
              <Card>
                <Text style={styles.label}>SUGGESTED CARD</Text>
                <Text style={styles.title}>{suggestion.question}</Text>
                <Text style={styles.body}>{suggestion.answer}</Text>
                <Text style={styles.meta}>
                  From {suggestion.sourceNotes.join(', ')}
                </Text>
              </Card>
            </View>
          ))
        )}

        <SectionHeader title="Decks" />

        {subjectDecks.length === 0 ? (
          <EmptyState
            title="No decks yet"
            body="Create your first deck to organise cards by lecture, topic or exam area."
          />
        ) : (
          subjectDecks.map((deck) => {
            const count = flashcards.filter(
              (card) => card.deckId === deck.id
            ).length;

            return (
              <Pressable
                key={deck.id}
                style={styles.deckWrap}
                onPress={() => router.push(`/subject/${id}/deck/${deck.id}`)}
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

        <SectionHeader title="Higher" />

        <InsightCard
          title="Flashcards are becoming smarter."
          body={
            suggestions.length > 0
              ? `Higher found ${suggestions.length} possible flashcard${
                  suggestions.length === 1 ? '' : 's'
                } from your notes.`
              : 'Add more structured notes and Higher will start detecting useful flashcard ideas.'
          }
        />

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

        <View style={styles.bottomSpace} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  backText: {
    marginTop: spacing.md,
    marginBottom: spacing.md,
    fontSize: typography.body,
    fontWeight: '700',
    color: Colours.SAGE,
  },
  suggestionWrap: {
    marginBottom: spacing.md,
  },
  deckWrap: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: typography.overline,
    letterSpacing: 2,
    color: Colours.STONE,
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: typography.h2,
    fontWeight: '700',
    color: Colours.INK,
    marginBottom: spacing.sm,
  },
  body: {
    fontSize: typography.body,
    lineHeight: 24,
    color: Colours.STONE,
  },
  meta: {
    marginTop: spacing.md,
    fontSize: typography.caption,
    color: Colours.STONE,
  },
  buttonWrap: {
    marginTop: spacing.xl,
  },
  bottomSpace: {
    height: spacing.xxl,
  },
});