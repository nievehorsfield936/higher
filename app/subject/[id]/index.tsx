import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import Card from '@/components/Card';
import Screen from '@/components/Screen';
import { Colours } from '@/constants/colors';
import { QuickActionCard, WorkspaceHero } from '@/src/components/workspace';
import { useAppStore } from '@/src/store';
import { workspaceActions } from '../../../src/data/workspaceActions';

export default function SubjectWorkspaceScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const subjects = useAppStore((state) => state.subjects);

  const subject = subjects.find((item) => item.id === id);

  if (!subject) {
    return (
      <Screen>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>

        <Card>
          <Text style={styles.label}>SUBJECT NOT FOUND</Text>
          <Text style={styles.title}>This workspace could not be loaded.</Text>
        </Card>
      </Screen>
    );
  }

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backText}>← Subjects</Text>
        </Pressable>

        <WorkspaceHero
          code={subject.code}
          name={subject.name}
          progress={subject.progress}
          examText="Workspace ready"
        />

        <Text style={styles.sectionLabel}>CONTINUE STUDYING</Text>

        <Card>
          <Text style={styles.label}>NEXT STEP</Text>
          <Text style={styles.title}>Start your first note</Text>
          <Text style={styles.body}>
            Capture lecture notes, readings, tasks and ideas inside this subject.
          </Text>
        </Card>

        <Text style={styles.sectionLabel}>TODAY’S FOCUS</Text>

        <Card>
          <Text style={styles.focusItem}>○ Create one note</Text>
          <Text style={styles.focusItem}>○ Add one task</Text>
          <Text style={styles.focusItem}>○ Ask Higher for a study plan</Text>
        </Card>

        <Text style={styles.sectionLabel}>QUICK ACCESS</Text>

        <View style={styles.actionGrid}>
          {workspaceActions.map((action) => (
            <QuickActionCard
              key={action.id}
              title={action.title}
              icon={action.icon}
              onPress={() => {
                switch (action.id) {
                  case 'notes':
                    router.push({
                      pathname: '/subject/[id]/notes',
                      params: { id: subject.id },
                    } as never);
                    break;

                  default:
                    console.log(`${action.title} coming soon`);
                }
              }}
            />
          ))}
        </View>

        <Text style={styles.sectionLabel}>HIGHER RECOMMENDS</Text>

        <Card>
          <Text style={styles.label}>HIGHER</Text>
          <Text style={styles.body}>
            Once notes and tasks are added, Higher will recommend what to study next.
          </Text>
        </Card>

        <View style={styles.bottomSpace} />
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
  sectionLabel: {
    marginTop: 22,
    marginBottom: 10,
    fontSize: 11,
    letterSpacing: 2,
    color: Colours.STONE,
  },
  label: {
    fontSize: 11,
    letterSpacing: 2,
    color: Colours.STONE,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: Colours.INK,
    marginBottom: 10,
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    color: Colours.STONE,
  },
  focusItem: {
    fontSize: 16,
    lineHeight: 30,
    color: Colours.INK,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  bottomSpace: {
    height: 40,
  },
});