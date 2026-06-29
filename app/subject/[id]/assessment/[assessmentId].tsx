import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import Button from '@/components/Button';
import Card from '@/components/Card';
import Header from '@/components/Header';
import Screen from '@/components/Screen';
import { Colours } from '@/constants/colours';
import { useAppStore } from '@/src/store';

export default function AssessmentDetailScreen() {
  const { assessmentId } = useLocalSearchParams<{
    id: string;
    assessmentId: string;
  }>();

  const assessments = useAppStore((state) => state.assessments);
  const deleteAssessment = useAppStore((state) => state.deleteAssessment);

  const assessment = assessments.find((item) => item.id === assessmentId);

  function handleDelete() {
    if (!assessment) return;

    Alert.alert('Delete assessment?', 'This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteAssessment(assessment.id);
          router.back();
        },
      },
    ]);
  }

  if (!assessment) {
    return (
      <Screen>
        <Header title="Assessment not found" />
      </Screen>
    );
  }

  return (
    <Screen>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.backText}>← Assessments</Text>
      </Pressable>

      <Header title={assessment.title} subtitle={assessment.type.toUpperCase()} />

      <Card>
        <Text style={styles.label}>DUE DATE</Text>
        <Text style={styles.title}>{assessment.dueDate || 'No date set'}</Text>

        <Text style={styles.label}>WEIGHTING</Text>
        <Text style={styles.body}>{assessment.weight}%</Text>

        {assessment.notes ? (
          <>
            <Text style={styles.label}>NOTES</Text>
            <Text style={styles.body}>{assessment.notes}</Text>
          </>
        ) : null}
      </Card>

      <View style={styles.buttonWrap}>
        <Button title="Delete assessment" onPress={handleDelete} />
      </View>
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
    marginTop: 12,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: Colours.INK,
    marginBottom: 12,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: Colours.STONE,
    marginBottom: 12,
  },
  buttonWrap: {
    marginTop: 22,
  },
});