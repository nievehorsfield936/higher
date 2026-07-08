import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import Button from '@/components/Button';
import Card from '@/components/Card';
import Screen from '@/components/Screen';
import { Colours } from '@/constants/colours';
import { useHigherDaily } from '@/src/hooks/useHigherDaily';
import { useStudyBrain } from '@/src/hooks/useStudyBrain';
import { spacing, typography } from '@/src/theme';

export default function HigherScreen() {
  const brain = useStudyBrain();
  const today = useHigherDaily();

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>HIGHER</Text>

        <Text style={styles.title}>
          Your personal study coach
        </Text>

        <Card>
          <Text style={styles.heading}>Today's Recommendation</Text>

          <Text style={styles.big}>
            {today.title}
          </Text>

          <Text style={styles.body}>
            {today.reason}
          </Text>

          <Text style={styles.meta}>
            {today.priority} Priority • {today.estimatedMinutes} mins
          </Text>
        </Card>

        <View style={styles.stats}>
          <Card style={styles.stat}>
            <Text style={styles.number}>
              {brain.preparation}%
            </Text>

            <Text style={styles.caption}>
              Preparation
            </Text>
          </Card>

          <Card style={styles.stat}>
            <Text style={styles.number}>
              {brain.dueCards}
            </Text>

            <Text style={styles.caption}>
              Due Cards
            </Text>
          </Card>
        </View>

        <Card>
          <Text style={styles.heading}>
            Ask Higher
          </Text>

          <Text style={styles.body}>
            Soon you'll be able to ask questions
            about your notes, generate quizzes,
            explain difficult concepts and build
            personalised study plans.
          </Text>

          <Button
            title="Coming Soon"
            onPress={() => {}}
          />
        </Card>

        <View style={{ height: 40 }} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: typography.overline,
    letterSpacing: 2,
    color: Colours.STONE,
    marginBottom: spacing.sm,
  },

  title: {
    fontSize: typography.h1,
    fontWeight: '700',
    color: Colours.INK,
    marginBottom: spacing.xl,
  },

  heading: {
    fontSize: typography.h3,
    fontWeight: '700',
    color: Colours.INK,
    marginBottom: spacing.sm,
  },

  big: {
    fontSize: typography.h2,
    fontWeight: '700',
    color: Colours.SAGE,
    marginBottom: spacing.sm,
  },

  body: {
    fontSize: typography.body,
    lineHeight: 24,
    color: Colours.STONE,
    marginBottom: spacing.md,
  },

  meta: {
    color: Colours.SAGE,
    fontWeight: '700',
  },

  stats: {
    flexDirection: 'row',
    gap: spacing.md,
    marginVertical: spacing.lg,
  },

  stat: {
    flex: 1,
    alignItems: 'center',
  },

  number: {
    fontSize: 36,
    fontWeight: '700',
    color: Colours.INK,
  },

  caption: {
    marginTop: spacing.sm,
    color: Colours.STONE,
  },
});