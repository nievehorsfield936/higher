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
import InsightCard from '@/src/components/ui/InsightCard';
import AIActionBar from '@/src/components/editor/AIActionBar';
import SectionHeader from '@/src/components/ui/SectionHeader';
import { Colours } from '@/constants/colours';
import { useAppStore } from '@/src/store';
import { spacing, typography } from '@/src/theme';

export default function NewNoteScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const addNote = useAppStore((state) => state.addNote);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const canSave = title.trim().length > 0;

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

  <EditorToolbar />

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
    <Text style={styles.footerText}>
      {content.trim().length === 0
        ? '0 words'
        : `${content.trim().split(/\s+/).length} words`}
    </Text>

    <Text style={styles.footerText}>
      {Math.max(
        1,
        Math.ceil(
          content.trim().split(/\s+/).length / 200
        )
      )} min read
    </Text>

  </View>

</Card>

          <SectionHeader title="Higher Tools" />
<View style={styles.aiWrap}>
  <AIActionBar />
</View>
          <InsightCard
            title="AI tools coming soon"
            body="Soon, Higher will summarise notes, generate flashcards and create quiz questions from this editor."
          />

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
  buttonWrap: {
    marginTop: spacing.xl,
  },
  bottomSpace: {
    height: spacing.xxl,
  },
  editorFooter: {
  marginTop: spacing.lg,
  paddingTop: spacing.md,
  borderTopWidth: 1,
  borderTopColor: Colours.RULE,
  flexDirection: 'row',
  justifyContent: 'space-between',
},

aiWrap: {
  marginTop: spacing.md,
},

footerText: {
  color: Colours.STONE,
  fontSize: typography.caption,
},
});