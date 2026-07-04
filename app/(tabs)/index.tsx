import { router } from 'expo-router';
import React, { useMemo } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import Button from '@/components/Button';
import Card from '@/components/Card';
import Header from '@/components/Header';
import Screen from '@/components/Screen';
import ProgressBar from '@/components/common/ProgressBar';
import { Colours } from '@/constants/colours';
import { useStudyBrain } from '@/src/hooks/useStudyBrain';
import { useAppStore } from '@/src/store';
import { spacing, typography } from '@/src/theme';

export default function HomeScreen() {
  const subjects = useAppStore((state) => state.subjects);
  const notes = useAppStore((state) => state.notes);
  const flashcards = useAppStore((state) => state.flashcards);
  const assessments = useAppStore((state) => state.assessments);
  const completedSessions = useAppStore((state) => state.completedSessions);

  const currentSubject = subjects[0];

  const brain = useStudyBrain();

  const recentNote = useMemo(() => {
    return [...notes].sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() -
        new Date(a.updatedAt).getTime()
    )[0];
  }, [notes]);

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.logoWrap}>
          <Image
            source={require('../../assets/branding/logo-full.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Header
          title="Good morning."
          subtitle={
            currentSubject
              ? 'Higher has your study plan ready.'
              : 'Create your first subject to begin.'
          }
        />

        {currentSubject ? (
          <>
            <Card>
              <Text style={styles.cardLabel}>TODAY’S READINESS</Text>

              <Text style={styles.readinessText}>
                {brain.preparation}% ready
              </Text>

              <ProgressBar progress={brain.preparation} />

              <Text style={styles.cardBody}>{brain.insight}</Text>
            </Card>

            <View style={styles.buttonWrap}>
              <Button
                title="Start today’s session"
                onPress={() => router.push('/session')}
              />
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>
                  {brain.sessionsThisWeek}
                </Text>
                <Text style={styles.statLabel}>Sessions</Text>
              </View>

              <View style={styles.statBox}>
                <Text style={styles.statNumber}>
                  {brain.studyMinutes}
                </Text>
                <Text style={styles.statLabel}>Minutes</Text>
              </View>

              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{brain.dueCards}</Text>
                <Text style={styles.statLabel}>Due</Text>
              </View>
            </View>

            <Text style={styles.sectionLabel}>NEXT ACTION</Text>

            <Card>
              <Text style={styles.cardLabel}>
                {brain.nextAction.type.toUpperCase()}
              </Text>

              <Text style={styles.cardTitle}>
                {brain.nextAction.title}
              </Text>

              <Text style={styles.cardBody}>
                Suggested time: {brain.nextAction.duration} minutes.
              </Text>
            </Card>

            {recentNote ? (
              <>
                <Text style={styles.sectionLabel}>CONTINUE</Text>

                <Card>
                  <Text style={styles.cardLabel}>RECENT NOTE</Text>
                  <Text style={styles.cardTitle}>{recentNote.title}</Text>
                  <Text numberOfLines={3} style={styles.cardBody}>
                    {recentNote.content || 'No content yet'}
                  </Text>
                </Card>
              </>
            ) : null}

            <Text style={styles.sectionLabel}>CURRENT SUBJECT</Text>

            <Card>
              <Text style={styles.cardLabel}>{currentSubject.code}</Text>
              <Text style={styles.subjectName}>{currentSubject.name}</Text>

              <Text style={styles.cardBody}>
                Open your workspace to continue notes, flashcards and assessments.
              </Text>
            </Card>

            <View style={styles.buttonWrap}>
              <Button
                title="Open workspace"
                onPress={() => router.push(`/subject/${currentSubject.id}`)}
              />
            </View>
          </>
        ) : (
          <>
            <Card>
              <Text style={styles.cardLabel}>EMPTY WORKSPACE</Text>
              <Text style={styles.cardTitle}>No subjects yet</Text>
              <Text style={styles.cardBody}>
                Create your first subject to build your study workspace.
              </Text>
            </Card>

            <View style={styles.buttonWrap}>
              <Button
                title="Create subject"
                onPress={() => router.push('/create-subject')}
              />
            </View>
          </>
        )}

        <View style={styles.bottomSpace} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  logoWrap: {
    alignItems: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  logo: {
    width: 120,
    height: 105,
  },
  sectionLabel: {
    marginTop: spacing.xl,
    marginBottom: spacing.md,
    fontSize: typography.overline,
    letterSpacing: 2,
    fontWeight: '700',
    color: Colours.STONE,
  },
  cardLabel: {
    fontSize: typography.overline,
    letterSpacing: 2,
    color: Colours.STONE,
    marginBottom: spacing.sm,
  },
  cardTitle: {
    fontSize: typography.h2,
    fontWeight: '700',
    color: Colours.INK,
    marginBottom: spacing.sm,
  },
  readinessText: {
    fontSize: typography.display,
    fontWeight: '700',
    color: Colours.INK,
    marginBottom: spacing.md,
  },
  subjectName: {
    fontSize: typography.h1,
    fontWeight: '700',
    color: Colours.INK,
    marginBottom: spacing.md,
  },
  cardBody: {
    marginTop: spacing.md,
    fontSize: typography.body,
    lineHeight: 24,
    color: Colours.STONE,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: spacing.lg,
  },
  statBox: {
    flex: 1,
    backgroundColor: Colours.OFF,
    borderWidth: 1,
    borderColor: Colours.RULE,
    borderRadius: 20,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: typography.h2,
    fontWeight: '700',
    color: Colours.INK,
  },
  statLabel: {
    marginTop: spacing.xs,
    fontSize: typography.overline,
    color: Colours.STONE,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  buttonWrap: {
    marginTop: spacing.lg,
  },
  bottomSpace: {
    height: spacing.xxl,
  },
});