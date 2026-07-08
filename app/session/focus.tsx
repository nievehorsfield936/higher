import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Button from '@/components/Button';
import Card from '@/components/Card';
import Header from '@/components/Header';
import Screen from '@/components/Screen';
import { Colours } from '@/constants/colours';
import { useFocusSession } from '@/src/session';
import { spacing, typography } from '@/src/theme';

export default function FocusScreen() {
  const session = useFocusSession();

  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);

  const currentTask = session.tasks[currentTaskIndex];

  function handleCompleteTask() {
    if (currentTaskIndex < session.tasks.length - 1) {
      setCurrentTaskIndex((prev) => prev + 1);
    } else {
      router.replace('/');
    }
  }

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.back}>← Back</Text>
        </Pressable>

        <Header
          title="Focus Session"
          subtitle={`${session.totalMinutes} minute personalised study plan`}
        />

        <Card>
          <Text style={styles.progress}>
            Task {currentTaskIndex + 1} of {session.tasks.length}
          </Text>

          <Text style={styles.step}>
            {currentTask.type.toUpperCase()}
          </Text>

          <Text style={styles.title}>
            {currentTask.title}
          </Text>

          <Text style={styles.description}>
            {currentTask.description}
          </Text>

          <View style={styles.metaRow}>
            <Text style={styles.time}>
              ⏱ {currentTask.estimatedMinutes} min
            </Text>

            <Text style={styles.preparation}>
              Preparation {session.preparation}%
            </Text>
          </View>

          <View style={styles.buttonWrap}>
            <Button
              title={
                currentTaskIndex === session.tasks.length - 1
                  ? 'Finish Session'
                  : 'Complete & Continue'
              }
              onPress={handleCompleteTask}
            />
          </View>
        </Card>

        <Card style={styles.overviewCard}>
          <Text style={styles.overviewTitle}>
            Session Overview
          </Text>

          {session.tasks.map((task, index) => (
            <View
              key={task.id}
              style={styles.taskRow}
            >
              <View
                style={[
                  styles.dot,
                  index <= currentTaskIndex
                    ? styles.dotActive
                    : styles.dotInactive,
                ]}
              />

              <View style={{ flex: 1 }}>
                <Text style={styles.taskTitle}>
                  {task.title}
                </Text>

                <Text style={styles.taskMinutes}>
                  {task.estimatedMinutes} min
                </Text>
              </View>
            </View>
          ))}
        </Card>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  back: {
    marginTop: spacing.md,
    marginBottom: spacing.lg,
    color: Colours.SAGE,
    fontSize: typography.body,
    fontWeight: '700',
  },

  progress: {
    fontSize: typography.caption,
    color: Colours.STONE,
    marginBottom: spacing.md,
  },

  step: {
    fontSize: typography.overline,
    letterSpacing: 2,
    color: Colours.SAGE,
    marginBottom: spacing.sm,
  },

  title: {
    fontSize: typography.h2,
    fontWeight: '700',
    color: Colours.INK,
    marginBottom: spacing.md,
  },

  description: {
    fontSize: typography.body,
    lineHeight: 24,
    color: Colours.STONE,
    marginBottom: spacing.lg,
  },

  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },

  time: {
    fontSize: typography.caption,
    color: Colours.SAGE,
    fontWeight: '700',
  },

  preparation: {
    fontSize: typography.caption,
    color: Colours.STONE,
    fontWeight: '600',
  },

  buttonWrap: {
    marginTop: spacing.sm,
  },

  overviewCard: {
    marginTop: spacing.xl,
  },

  overviewTitle: {
    fontSize: typography.h3,
    fontWeight: '700',
    color: Colours.INK,
    marginBottom: spacing.lg,
  },

  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },

  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: spacing.md,
  },

  dotActive: {
    backgroundColor: Colours.SAGE,
  },

  dotInactive: {
    backgroundColor: Colours.RULE,
  },

  taskTitle: {
    fontSize: typography.body,
    fontWeight: '600',
    color: Colours.INK,
  },

  taskMinutes: {
    marginTop: 2,
    fontSize: typography.caption,
    color: Colours.STONE,
  },

  bottomSpace: {
    height: spacing.xxl,
  },
});