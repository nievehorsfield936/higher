import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import Button from '@/components/Button';
import Card from '@/components/Card';
import Screen from '@/components/Screen';
import AIActionBar from '@/src/components/editor/AIActionBar';
import StudyQualityCard from '@/src/components/editor/StudyQualityCard';
import InsightCard from '@/src/components/ui/InsightCard';
import SectionHeader from '@/src/components/ui/SectionHeader';
import { Colours } from '@/constants/colours';
import { useLiveNoteAnalysis } from '@/src/hooks/useLiveNoteAnalysis';
import { useAppStore } from '@/src/store';
import { spacing, typography } from '@/src/theme';

export default function NewNoteScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const addNote = useAppStore((state) => state.addNote);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { analysis, flashcards } = useLiveNoteAnalysis(title, content);

  const canSave = title.trim().length > 0;
  const wordCount = analysis.wordCount;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  function handleSave() {
    if (!canSave) return;

    const now = new Date().toISOString();

    addNote({
      id: Date.now().toString(),
      subjectId: id,
      title: title.trim(),
      content: content.trim(),
      createdAt: now,
      updatedAt: now,
    });

    router.back();
  }

  return (
    <Screen>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Pressable onPress={() => router.back()}>
            <Text style={styles.backText}>← Notes</Text>
          </Pressable>

          <Text style={styles.label}>NEW NOTE</Text>

          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Untitled lecture"
            placeholderTextColor={Colours.STONE}
            style={styles.titleInput}
          />

          <Card>
            <Text style={styles.editorLabel}>NOTE BODY</Text>

            <TextInput
              value={content}
              onChangeText={setContent}
              placeholder="Start writing your lecture notes..."
              placeholderTextColor={Colours.STONE}
              multiline
              textAlignVertical="top"
              style={styles.bodyInput}
            />

            <View style={styles.editorFooter}>
              <Text style={styles.footerText}>{wordCount} words</Text>
              <Text style={styles.footerText}>{readingTime} min read</Text>
            </View>
          </Card>

          <View style={styles.aiWrap}>
            <AIActionBar />
          </View>

          <View style={styles.qualityWrap}>
            <StudyQualityCard title={title} content={content} />
          </View>

          <SectionHeader title="Higher Tools" />

          <InsightCard
            title="Live analysis is active"
            body={`${analysis.concepts.length} concept${
              analysis.concepts.length === 1 ? '' : 's'
            } detected · ${analysis.suggestedFlashcards} possible flashcards · ${analysis.estimatedQuizQuestions} possible quiz questions.`}
          />

          <SectionHeader title="Flashcards Detected" />

          {flashcards.length === 0 ? (
            <InsightCard
              title="No flashcards yet"
              body="Keep writing and Higher will detect concepts automatically."
            />
          ) : (
            flashcards.slice(0, 3).map((card) => (
              <Card key={card.id} style={styles.flashcardPreview}>
                <Text style={styles.previewLabel}>QUESTION</Text>

                <Text style={styles.previewQuestion}>{card.front}</Text>

                <Text style={styles.previewAnswer}>{card.back}</Text>
              </Card>
            ))
          )}

          <View style={styles.buttonWrap}>
            <Button
              title="Save note"
              onPress={handleSave}
              disabled={!canSave}
            />
          </View>

          <View style={styles.bottomSpace} />
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  backText: {
    marginTop: spacing.md,
    marginBottom: spacing.lg,
    fontSize: typography.body,
    fontWeight: '700',
    color: Colours.SAGE,
  },
  label: {
    fontSize: typography.overline,
    letterSpacing: 2,
    color: Colours.STONE,
    marginBottom: spacing.sm,
  },
  titleInput: {
    fontFamily: 'PlayfairDisplay_500Medium',
    fontSize: 38,
    lineHeight: 44,
    color: Colours.INK,
    marginBottom: spacing.xl,
  },
  editorLabel: {
    fontSize: typography.overline,
    letterSpacing: 2,
    color: Colours.STONE,
    marginBottom: spacing.md,
  },
  bodyInput: {
    minHeight: 300,
    fontSize: typography.body,
    lineHeight: 26,
    color: Colours.INK,
  },
  editorFooter: {
    marginTop: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colours.RULE,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    color: Colours.STONE,
    fontSize: typography.caption,
  },
  aiWrap: {
    marginTop: spacing.md,
  },
  qualityWrap: {
    marginTop: spacing.md,
  },
  flashcardPreview: {
    marginTop: spacing.md,
  },
  previewLabel: {
    fontSize: typography.overline,
    letterSpacing: 2,
    color: Colours.STONE,
    marginBottom: spacing.sm,
  },
  previewQuestion: {
    fontSize: typography.h2,
    fontWeight: '700',
    color: Colours.INK,
    marginBottom: spacing.sm,
  },
  previewAnswer: {
    fontSize: typography.body,
    color: Colours.STONE,
    lineHeight: 24,
  },
  buttonWrap: {
    marginTop: spacing.xl,
  },
  bottomSpace: {
    height: spacing.xxl,
  },
});