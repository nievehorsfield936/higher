import { router, useLocalSearchParams } from 'expo-router';
import React, { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import Button from '@/components/Button';
import Card from '@/components/Card';
import Header from '@/components/Header';
import Screen from '@/components/Screen';
import { Colours } from '@/constants/colors';
import { useAppStore } from '@/src/store';

export default function AssessmentsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const subjects = useAppStore((state) => state.subjects);
  const assessments = useAppStore((state) => state.assessments);

  const subject = subjects.find((item) => item.id === id);

  const subjectAssessments = useMemo(
    () =>
      assessments
        .filter((assessment) => assessment.subjectId === id)
        .sort(
          (a, b) =>
            new Date(a.dueDate).getTime() -
            new Date(b.dueDate).getTime()
        ),
    [assessments, id]
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
          title="Assessments"
          subtitle={`Exams, assignments and quizzes for ${subject.name}.`}
        />

        {subjectAssessments.length === 0 ? (
          <Card>
            <Text style={styles.label}>NO ASSESSMENTS YET</Text>
            <Text style={styles.title}>Add your first assessment.</Text>
            <Text style={styles.body}>
              Higher will use due dates and weighting to help prioritise your study.
            </Text>
          </Card>
        ) : (
          subjectAssessments.map((assessment) => (
            <Pressable
              key={assessment.id}
              style={styles.assessmentWrap}
              onPress={() =>
                router.push(
                  `/subject/${id}/assessment/${assessment.id}` as never
                )
              }
            >
              <Card>
                <Text style={styles.label}>
                  {assessment.type.toUpperCase()}
                </Text>

                <Text style={styles.title}>{assessment.title}</Text>

                <Text style={styles.body}>
                  Due {new Date(assessment.dueDate).toLocaleDateString()} ·{' '}
                  {assessment.weight}% weighting
                </Text>
              </Card>
            </Pressable>
          ))
        )}

        <View style={styles.buttonWrap}>
          <Button
            title="New assessment"
            onPress={() =>
              router.push(`/subject/${id}/new-assessment` as never)
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
  assessmentWrap: {
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